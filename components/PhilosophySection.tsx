"use client";

import { motion } from "framer-motion";

const PRINCIPLES = [
  {
    title: "Precision over speed",
    body: "Done right beats done fast. Flaky tests and shortcuts are debt I refuse to take on.",
  },
  {
    title: "Teach, don't gatekeep",
    body: "Knowledge shared makes a stronger team. I document and mentor by default.",
  },
  {
    title: "Own the outcome",
    body: "From requirement to production, I stay accountable for whether it actually works.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function PhilosophySection() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Dark halo behind heading */}
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-6 -top-6 bottom-0 rounded-3xl"
            style={{
              background:
                "radial-gradient(ellipse 70% 80% at 30% 30%, rgba(10,14,23,0.60) 0%, transparent 80%)",
            }}
          />
          <motion.h2
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            style={{ fontFamily: "var(--font-serif)" }}
            className="relative max-w-3xl text-4xl leading-tight tracking-tight sm:text-5xl"
          >
            The mind of an engineer.
            <br />
            The patience of a <span className="italic text-[#E8B84B]">teacher.</span>
          </motion.h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.title}
              variants={reveal}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_4px_20px_rgba(0,0,0,0.2)] transition-colors hover:border-[#E8B84B]/40"
            >
              <div className="mb-4 h-px w-10 bg-[#E8B84B] transition-all duration-300 group-hover:w-16" />
              <h3 style={{ fontFamily: "var(--font-serif)" }} className="mb-2 text-xl font-semibold">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/60">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
