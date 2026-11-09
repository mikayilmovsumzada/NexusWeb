import type { Metadata } from "next";
import { getProducts } from "@/content/products";
import { getContent } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { ProductCard } from "@/components/sections/ProductCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export async function generateMetadata(): Promise<Metadata> {
  const { products } = await getContent();
  return pageMetadata({ ...products.meta, path: "/products" });
}

export default async function ProductsPage() {
  const content = await getContent();
  const c = content.products;
  const products = getProducts(content);

  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} description={<p>{c.hero.description}</p>} />

      <Section labelledBy="products-list-title">
        <h2 id="products-list-title" className="sr-only">
          {c.listTitle}
        </h2>
        <ul role="list" className="grid gap-6 md:grid-cols-2">
          {products.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} headingLevel={3} />
            </li>
          ))}
          <li>
            <div className="flex h-full min-h-72 flex-col items-center justify-center rounded-[var(--radius-card)] border border-dashed border-line-strong p-8 text-center">
              <span className="inline-flex size-12 items-center justify-center rounded-full border border-line text-subtle">
                <Icon name="lightbulb" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-text">{c.next.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{c.next.body}</p>
              <ButtonLink href="/contact" variant="secondary" className="mt-6" arrow>
                {c.next.cta}
              </ButtonLink>
            </div>
          </li>
        </ul>
      </Section>

      <CtaBand eyebrow={c.cta.eyebrow} title={c.cta.title} description={c.cta.description}>
        <ButtonLink href="/products/contextpulse-ai" size="lg" arrow>
          {c.cta.explore}
        </ButtonLink>
        <ButtonLink href="/community" size="lg" variant="secondary">
          {c.cta.involved}
        </ButtonLink>
      </CtaBand>
    </>
  );
}
