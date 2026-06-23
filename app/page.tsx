"use client";

import { type MouseEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { motion, useInView, animate, useMotionValue, useSpring } from "framer-motion";
import Scene3D from "@/components/Scene3D";
import PhilosophySection from "@/components/PhilosophySection";
import TechStack from "@/components/TechStack";

/* ─────────────────────────── Magnetic button ─────────────────────────── */
function MagneticButton({
  children,
  href,
  variant = "ghost",
}: {
  children: ReactNode;
  href: string;
  variant?: "solid" | "ghost";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 150, damping: 15, mass: 0.3 });
  const y = useSpring(my, { stiffness: 150, damping: 15, mass: 0.3 });

  const onMove = (e: MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const base =
    "relative inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium tracking-wide outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#E8B84B]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black";
  const skin =
    variant === "solid"
      ? "bg-[#E8B84B] text-[#1a1305] hover:bg-[#f1c860]"
      : "border border-white/15 text-[#EDEAE0] hover:border-[#E8B84B]/60 hover:text-white";

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y }}
      whileTap={{ scale: 0.96 }}
      className={`${base} ${skin}`}
    >
      {children}
    </motion.a>
  );
}

/* ─────────────────────── Count-up metric number ─────────────────────── */
function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ─────────────────────────────── content ─────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const METRICS = [
  { to: 6.6, decimals: 1, prefix: "", suffix: "+", label: "years in quality" },
  { to: 400, decimals: 0, prefix: "", suffix: "+", label: "tests automated" },
  { to: 60, decimals: 0, prefix: "~", suffix: "%", label: "less manual regression" },
];

export default function Page() {
  return (
    <>
      {/* Fixed 3D background — sits behind everything, follows scroll */}
      <Scene3D />

      <main className="relative z-10">
        {/* ───────────────── HERO ───────────────── */}
        <section id="hero" className="relative flex min-h-screen items-center">
          {/* legibility veil over the 3D, left-weighted so the core breathes on the right */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />

          <div className="relative mx-auto w-full max-w-6xl px-6">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="mb-6 text-xs uppercase tracking-[0.28em] text-[#E8B84B]"
            >
              Senior SDET · QA Automation · Bangalore, India
            </motion.p>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
            >
              Quality,
              <br />
              <span className="italic text-[#E8B84B]">by design.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="mt-7 max-w-xl text-lg leading-relaxed text-white/70"
            >
              I&apos;m Varun — a Senior SDET who spent years teaching before I spent them
              testing. I build automation that catches what people miss, and I&apos;ve never
              stopped explaining how.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="mt-9 flex flex-wrap gap-4"
            >
              <MagneticButton href="#software" variant="solid">
                Explore my work
              </MagneticButton>
              {/* drop Varun-M-Resume.pdf into /public and this just works */}
              <MagneticButton href="/Varun-M-Resume.pdf" variant="ghost">
                Download résumé
              </MagneticButton>
            </motion.div>
          </div>
        </section>

        {/* ───────────────── METRICS ───────────────── */}
        <section id="metrics" className="relative py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {METRICS.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="p-8 text-center sm:text-left"
                >
                  <div
                    style={{ fontFamily: "var(--font-serif)" }}
                    className="text-4xl font-semibold text-[#E8B84B] sm:text-5xl"
                  >
                    <Counter to={m.to} decimals={m.decimals} prefix={m.prefix} suffix={m.suffix} />
                  </div>
                  <p className="mt-2 text-sm text-white/60">{m.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

    
        <PhilosophySection />
        <TechStack />

        {/* ───────────────── CONTACT (minimal for now) ───────────────── */}
        <section id="contact" className="relative py-28">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-4xl tracking-tight sm:text-5xl"
            >
              Let&apos;s build something <span className="italic text-[#E8B84B]">dependable.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-white/60">
              Open to conversations about quality engineering, automation, and training.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <MagneticButton href="mailto:varunm.work1@gmail.com" variant="solid">
                Email me
              </MagneticButton>
              <MagneticButton href="https://linkedin.com/in/varun-m-78a106294" variant="ghost">
                LinkedIn
              </MagneticButton>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}