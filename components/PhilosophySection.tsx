"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

// To go live: add `embed` to any item, e.g.
//   embed: "https://www.youtube.com/embed/VIDEO_ID"
// (Instagram: use the post's /embed URL.) Leave it off to keep the placeholder.
type MediaItem = { id: number; label: string; kind: "video" | "photo"; tall?: boolean; embed?: string };

const MEDIA: MediaItem[] = [
  { id: 1, label: "Last-day class celebration", kind: "video", tall: true },
  { id: 2, label: "Teaching a session", kind: "photo" },
  { id: 3, label: "With students", kind: "photo" },
  { id: 4, label: "Group celebration", kind: "photo", tall: true },
  { id: 5, label: "A favourite memory", kind: "video" },
  { id: 6, label: "Farewell", kind: "photo" },
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
  const [active, setActive] = useState<MediaItem | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lightbox: focus the close button, Esc to close, lock scroll, restore focus on exit.
  useEffect(() => {
    if (!active) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [active]);

  return (
    <>
      {/* ───────────── PHILOSOPHY (anchor: #about) ───────────── */}
      <section id="about" className="relative py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.h2
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            style={{ fontFamily: "var(--font-serif)" }}
            className="max-w-3xl text-4xl leading-tight tracking-tight sm:text-5xl"
          >
            The mind of an engineer.
            <br />
            The patience of a <span className="italic text-[#E8B84B]">teacher.</span>
          </motion.h2>

          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.title}
                variants={reveal}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-md transition-colors hover:border-[#E8B84B]/40"
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

      {/* ───────────── TRAINING MEDIA (anchor: #training) ───────────── */}
      <section id="training" className="relative py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-12 max-w-2xl"
          >
            <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#E8B84B]">From the classroom</p>
            <h2 style={{ fontFamily: "var(--font-serif)" }} className="text-3xl tracking-tight sm:text-4xl">
              Years of teaching SQL — and the goodbyes that came with them.
            </h2>
            <p className="mt-4 text-white/60">
              Tap any tile to open it. Swap these placeholders for your photos and YouTube / Instagram embeds.
            </p>
          </motion.div>

          {/* masonry grid */}
          <div className="columns-2 gap-4 md:columns-3">
            {MEDIA.map((m, i) => (
              <motion.button
                key={m.id}
                onClick={() => setActive(m)}
                variants={reveal}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                whileHover={{ y: -4 }}
                aria-label={`Open: ${m.label}`}
                className={`group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 outline-none focus-visible:ring-2 focus-visible:ring-[#E8B84B] ${
                  m.tall ? "aspect-[3/4]" : "aspect-[4/3]"
                }`}
                style={{
                  background:
                    "repeating-linear-gradient(135deg,#11161a,#11161a 14px,#161d22 14px,#161d22 28px)",
                }}
              >
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/45">
                  <span className="text-2xl">{m.kind === "video" ? "▶" : "◎"}</span>
                  <span className="px-4 text-center text-xs uppercase tracking-wider">{m.label}</span>
                </span>
                <span className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="absolute inset-x-4 bottom-3 text-left text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {m.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── LIGHTBOX ───────────── */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.label}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f12]"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                <span className="text-sm text-white/70">{active.label}</span>
                <button
                  ref={closeRef}
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#E8B84B]"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video w-full">
                {active.embed ? (
                  <iframe
                    src={active.embed}
                    title={active.label}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-white/40">
                    <span className="text-3xl">{active.kind === "video" ? "▶" : "◎"}</span>
                    <span className="px-6 text-center text-sm">
                      Add the embed URL for this item in the MEDIA array.
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}