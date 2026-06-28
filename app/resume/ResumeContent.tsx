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

/* ── Data ──────────────────────────────────────────────────────────── */

/* Real skills only — no invented tools */
const SKILLS_GROUPS = [
  {
    group: "Languages",
    accent: BRASS,
    items: ["Python", "Java", "SQL"],
  },
  {
    group: "Automation",
    accent: CYAN,
    items: ["Pytest", "Selenium WebDriver", "TestNG", "Page Object Model", "RestAssured", "Hybrid Framework", "Data-Driven Framework"],
  },
  {
    group: "API & Validation",
    accent: "#8A93A3",
    items: ["REST API", "Postman", "OpenAPI / Swagger", "JSON Validation"],
  },
  {
    group: "CI / CD & Infra",
    accent: BRASS,
    items: ["Jenkins", "Bitbucket Pipelines", "Allure", "Git", "Docker", "AWS EC2", "Kubernetes (basics)", "Argo CD (basics)"],
  },
  {
    group: "Testing Types",
    accent: CYAN,
    items: ["Functional", "Regression", "Sanity", "Integration", "System", "Cross-browser", "Mobile (iOS & Android)", "API", "Email"],
  },
  {
    group: "AI & Agile",
    accent: "#8A93A3",
    items: ["AI-assisted QE", "Claude", "Cursor", "Gemini", "Jira Rovo", "Agile / Scrum", "JIRA", "Confluence"],
  },
];

