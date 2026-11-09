import { siteConfig } from "@/config/site";
import type { Content } from "./en";
import type { Product, Status, TechCategory } from "./types";

/**
 * Product registry (language-independent structure). To add a product:
 *   1. Append an entry here.
 *   2. Add its name/tagline/description under `products.items[slug]` in
 *      src/content/en/products.ts and src/content/az/products.ts.
 *   3. Create its page at `src/app/[locale]/products/<slug>/page.tsx`.
 * It then appears on /products and in the sitemap automatically.
 */
const registry: Array<{
  slug: string;
  status: Status;
  categories: TechCategory[];
  href: string;
  repositoryUrl?: string;
  featured?: boolean;
}> = [
  {
    slug: "contextpulse-ai",
    status: "in-development",
    categories: ["Artificial Intelligence", "Developer Productivity", "Privacy"],
    href: "/products/contextpulse-ai",
    repositoryUrl: siteConfig.contextPulse.repositoryUrl,
    featured: true,
  },
];

export const productRoutes = registry.map((p) => p.href);

/** Products with copy in the requested language. */
export function getProducts(content: Content): Product[] {
  return registry.map((p) => {
    const copy = content.products.items[p.slug];
    return { ...p, name: copy.name, tagline: copy.tagline, description: copy.description };
  });
}
