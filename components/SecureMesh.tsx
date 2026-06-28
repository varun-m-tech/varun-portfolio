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

/* 2-D projections of NODES for the static SVG fallback (orthographic, viewBox 0 0 160 100) */
const SVG_NODES = NODES.map((n) => ({
  x: ((n.pos[0] + 8) / 16) * 156 + 2,
  y: ((n.pos[1] + 5) / 10) * 96 + 2,
  color: n.color,
  r: 0.38 + (n.size - 0.04) * 3.5,
}));

/* ── 3-D mesh scene ─────────────────────────────────────────────────────── */
function MeshScene() {
  const groupRef = useRef<THREE.Group>(null!);
  const mouse = useRef([0, 0]);
  const autoY = useRef(0);
  const sx = useRef(0);
  const sy = useRef(0);

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
    autoY.current += dt * 0.035;
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
      {/* Edges — opacity ~35% lower than original, then another ~20% lower */}
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color={CYAN} transparent opacity={0.10} />
      </lineSegments>

      {/* Nodes — emissiveIntensity reduced ~55% total from original (1.8→0.90, 2.6→1.30) */}
      {NODES.map((n, i) => (
        <mesh key={i} position={n.pos}>
          <sphereGeometry args={[n.size, 7, 7]} />
          <meshStandardMaterial
            color={n.color}
            emissive={n.color}
            emissiveIntensity={n.color === BRASS ? 0.90 : 1.30}
            transparent
            opacity={0.55}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Static SVG mesh fallback (mobile / reduced-motion / no WebGL) ───────── */
function StaticFallback() {
  return (
    <div aria-hidden className="absolute inset-0">
      <div className="absolute inset-0" style={{ background: "#0A0E17" }} />
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 60% 55% at 80% 20%, rgba(216,180,80,0.08) 0%, transparent 60%)",
            "radial-gradient(ellipse 55% 60% at 20% 80%, rgba(56,189,248,0.06) 0%, transparent 60%)",
          ].join(","),
        }}
      />
      {/* Static SVG mesh — lightweight, no WebGL, no animation */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 160 100"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {EDGES.map(([i, j], k) => (
          <line
            key={k}
            x1={SVG_NODES[i].x}
            y1={SVG_NODES[i].y}
            x2={SVG_NODES[j].x}
            y2={SVG_NODES[j].y}
            stroke={CYAN}
            strokeWidth="0.15"
            strokeOpacity="0.18"
          />
        ))}
        {SVG_NODES.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={n.color}
            fillOpacity="0.32"
          />
        ))}
      </svg>
    </div>
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
          <ambientLight intensity={0.12} />
          <pointLight position={[4, 2, 6]} intensity={1.0} color={BRASS} />
          <pointLight position={[-4, -2, -5]} intensity={0.7} color={CYAN} />
          <MeshScene />
          <EffectComposer>
            <Bloom luminanceThreshold={0.15} intensity={1.5} mipmapBlur />
          </EffectComposer>
        </Canvas>
      )}
    </div>
  );
}
