"use client";

import { useEffect, useRef } from "react";

const BRASS = "#D8B450";
const CYAN = "#38BDF8";

const TOKENS = [
  "def test_login():",
  "assert resp.status == 200",
  "pytest.mark.parametrize",
  "await page.click()",
  "docker build",
  "@allure.step",
  "CI / CD",
  "</>",
  "{ }",
  "@pytest.fixture",
  "expect(page).toHaveURL",
  "git commit -m",
  "assert response.ok",
  "pytest -v --html",
  "page.fill('#input')",
  "docker-compose up",
  "allure generate",
  "test_user_auth",
  "conftest.py",
  "status_code == 200",
  "webdriver.Chrome()",
  "assert 'login' in url",
  "kubectl apply -f",
  "@allure.feature",
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  text: string;
  alpha: number;
  color: string;
  font: string;
  px: number;
  py: number;
}

function mkRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return (s >>> 0) / 0x100000000;
  };
}

export default function SecureMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < 768;
    // Fewer tokens, cap DPR at 1.5
    const N = mobile ? 8 : 20;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const rng = mkRng(137);

    let W = 0;
    let H = 0;
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Pre-compute font strings to avoid per-frame allocations
    const particles: Particle[] = Array.from({ length: N }, () => {
      const isAccent = rng() < 0.18;
      const isBrass = rng() < 0.5;
      const size = Math.round(9 + rng() * 5);
      return {
        x: rng() * window.innerWidth,
        y: rng() * window.innerHeight,
        vx: (rng() - 0.5) * 0.35,
        vy: 0.3 + rng() * 0.5,
        text: TOKENS[Math.floor(rng() * TOKENS.length)],
        alpha: isAccent ? 0.10 + rng() * 0.04 : 0.04 + rng() * 0.035,
        color: isAccent ? (isBrass ? BRASS : CYAN) : "rgba(236,231,221,1)",
        font: `${size}px 'JetBrains Mono', monospace`,
        px: (rng() - 0.5) * 0.012,
        py: (rng() - 0.5) * 0.006,
      };
    });

    const mouse = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // Pause state — tab hidden OR hero scrolled past
    let paused = false;
    const onVisibility = () => { paused = document.hidden; };
    document.addEventListener("visibilitychange", onVisibility);

    const onScroll = () => {
      if (!document.hidden) {
        paused = window.scrollY > window.innerHeight * 1.5;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // 30fps throttle
    const FRAME_MS = 1000 / 30;
    let lastTime = 0;
    let raf = 0;

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (paused || now - lastTime < FRAME_MS) return;
      lastTime = now;

      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y > H + 40) { p.y = -40; p.x = rng() * W; }
          if (p.x > W + 200) p.x = -200;
          if (p.x < -200) p.x = W + 200;
        }
        const ox = mouse.x * W * p.px;
        const oy = mouse.y * H * p.py;
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.font = p.font;
        ctx.fillText(p.text, p.x + ox, p.y + oy);
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "#0A0E17" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 60% 55% at 80% 20%, rgba(216,180,80,0.07) 0%, transparent 60%)",
            "radial-gradient(ellipse 55% 60% at 20% 80%, rgba(56,189,248,0.05) 0%, transparent 60%)",
          ].join(","),
        }}
      />
    </div>
  );
}
