import type { Metadata } from "next";
import TrainingContent from "./TrainingContent";

export const metadata: Metadata = {
  title: "Training & Teaching — Varun M",
  description:
    "30,000+ students trained across live and recorded programmes in Manual QA, Selenium, SQL, and interview prep.",
};

export default function TrainingPage() {
  return <TrainingContent />;
}
