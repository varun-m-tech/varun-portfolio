"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

const BRASS = "#D8B450";
const CYAN = "#38BDF8";
const TEXT = "rgba(236,231,221,0.65)";

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

function DownloadIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden>
      <path
        fillRule="evenodd"
        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* ── Data ──────────────────────────────────────────────────────────── */

const SKILLS_GROUPS = [
  {
    group: "Languages",
    accent: BRASS,
    items: ["Python", "Java", "SQL", "JavaScript"],
  },
  {
    group: "Automation",
    accent: CYAN,
    items: ["Pytest", "Selenium", "Playwright", "TestNG", "REST API"],
  },
  {
    group: "CI / Cloud",
    accent: "#8A93A3",
    items: ["Jenkins", "GitHub Actions", "Docker", "AWS EC2", "Kubernetes"],
  },
  {
    group: "Tools",
    accent: BRASS,
    items: ["Jira", "Git", "Postman", "Allure", "BDD / Gherkin"],
  },
];

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
      "Concurrent roles: practising test engineer while teaching SQL and QA to live batches",
      "Trained 30,000+ students across classroom and recorded programmes in Manual QA, Selenium, and SQL",
      "Promoted to Branch Head, Mumbai — founded and led a 22-member technical team",
      "Covered manual testing, Selenium WebDriver, SQL for testers, and interview-readiness coaching",
    ],
  },
];

const ACHIEVEMENTS: {
  title: string;
  body: string;
  accent: string;
  icon: ReactNode;
}[] = [
  {
    title: "Above & Beyond Award",
    body: "Presented jointly by the CEO and CTO of Cyware Labs — for impact that exceeded the expectations of the role.",
    accent: BRASS,
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
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
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
];

/* ── Section label ─────────────────────────────────────────────────── */
function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p
      className="mb-5 text-xs font-medium uppercase tracking-[0.22em]"
      style={{ color: BRASS, fontFamily: "var(--font-mono)" }}
    >
      {children}
    </p>
  );
}

