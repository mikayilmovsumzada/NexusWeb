import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getContent } from "@/i18n/server";
import { LocaleLink } from "@/i18n/LocaleLink";
import { pageMetadata } from "@/lib/metadata";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { Card, FeatureGrid, IconTile } from "@/components/ui/Card";
import { GitHubIcon } from "@/components/ui/Icon";
import { NetworkCanvas } from "@/components/visuals/NetworkCanvas";
import { EcosystemDiagram } from "@/components/visuals/EcosystemDiagram";
import { ReminderIllustration } from "@/components/visuals/ReminderIllustration";
import { CtaBand } from "@/components/sections/CtaBand";
import { cn } from "@/lib/cn";

export async function generateMetadata(): Promise<Metadata> {
  const { ui, home } = await getContent();
  return {
    ...(await pageMetadata({ title: home.meta.title, description: ui.site.description, path: "/" })),
    title: { absolute: `${siteConfig.name} — ${ui.site.tagline}` },
  };
}

const pillarStyles = {
  pulse: {
    ring: "hover:border-pulse-400/40",
    glow: "from-pulse-500/15",
    check: "text-pulse-400",
    button: "border-pulse-400/40 bg-pulse-500/10 text-pulse-300 group-hover:border-pulse-400/80 group-hover:bg-pulse-500/20",
  },
  violet: {
    ring: "hover:border-violet-400/40",
    glow: "from-violet-500/15",
    check: "text-violet-400",
    button: "border-violet-400/40 bg-violet-500/10 text-violet-300 group-hover:border-violet-400/80 group-hover:bg-violet-500/20",
  },
  signal: {
    ring: "hover:border-signal-400/40",
    glow: "from-signal-400/12",
    check: "text-signal-400",
    button: "border-signal-400/40 bg-signal-400/10 text-signal-300 group-hover:border-signal-400/80 group-hover:bg-signal-400/20",
  },
} as const;

