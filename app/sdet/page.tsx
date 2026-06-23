import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SDET Work — Varun M",
  description: "QA automation frameworks, CI pipelines, and quality engineering case studies.",
};

export default function SdetPage() {
  return (
    <main className="relative z-10 min-h-screen pt-24">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p
          className="mb-4 text-xs uppercase tracking-[0.28em] text-brass"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Software / SDET
        </p>

        <h1
          style={{ fontFamily: "var(--font-serif)" }}
          className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
        >
          Quality,
          <br />
          <span className="italic text-brass">engineered.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          Automation frameworks, CI/CD pipelines, and the engineering decisions behind them.
          Case studies coming soon.
        </p>

        <div className="mt-16 rounded-2xl border border-white/8 bg-surface p-10 text-center text-muted">
          <p className="text-sm">Content in progress — check back soon.</p>
        </div>
      </div>
    </main>
  );
}