/* ── Page ──────────────────────────────────────────────────────────── */
export default function ResumeContent() {
  return (
    <main className="relative z-10 min-h-screen pt-24">

      {/* ── HERO ─────────────────────────────────────────────────── */}
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
            Résumé
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            style={{ fontFamily: "var(--font-serif)" }}
            className="max-w-3xl text-5xl font-semibold leading-[1.0] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Varun M —
            <br />
            <span style={{ color: BRASS }} className="italic">
              Senior SDET.
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
            7+ years across cybersecurity, banking, fintech, logistics, and
            edtech. Bengaluru, India.
          </motion.p>

          {/* Download buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="/Varun-M-Resume.pdf"
              download="Varun-M-Resume.pdf"
              className="inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-medium transition-opacity hover:opacity-90 active:scale-95"
              style={{ background: BRASS, color: "#0A0E17" }}
            >
              <DownloadIcon />
              Download PDF
            </a>
            <a
              href="/Varun-M-Resume.docx"
              download="Varun-M-Resume.docx"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-8 py-3.5 text-sm text-text transition-colors hover:border-[#D8B450]/60 hover:text-white active:scale-95"
            >
              <DownloadIcon />
              Download DOCX
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── INLINE PREVIEW ───────────────────────────────────────── */}
      <section className="pb-28">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-2xl border border-white/[0.1] bg-surface"
          >

            {/* Resume header */}
            <div
              className="border-b border-white/[0.08] px-8 py-8 sm:px-12"
              style={{
                background:
                  "linear-gradient(135deg, rgba(216,180,80,0.07) 0%, transparent 60%)",
              }}
            >
              <h2
                style={{ fontFamily: "var(--font-serif)" }}
                className="text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                Varun M
              </h2>
              <p className="mt-1 text-sm font-medium" style={{ color: BRASS }}>
                Senior SDET · QA Automation Engineer
              </p>
              <div
                className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-white/40"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <span>Bengaluru, India</span>
                <span>varunm.work1@gmail.com</span>
                <span>linkedin.com/in/varun-m-78a106294</span>
              </div>
            </div>

            <div className="divide-y divide-white/[0.06] px-8 sm:px-12">

              {/* Summary */}
              <div className="py-8">
                <SectionLabel>Summary</SectionLabel>
                <p className="text-sm leading-relaxed" style={{ color: TEXT }}>
                  Senior SDET and QA Automation Engineer with 7+ years across
                  cybersecurity, banking, fintech, logistics, and edtech. All
                  positions since August 2019 under Test Yantra Software
                  Solutions Pvt. Ltd. Specialist in Python/Pytest and
                  Java/Selenium automation frameworks, CI/CD pipeline
                  integration, and shift-left quality practices. Former
                  classroom trainer and Branch Head who brought 30,000+
                  students through Manual QA, Selenium, and SQL programmes.
                  H-1B approved through 2028. Above &amp; Beyond Award
                  recipient at Cyware Labs.
                </p>
              </div>

              {/* Skills */}
              <div className="py-8">
                <SectionLabel>Skills</SectionLabel>
                <div className="space-y-4">
                  {SKILLS_GROUPS.map((group) => (
                    <div key={group.group} className="flex flex-wrap items-start gap-y-2">
                      <span
                        className="mr-4 mt-0.5 shrink-0 text-xs font-medium"
                        style={{
                          color: group.accent,
                          fontFamily: "var(--font-mono)",
                          minWidth: "6.5rem",
                        }}
                      >
                        {group.group}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {group.items.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md px-2.5 py-1 text-xs"
                            style={{
                              border: `1px solid ${group.accent}30`,
                              background: `${group.accent}0d`,
                              color: "rgba(236,231,221,0.8)",
                              fontFamily: "var(--font-mono)",
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="py-8">
                <SectionLabel>Experience</SectionLabel>
                <p
                  className="mb-7 text-xs text-white/30"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  All positions under Test Yantra Software Solutions Pvt. Ltd.
                  (Aug 2019 — Present)
                </p>

                <div className="relative">
                  {/* Timeline guide line */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute left-2.5 top-3 w-px"
                    style={{
                      bottom: "2rem",
                      background:
                        "linear-gradient(to bottom, rgba(216,180,80,0.45), rgba(255,255,255,0.05))",
                    }}
                  />

                  {TIMELINE.map((role) => (
                    <div
                      key={role.company + role.period}
                      className="relative flex gap-7 pb-10 last:pb-0"
                    >
                      {/* Dot */}
                      <div className="shrink-0">
                        <div
                          className="mt-1 flex h-6 w-6 items-center justify-center rounded-full border bg-surface"
                          style={{
                            borderColor: role.current
                              ? BRASS
                              : "rgba(255,255,255,0.15)",
                            boxShadow: role.current
                              ? `0 0 12px ${BRASS}50`
                              : "none",
                          }}
                        >
                          <div
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: role.current ? BRASS : "#8A93A3" }}
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="mb-0.5 flex flex-wrap items-center gap-2">
                          <span
                            style={{ fontFamily: "var(--font-serif)" }}
                            className="text-lg font-semibold"
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
                        <div className="mb-1.5 flex flex-wrap items-center gap-2 text-xs">
                          <span style={{ color: CYAN }}>{role.role}</span>
                          <span className="text-white/25">·</span>
                          <span className="text-white/40">{role.period}</span>
                        </div>
                        {role.client && (
                          <p
                            className="mb-2.5 text-xs text-white/30"
                            style={{ fontFamily: "var(--font-mono)" }}
                          >
                            {role.client}
                          </p>
                        )}
                        <ul className="space-y-2">
                          {role.bullets.map((b) => (
                            <li
                              key={b}
                              className="flex items-start gap-2 text-xs leading-relaxed"
                              style={{ color: "rgba(236,231,221,0.55)" }}
                            >
                              <span
                                aria-hidden
                                className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                                style={{ background: `${BRASS}70` }}
                              />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="py-8">
                <SectionLabel>Achievements</SectionLabel>
                <div className="grid gap-3 sm:grid-cols-2">
                  {ACHIEVEMENTS.map((a) => (
                    <div
                      key={a.title}
                      className="flex items-start gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] p-5"
                    >
                      <div
                        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                        style={{
                          background: `${a.accent}1a`,
                          color: a.accent,
                        }}
                      >
                        {a.icon}
                      </div>
                      <div>
                        <p className="mb-1 text-sm font-semibold text-white/90">
                          {a.title}
                        </p>
                        <p className="text-xs leading-relaxed text-white/50">
                          {a.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
