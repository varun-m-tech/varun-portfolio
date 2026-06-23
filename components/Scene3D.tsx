"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* ─────────────────────────── helpers ─────────────────────────── */

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

// Frame-rate independent damping (smooth follow regardless of FPS).
const damp = (current: number, target: number, lambda: number, dt: number) =>
  THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt));

// Brand colors
const GOLD = "#E8B84B";
const CYAN = "#27E0E5";

/* ───────────────────── the scroll-driven Data Core ─────────────────────
   Reads window scroll progress (0 = top of page, 1 = bottom) and drives:
     • whole-group rotation + vertical "follow" down the page
     • shell separation (assembled at 0 and 1, fully dissected at 0.5)
     • counter-rotating wireframe shells + drifting data nodes
   All movement is damped for a premium, weighty feel.
------------------------------------------------------------------------ */
function DataCore() {
  const group = useRef<THREE.Group>(null!);
  const shellA = useRef<THREE.Mesh>(null!);
  const shellB = useRef<THREE.Mesh>(null!);
  const shellC = useRef<THREE.Mesh>(null!);
  const nodes = useRef<THREE.Group>(null!);
  const scroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.current = max > 0 ? clamp(window.scrollY / max) : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useFrame((_, delta) => {
    const p = scroll.current;
    const sep = Math.sin(p * Math.PI); // 0 → 1 → 0 across the scroll

    if (group.current) {
      group.current.rotation.y += delta * 0.25;
      group.current.rotation.x = damp(group.current.rotation.x, p * Math.PI * 0.6, 4, delta);
      group.current.position.y = damp(group.current.position.y, -p * 1.2, 4, delta);
      const s = 1 + sep * 0.08;
      group.current.scale.setScalar(damp(group.current.scale.x, s, 4, delta));
    }

    const e = sep; // expansion amount
    if (shellA.current) {
      shellA.current.scale.setScalar(damp(shellA.current.scale.x, 1.35 + e * 1.0, 4, delta));
      shellA.current.rotation.z -= delta * 0.15;
    }
    if (shellB.current) {
      shellB.current.scale.setScalar(damp(shellB.current.scale.x, 1.7 + e * 1.4, 4, delta));
      shellB.current.rotation.x += delta * 0.1;
    }
    if (shellC.current) {
      shellC.current.scale.setScalar(damp(shellC.current.scale.x, 2.1 + e * 1.9, 4, delta));
      shellC.current.rotation.y += delta * 0.08;
    }
    if (nodes.current) {
      nodes.current.rotation.y -= delta * 0.3;
      nodes.current.scale.setScalar(damp(nodes.current.scale.x, 1 + sep * 0.6, 4, delta));
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
      <group ref={group}>
        {/* glowing solid core */}
        <mesh>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={GOLD}
            emissive={GOLD}
            emissiveIntensity={0.9}
            metalness={0.7}
            roughness={0.2}
            flatShading
          />
        </mesh>

        {/* wireframe shells (dissect outward on scroll) */}
        <mesh ref={shellA}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={GOLD} wireframe transparent opacity={0.55} />
        </mesh>
        <mesh ref={shellB}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.4} />
        </mesh>
        <mesh ref={shellC}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={GOLD} wireframe transparent opacity={0.18} />
        </mesh>

        {/* orbiting data nodes */}
        <group ref={nodes}>
          {NODE_POSITIONS.map((pos, i) => (
            <mesh key={i} position={pos}>
              <boxGeometry args={[0.12, 0.12, 0.12]} />
              <meshStandardMaterial
                color={i % 2 ? CYAN : GOLD}
                emissive={i % 2 ? CYAN : GOLD}
                emissiveIntensity={1.1}
                metalness={0.6}
                roughness={0.3}
              />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  );
}

const NODE_POSITIONS: [number, number, number][] = [
  [1.6, 0.2, 0.4],
  [-1.5, 0.6, -0.5],
  [0.3, 1.6, -0.6],
  [-0.4, -1.5, 0.5],
  [1.2, -0.9, -1.0],
  [-1.1, -0.6, 1.1],
  [0.8, 0.9, 1.3],
];

/* ───────── lightweight fallback (mobile / reduced-motion / no WebGL) ───────── */
function StaticBackdrop() {
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(60% 50% at 70% 30%, rgba(232,184,75,0.18), transparent 70%)," +
          "radial-gradient(50% 50% at 25% 75%, rgba(39,224,229,0.12), transparent 70%)," +
          "#050505",
      }}
    />
  );
}

function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/* ───────────────────────────── exported scene ───────────────────────────── */
export default function Scene3D() {
  const [mode, setMode] = useState<"loading" | "3d" | "static">("loading");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;
    setMode(reduced || small || !hasWebGL() ? "static" : "3d");
  }, []);

  // Never server-render the canvas: show the cheap backdrop until we mount + qualify.
  if (mode !== "3d") {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none">
        <StaticBackdrop />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <StaticBackdrop />
      <Canvas
        style={{ position: "absolute", inset: 0 }}
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 6, 5]} intensity={2.2} color="#F0C766" />
        <directionalLight position={[-6, -3, -4]} intensity={1.3} color={CYAN} />
        <directionalLight position={[0, 4, 6]} intensity={0.7} color="#ffffff" />
        <DataCore />
        <Sparkles count={60} scale={[12, 12, 6]} size={1.4} speed={0.3} color={CYAN} opacity={0.5} />
      </Canvas>
    </div>
  );
}