"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { label: "Home",     href: "/" },
  { label: "SDET",     href: "/sdet" },
  { label: "Training", href: "/training" },
  { label: "Contact",  href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/8 bg-[#0A0E17]/82 py-3 backdrop-blur-xl"
          : "border-b border-white/[0.05] bg-[#0A0E17]/40 py-5 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          style={{ fontFamily: "var(--font-serif)" }}
          className="text-lg font-semibold tracking-tight text-text"
        >
          Varun<span className="text-brass">.</span>M
        </Link>

        {/* desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`group relative text-sm transition-colors ${
                isActive(l.href) ? "text-[#ECE7DD]" : "text-[#ECE7DD]/65 hover:text-[#ECE7DD]"
              }`}
            >
              {l.label}
              <span
                className={`absolute -bottom-1.5 left-0 h-px bg-brass transition-all duration-300 ${
                  isActive(l.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
          <Link
            href="/resume"
            className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
              isActive("/resume")
                ? "border-brass bg-brass text-ink"
                : "border-brass/40 bg-brass/10 text-brass hover:bg-brass hover:text-ink"
            }`}
          >
            Résumé
          </Link>
        </div>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-text md:hidden"
        >
          <div className="space-y-1.5">
            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} className="block h-0.5 w-5 bg-current" />
            <motion.span animate={{ opacity: open ? 0 : 1 }} className="block h-0.5 w-5 bg-current" />
            <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }} className="block h-0.5 w-5 bg-current" />
          </div>
        </button>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/8 bg-ink/90 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`rounded-lg px-3 py-3 text-base transition-colors hover:bg-white/5 ${
                    isActive(l.href) ? "text-[#ECE7DD]" : "text-[#ECE7DD]/65 hover:text-[#ECE7DD]"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/resume"
                className="mt-2 rounded-full bg-brass px-5 py-3 text-center text-sm font-medium text-ink"
              >
                Résumé
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
