"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { motion, animate } from "framer-motion";

const BRASS = "#D8B450";
const CYAN = "#38BDF8";
const TEXT = "rgba(236,231,221,0.65)";

/* ── Simple CTA link ────────────────────────────────────────────────────── */
function PageLink({
  href,
  children,
  variant = "ghost",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#D8B450]/70 active:scale-95";
  const skin =
    variant === "solid"
      ? "bg-[#D8B450] text-[#0A0E17] hover:bg-[#e8c96a]"
      : "border border-white/15 text-[#ECE7DD] hover:border-[#D8B450]/60 hover:text-white";
  return (
    <a href={href} className={`${base} ${skin}`}>
      {children}
    </a>
  );
}

/* ── Count-up number ────────────────────────────────────────────────────── */
function Counter({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fired = useRef(false);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          io.disconnect();
          animate(0, to, {
            duration: 1.8,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => setVal(v),
          });
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {prefix}
      {Math.round(val)}
      {suffix}
    </span>
  );
}

/* ── Data ───────────────────────────────────────────────────────────────── */

const TIMELINE = [
  {
    company: "Cyware Labs",
    role: "Senior SDET",
    period: "Feb 2025 — Present",
    client: null as string | null,
    current: true,
    bullets: [
      "Built Python/Pytest automation suites for a cybersecurity product suite from the ground up",
      "Reduced full regression runtime by ~60% through parallelisation and smart test isolation",
      "Embedded coverage into CI/CD pipelines — near-zero false-positive rate across releases",
      "Received the Above & Beyond award, presented jointly by the CEO and CTO",
    ],
  },
  {
    company: "OpenText",
    role: "QA Engineer",
    period: "Jun 2024 — Jan 2025",
    client: "Toyota · Japan logistics",
    current: false,
    bullets: [
      "End-to-end QA for a Toyota logistics platform serving the Japanese market",
      "API and UI regression testing across high-stakes fortnightly release cycles",
      "Contributed to pipeline stability improvements through data-isolation strategies",
    ],
  },
  {
    company: "Aspire Systems",
    role: "QA Automation Engineer",
    period: "Jul 2023 — May 2024",
    client: "Banking / FinTech · Malaysia",
    current: false,
    bullets: [
      "Java / Selenium / TestNG automation for a banking and fintech platform serving the Malaysian market",
      "Designed regression and sanity suites from scratch for a greenfield engagement",
      "Collaborated directly with client QA leads across time zones",
    ],
  },
  {
    company: "QSpider / JSpider",
    role: "Test Engineer · SQL Trainer · Branch Head",
    period: "Aug 2019 — Jun 2023",
    client: null as string | null,
    current: false,
    bullets: [
      "Concurrent roles: practising test engineer while teaching SQL and QA to live batches simultaneously",
      "Trained 30,000+ students across classroom and recorded programmes in Manual QA, Selenium, and SQL",
      "Promoted to Branch Head, Mumbai — founded and led a 22-member technical team",
      "Covered manual testing, Selenium WebDriver, SQL for testers, and interview-readiness coaching",
    ],
  },
];

const ACHIEVEMENTS = [
  {
    title: "Above & Beyond Award",
    body: "Presented jointly by the CEO and CTO of Cyware Labs — for impact that exceeded the expectations of the role.",
    accent: BRASS,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    title: "H-1B Approved through 2028",
    body: "US work authorisation approved and valid through 2028, enabling engagements with US-headquartered clients.",
    accent: CYAN,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
];

const SKILLS = [
  {
    group: "Automation",
    accent: BRASS,
    items: ["Python", "Pytest", "Selenium", "Playwright", "REST API"],
  },
  {
    group: "CI / CD",
    accent: CYAN,
    items: ["Jenkins", "GitHub Actions", "Docker"],
  },
  {
    group: "Cloud & Tools",
    accent: "#8A93A3",
    items: ["AWS", "Jira", "Git"],
  },
];

const IMPACT = [
  { to: 60, prefix: "~", suffix: "%", label: "regression cut" },
  { to: 40, prefix: "~", suffix: "%", label: "CI flakiness cut" },
  { to: 400, prefix: "",  suffix: "+", label: "tests automated" },
  { to: 7,   prefix: "",  suffix: "+", label: "years in quality" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

/* ── Page ───────────────────────────────────────────────────────────────── */
export default function SdetContent() {
  return (
    <main className="relative z-10 min-h-screen pt-24">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 60% at 92% 15%, rgba(216,180,80,0.1), transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="mb-5 text-xs uppercase tracking-[0.28em]"
            style={{ fontFamily: "var(--font-mono)", color: BRASS }}
          >
            Software · SDET
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            style={{ fontFamily: "var(--font-serif)" }}
            className="max-w-3xl text-5xl font-semibold leading-[1.0] tracking-tight sm:text-6xl lg:text-7xl"
          >
            I build automation
            <br />
            <span style={{ color: BRASS }} className="italic">
              that scales.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 max-w-xl text-lg leading-relaxed"
            style={{ color: TEXT }}
          >
            Senior SDET at Cyware Labs — building Python/Pytest frameworks and
            CI pipelines for cybersecurity products. Nearly seven years across
            cybersecurity, banking, fintech, logistics, and edtech, all under
            Test Yantra Software Solutions since 2019.
          </motion.p>
        </div>
      </section>

      {/* ── ROLE TIMELINE ─────────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: "var(--font-serif)" }}
            className="mb-3 text-4xl tracking-tight sm:text-5xl"
          >
            Experience
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12 text-xs text-white/35"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            All positions under Test Yantra Software Solutions Pvt. Ltd. (Aug 2019 — Present)
          </motion.p>

          <div className="relative">
            {/* Vertical guide line */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-3 top-3 w-px"
              style={{
                bottom: "2.5rem",
                background:
                  "linear-gradient(to bottom, rgba(216,180,80,0.45), rgba(255,255,255,0.06))",
              }}
            />

            {TIMELINE.map((role, i) => (
              <motion.div
                key={role.company}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: i * 0.12 }}
                className="relative flex gap-8 pb-14 last:pb-0"
              >
                {/* Dot */}
                <div className="shrink-0">
                  <div
                    className="mt-1 flex h-7 w-7 items-center justify-center rounded-full border bg-[#0A0E17]"
                    style={{
                      borderColor: role.current
                        ? BRASS
                        : "rgba(255,255,255,0.15)",
                      boxShadow: role.current
                        ? `0 0 14px ${BRASS}55`
                        : "none",
                    }}
                  >
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ background: role.current ? BRASS : "#8A93A3" }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <div className="mb-1 flex flex-wrap items-center gap-3">
                    <span
                      style={{ fontFamily: "var(--font-serif)" }}
                      className="text-2xl font-semibold"
                    >
                      {role.company}
                    </span>
                    {role.current && (
                      <span
                        className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                        style={{
                          border: `1px solid ${BRASS}55`,
                          color: BRASS,
                          background: `${BRASS}18`,
                        }}
                      >
                        Current
                      </span>
                    )}
                  </div>
                  <div className="mb-1.5 flex flex-wrap items-center gap-2 text-sm">
                    <span style={{ color: CYAN }}>{role.role}</span>
                    <span className="text-white/30">·</span>
                    <span className="text-white/45">{role.period}</span>
                  </div>
                  {role.client && (
                    <p
                      className="mb-3 text-xs text-white/35"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {role.client}
                    </p>
                  )}
                  <ul className="space-y-2.5">
                    {role.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-sm leading-relaxed"
                        style={{ color: "rgba(236,231,221,0.6)" }}
                      >
                        <span
                          aria-hidden
                          className="mt-[6px] h-1 w-1 shrink-0 rounded-full"
                          style={{ background: `${BRASS}80` }}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ──────────────────────────────────────────── */}
      <section className="py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {ACHIEVEMENTS.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
              >
                <div
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: `${a.accent}1a`, color: a.accent }}
                >
                  {a.icon}
                </div>
                <div>
                  <p className="mb-1 text-sm font-semibold text-white/90">{a.title}</p>
                  <p className="text-xs leading-relaxed text-white/50">{a.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS GRID ───────────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: "var(--font-serif)" }}
            className="mb-10 text-4xl tracking-tight sm:text-5xl"
          >
            Toolkit
          </motion.h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SKILLS.map((group, i) => (
              <motion.div
                key={group.group}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm"
              >
                <div className="mb-4 flex items-center gap-2">
                  <div
                    className="h-px w-5"
                    style={{ background: group.accent }}
                  />
                  <span
                    className="text-xs font-medium uppercase tracking-widest"
                    style={{ color: group.accent }}
                  >
                    {group.group}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md px-3 py-1.5 text-sm"
                      style={{
                        border: `1px solid ${group.accent}35`,
                        background: `${group.accent}0d`,
                        color: "rgba(236,231,221,0.8)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPACT NUMBERS ────────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: "var(--font-serif)" }}
            className="mb-10 text-4xl tracking-tight sm:text-5xl"
          >
            By the numbers
          </motion.h2>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {IMPACT.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-8 text-center backdrop-blur-sm"
              >
                <div
                  style={{ fontFamily: "var(--font-serif)", color: BRASS }}
                  className="text-4xl font-semibold sm:text-5xl"
                >
                  <Counter to={m.to} prefix={m.prefix} suffix={m.suffix} />
                </div>
                <p className="mt-2 text-xs text-white/50">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.07] py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: "var(--font-serif)" }}
            className="mb-4 text-3xl tracking-tight sm:text-4xl"
          >
            There&apos;s more to the story.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mb-8 max-w-sm"
            style={{ color: TEXT }}
          >
            Before the frameworks, there were 30,000 students.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <PageLink href="/training" variant="solid">
              See my training work →
            </PageLink>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
