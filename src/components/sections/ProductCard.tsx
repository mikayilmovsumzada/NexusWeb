import { ArrowRight } from "lucide-react";
import type { Product } from "@/content/types";
import { getContent } from "@/i18n/server";
import { LocaleLink } from "@/i18n/LocaleLink";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { GitHubIcon } from "@/components/ui/Icon";

/** Reusable product card — driven entirely by the product registry. */
export async function ProductCard({ product, headingLevel = 2 }: { product: Product; headingLevel?: 2 | 3 }) {
  const { ui } = await getContent();
  const t = ui.productCard;
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="edge-glow group relative flex h-full flex-col rounded-[var(--radius-card)] bg-gradient-to-b from-ink-800/80 to-ink-900/80 p-7 transition-transform duration-300 hover:-translate-y-0.5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <StatusBadge status={product.status} />
        <span className="font-mono text-xs text-subtle">{t.kicker}</span>
      </div>
      <Heading className="mt-6 font-display text-2xl font-semibold tracking-tight text-text">{product.name}</Heading>
      <p className="mt-2 font-medium text-pulse-300">{product.tagline}</p>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{product.description}</p>
      <ul role="list" aria-label={t.categoriesLabel} className="mt-6 flex flex-wrap gap-2">
        {product.categories.map((c) => (
          <li key={c}>
            <Badge>{ui.categories[c]}</Badge>
          </li>
        ))}
      </ul>
      <div className="mt-7 flex items-center justify-between gap-4 border-t border-line pt-5">
        {/* Real link styled as a button; its ::after overlay makes the whole card clickable. */}
        <LocaleLink
          href={product.href}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-pulse-400/40 bg-pulse-500/10 px-4 text-sm font-medium text-pulse-300 transition-colors duration-200 after:absolute after:inset-0 after:rounded-[var(--radius-card)] after:content-[''] group-hover:border-pulse-400/80 group-hover:bg-pulse-500/20"
        >
          {t.details}
          <ArrowRight aria-hidden="true" size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </LocaleLink>
        {product.repositoryUrl && (
          <a
            href={product.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex items-center gap-1.5 rounded-full text-sm text-muted transition-colors hover:text-text"
          >
            <GitHubIcon size={15} />
            {t.repository}
            <span className="sr-only">
              {" "}
              {t.repositoryFor} {product.name} {ui.common.opensNewTab}
            </span>
          </a>
        )}
      </div>
    </article>
  );
}
