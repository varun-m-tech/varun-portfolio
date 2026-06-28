"use client";

import { useState, type FormEvent } from "react";
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
  "w-full rounded-lg border border-white/[0.12] bg-white/[0.04] px-4 py-3 text-sm text-[#ECE7DD] outline-none transition-colors duration-150 placeholder:text-white/25 focus:border-[#D8B450]/60 focus:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-[#D8B450]/40";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactContent() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      access_key: "2137690b-3eae-44be-ad27-aef602e383d0",
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setErrorMsg(json.message ?? "Submission failed. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again or email directly.");
      setStatus("error");
    }
  }

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

              {/* ── SUCCESS STATE ── */}
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]"
                >
                  <div
                    className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full"
                    style={{ background: `${BRASS}20`, color: BRASS }}
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-serif)" }} className="mb-2 text-2xl tracking-tight">
                    Message sent!
                  </h3>
                  <p className="mb-6 text-sm" style={{ color: TEXT }}>
                    Thanks for reaching out. I typically reply within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-2.5 text-sm text-[#ECE7DD] transition-colors hover:border-[#D8B450]/60 hover:text-white focus-visible:ring-2 focus-visible:ring-[#D8B450]/70 outline-none"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
                      disabled={status === "loading"}
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
                      disabled={status === "loading"}
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
                      disabled={status === "loading"}
                    />
                  </div>

                  {/* Error message */}
                  {status === "error" && errorMsg && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                      role="alert"
                    >
                      {errorMsg}
                    </motion.p>
                  )}

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="inline-flex min-h-[44px] w-full items-center justify-center gap-2.5 rounded-full px-10 py-3.5 text-sm font-medium tracking-wide transition-all duration-200 active:scale-95 hover:opacity-90 sm:w-auto focus-visible:ring-2 focus-visible:ring-[#D8B450]/70 outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{ background: BRASS, color: "#0A0E17" }}
                    >
                      {status === "loading" ? (
                        <>
                          <svg
                            className="h-4 w-4 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            aria-hidden
                          >
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        "Send message"
                      )}
                    </button>
                    <p
                      className="mt-3 text-xs text-white/30"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      Powered by Web3Forms · No spam, ever.
                    </p>
                  </div>
                </form>
              )}
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
                className="flex min-h-[56px] items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-200 hover:border-[#D8B450]/40 hover:bg-white/[0.07] focus-visible:ring-2 focus-visible:ring-[#D8B450]/70 outline-none"
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
                  <p className="mt-0.5 text-sm font-medium text-[#ECE7DD]">
                    varunm.work1@gmail.com
                  </p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/varun-m-78a106294"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[56px] items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-200 hover:border-[#38BDF8]/40 hover:bg-white/[0.07] focus-visible:ring-2 focus-visible:ring-[#38BDF8]/50 outline-none"
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
                  <p className="mt-0.5 text-sm font-medium text-[#ECE7DD]">
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
                <p className="text-base font-medium text-[#ECE7DD]">
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
