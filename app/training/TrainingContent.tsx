"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { motion, animate } from "framer-motion";
import Image from "next/image";

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

/* ── Shared section-heading halo ────────────────────────────────────────── */
function SectionHalo({ children }: { children: ReactNode }) {
  return (
    <div className="relative mb-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-6 -top-6 bottom-0 rounded-3xl"
        style={{
          background:
            "radial-gradient(ellipse 75% 100% at 30% 30%, rgba(10,14,23,0.65) 0%, transparent 80%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ── Data ───────────────────────────────────────────────────────────────── */

const STATS = [
  { to: 30000, prefix: "", suffix: "+", label: "students reached", locale: true },
  { to: 22, prefix: "", suffix: "", label: "member branch founded" },
  { to: 4, prefix: "", suffix: "", label: "subjects taught" },
];

/* Real training photos from /public/assets/ — captions from README.txt */
const TRAINING_PHOTOS = [
  { src: "/assets/training-whiteboard-sqlking.webp",   alt: "Whiteboard reading \"SQL KING VARUN SIR\" — written by students" },
  { src: "/assets/training-whiteboard-missu.webp",     alt: "Whiteboard reading \"We Will Miss U / Best Teacher\" — student farewell" },
  { src: "/assets/training-whiteboard-birthday.webp",  alt: "Whiteboard reading \"Happy Birthday SQL King\" — student celebration" },
  { src: "/assets/training-student-sketches.webp",     alt: "Student pencil sketches of Varun as a trainer" },
  { src: "/assets/training-batch-lecturehall.webp",    alt: "Large lecture-hall batch — showing the scale of training" },
  { src: "/assets/training-batch-group.webp",          alt: "Batch group photo — students seated" },
  { src: "/assets/training-students-filming.webp",     alt: "Students filming the training session on their phones" },
  { src: "/assets/training-celebration.webp",          alt: "Batch celebration — crowd of students" },
  { src: "/assets/training-selfie-group.webp",         alt: "Selfie with a group of students after class" },
  { src: "/assets/training-institute-feature.webp",    alt: "Institute feature poster — QSpider / JSpider" },
  { src: "/assets/training-batch-classroom.webp",      alt: "Training batch" },
  { src: "/assets/training-batch-selfie.webp",         alt: "Selfie with a batch" },
  { src: "/assets/training-batch-women.webp",          alt: "Training batch" },
  { src: "/assets/training-seminar-hall.webp",         alt: "Seminar crowd" },
  { src: "/assets/training-seminar-selfie.webp",       alt: "Seminar session" },
  { src: "/assets/training-mega-batch.webp",           alt: "Large training batch" },
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

/*
 * Reels created by students.
 * TODO: swap these Instagram URLs for self-hosted MP4 inline players once
 * videos are uploaded. Replace <a> with a <video controls> tag per reel.
 */
const STUDENT_REELS = [
  { url: "https://www.instagram.com/reel/CUSHYQDpuz1/",                                     label: "Student Reel — Batch 2021",       accent: BRASS },
  { url: "https://www.instagram.com/reel/Ca1Fq94piEW/",                                     label: "Student Reel — Selenium Demo",    accent: CYAN  },
  { url: "https://www.instagram.com/reel/Cd2PDscJPc4/",                                     label: "Student Reel — SQL Session",      accent: BRASS },
  { url: "https://www.instagram.com/reel/CX7z6FeDBpI21tdaL0jdhE8lLwnLX7llq_4hD80/",       label: "Student Reel — Batch Celebration", accent: CYAN  },
  { url: "https://www.instagram.com/tv/CW0SOxUJBIh/",                                       label: "Student TV — Live Session",       accent: BRASS },
  { url: "https://www.instagram.com/reel/COx3-HoAqmYNd8HjnN0po1OL-sU4JVRM3Rm2xc0/",      label: "Student Reel — Interview Prep",   accent: CYAN  },
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
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 90% at 20% 50%, rgba(10,14,23,0.75) 0%, transparent 80%)",
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
              Taught over the years,
            </span>
            <br />
            one batch at a time.
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
            className="rounded-2xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] sm:p-10"
          >
            <div className="mb-3 h-px w-10" style={{ background: BRASS }} />
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
                className="rounded-xl border border-white/10 bg-white/[0.06] px-6 py-8 text-center backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]"
              >
                <div style={{ fontFamily: "var(--font-serif)", color: BRASS }} className="text-5xl font-semibold">
                  <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} locale={s.locale} />
                </div>
                <p className="mt-2 text-sm text-white/50">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRAINING PHOTO GALLERY ─────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHalo>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-4xl tracking-tight sm:text-5xl"
            >
              Moments from the room.
            </motion.h2>
          </SectionHalo>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {TRAINING_PHOTOS.map((photo, i) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all hover:border-white/25 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                {/* Hover overlay with alt caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17]/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <p className="absolute bottom-3 inset-x-3 text-xs leading-snug text-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {photo.alt}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT I TAUGHT ─────────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHalo>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-4xl tracking-tight sm:text-5xl"
            >
              What I taught
            </motion.h2>
          </SectionHalo>

          <div className="grid gap-4 sm:grid-cols-2">
            {SUBJECTS.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.65, delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_4px_20px_rgba(0,0,0,0.2)] transition-colors hover:border-white/20"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-px w-5 shrink-0" style={{ background: s.accent }} />
                  <h3 style={{ fontFamily: "var(--font-serif)", color: s.accent }} className="text-xl font-semibold">
                    {s.name}
                  </h3>
                </div>
                <p className="mb-4 text-sm leading-relaxed" style={{ color: TEXT }}>{s.desc}</p>
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

      {/* ── STUDENT REELS ─────────────────────────────────────────── */}
      {/*
       * Reels created by students — static thumbnail cards opening Instagram in a new tab.
       * TODO: swap Instagram URLs for self-hosted MP4 inline <video> players
       * once videos are uploaded to /public/assets/.
       */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHalo>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                style={{ fontFamily: "var(--font-serif)" }}
                className="text-4xl tracking-tight sm:text-5xl"
              >
                Reels created by{" "}
                <span className="italic" style={{ color: BRASS }}>my students.</span>
              </h2>
              <p className="mt-3 text-sm text-white/45">
                Students made these to capture what they learned — click any card to watch on Instagram.
              </p>
            </motion.div>
          </SectionHalo>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {STUDENT_REELS.map((reel, i) => (
              <motion.a
                key={reel.url}
                href={reel.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch: ${reel.label} (opens Instagram in a new tab)`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative flex aspect-[9/16] flex-col items-center justify-center overflow-hidden rounded-2xl border backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_4px_24px_rgba(0,0,0,0.3)] transition-all duration-200 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_8px_32px_rgba(0,0,0,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8B450]/70"
                style={{
                  borderColor: `${reel.accent}40`,
                  background: "linear-gradient(135deg, rgba(216,180,80,0.22) 0%, rgba(56,189,248,0.12) 100%)",
                }}
              >
                {/* Accent top bar */}
                <div
                  className="absolute top-0 inset-x-0 h-[2px] rounded-t-2xl opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, ${BRASS}, ${CYAN})` }}
                />

                {/* Play icon */}
                <div
                  className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-200 group-hover:scale-110"
                  style={{
                    borderColor: "rgba(216,180,80,0.45)",
                    background: "rgba(216,180,80,0.12)",
                    color: BRASS,
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>

                {/* Label */}
                <p
                  className="px-4 text-center text-xs font-medium leading-snug transition-colors duration-200 group-hover:text-white"
                  style={{ color: "rgba(236,231,221,0.75)" }}
                >
                  {reel.label}
                </p>

                {/* Watch on Instagram */}
                <p
                  className="mt-2 px-4 text-center text-[10px] font-medium tracking-wide transition-opacity duration-200 opacity-50 group-hover:opacity-80"
                  style={{ color: CYAN }}
                >
                  Watch on Instagram ↗
                </p>
              </motion.a>
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
            <PageLink href="/contact" variant="solid">Get in touch</PageLink>
            <PageLink href="/sdet" variant="ghost">← Engineering work</PageLink>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
