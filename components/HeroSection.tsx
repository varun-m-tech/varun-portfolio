"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: i * 0.11, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

interface HeroSectionProps {
  eyebrow: string;
  heading: ReactNode;
  headingClassName?: string;
  meta?: ReactNode;
  body: ReactNode;
  ctas: ReactNode;
  imageSrc: string;
  imageAlt?: string;
  imagePosition?: string;
  priority?: boolean;
  fullHeight?: boolean;
}

export default function HeroSection({
  eyebrow,
  heading,
  headingClassName = "text-5xl font-semibold leading-[1.0] tracking-tight sm:text-6xl lg:text-7xl",
  meta,
  body,
  ctas,
  imageSrc,
  imageAlt = "",
  imagePosition = "center top",
  priority = false,
  fullHeight = false,
}: HeroSectionProps) {
  const hasMeta = Boolean(meta);

  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: fullHeight ? "100vh" : "82vh" }}
    >
      {/* Legibility veil — strong on text side, fully clear on portrait side */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0A0E17]/95 via-[#0A0E17]/60 to-transparent" />

      {/* Portrait — fills right half on desktop */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-[50%] lg:block"
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          style={{ objectPosition: imagePosition }}
          className="object-cover"
          sizes="50vw"
          priority={priority}
        />
        {/* Left-edge fade — narrow so face stays crisp */}
        <div className="absolute inset-y-0 left-0 w-[38%] bg-gradient-to-r from-[#0A0E17] to-transparent" />
        {/* Subtle bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-[15%] bg-gradient-to-t from-[#0A0E17]/50 to-transparent" />
      </motion.div>

      {/* Text column — left-anchored */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
        <div className="lg:max-w-[56%]">

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="mb-5 text-xs uppercase tracking-[0.28em] text-[#D8B450]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {eyebrow}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            style={{ fontFamily: "var(--font-serif)" }}
            className={headingClassName}
          >
            {heading}
          </motion.div>

          {hasMeta && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="mt-4"
            >
              {meta}
            </motion.div>
          )}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={hasMeta ? 3 : 2}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/70"
          >
            {body}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={hasMeta ? 4 : 3}
            className="mt-9 flex flex-wrap gap-4"
          >
            {ctas}
          </motion.div>

          {/* Mobile portrait — below CTAs, hidden on desktop */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={hasMeta ? 5 : 4}
            className="relative mt-10 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.4)] lg:hidden"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              style={{ objectPosition: imagePosition }}
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute bottom-0 inset-x-0 h-1/4 bg-gradient-to-t from-[#0A0E17]/80 to-transparent" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
