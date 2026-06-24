import type { Metadata } from "next";
import SdetContent from "./SdetContent";

export const metadata: Metadata = {
  title: "SDET Work — Varun M",
  description:
    "7+ years as an SDET — automation frameworks, CI/CD pipelines, and quality engineering at Cyware Labs, OpenText, and Aspire Systems.",
};

export default function SdetPage() {
  return <SdetContent />;
}
