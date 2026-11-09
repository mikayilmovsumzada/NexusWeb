/**
 * Locale configuration (safe to import from server, client and proxy code).
 *
 * URL scheme:
 *   English (default)  → unprefixed:  /about, /products/contextpulse-ai
 *   Azerbaijani        → /az prefix:  /az/about, /az/products/contextpulse-ai
 * Internally every route lives under `app/[locale]`; `src/proxy.ts` rewrites
 * unprefixed URLs to `/en/...`.
 */
export const locales = ["en", "az"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Cookie that remembers an explicit language choice (set by the switcher). */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const localeMeta: Record<Locale, { label: string; short: string; htmlLang: string; ogLocale: string }> = {
  en: { label: "English", short: "EN", htmlLang: "en", ogLocale: "en_US" },
  az: { label: "Azərbaycanca", short: "AZ", htmlLang: "az", ogLocale: "az_AZ" },
};

export function hasLocale(value: string | undefined): value is Locale {
  return (locales as readonly string[]).includes(value ?? "");
}

/** Prefix an internal path for a locale. External URLs, mailto: and #hashes pass through. */
export function localizePath(locale: Locale, path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (locale === defaultLocale) return path;
  if (path === "/") return `/${locale}`;
  if (path.startsWith("/#")) return `/${locale}${path.slice(1)}`;
  return `/${locale}${path}`;
}

/** Split a browser pathname into its locale and the locale-free path. */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const [, first, ...rest] = pathname.split("/");
  if (first && hasLocale(first) && first !== defaultLocale) {
    return { locale: first, path: `/${rest.join("/")}` };
  }
  return { locale: defaultLocale, path: pathname || "/" };
}
