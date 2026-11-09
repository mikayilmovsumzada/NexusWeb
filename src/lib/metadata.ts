import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { defaultLocale, localeMeta, locales, localizePath } from "@/i18n/config";
import { getLocale } from "@/i18n/server";

/**
 * Per-page metadata for the current locale: canonical URL, hreflang alternates
 * (en / az / x-default) and matching social preview text + image.
 * `path` and `image` are locale-free (e.g. "/about").
 */
export async function pageMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Promise<Metadata> {
  const locale = await getLocale();
  const url = localizePath(locale, path);
  const images = [{ url: localizePath(locale, image), width: 1200, height: 630, alt: `${title} · ${siteConfig.name}` }];
  const languages = Object.fromEntries(locales.map((l) => [localeMeta[l].htmlLang, localizePath(l, path)]));

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { ...languages, "x-default": localizePath(defaultLocale, path) },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
      url,
      title: `${title} · ${siteConfig.name}`,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${siteConfig.name}`,
      description,
      images,
    },
  };
}
