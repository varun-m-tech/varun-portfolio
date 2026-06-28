"use client";

import { type MouseEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { motion, animate, useMotionValue, useSpring } from "framer-motion";
import SecureMesh from "@/components/SecureMesh";
import PhilosophySection from "@/components/PhilosophySection";
import TechStack from "@/components/TechStack";

/* ── Fade-up animation variant ─────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      delay: i * 0.11,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

/* ── Magnetic button ────────────────────────────────────────────────────── */
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

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const base =
    "relative inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium tracking-wide outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#D8B450]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0E17]";
  const skin =
    variant === "solid"
      ? "bg-[#D8B450] text-[#0A0E17] hover:bg-[#e8c96a]"
      : "border border-white/15 text-[#ECE7DD] hover:border-[#D8B450]/60 hover:text-white";

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

/* ── Count-up number ────────────────────────────────────────────────────── */
function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  locale = false,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  locale?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fired = useRef(false);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          observer.disconnect();
          const controls = animate(0, to, {
            duration: 1.8,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => setVal(v),
          });
          return () => controls.stop();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [to]);

  const display = locale
    ? Math.round(val).toLocaleString()
    : val.toFixed(decimals);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ── Data ───────────────────────────────────────────────────────────────── */

/* "nearly 7 years" — experience since Aug 2019. Never "7+" */
const METRICS = [
  { prefix: "~", to: 7, suffix: "", label: "years in quality" },
  { to: 4, suffix: "", label: "domains mastered" },
  { prefix: "~", to: 60, suffix: "%", label: "regression cut" },
  { prefix: "~", to: 40, suffix: "%", label: "CI flakiness cut" },
  { to: 30000, suffix: "+", label: "students reached", locale: true },
  { to: 22, suffix: "", label: "member branch led" },
] as const;

const CAREER_CARDS = [
  {
    title: "Engineering",
    accent: "#D8B450",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    body: "Nearly seven years shipping test automation across cybersecurity, banking, fintech, logistics, and edtech. Frameworks that scale — not just tests that pass.",
    bullets: [
      "Python/Pytest · Selenium · Java/TestNG · RestAssured",
      "Jenkins · Bitbucket Pipelines · Docker · AWS EC2",
      "~60% regression cut  ·  ~40% CI flakiness cut",
    ],
  },
  {
    title: "Teaching & Leadership",
    accent: "#38BDF8",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    body: "Teaching and testing ran in parallel — 30,000+ students across live and recorded programmes while building automation frameworks professionally.",
    bullets: [
      "30,000+ students  ·  live & recorded formats",
      "Manual QA · Selenium · SQL · Interview prep",
      "Branch Head, Mumbai — 22-member team",
    ],
  },
];

