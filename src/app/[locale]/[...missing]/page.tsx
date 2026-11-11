import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/i18n/server";

/**
 * Catch-all for unknown URLs inside a locale, so they render the localised
 * not-found page (with header/footer) instead of a bare default 404.
 */

// This segment always renders the 404 UI, so there is nothing to validate for instant navigation.
export const instant = false;

// Same title as ../not-found.tsx, so the browser tab keeps it after the page has loaded.
export async function generateMetadata(): Promise<Metadata> {
  const { ui } = await getContent();
  return { title: ui.notFound.metaTitle, robots: { index: false } };
}

export default function CatchAll() {
  notFound();
}
