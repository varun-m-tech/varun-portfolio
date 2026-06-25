import type { Metadata } from "next";
import ResumeContent from "./ResumeContent";

export const metadata: Metadata = {
  title: "Résumé — Varun M",
  description:
    "Résumé of Varun M — Senior SDET. 7+ years across cybersecurity, banking, fintech, logistics, and edtech. Download PDF or DOCX.",
};

export default function ResumePage() {
  return <ResumeContent />;
}
