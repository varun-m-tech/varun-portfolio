import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Varun M",
  description: "Get in touch with Varun M — Senior SDET and QA Automation Engineer.",
};

export default function ContactPage() {
  return (
    <main className="relative z-10 min-h-screen pt-24">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p
          className="mb-4 text-xs uppercase tracking-[0.28em] text-brass"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Get in touch
        </p>

        <h1
          style={{ fontFamily: "var(--font-serif)" }}
          className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
        >
          Let&apos;s build something
          <br />
          <span className="italic text-brass">dependable.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          Open to conversations about quality engineering, automation architecture, and training.
        </p>

        <div className="mt-12 flex flex-wrap gap-4">
          <a
            href="mailto:varunm.work1@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-brass px-7 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90"
          >
            Email me
          </a>
          <a
            href="https://linkedin.com/in/varun-m-78a106294"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3 text-sm text-text transition-colors hover:border-brass/60 hover:text-white"
          >
            LinkedIn
          </a>
        </div>

        <div className="mt-16 rounded-2xl border border-white/8 bg-surface p-10">
          <p className="text-sm text-muted">
            Full contact form coming soon. In the meantime, reach me directly at{" "}
            <a href="mailto:varunm.work1@gmail.com" className="text-brass hover:underline">
              varunm.work1@gmail.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