export default async function HomePage() {
  const { home: c } = await getContent();

  return (
    <>
      {/* HERO */}
      <section aria-labelledby="hero-title" className="relative -mt-16 overflow-hidden pt-16">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,#000_15%,transparent_70%)]" />
          <div className="absolute left-1/2 top-[-10%] h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-radial from-pulse-500/20 via-violet-500/8 to-transparent to-70% blur-2xl light:from-pulse-500/12" />
          <NetworkCanvas className="absolute inset-0 opacity-80 [mask-image:radial-gradient(ellipse_at_center,#000_35%,transparent_80%)]" />
        </div>

        <Container className="relative grid items-center gap-14 pb-24 pt-20 sm:pt-28 lg:grid-cols-[1.15fr_0.85fr] lg:pb-32 lg:pt-32">
          <div>
            <Eyebrow>{c.hero.eyebrow}</Eyebrow>
            <h1
              id="hero-title"
              className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-balance sm:text-6xl lg:text-[4.25rem]"
            >
              <span className="text-gradient">{c.hero.title}</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted text-pretty">{c.hero.description}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={c.hero.primaryCta.href} size="lg" arrow>
                {c.hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={c.hero.secondaryCta.href} size="lg" variant="secondary">
                {c.hero.secondaryCta.label}
              </ButtonLink>
            </div>
            <ul role="list" aria-label={c.hero.focusLabel} className="mt-12 flex flex-wrap gap-2">
              {c.hero.focusTags.map((t) => (
                <li key={t}>
                  <Badge>{t}</Badge>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div aria-hidden="true" className="absolute inset-8 rounded-full bg-pulse-500/10 blur-3xl" />
            <EcosystemDiagram className="relative w-full motion-safe:animate-drift" />
          </div>
        </Container>
      </section>

      {/* ECOSYSTEM */}
      <Section id="ecosystem" labelledBy="ecosystem-title" className="scroll-mt-16 border-t border-line">
        <SectionHeading id="ecosystem-title" eyebrow={c.ecosystem.eyebrow} title={c.ecosystem.title} description={c.ecosystem.description} />
        <ul role="list" className="mt-14 grid gap-5 lg:grid-cols-3">
          {c.ecosystem.pillars.map((p, i) => {
            const s = pillarStyles[p.accent];
            return (
              <li key={p.key}>
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-ink-900 p-7 transition-colors duration-300",
                    s.ring,
                  )}
                >
                  <div aria-hidden="true" className={cn("absolute inset-x-0 top-0 h-40 bg-gradient-to-b to-transparent", s.glow)} />
                  <div className="relative flex items-start justify-between">
                    <IconTile icon={p.icon} accent={p.accent} />
                    <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                  </div>
                  <h3 className="relative mt-6 font-display text-2xl font-semibold text-text">{p.name}</h3>
                  <div className="relative mt-3 flex flex-wrap items-center gap-2">
                    <StatusBadge status={p.status} />
                    <span className="text-xs text-subtle">{p.statusNote}</span>
                  </div>
                  <p className="relative mt-5 text-sm leading-relaxed text-muted">{p.body}</p>
                  <ul role="list" className="relative mt-5 flex-1 space-y-2.5">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex gap-2.5 text-sm text-text/90">
                        <Check aria-hidden="true" size={16} className={cn("mt-0.5 shrink-0", s.check)} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  {/*
                    The button is the card's real link. Its ::after overlay stretches over the whole
                    card (the nearest positioned ancestor is the <article>), so the entire card is
                    clickable while keyboard users get one clear, focusable button.
                  */}
                  <div className="mt-7">
                    <LocaleLink
                      href={p.href}
                      className={cn(
                        "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200",
                        "after:absolute after:inset-0 after:rounded-[var(--radius-card)] after:content-['']",
                        s.button,
                      )}
                    >
                      {p.linkLabel}
                      <ArrowRight aria-hidden="true" size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </LocaleLink>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* FEATURED PRODUCT */}
      <section aria-labelledby="featured-title" className="relative overflow-hidden py-20 sm:py-28">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-850 to-ink-950" />
        <div aria-hidden="true" className="absolute -right-40 top-10 size-[560px] rounded-full bg-pulse-500/10 blur-3xl" />
        <Container className="relative">
          <div className="edge-glow grid items-center gap-12 rounded-[2rem] bg-ink-900/60 p-6 sm:p-10 lg:grid-cols-2 lg:p-14">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Eyebrow>{c.featured.eyebrow}</Eyebrow>
                <StatusBadge status="in-development" />
              </div>
              <h2 id="featured-title" className="mt-5 font-display text-4xl font-semibold tracking-tight text-text sm:text-5xl">
                {c.featured.title}
              </h2>
              <p className="mt-3 font-display text-xl text-pulse-300">{c.featured.tagline}</p>
              <p className="mt-5 leading-relaxed text-muted">{c.featured.description}</p>
              <ul role="list" className="mt-8 space-y-5">
                {c.featured.principles.map((pr) => (
                  <li key={pr.title} className="flex gap-4">
                    <IconTile icon={pr.icon} className="size-10 shrink-0" />
                    <div>
                      <h3 className="font-medium text-text">{pr.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{pr.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/products/contextpulse-ai" arrow size="lg">
                  {c.featured.explore}
                </ButtonLink>
                <ButtonLink href={siteConfig.contextPulse.repositoryUrl} variant="secondary" size="lg">
                  <GitHubIcon size={16} /> {c.featured.github}
                </ButtonLink>
              </div>
            </div>
            <ReminderIllustration className="mx-auto w-full max-w-md" />
          </div>
        </Container>
      </section>

      {/* FOCUS */}
      <Section labelledBy="focus-title">
        <SectionHeading id="focus-title" eyebrow={c.focus.eyebrow} title={c.focus.title} description={c.focus.description} />
        <div className="mt-14">
          <FeatureGrid features={c.focus.areas} />
        </div>
      </Section>

      {/* WHAT WE'RE BUILDING */}
      <Section labelledBy="building-title" className="border-t border-line">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="building-title" eyebrow={c.building.eyebrow} title={c.building.title} description={c.building.description} />
          <ol role="list" className="relative space-y-4 border-l border-line pl-6 sm:pl-8">
            {c.building.items.map((item) => (
              <li key={item.title} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[calc(1.5rem+4.5px)] top-7 size-2 rounded-full bg-pulse-400 ring-4 ring-ink-950 sm:-left-[calc(2rem+4.5px)]"
                />
                <Card className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold text-text">
                      {item.href ? (
                        <LocaleLink href={item.href} className="hover:text-pulse-300">
                          {item.title}
                        </LocaleLink>
                      ) : (
                        item.title
                      )}
                    </h3>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* JOIN */}
      <CtaBand id="join-title" eyebrow={c.join.eyebrow} title={c.join.title} description={c.join.description}>
        <ButtonLink href={siteConfig.contextPulse.repositoryUrl} size="lg">
          <GitHubIcon size={16} /> {c.join.github}
        </ButtonLink>
        <ButtonLink href="/community" variant="secondary" size="lg" arrow>
          {c.join.community}
        </ButtonLink>
        <ButtonLink href="/contact" variant="ghost" size="lg">
          {c.join.contact}
        </ButtonLink>
      </CtaBand>
    </>
  );
}
