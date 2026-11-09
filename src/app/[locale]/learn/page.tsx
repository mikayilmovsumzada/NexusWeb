import type { Metadata } from "next";
import { mailtoHref } from "@/config/site";
import { getContent } from "@/i18n/server";
import { LocaleLink } from "@/i18n/LocaleLink";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { FeatureGrid, IconTile } from "@/components/ui/Card";
import { Disclosure } from "@/components/ui/Disclosure";

export async function generateMetadata(): Promise<Metadata> {
  const { education } = await getContent();
  return pageMetadata({ ...education.meta, path: "/learn" });
}

export default async function LearnPage() {
  const { education: c } = await getContent();
  const suggestHref = mailtoHref(c.cta.emailSubject);

  return (
    <>
      <PageHero
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        accent="violet"
        badge={<StatusBadge status="planned" />}
        description={<p>{c.hero.description}</p>}
      >
        <ButtonLink href="#tracks" size="lg" arrow>
          {c.hero.cta}
        </ButtonLink>
      </PageHero>

      <Section labelledBy="learn-principles-title">
        <SectionHeading id="learn-principles-title" eyebrow={c.principlesHeading.eyebrow} title={c.principlesHeading.title} />
        <div className="mt-12">
          <FeatureGrid features={c.principles} accent="violet" />
        </div>
      </Section>

      <Section id="tracks" labelledBy="tracks-title" className="scroll-mt-16 border-t border-line">
        <SectionHeading
          id="tracks-title"
          eyebrow={c.tracksHeading.eyebrow}
          title={c.tracksHeading.title}
          description={<p>{c.tracksHeading.description}</p>}
        />
        <ul role="list" className="mt-12 space-y-4">
          {c.tracks.map((t, i) => (
            <li key={t.id} id={t.id} className="scroll-mt-24">
              <Disclosure
                defaultOpen={i === 0}
                summary={
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <IconTile icon={t.icon} accent={t.accent} className="shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-xl font-semibold text-text">{t.title}</h3>
                        <StatusBadge status={t.status} />
                      </div>
                      <p className="mt-1 text-sm text-muted">{t.summary}</p>
                    </div>
                  </div>
                }
              >
                <div className="grid gap-6 border-t border-line pt-6 sm:grid-cols-[1fr_auto] sm:pl-[3.75rem]">
                  {t.lessons && t.lessons.length > 0 ? (
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">{c.labels.availableLessons}</h4>
                      <ul role="list" className="mt-3 space-y-2">
                        {t.lessons.map((l) => (
                          <li key={l.href}>
                            <LocaleLink href={l.href} className="text-pulse-300 hover:underline">
                              {l.title}
                            </LocaleLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">{c.labels.plannedTopics}</h4>
                      <ul role="list" className="mt-3 space-y-2">
                        {t.plannedTopics.map((topic) => (
                          <li key={topic} className="flex gap-2.5 text-sm text-muted">
                            <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-violet-400" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">{c.labels.formats}</h4>
                    <ul role="list" className="mt-3 flex flex-wrap gap-2 sm:flex-col sm:items-start">
                      {t.formats.map((f) => (
                        <li key={f}>
                          <Badge>{f}</Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Disclosure>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand eyebrow={c.cta.eyebrow} title={c.cta.title} description={c.cta.description}>
        {suggestHref ? (
          <ButtonLink href={suggestHref} size="lg">
            {c.cta.suggestByEmail}
          </ButtonLink>
        ) : (
          <ButtonLink href="/contact" size="lg" arrow>
            {c.cta.suggest}
          </ButtonLink>
        )}
        <ButtonLink href="/community" size="lg" variant="secondary">
          {c.cta.community}
        </ButtonLink>
      </CtaBand>
    </>
  );
}
