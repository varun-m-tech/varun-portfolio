"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* Real stack only — no invented tools */
const STACK = [
  "Python",
  "Java",
  "SQL",
  "Selenium",
  "Pytest",
  "TestNG",
  "REST API",
  "RestAssured",
  "Jenkins",
  "Docker",
  "AWS",
  "Git",
  "Jira",
  "AI-assisted QE",
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-md transition-colors duration-300 hover:border-[#E8B84B]/60 hover:text-white">
      {children}
    </span>
  );
}

export default function TechStack() {
  const reduce = useReducedMotion();
  const SIZE = 500;
  const R = 195;
  const SPIN = 52;
  const c = SIZE / 2;

  return (
    <section id="software" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative max-w-2xl"
        >
          {/* Dark halo behind heading text */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-8 -inset-y-6 rounded-2xl"
            style={{
              background:
                "radial-gradient(ellipse 85% 120% at 40% 50%, rgba(10,14,23,0.65) 0%, transparent 100%)",
            }}
          />
          <p className="relative mb-4 text-xs uppercase tracking-[0.28em] text-[#E8B84B]">The craft</p>
          <h2
            style={{ fontFamily: "var(--font-serif)" }}
            className="relative text-4xl leading-tight tracking-tight sm:text-5xl"
          >
            Then I made quality <span className="italic text-[#E8B84B]">my craft.</span>
          </h2>
          <p className="relative mt-5 text-white/60">
            Senior SDET · QA Automation Engineer — designing Python/Pytest frameworks, REST API
            validation, Jenkins pipelines, and Docker/AWS environments that keep releases dependable.
          </p>
        </motion.div>

        {/* desktop: rotating orbit — larger radius to accommodate 14 chips */}
        <div
          className="relative mx-auto mt-16 hidden md:block"
          style={{ width: SIZE, height: SIZE }}
        >
          {/* Static rings + glowing core */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute h-[390px] w-[390px] rounded-full border border-white/10" />
            <div className="absolute h-[270px] w-[270px] rounded-full border border-white/5" />
            <div className="relative flex h-28 w-28 flex-col items-center justify-center rounded-full border border-[#E8B84B]/30 bg-[#E8B84B]/10 backdrop-blur-md">
              <div className="absolute -z-10 h-32 w-32 rounded-full bg-[#E8B84B]/20 blur-2xl" />
              <span className="text-xs uppercase tracking-widest text-[#E8B84B]">Quality</span>
              <span className="text-[10px] uppercase tracking-widest text-white/50">Engineering</span>
            </div>
          </div>

          {/* Rotating ring of chips */}
          <motion.div
            className="absolute inset-0"
            animate={reduce ? {} : { rotate: 360 }}
            transition={{ duration: SPIN, ease: "linear", repeat: Infinity }}
          >
            {STACK.map((t, i) => {
              const a = ((360 / STACK.length) * i) * (Math.PI / 180);
              const x = c + Math.sin(a) * R;
              const y = c - Math.cos(a) * R;
              return (
                <div
                  key={t}
                  className="absolute"
                  style={{ left: `${x}px`, top: `${y}px`, transform: "translate(-50%,-50%)" }}
                >
                  {/* Counter-rotate so labels stay upright while the ring spins */}
                  <motion.div
                    animate={reduce ? {} : { rotate: -360 }}
                    transition={{ duration: SPIN, ease: "linear", repeat: Infinity }}
                    whileHover={{ scale: 1.12 }}
                  >
                    <Chip>{t}</Chip>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile / reduced-motion: simple chip grid */}
        <div className="mt-12 flex flex-wrap gap-3 md:hidden">
          {STACK.map((t, i) => (
            <motion.div
              key={t}
              variants={reveal}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
            >
              <Chip>{t}</Chip>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
