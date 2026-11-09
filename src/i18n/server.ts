import { locale as localeParam } from "next/root-params";
import { notFound } from "next/navigation";
import { getContentFor } from "@/content";
import { hasLocale, localizePath, type Locale } from "./config";

/**
 * Server-only helpers. The locale is the root route parameter (`app/[locale]`),
 * read with `next/root-params`, so components don't need it passed as a prop.
 */
export async function getLocale(): Promise<Locale> {
  const value = await localeParam();
  if (!hasLocale(value)) notFound();
  return value;
}

export async function getContent() {
  return getContentFor(await getLocale());
}

/** Localised internal href, for places that build URLs on the server (e.g. metadata). */
export async function href(path: string) {
  return localizePath(await getLocale(), path);
}