/* ── Page ───────────────────────────────────────────────────────────────── */
export default function Page() {
  return (
    <>
      {/* Fixed 3-D mesh — renders behind all content */}
      <SecureMesh />

      <main className="relative z-10">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section
          id="hero"
          className="relative flex min-h-screen items-center"
        >
          {/* Legibility veil — strong left, fades right so the 3D breathes */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0A0E17]/90 via-[#0A0E17]/55 to-[#0A0E17]/20" />

          <div className="relative mx-auto w-full max-w-6xl px-6">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="mb-6 text-xs uppercase tracking-[0.28em] text-[#D8B450]"
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
              <span className="italic text-[#D8B450]">by design.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="mt-4 text-xs text-white/35"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <a
                href="mailto:varunm.work1@gmail.com"
                className="transition-colors hover:text-white/60"
              >
                varunm.work1@gmail.com
              </a>
              {" · "}
              <a
                href="https://linkedin.com/in/varun-m-78a106294"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white/60"
              >
                linkedin.com/in/varun-m-78a106294
              </a>
            </motion.p>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="mt-7 max-w-xl text-lg leading-relaxed text-white/65"
            >
              I&apos;m Varun — a Senior SDET with nearly seven years of
              professional testing since 2019, and just as long teaching.
              I build automation that catches what people miss, and I&apos;ve
              never stopped explaining how.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="mt-9 flex flex-wrap gap-4"
            >
              <MagneticButton href="/sdet" variant="solid">
                View Work
              </MagneticButton>
              <MagneticButton href="/resume" variant="ghost">
                Résumé
              </MagneticButton>
            </motion.div>
          </div>
        </section>

        {/* ── METRICS BAND ─────────────────────────────────────────────── */}
        <section id="metrics" className="relative py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:grid-cols-6 lg:gap-2">
              {METRICS.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-sm px-4 py-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] transition-colors hover:border-white/20"
                >
                  <div
                    style={{ fontFamily: "var(--font-serif)" }}
                    className="text-3xl font-semibold text-[#D8B450] sm:text-4xl"
                  >
                    <Counter
                      to={m.to}
                      prefix={"prefix" in m ? m.prefix : ""}
                      suffix={m.suffix}
                      locale={"locale" in m ? m.locale : false}
                    />
                  </div>
                  <p className="mt-1.5 text-xs leading-snug text-white/50">{m.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CAREER SNAPSHOT ──────────────────────────────────────────── */}
        <section id="career" className="relative py-20">
          <div className="mx-auto max-w-6xl px-6">
            {/* Dark halo behind section heading */}
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-6 -top-4 bottom-0 rounded-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 60% at 30% 30%, rgba(10,14,23,0.55) 0%, transparent 80%)",
                }}
              />
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7 }}
                style={{ fontFamily: "var(--font-serif)" }}
                className="relative mb-10 text-4xl tracking-tight sm:text-5xl"
              >
                Two careers,{" "}
                <span className="italic text-[#D8B450]">one philosophy.</span>
              </motion.h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {CAREER_CARDS.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.12 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-sm p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_4px_24px_rgba(0,0,0,0.25)] transition-colors hover:border-white/20"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: `${card.accent}22`, color: card.accent }}
                    >
                      {card.icon}
                    </div>
                    <h3
                      style={{ fontFamily: "var(--font-serif)" }}
                      className="text-xl font-semibold"
                    >
                      {card.title}
                    </h3>
                  </div>
                  <p className="mb-5 text-sm leading-relaxed text-white/60">
                    {card.body}
                  </p>
                  <ul className="space-y-2">
                    {card.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-xs text-white/45">
                        <span
                          className="mt-1 h-1 w-1 shrink-0 rounded-full"
                          style={{ background: card.accent }}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT GLANCE ─────────────────────────────────────────────── */}
        <section id="about" className="relative py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid items-center gap-14 md:grid-cols-2">
              {/* Photo placeholder */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8 }}
                className="mx-auto w-full max-w-xs md:mx-0"
              >
                <div className="aspect-[3/4] w-full rounded-2xl border border-white/10 bg-white/[0.04] flex flex-col items-center justify-center gap-3 text-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span className="text-xs tracking-wide">Photo coming soon</span>
                </div>
              </motion.div>

              {/* Bio */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="relative"
              >
                {/* Dark halo behind bio text */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-6 rounded-2xl"
                  style={{
                    background:
                      "radial-gradient(ellipse 90% 90% at 60% 50%, rgba(10,14,23,0.5) 0%, transparent 85%)",
                  }}
                />
                <p className="relative mb-3 text-xs uppercase tracking-[0.22em] text-[#38BDF8]">
                  About
                </p>
                <h2
                  style={{ fontFamily: "var(--font-serif)" }}
                  className="relative mb-5 text-4xl tracking-tight sm:text-5xl"
                >
                  From the classroom
                  <br />
                  <span className="italic text-[#D8B450]">to the codebase.</span>
                </h2>
                <p className="relative mb-4 text-base leading-relaxed text-white/60">
                  Nearly seven years in quality engineering since 2019 — across
                  cybersecurity, banking, fintech, logistics, and edtech. For most of
                  that time I was also in classrooms: teaching 30,000+ students to
                  test software at QSpider while building automation frameworks
                  professionally. Not one after the other — both at once.
                </p>
                <p className="relative mb-8 text-base leading-relaxed text-white/60">
                  Today I&apos;m a Senior SDET at Cyware Labs, working on
                  Python/Pytest suites and CI pipelines for cybersecurity products.
                  I&apos;ve added AI-assisted testing to the mix — Claude, Cursor,
                  Gemini, Jira Rovo — and I still explain everything I build.
                </p>
                <MagneticButton href="/contact" variant="solid">
                  Get in touch
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CTA STRIP ────────────────────────────────────────────────── */}
        <section id="cta" className="relative py-20 border-t border-b border-white/[0.07]">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#D8B450]/[0.04] via-transparent to-[#38BDF8]/[0.04]" />
          {/* Dark halo for CTA text legibility */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 55% 80% at 50% 50%, rgba(10,14,23,0.55) 0%, transparent 85%)",
            }}
          />
          <div className="relative mx-auto max-w-6xl px-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              style={{ fontFamily: "var(--font-serif)" }}
              className="mb-3 text-4xl tracking-tight sm:text-5xl"
            >
              Ready to build{" "}
              <span className="italic text-[#D8B450]">dependable?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mx-auto mb-9 max-w-md text-white/55"
            >
              Explore my engineering work, or grab a copy of my résumé.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <MagneticButton href="/sdet" variant="solid">
                View Work →
              </MagneticButton>
              <MagneticButton href="/resume" variant="ghost">
                Résumé
              </MagneticButton>
            </motion.div>
          </div>
        </section>

        {/* Existing quality-content sections */}
        <PhilosophySection />
        <TechStack />

        {/* ── CONTACT ──────────────────────────────────────────────────── */}
        <section id="contact" className="relative py-28">
          {/* Dark halo for contact CTA text */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 70% at 50% 50%, rgba(10,14,23,0.50) 0%, transparent 80%)",
            }}
          />
          <div className="relative mx-auto max-w-6xl px-6 text-center">
            <h2
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-4xl tracking-tight sm:text-5xl"
            >
              Let&apos;s build something{" "}
              <span className="italic text-[#D8B450]">dependable.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-white/55">
              Open to conversations about quality engineering, automation, and
              training.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <MagneticButton href="mailto:varunm.work1@gmail.com" variant="solid">
                Email me
              </MagneticButton>
              <MagneticButton
                href="https://linkedin.com/in/varun-m-78a106294"
                variant="ghost"
              >
                LinkedIn
              </MagneticButton>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
