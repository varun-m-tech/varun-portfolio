import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LenisInit from "@/components/LenisInit";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Varun M — Senior SDET · QA Automation Engineer",
  description:
    "Senior SDET and QA Automation Engineer in Bengaluru. Nearly 7 years building dependable software — a former trainer who believes the best engineers are teachers.",
  openGraph: {
    title: "Varun M — Quality, by design.",
    description: "From the classroom to the codebase. Senior SDET · QA Automation Engineer.",
    type: "website",
  },
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-ink text-text font-sans antialiased">
        <LenisInit />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
