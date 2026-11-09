import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { productRoutes } from "@/content/products";
import { localeMeta, locales, localizePath } from "@/i18n/config";

const staticRoutes = ["/", "/about", "/products", "/learn", "/community", "/contact"];

/** One entry per page per language, each listing its hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...staticRoutes, ...productRoutes];
  const abs = (path: string) => `${siteConfig.url}${path === "/" ? "" : path}` || siteConfig.url;

  return routes.flatMap((path) =>
    locales.map((locale) => ({
      url: abs(localizePath(locale, path)),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : path.startsWith("/products") ? 0.8 : 0.6,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [localeMeta[l].htmlLang, abs(localizePath(l, path))])),
      },
    })),
  );
}
