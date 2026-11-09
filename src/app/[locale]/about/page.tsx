import type { Metadata } from "next";
import { Check } from "lucide-react";
import { getContent } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Card, FeatureGrid } from "@/components/ui/Card";
import { EcosystemDiagram } from "@/components/visuals/EcosystemDiagram";

export async function generateMetadata(): Promise<Metadata> {
  const { about } = await getContent();
  return pageMetadata({ ...about.meta, path: "/about" });
}

export default async function AboutPage() {
  const { about: c } = await getContent();

  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} description={<p>{c.hero.description}</p>} accent="violet" />

      {/* STORY */}
      <Section labelledBy="story-title">
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <Eyebrow>{c.story.eyebrow}</Eyebrow>
            <h2 id="story-title" className="mt-4 font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
              {c.story.title}
            </h2>
          </div>
          <div className="prose-nexus max-w-2xl text-lg leading-relaxed text-muted">
            {c.story.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      {/* NAME */}
      <Section labelledBy="name-title" className="border-t border-line">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="name-title" eyebrow={c.name.eyebrow} title={c.name.title} description={<p>{c.name.body}</p>} />
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {c.name.meanings.map((m) => (
                <Card key={m.term} className="p-5 sm:p-5">
                  <dt className="font-display text-lg font-semibold text-pulse-300">{m.term}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted">{m.definition}</dd>
                </Card>
              ))}
            </dl>
          </div>
          <EcosystemDiagram className="mx-auto w-full max-w-md" />
        </div>
      </Section>

      {/* MISSION & VISION */}
      <Section labelledBy="mission-title" className="border-t border-line">
        <h2 id="mission-title" className="sr-only">
          {c.mission.srTitle}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[c.mission.mission, c.mission.vision].map((m, i) => (
            <div
              key={m.label}
              className="edge-glow relative overflow-hidden rounded-[var(--radius-card)] bg-gradient-to-br from-ink-800 to-ink-900 p-8 sm:p-10"
            >
              <div
                aria-hidden="true"
                className={`absolute -right-20 -top-20 size-64 rounded-full blur-3xl ${i === 0 ? "bg-pulse-500/15" : "bg-violet-500/15"}`}
              />
              <p className="relative font-mono text-xs uppercase tracking-[0.18em] text-pulse-300">{m.label}</p>
              <p className="relative mt-4 font-display text-2xl leading-snug text-text text-balance">{m.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* AREAS */}
      <Section labelledBy="areas-title" className="border-t border-line">
        <SectionHeading id="areas-title" eyebrow={c.areas.eyebrow} title={c.areas.title} />
        <div className="mt-12">
          <FeatureGrid features={c.areas.items} columns={3} />
        </div>
      </Section>

      {/* PHILOSOPHY */}
      <Section labelledBy="philosophy-title" className="border-t border-line">
        <SectionHeading id="philosophy-title" eyebrow={c.philosophy.eyebrow} title={c.philosophy.title} />
        <div className="mt-12">
          <FeatureGrid features={c.philosophy.items} accent="violet" />
        </div>
        <Card className="mt-10 sm:p-8">
          <h3 className="font-display text-xl font-semibold text-text">{c.today.title}</h3>
          <ul role="list" className="mt-5 space-y-3">
            {c.today.points.map((p) => (
              <li key={p} className="flex gap-2.5 text-muted">
                <Check aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-pulse-400" />
                {p}
              </li>
            ))}
          </ul>
        </Card>
      </Section>

      <CtaBand eyebrow={c.cta.eyebrow} title={c.cta.title} description={c.cta.description}>
        <ButtonLink href="/community" size="lg" arrow>
          {c.cta.community}
        </ButtonLink>
        <ButtonLink href="/contact" size="lg" variant="secondary">
          {c.cta.contact}
        </ButtonLink>
      </CtaBand>
    </>
  );
}
