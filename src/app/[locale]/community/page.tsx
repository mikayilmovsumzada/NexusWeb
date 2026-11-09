import type { Metadata } from "next";
import { ArrowUpRight, Heart } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getContent } from "@/i18n/server";
import { LocaleLink } from "@/i18n/LocaleLink";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";
import { Card, FeatureGrid, IconTile } from "@/components/ui/Card";
import { SocialLinks } from "@/components/ui/SocialLinks";

export async function generateMetadata(): Promise<Metadata> {
  const { community } = await getContent();
  return pageMetadata({ ...community.meta, path: "/community" });
}

export default async function CommunityPage() {
  const { community: c, ui } = await getContent();
  const repo = siteConfig.contextPulse.repositoryUrl;
  const actionHref = { repo, issues: `${repo}/issues`, contact: "/contact" } as const;

  return (
    <>
      <PageHero
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        accent="signal"
        badge={<StatusBadge status="forming" />}
        description={<p>{c.hero.description}</p>}
      >
        <ButtonLink href="#participate" size="lg" arrow>
          {c.hero.cta}
        </ButtonLink>
      </PageHero>

      <Section labelledBy="audience-title">
        <SectionHeading id="audience-title" eyebrow={c.audience.eyebrow} title={c.audience.title} />
        <div className="mt-12">
          <FeatureGrid features={c.audience.groups} accent="signal" />
        </div>
      </Section>

      <Section id="participate" labelledBy="participate-title" className="scroll-mt-16 border-t border-line">
        <SectionHeading id="participate-title" eyebrow={c.today.eyebrow} title={c.today.title} description={<p>{c.today.description}</p>} />
        <ul role="list" className="mt-12 grid gap-5 md:grid-cols-3">
          {c.ways.map((w) => {
            const href = actionHref[w.action];
            const external = href.startsWith("http");
            const linkClass =
              "inline-flex items-center gap-1.5 text-sm font-medium text-signal-300 after:absolute after:inset-0 after:rounded-[var(--radius-card)]";
            return (
              <li key={w.title}>
                <Card className="group relative flex h-full flex-col transition-colors hover:border-signal-400/40">
                  <IconTile icon={w.icon} accent="signal" />
                  <h3 className="mt-5 font-display text-lg font-semibold text-text">{w.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{w.body}</p>
                  <div className="mt-6">
                    {external ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        {c.actionLabels[w.action]}
                        <ArrowUpRight aria-hidden="true" size={16} />
                        <span className="sr-only"> {ui.common.opensNewTab}</span>
                      </a>
                    ) : (
                      <LocaleLink href={href} className={linkClass}>
                        {c.actionLabels[w.action]}
                        <ArrowUpRight aria-hidden="true" size={16} />
                      </LocaleLink>
                    )}
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
        {siteConfig.social.length > 0 && (
          <div className="mt-10">
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">{c.followTitle}</h3>
            <SocialLinks className="mt-4" />
          </div>
        )}
      </Section>

      <Section labelledBy="roadmap-title" className="border-t border-line">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="roadmap-title" eyebrow={c.roadmap.eyebrow} title={c.roadmap.title} />
            <ul role="list" className="mt-10 space-y-4">
              {c.roadmap.items.map((r) => (
                <li key={r.title}>
                  <Card className="p-5 sm:p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display font-semibold text-text">{r.title}</h3>
                      <StatusBadge status={r.status} />
                    </div>
                    <p className="mt-1.5 text-sm text-muted">{r.body}</p>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:pt-24">
            <div className="edge-glow rounded-[var(--radius-card)] bg-gradient-to-br from-ink-800 to-ink-900 p-8">
              <Heart aria-hidden="true" size={22} className="text-signal-300" />
              <h3 className="mt-4 font-display text-xl font-semibold text-text">{c.valuesTitle}</h3>
              <ul role="list" className="mt-5 space-y-3">
                {c.values.map((v) => (
                  <li key={v} className="flex gap-2.5 text-muted">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-signal-400" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <CtaBand eyebrow={c.cta.eyebrow} title={c.cta.title} description={c.cta.description}>
        <ButtonLink href="/contact" size="lg" arrow>
          {c.cta.introduce}
        </ButtonLink>
        <ButtonLink href={repo} size="lg" variant="secondary">
          {c.cta.github}
        </ButtonLink>
      </CtaBand>
    </>
  );
}
