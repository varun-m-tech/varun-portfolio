"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const BRASS = "#D8B450";
const CYAN = "#38BDF8";
const NODE_COUNT = 60;
const CONNECT_DIST = 2.8;
const MAX_PER_NODE = 4;

/* Deterministic PRNG — same values on server and client (avoids hydration mismatch) */
function makePrng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return (s >>> 0) / 0x100000000;
  };
}

const r = makePrng(137);

interface NodeDef {
  pos: [number, number, number];
  color: string;
  size: number;
}

/* Nodes — computed once at module load, stable across re-renders */
const NODES: NodeDef[] = Array.from({ length: NODE_COUNT }, () => ({
  pos: [
    (r() - 0.5) * 16,
    (r() - 0.5) * 10,
    (r() - 0.5) * 8,
  ] as [number, number, number],
  color: r() < 0.42 ? BRASS : CYAN,
  size: 0.04 + r() * 0.065,
}));

/* Edges — connect nearest neighbours within threshold */
const EDGES: Array<[number, number]> = (() => {
  const pairs: { i: number; j: number; d: number }[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      const [ax, ay, az] = NODES[i].pos;
      const [bx, by, bz] = NODES[j].pos;
      const d = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2 + (az - bz) ** 2);
      if (d < CONNECT_DIST) pairs.push({ i, j, d });
    }
  }
  pairs.sort((a, b) => a.d - b.d);
  const counts = new Array<number>(NODE_COUNT).fill(0);
  const out: Array<[number, number]> = [];
  for (const { i, j } of pairs) {
    if (counts[i] < MAX_PER_NODE && counts[j] < MAX_PER_NODE) {
      out.push([i, j]);
      counts[i]++;
      counts[j]++;
    }
  }
  return out;
})();

/* ── 3-D mesh scene ─────────────────────────────────────────────────────── */
function MeshScene() {
  const groupRef = useRef<THREE.Group>(null!);
  const mouse = useRef([0, 0]);
  const autoY = useRef(0);
  const sx = useRef(0); // smoothed parallax x
  const sy = useRef(0); // smoothed parallax y

  /* Build edge geometry once (client-only — runs inside Canvas) */
  const lineGeo = useMemo(() => {
    const verts: number[] = [];
    for (const [i, j] of EDGES) {
      const [ax, ay, az] = NODES[i].pos;
      const [bx, by, bz] = NODES[j].pos;
      verts.push(ax, ay, az, bx, by, bz);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return geo;
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current[0] = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current[1] = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, dt) => {
    /* slow auto-rotation */
    autoY.current += dt * 0.035;

    /* exponential smoothing toward mouse target */
    const lam = 1 - Math.exp(-4 * dt);
    sx.current += (mouse.current[0] * 0.18 - sx.current) * lam;
    sy.current += (mouse.current[1] * 0.13 - sy.current) * lam;

    if (groupRef.current) {
      groupRef.current.rotation.y = autoY.current + sx.current;
      groupRef.current.rotation.x = sy.current;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Glowing edge network */}
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color={CYAN} transparent opacity={0.2} />
      </lineSegments>

      {/* Nodes */}
      {NODES.map((n, i) => (
        <mesh key={i} position={n.pos}>
          <sphereGeometry args={[n.size, 7, 7]} />
          <meshStandardMaterial
            color={n.color}
            emissive={n.color}
            emissiveIntensity={n.color === BRASS ? 1.8 : 2.6}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Static fallback ─────────────────────────────────────────────────────── */
function StaticFallback() {
  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background: [
          "radial-gradient(ellipse 60% 55% at 80% 20%, rgba(216,180,80,0.15) 0%, transparent 60%)",
          "radial-gradient(ellipse 55% 60% at 20% 80%, rgba(56,189,248,0.12) 0%, transparent 60%)",
          "radial-gradient(ellipse 35% 35% at 50% 50%, rgba(56,189,248,0.04) 0%, transparent 70%)",
          "#0A0E17",
        ].join(","),
      }}
    />
  );
}

/* ── WebGL feature detection ─────────────────────────────────────────────── */
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

/* ── Exported component ──────────────────────────────────────────────────── */
export default function SecureMesh() {
  const [mode, setMode] = useState<"loading" | "3d" | "static">("loading");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < 768;
    setMode(reduced || mobile || !hasWebGL() ? "static" : "3d");
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <StaticFallback />
      {mode === "3d" && (
        <Canvas
          style={{ position: "absolute", inset: 0 }}
          camera={{ position: [0, 0, 10], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={0.15} />
          <pointLight position={[4, 2, 6]} intensity={1.5} color={BRASS} />
          <pointLight position={[-4, -2, -5]} intensity={1.0} color={CYAN} />
          <MeshScene />
          <EffectComposer>
            <Bloom luminanceThreshold={0.12} intensity={2.0} mipmapBlur />
          </EffectComposer>
        </Canvas>
      )}
    </div>
  );
}
