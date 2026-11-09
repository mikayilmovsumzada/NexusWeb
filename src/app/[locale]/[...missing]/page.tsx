import { notFound } from "next/navigation";

/**
 * Catch-all for unknown URLs inside a locale, so they render the localised
 * not-found page (with header/footer) instead of a bare default 404.
 */

// This segment always renders the 404 UI, so there is nothing to validate for instant navigation.
export const instant = false;

export default function CatchAll() {
  notFound();
}
