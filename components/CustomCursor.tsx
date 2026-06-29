"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    document.documentElement.style.cursor = "none";

    const pos = { x: -200, y: -200 };
    const cur = { x: -200, y: -200 };
    let targetScale = 1;
    let curScale = 1;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
    };
    const onOver = (e: Event) => {
      const t = (e.target as HTMLElement).closest("a,button,[role=button]");
      targetScale = t ? 1.65 : 1;
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });

    const animate = () => {
      cur.x += (pos.x - cur.x) * 0.12;
      cur.y += (pos.y - cur.y) * 0.12;
      curScale += (targetScale - curScale) * 0.1;

      ring.style.transform = `translate(${cur.x}px,${cur.y}px) translate(-50%,-50%) scale(${curScale})`;
      dot.style.transform = `translate(${pos.x}px,${pos.y}px) translate(-50%,-50%)`;

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      document.documentElement.style.cursor = "";
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("pointerover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          width: 26,
          height: 26,
          border: "1.5px solid rgba(216,180,80,0.55)",
          borderRadius: "50%",
          willChange: "transform",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "#D8B450",
          willChange: "transform",
        }}
      />
    </>
  );
}