const TIMELINE = [
  {
    company: "Cyware Labs",
    role: "Senior SDET",
    period: "Feb 2025 — Present",
    client: "Cybersecurity SaaS · CSAP platform",
    current: true,
    bullets: [
      "End-to-end QA across UI, REST/OpenAPI, and mobile (iOS & Android) for a cybersecurity SaaS platform",
      "Built Python/Pytest/Selenium automation suites from the ground up; drove quarterly release regression cycles",
      "~60% regression runtime reduction through parallel execution and smart test isolation",
      "Integrated Docker stack for local test environments; applied K8s and Argo CD basics for deployment awareness",
      "Led full website-revamp QA — validated against Figma designs, automated broken-link detection, partnered with design/marketing/CEO; received the Above & Beyond award (CEO + CTO)",
      "Embedded AI-assisted QE end-to-end using Claude, Cursor, Gemini, and Jira Rovo",
      "Implemented MFA and central-platform test stories; resolved customer-facing issues end-to-end including email testing",
      "2-week Agile sprints using JIRA, Confluence, and Bitbucket Pipelines",
    ],
  },
  {
    company: "OpenText",
    role: "QA Engineer",
    period: "Jun 2024 — Jan 2025",
    client: "Logistics · Toyota · Japan",
    current: false,
    bullets: [
      "Gathered requirements directly with the Japan-based product team for Toyota's logistics platform",
      "Authored test plans and test cases; executed Japanese-locale UI testing across browsers and devices",
      "Conducted knowledge-transfer (KT) sessions to on-board new QA resources",
      "Recognised by dev, product, and QA managers for delivery quality and cross-cultural communication",
    ],
  },
  {
    company: "Aspire Systems",
    role: "QA Automation Engineer",
    period: "Jul 2023 — May 2024",
    client: "Banking / FinTech · Malaysia",
    current: false,
    bullets: [
      "Designed Java/Selenium/TestNG hybrid framework — ~70% automated, ~30% manual coverage",
      "REST API validation alongside UI regression; integrated into Jenkins CI pipeline",
      "~40% CI flakiness reduction through improved test isolation and data-driven strategies",
      "Collaborated directly with client QA leads across Malaysia time zones",
    ],
  },
  {
    company: "QSpider / JSpider",
    role: "Test Engineer · SQL Trainer · Branch Head",
    period: "Aug 2019 — Jun 2023",
    client: "EdTech · QA Training",
    current: false,
    bullets: [
      "Concurrent roles: practising test engineer while teaching SQL, Manual Testing, and Java to morning, evening, and weekend batches simultaneously",
      "Tested the QSpider institute platform end-to-end — student, trainer, HR, counselling, fee, and attendance apps",
      "Trained 30,000+ students; ~90% batch completion rate; recognised by CEO for training impact",
      "Promoted to Branch Head, Mumbai — led 22-member team owning training delivery, placements, counselling, HR, sales targets, and college/BPO partnerships",
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
    body: "Presented jointly by the CEO and CTO of Cyware Labs — for leading full website-revamp QA and impact that exceeded expectations of the role.",
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
  {
    title: "30,000+ Students Trained",
    body: "~90% batch completion rate across SQL, Manual QA, and Selenium programmes. Recognised personally by the CEO of QSpider.",
    accent: BRASS,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "22-Member Branch Led",
    body: "Founded and led the Mumbai branch as Branch Head — overseeing training delivery, placements, counselling, HR, and sales.",
    accent: CYAN,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

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
        {/* Dark halo for hero text */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 85% at 20% 50%, rgba(10,14,23,0.65) 0%, transparent 80%)",
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
            Nearly 7 years across cybersecurity, banking, fintech, logistics, and
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
              className="inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-medium transition-opacity hover:opacity-90 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#D8B450]/70 outline-none"
              style={{ background: BRASS, color: "#0A0E17" }}
            >
              <DownloadIcon />
              Download PDF
            </a>
            <a
              href="/Varun-M-Resume.docx"
              download="Varun-M-Resume.docx"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-8 py-3.5 text-sm text-[#ECE7DD] transition-colors hover:border-[#D8B450]/60 hover:text-white active:scale-95 focus-visible:ring-2 focus-visible:ring-[#D8B450]/70 outline-none"
            >
              <DownloadIcon />
              Download DOCX
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── INLINE RESUME ──────────────────────────────────────────── */}
      <section className="pb-28">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_8px_40px_rgba(0,0,0,0.35)]"
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
                <a href="mailto:varunm.work1@gmail.com" className="hover:text-white/70 transition-colors">varunm.work1@gmail.com</a>
                <a href="https://linkedin.com/in/varun-m-78a106294" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">linkedin.com/in/varun-m-78a106294</a>
              </div>
            </div>

            <div className="divide-y divide-white/[0.06] px-8 sm:px-12">

              {/* Summary */}
              <div className="py-8">
                <SectionLabel>Summary</SectionLabel>
                <p className="text-sm leading-relaxed" style={{ color: TEXT }}>
                  Senior SDET and QA Automation Engineer with nearly 7 years across
                  cybersecurity, banking, fintech, logistics, and edtech. All
                  positions since August 2019 under Test Yantra Software
                  Solutions Pvt. Ltd. Specialist in Python/Pytest and
                  Java/Selenium/TestNG automation frameworks, REST/OpenAPI
                  validation, Jenkins CI/CD pipelines, and Docker environments.
                  Former classroom trainer and Branch Head who brought 30,000+
                  students through Manual QA, Selenium, and SQL programmes —
                  ~90% batch completion rate. AI-assisted QE practitioner
                  (Claude, Cursor, Gemini, Jira Rovo). H-1B approved through
                  2028. Above &amp; Beyond Award recipient at Cyware Labs.
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
                          minWidth: "7.5rem",
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
                          className="mt-1 flex h-6 w-6 items-center justify-center rounded-full border bg-[#0A0E17]"
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
                        <div className="mb-1 flex flex-wrap items-center gap-2 text-xs">
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

              {/* Education */}
              <div className="py-8">
                <SectionLabel>Education</SectionLabel>
                <div className="flex items-start gap-4">
                  <div
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: `${BRASS}1a`, color: BRASS }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white/90">Bachelor of Engineering (B.E.)</p>
                    <p className="mt-0.5 text-xs text-white/50">KSIT College, Bengaluru</p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
