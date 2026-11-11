import type { Metadata } from "next";
import { forbidden } from "next/navigation";
import { getContent } from "@/i18n/server";

/**
 * Internal target for the proxy: unauthorised visits to /admin pages are rewritten here
 * (the address bar keeps /admin), which renders the localised 403 page (../forbidden.tsx)
 * with HTTP status 403. Visiting /access-denied directly shows the same page.
 */

// This segment always renders the 403 UI, so there is nothing to validate for instant navigation.
export const instant = false;

// Same title as ../forbidden.tsx, so the browser tab keeps it after the page has loaded.
export async function generateMetadata(): Promise<Metadata> {
  const { ui } = await getContent();
  return { title: ui.forbidden.metaTitle, robots: { index: false } };
}

export default function AccessDenied() {
  forbidden();
}
