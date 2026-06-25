import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact — Varun M",
  description:
    "Get in touch with Varun M — Senior SDET and QA Automation Engineer based in Bengaluru. Open to remote.",
};

export default function ContactPage() {
  return <ContactContent />;
}
