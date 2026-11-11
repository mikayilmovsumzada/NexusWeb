import type { Metadata } from "next";
import { CheckCircle2, Newspaper } from "lucide-react";
import { composeHref } from "@/config/site";
import { getContent, getLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { resources } from "@/content/resources";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { ResourceCarousel } from "@/components/sections/ResourceCarousel";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { FeatureGrid, IconTile } from "@/components/ui/Card";

export async function generateMetadata(): Promise<Metadata> {
  const { education } = await getContent();
  return pageMetadata({ ...education.meta, path: "/learn" });
}

export default async function LearnPage() {
  const { education: c, ui } = await getContent();
  const locale = await getLocale();
  const suggestHref = composeHref(c.cta.emailSubject);

  return (
    <>
      <PageHero
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        accent="violet"
        badge={<StatusBadge status="forming" />}
        description={<p>{c.hero.description}</p>}
      >
        <ButtonLink href="/contact#enroll" size="lg" arrow>
          {c.hero.enroll}
        </ButtonLink>
        <ButtonLink href="#courses" size="lg" variant="secondary">
          {c.hero.browse}
        </ButtonLink>
      </PageHero>

      <Section labelledBy="learn-principles-title">
        <SectionHeading id="learn-principles-title" eyebrow={c.principlesHeading.eyebrow} title={c.principlesHeading.title} />
        <div className="mt-12">
          <FeatureGrid features={c.principles} accent="violet" />
        </div>
      </Section>

      {/* COURSES */}
      <Section id="courses" labelledBy="courses-title" className="scroll-mt-16 border-t border-line">
        <SectionHeading
          id="courses-title"
          eyebrow={c.coursesHeading.eyebrow}
          title={c.coursesHeading.title}
          description={<p>{c.coursesHeading.description}</p>}
        />
        <ul role="list" className="mt-12 grid gap-6 lg:grid-cols-3">
          {c.courses.map((course) => (
            <li key={course.id} id={course.id} className="scroll-mt-24">
              <article className="edge-glow flex h-full flex-col rounded-[var(--radius-card)] bg-gradient-to-b from-ink-800/80 to-ink-900/80 p-7">
                <div className="flex items-start justify-between gap-3">
                  <IconTile icon={course.icon} accent={course.accent} className="shrink-0" />
                  <StatusBadge status={course.status} />
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-text">{course.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{course.summary}</p>

                <h4 className="mt-7 font-mono text-xs uppercase tracking-[0.14em] text-subtle">{c.labels.topics}</h4>
                <ul role="list" className="mt-3 space-y-2.5">
                  {course.topics.map((topic) => (
                    <li key={topic} className="flex gap-2.5 text-sm text-text/90">
                      <CheckCircle2 aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-emerald-300" />
                      {topic}
                    </li>
                  ))}
                </ul>

                <h4 className="sr-only">{c.labels.formats}</h4>
                <ul role="list" className="mt-6 flex flex-wrap gap-2">
                  {course.formats.map((f) => (
                    <li key={f}>
                      <Badge>{f}</Badge>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <ButtonLink href={`/contact#enroll-${course.id}`} arrow className="w-full">
                    {c.labels.enroll}
                  </ButtonLink>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      {/* TECHNICAL ARTICLES & TUTORIALS */}
      <Section id="resources" labelledBy="resources-title" className="scroll-mt-16 border-t border-line">
        <SectionHeading
          id="resources-title"
          eyebrow={c.resources.eyebrow}
          title={c.resources.title}
          description={<p>{c.resources.description}</p>}
        />
        <div className="mt-12">
          {resources.length > 0 ? (
            <ResourceCarousel items={resources} locale={locale} t={{ ...c.resources, opensNewTab: ui.common.opensNewTab }} />
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-dashed border-line-strong bg-ink-900/40 p-10 text-center">
              <Newspaper aria-hidden="true" size={24} className="text-subtle" />
              <p className="font-display text-lg font-semibold text-text">{c.resources.emptyTitle}</p>
              <p className="max-w-md text-sm leading-relaxed text-muted">{c.resources.emptyBody}</p>
              <Badge tone="violet">{ui.common.comingSoon}</Badge>
            </div>
          )}
        </div>
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
