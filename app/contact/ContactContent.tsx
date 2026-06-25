"use client";

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

const inputBase =
  "w-full rounded-lg border border-white/[0.12] bg-white/[0.04] px-4 py-3 text-sm text-text outline-none transition-colors duration-150 placeholder:text-white/25 focus:border-[#D8B450]/60 focus:bg-white/[0.06]";

export default function ContactContent() {
  return (
    <main className="relative z-10 min-h-screen pt-24">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 60% at 90% 15%, rgba(56,189,248,0.09), transparent 55%)," +
              "radial-gradient(ellipse 40% 45% at 10% 85%, rgba(216,180,80,0.07), transparent 55%)",
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
            Get in touch
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            style={{ fontFamily: "var(--font-serif)" }}
            className="max-w-3xl text-5xl font-semibold leading-[1.0] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Let&apos;s build something
            <br />
            <span style={{ color: BRASS }} className="italic">
              dependable.
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
            Open to conversations about quality engineering, automation
            architecture, and training. Based in Bengaluru — open to remote.
          </motion.p>
        </div>
      </section>

      {/* ── MAIN GRID ─────────────────────────────────────────────── */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-14 lg:grid-cols-[1fr_400px] lg:gap-16">

            {/* ── FORM ──────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <h2
                style={{ fontFamily: "var(--font-serif)" }}
                className="mb-8 text-3xl tracking-tight"
              >
                Send a message
              </h2>

              <form
                action="mailto:varunm.work1@gmail.com"
                method="POST"
                encType="text/plain"
                className="space-y-5"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.2em]"
                    style={{ color: BRASS, fontFamily: "var(--font-mono)" }}
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className={inputBase}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.2em]"
                    style={{ color: BRASS, fontFamily: "var(--font-mono)" }}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="your@email.com"
                    className={inputBase}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-medium uppercase tracking-[0.2em]"
                    style={{ color: BRASS, fontFamily: "var(--font-mono)" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={7}
                    required
                    placeholder="What's on your mind?"
                    className={`${inputBase} resize-y`}
                    style={{ minHeight: "9rem" }}
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full px-10 py-3.5 text-sm font-medium tracking-wide transition-all duration-200 active:scale-95 hover:opacity-90 sm:w-auto w-full"
                    style={{ background: BRASS, color: "#0A0E17" }}
                  >
                    Send message
                  </button>
                  <p
                    className="mt-3 text-xs text-white/30"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Opens your email client with the message pre-filled.
                  </p>
                </div>
              </form>
            </motion.div>

            {/* ── SIDEBAR ───────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="space-y-6"
            >
              <h2
                style={{ fontFamily: "var(--font-serif)" }}
                className="text-3xl tracking-tight"
              >
                Or reach directly
              </h2>

              {/* Email */}
              <a
                href="mailto:varunm.work1@gmail.com"
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-200 hover:border-[#D8B450]/40 hover:bg-white/[0.07]"
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: `${BRASS}18`, color: BRASS }}
                >
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
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 7 10-7" />
                  </svg>
                </div>
                <div>
                  <p
                    className="text-xs uppercase tracking-widest text-white/35"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Email
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-text">
                    varunm.work1@gmail.com
                  </p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/varun-m-78a106294"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-200 hover:border-[#38BDF8]/40 hover:bg-white/[0.07]"
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: `${CYAN}18`, color: CYAN }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <div>
                  <p
                    className="text-xs uppercase tracking-widest text-white/35"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    LinkedIn
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-text">
                    varun-m-78a106294
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <div className="mb-3 flex items-center gap-2.5">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: BRASS }}
                    aria-hidden
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span
                    className="text-xs uppercase tracking-widest text-white/35"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Location
                  </span>
                </div>
                <p className="text-base font-medium text-text">
                  Bengaluru, India
                </p>
                <p className="mt-1 text-sm" style={{ color: TEXT }}>
                  Open to remote · Available for hybrid
                </p>
              </div>

              <p
                className="text-xs leading-relaxed text-white/30"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Typically reply within 24 hours. For urgent enquiries, email
                directly.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

    </main>
  );
}
