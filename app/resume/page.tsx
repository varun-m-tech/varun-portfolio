import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Résumé — Varun M",
  description: "Download Varun M's résumé as PDF or DOCX.",
};

function DownloadIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
      <path
        fillRule="evenodd"
        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function ResumePage() {
  return (
    <main className="relative z-10 min-h-screen pt-24">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p
          className="mb-4 text-xs uppercase tracking-[0.28em] text-brass"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Download
        </p>

        <h1
          style={{ fontFamily: "var(--font-serif)" }}
          className="text-5xl font-semibold leading-tight tracking-tight sm:text-6xl"
        >
          Résumé
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          7 years of quality engineering, automation, and training — one page (or two).
        </p>

        {/* Download buttons */}
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="/Varun-M-Resume.pdf"
            download="Varun-M-Resume.pdf"
            className="inline-flex items-center gap-2.5 rounded-full bg-brass px-7 py-3.5 text-sm font-medium text-ink transition-opacity hover:opacity-90"
          >
            <DownloadIcon />
            Download PDF
          </a>
          {/* Place Varun-M-Resume.docx in /public to activate this button */}
          <a
            href="/Varun-M-Resume.docx"
            download="Varun-M-Resume.docx"
            className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-7 py-3.5 text-sm text-text transition-colors hover:border-brass/60 hover:text-white"
          >
            <DownloadIcon />
            Download DOCX
          </a>
        </div>

        {/* Preview placeholder */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-white/8 bg-surface">
          <div className="border-b border-white/8 px-6 py-4">
            <p className="text-sm font-medium text-text">Varun M — Senior SDET</p>
            <p className="text-xs text-muted">Bengaluru, India · varunm.work1@gmail.com</p>
          </div>

          <div className="space-y-6 p-6 text-sm text-muted">
            <div>
              <p className="mb-2 text-xs uppercase tracking-widest text-brass">Experience</p>
              <div className="space-y-3">
                {[
                  ["Senior SDET", "Cyware · Feb 2025–Present", "Cybersecurity"],
                  ["QA Engineer", "OpenText · Jun 2024–Jan 2025", "Logistics / Toyota Japan"],
                  ["QA Automation", "Aspire Systems · Jul 2023–May 2024", "Banking / FinTech Malaysia"],
                  ["Test Engineer + SQL Trainer + Branch Head", "QSpider/JSpider · Aug 2019–Jun 2023", "Training Institute · 30K+ students"],
                ].map(([role, company, domain]) => (
                  <div key={role} className="rounded-lg border border-white/6 bg-surface-alt p-4">
                    <p className="font-medium text-text">{role}</p>
                    <p className="text-xs text-brass">{company}</p>
                    <p className="text-xs">{domain}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs uppercase tracking-widest text-brass">Skills</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Python","Java","SQL","Selenium","Pytest","TestNG","REST API",
                  "Postman","Jenkins","Docker","AWS EC2","Kubernetes","Git","Allure",
                  "Framer Motion","AI-assisted QE",
                ].map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/8 bg-white/4 px-3 py-1 text-xs text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
