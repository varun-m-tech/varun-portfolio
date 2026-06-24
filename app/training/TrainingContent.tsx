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
  locale = false,
}: {
  to: number;
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

  const display = locale
    ? Math.round(val).toLocaleString()
    : Math.round(val).toString();

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ── Data ───────────────────────────────────────────────────────────────── */

const STATS = [
  { to: 30000, prefix: "", suffix: "+", label: "students reached", locale: true },
  { to: 22, prefix: "", suffix: "", label: "member branch founded" },
  { to: 4, prefix: "", suffix: "", label: "subjects taught" },
];

const PHOTO_TILES = [
  {
    label: "Whiteboard session",
    sub: "Day 1 of a new batch",
    grad: "radial-gradient(ellipse at 40% 40%, rgba(216,180,80,0.18), rgba(10,14,23,0.95))",
  },
  {
    label: "First framework demo",
    sub: "Student milestone",
    grad: "radial-gradient(ellipse at 60% 60%, rgba(56,189,248,0.15), rgba(10,14,23,0.95))",
  },
  {
    label: "Live session recording",
    sub: "Recorded programme",
    grad: "radial-gradient(ellipse at 50% 30%, rgba(216,180,80,0.12), rgba(10,14,23,0.95))",
  },
  {
    label: "Mock interview prep",
    sub: "Interview readiness",
    grad: "radial-gradient(ellipse at 30% 70%, rgba(56,189,248,0.12), rgba(10,14,23,0.95))",
  },
  {
    label: "Batch farewell",
    sub: "End of programme",
    grad: "radial-gradient(ellipse at 70% 40%, rgba(216,180,80,0.2), rgba(10,14,23,0.95))",
  },
  {
    label: "Branch team",
    sub: "22-member team",
    grad: "radial-gradient(ellipse at 45% 55%, rgba(56,189,248,0.18), rgba(10,14,23,0.95))",
  },
];

const SUBJECTS = [
  {
    name: "Manual QA",
    accent: BRASS,
    desc: "Test case design, defect life cycles, SDLC/STLC fundamentals, and exploratory testing techniques.",
    tools: ["Test plans", "Bug reports", "Defect triage"],
  },
  {
    name: "Selenium WebDriver",
    accent: CYAN,
    desc: "Automation from the ground up — locators, waits, Page Object Model, and framework architecture.",
    tools: ["Java", "TestNG", "Page Object Model"],
  },
  {
    name: "SQL for Testers",
    accent: BRASS,
    desc: "Database fundamentals with a testing lens: queries, joins, stored procedures, and backend validation.",
    tools: ["SELECT / JOIN", "Stored procs", "DB validation"],
  },
  {
    name: "Interview Prep",
    accent: CYAN,
    desc: "Resume review, mock interviews, common QA interview patterns, and job search strategy for new engineers.",
    tools: ["Mock interviews", "Resume review", "Job strategy"],
  },
];

const TESTIMONIALS = [
  {
    quote:
      "The way Varun explains Selenium made me realise I'd been overcomplicating it for months. One session changed my entire approach to automation.",
    attr: "— Former student, Batch 2022",
  },
  {
    quote:
      "I came in knowing nothing about testing and left with a job offer. The practical focus — real scenarios, real bugs — made all the difference.",
    attr: "— QSpider student, 2021",
  },
  {
    quote:
      "His SQL sessions were unlike anything I'd attended. Always the 'why' behind the query, never just the syntax. That's a rare quality in a trainer.",
    attr: "— Student, JSpider",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

/* ── Page ───────────────────────────────────────────────────────────────── */
export default function TrainingContent() {
  return (
    <main className="relative z-10 min-h-screen pt-24">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 65% at 88% 20%, rgba(216,180,80,0.12), transparent 55%)," +
              "radial-gradient(ellipse 40% 40% at 10% 80%, rgba(56,189,248,0.07), transparent 55%)",
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
            From the classroom
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            style={{ fontFamily: "var(--font-serif)" }}
            className="max-w-3xl text-5xl font-semibold leading-[1.0] tracking-tight sm:text-6xl lg:text-7xl"
          >
            30,000+ students.
            <br />
            <span style={{ color: BRASS }} className="italic">
              One classroom
            </span>
            <br />
            at a time.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-7 max-w-xl text-lg leading-relaxed"
            style={{ color: TEXT }}
          >
            Teaching and engineering were never two separate careers for me — they
            ran in parallel. While I was building automation frameworks
            professionally, I was also in classrooms, turning complex testing
            concepts into things students could immediately use.
          </motion.p>
        </div>
      </section>

      {/* ── EMOTIONAL INTRO ───────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm sm:p-10"
          >
            <div
              className="mb-3 h-px w-10"
              style={{ background: BRASS }}
            />
            <p className="text-lg leading-relaxed" style={{ color: TEXT }}>
              The classroom taught me something no framework ever could: how to
              explain a problem to someone who&apos;s seeing it for the first time.
              That patience — breaking something down until the &ldquo;aha&rdquo;
              moment arrives — is the same patience I bring to every code review,
              every PR, and every pipeline I build.
            </p>
            <p className="mt-4 text-base leading-relaxed" style={{ color: "rgba(236,231,221,0.45)" }}>
              I didn&apos;t leave teaching behind. I brought it with me.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAND ────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-6 py-8 text-center backdrop-blur-sm"
              >
                <div
                  style={{ fontFamily: "var(--font-serif)", color: BRASS }}
                  className="text-5xl font-semibold"
                >
                  <Counter
                    to={s.to}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    locale={s.locale}
                  />
                </div>
                <p className="mt-2 text-sm text-white/50">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO / MEMORY GRID ───────────────────────────────────── */}
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
            Moments from the room.
          </motion.h2>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {PHOTO_TILES.map((tile, i) => (
              <motion.div
                key={tile.label}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10"
                style={{ background: tile.grad }}
              >
                {/* Camera icon */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/20 transition-colors duration-300 group-hover:text-white/35">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <span className="text-xs tracking-wide">{tile.label}</span>
                  <span
                    className="text-xs"
                    style={{ color: "rgba(236,231,221,0.3)" }}
                  >
                    {tile.sub}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="mt-4 text-xs text-white/30">
            Photos coming soon — these tiles reserve the layout.
          </p>
        </div>
      </section>

      {/* ── WHAT I TAUGHT ─────────────────────────────────────────── */}
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
            What I taught
          </motion.h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {SUBJECTS.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.65, delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="h-px w-5 shrink-0"
                    style={{ background: s.accent }}
                  />
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      color: s.accent,
                    }}
                    className="text-xl font-semibold"
                  >
                    {s.name}
                  </h3>
                </div>
                <p
                  className="mb-4 text-sm leading-relaxed"
                  style={{ color: TEXT }}
                >
                  {s.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tools.map((t) => (
                    <span
                      key={t}
                      className="rounded-md px-2.5 py-1 text-xs"
                      style={{
                        border: `1px solid ${s.accent}30`,
                        background: `${s.accent}0c`,
                        color: "rgba(236,231,221,0.7)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
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
            Student voices
          </motion.h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.65, delay: i * 0.1 }}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm"
              >
                {/* Opening quote mark */}
                <div
                  className="mb-4 font-serif text-4xl leading-none"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: `${BRASS}55`,
                  }}
                  aria-hidden
                >
                  &ldquo;
                </div>
                <p
                  className="flex-1 text-sm italic leading-relaxed"
                  style={{ color: "rgba(236,231,221,0.75)" }}
                >
                  {t.quote}
                </p>
                <p className="mt-5 text-xs text-white/35">{t.attr}</p>
              </motion.div>
            ))}
          </div>

          <p className="mt-4 text-xs text-white/30">
            Placeholder testimonials — real quotes to be added.
          </p>
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
            Want to talk about quality?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mb-8 max-w-sm"
            style={{ color: TEXT }}
          >
            Whether it&apos;s automation, training, or something in between — I&apos;m
            always up for a conversation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <PageLink href="/contact" variant="solid">
              Get in touch
            </PageLink>
            <PageLink href="/sdet" variant="ghost">
              ← Engineering work
            </PageLink>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
