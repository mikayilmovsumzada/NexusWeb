import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "../globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext"], display: "swap" });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin", "latin-ext"], display: "swap" });

export const metadata: Metadata = {
  title: "Admin · NexusWeb",
  robots: { index: false, follow: false, nocache: true },
  // Not "no-referrer": that makes browsers send `Origin: null` on form posts, which the CSRF check rejects.
  referrer: "same-origin",
};

/** Separate root layout: the private admin area shares no navigation with the public site. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az" data-theme="dark" className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full bg-ink-950 text-text">{children}</body>
    </html>
  );
}
