import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Training — Varun M",
  description: "30,000+ students trained. SQL trainer and branch head at QSpider/JSpider.",
};

export default function TrainingPage() {
  return (
    <main className="relative z-10 min-h-screen pt-24">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p
          className="mb-4 text-xs uppercase tracking-[0.28em] text-brass"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          From the classroom
        </p>

        <h1
          style={{ fontFamily: "var(--font-serif)" }}
          className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
        >
          The patience of a
          <br />
          <span className="italic text-brass">teacher.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          4 years at QSpider/JSpider — SQL trainer, test engineer, and eventually branch head
          leading a 22-member team. 30,000+ students trained.
        </p>

        <div className="mt-16 rounded-2xl border border-white/8 bg-surface p-10 text-center text-muted">
          <p className="text-sm">Photos and memories coming soon.</p>
        </div>
      </div>
    </main>
  );
}
