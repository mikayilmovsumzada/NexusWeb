import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, CircleAlert, Clock, ExternalLink, FlaskConical, ImageIcon } from "lucide-react";
import { siteConfig, mailtoHref } from "@/config/site";
import { getContent, getLocale } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { Card, FeatureGrid, IconTile } from "@/components/ui/Card";
import { GitHubIcon } from "@/components/ui/Icon";
import { ReminderIllustration } from "@/components/visuals/ReminderIllustration";

/**
 * Product demonstrations. Add real screenshots or videos here (files in
 * `public/products/contextpulse-ai/`). The gallery renders only when this is
 * non-empty; otherwise an honest "coming soon" panel is shown. Alt text should
 * be provided for every locale you support.
 */
const media: Array<{ src: string; alt: Record<"en" | "az", string>; width: number; height: number }> = [];

const STACK = ["Python", "FastAPI", "SQLite", "Google Gemini", "Anthropic Claude", "React", "Server-Sent Events", "pytest", "Docker"];

export async function generateMetadata(): Promise<Metadata> {
  const { contextPulse } = await getContent();
  return pageMetadata({ ...contextPulse.meta, path: "/products/contextpulse-ai", image: "/products/contextpulse-ai/opengraph-image" });
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toLocaleUpperCase();
}

export default async function ContextPulsePage() {
  const { contextPulse: c, ui } = await getContent();
  const { contextPulse } = siteConfig;
  const ea = c.earlyAccess;
  const notifyHref = mailtoHref(ea.emailSubject, ea.emailBody);
  const locale = await getLocale();
  const demoUrl = contextPulse.demoUrl; // validated in src/config/url.ts (https / localhost-only http)

  return (
    <>
      <PageHero
        eyebrow={c.overview.eyebrow}
        title={c.overview.title}
        badge={
          <span className="inline-flex flex-wrap items-center gap-2">
            <StatusBadge status={c.status.value} />
            <span className="text-xs text-subtle">{c.overview.statusLine}</span>
          </span>
        }
        description={
          <>
            <p className="font-display text-xl text-pulse-300 sm:text-2xl">{c.overview.tagline}</p>
            <p className="mt-5 font-medium text-text">{c.overview.summary}</p>
            <p className="mt-3">{c.overview.description}</p>
          </>
        }
      >
        {/* Primary CTA: the live demo when a valid URL is configured, otherwise an honest status link. */}
        {demoUrl ? (
          <ButtonLink href={demoUrl} size="lg" arrow>
            {c.overview.demoCta}
          </ButtonLink>
        ) : (
          <a
            href="#live-demo"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-dashed border-line-strong px-6 text-[0.95rem] font-medium text-muted transition-colors hover:border-pulse-400/60 hover:text-text"
          >
            <span aria-hidden="true" className="size-1.5 rounded-full bg-violet-400" />
            {c.overview.demoUnavailable}
          </a>
        )}
        <ButtonLink href={contextPulse.repositoryUrl} size="lg" variant="secondary">
          <GitHubIcon size={16} /> {c.overview.repoCta}
        </ButtonLink>
        <ButtonLink href="#early-access" size="lg" variant="ghost">
          {c.overview.earlyAccessCta}
        </ButtonLink>
      </PageHero>

      {/* STATUS */}
      <section aria-labelledby="status-title" className="border-b border-line bg-ink-900/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <h2 id="status-title" className="flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-subtle">
            <CircleAlert aria-hidden="true" size={15} className="text-pulse-300" />
            {c.status.heading}
          </h2>
          <p className="text-sm leading-relaxed text-muted">{c.status.summary}</p>
        </div>
      </section>

      {/* LIVE DEMO */}
      <Section id="live-demo" labelledBy="live-demo-title" className="scroll-mt-16">
        <div className="edge-glow overflow-hidden rounded-[2rem] bg-gradient-to-br from-ink-800 via-ink-850 to-ink-900 p-6 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <SectionHeading id="live-demo-title" eyebrow={c.demo.eyebrow} title={c.demo.title} description={<p>{c.demo.intro}</p>} />
              <p className="mt-6 inline-flex items-start gap-2 rounded-xl border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-sm text-amber-300">
                <FlaskConical aria-hidden="true" size={16} className="mt-0.5 shrink-0" />
                {c.demo.notice}
              </p>

              <div className="mt-8">
                {demoUrl ? (
                  <div className="flex flex-col gap-3">
                    <div>
                      <ButtonLink href={demoUrl} size="lg" arrow>
                        {c.demo.cta}
                      </ButtonLink>
                    </div>
                    <p className="text-xs text-subtle">
                      {c.demo.newTabHint} {c.demo.credentialsNote}
                    </p>
                  </div>
                ) : (
                  <div role="status" className="rounded-[var(--radius-card)] border border-dashed border-line-strong p-5">
                    <p className="flex items-center gap-2 font-medium text-text">
                      <Clock aria-hidden="true" size={17} className="text-violet-300" />
                      {c.demo.unavailableTitle}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{c.demo.unavailableBody}</p>
                    <a
                      href={`${contextPulse.repositoryUrl}#readme`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-pulse-300 underline-offset-4 hover:underline"
                    >
                      <GitHubIcon size={14} /> {c.demo.unavailableLink}
                      <span className="sr-only"> {ui.common.opensNewTab}</span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            <ul role="list" className="grid gap-4">
              {c.demo.experiences.map((x, i) => (
                <li key={x.title}>
                  <Card className="flex gap-4 p-5 sm:p-6">
                    <IconTile icon={x.icon} accent={i === 0 ? "pulse" : "violet"} className="shrink-0" />
                    <div>
                      <h3 className="font-display text-lg font-semibold text-text">{x.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{x.body}</p>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* PROBLEM */}
      <Section labelledBy="problem-title">
        <SectionHeading id="problem-title" eyebrow={c.problem.eyebrow} title={c.problem.title} />
        <div className="mt-12">
          <FeatureGrid features={c.problem.points} accent="violet" />
        </div>
      </Section>

      {/* SOLUTION */}
      <Section labelledBy="solution-title" className="border-t border-line">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading id="solution-title" eyebrow={c.solution.eyebrow} title={c.solution.title} />
            <ol role="list" className="mt-10 space-y-6">
              {c.solution.sides.map((s, i) => (
                <li key={s.label} className="flex gap-5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-pulse-400/40 font-mono text-sm text-pulse-300">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">{s.label}</p>
                    <h3 className="mt-1 font-display text-lg font-semibold text-text">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <ReminderIllustration className="mx-auto w-full max-w-md" />
        </div>
      </Section>

      {/* IMPLEMENTED */}
      <Section labelledBy="implemented-title" className="border-t border-line">
        <SectionHeading
          id="implemented-title"
          eyebrow={c.implemented.eyebrow}
          title={c.implemented.title}
          description={<p>{c.implemented.description}</p>}
        />
        <div className="mt-12">
          <FeatureGrid features={c.implemented.items} />
        </div>
      </Section>

      {/* PRIVACY + LIMITATIONS */}
      <Section labelledBy="privacy-title" className="border-t border-line">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="edge-glow rounded-[var(--radius-card)] bg-gradient-to-br from-ink-800 to-ink-900 p-7 sm:p-10">
            <SectionHeading
              id="privacy-title"
              eyebrow={c.principles.eyebrow}
              title={c.principles.title}
              description={<p>{c.principles.description}</p>}
            />
            <ul role="list" className="mt-8 grid gap-3 sm:grid-cols-2">
              {c.principles.rules.map((r) => (
                <li key={r} className="flex gap-2.5 text-sm text-text/90">
                  <CheckCircle2 aria-hidden="true" size={17} className="mt-0.5 shrink-0 text-emerald-300" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <Card className="sm:p-10">
            <h3 className="font-display text-xl font-semibold text-text">{c.limitations.title}</h3>
            <p className="mt-2 text-sm text-muted">{c.limitations.intro}</p>
            <ul role="list" className="mt-6 space-y-3.5">
              {c.limitations.items.map((l) => (
                <li key={l} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-300" />
                  {l}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* NATIONAL CONTEXT */}
      <Section labelledBy="national-title" className="border-t border-line">
        <SectionHeading
          id="national-title"
          eyebrow={c.nationalContext.eyebrow}
          title={c.nationalContext.title}
          description={<p>{c.nationalContext.description}</p>}
        />
        <ol role="list" className="mt-12 grid gap-5 lg:grid-cols-3">
          {c.nationalContext.items.map((d) => (
            <li key={d.title}>
              <Card className="flex h-full flex-col gap-4">
                <div className="flex items-center gap-3">
                  <IconTile icon="landmark" accent="pulse" className="shrink-0" />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">{d.date}</p>
                    <Badge tone="pulse" className="mt-1">
                      {d.kind}
                    </Badge>
                  </div>
                </div>
                <h3 className="font-display text-base font-semibold leading-snug text-text">{d.title}</h3>
                {d.url && (
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-pulse-300 underline-offset-4 hover:underline"
                  >
                    <ExternalLink aria-hidden="true" size={14} /> {c.nationalContext.sourceLink}
                    <span className="sr-only"> {ui.common.opensNewTab}</span>
                  </a>
                )}
              </Card>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-subtle">{c.nationalContext.disclaimer}</p>
      </Section>

      {/* DEMOS */}
      <Section labelledBy="demo-title" className="border-t border-line">
        <SectionHeading id="demo-title" eyebrow={c.demos.eyebrow} title={c.demos.title} description={<p>{c.demos.description}</p>} />
        {media.length > 0 ? (
          <ul role="list" className="mt-12 grid gap-6 md:grid-cols-2">
            {media.map((m) => (
              <li key={m.src}>
                <figure className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-ink-900">
                  <Image src={m.src} alt={m.alt[locale]} width={m.width} height={m.height} className="h-auto w-full" />
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {c.demos.placeholders.map((label) => (
              <div
                key={label}
                className="flex aspect-video flex-col items-center justify-center gap-3 rounded-[var(--radius-card)] border border-dashed border-line-strong bg-ink-900/40 p-6 text-center"
              >
                <ImageIcon aria-hidden="true" size={22} className="text-subtle" />
                <p className="font-medium text-text">{label}</p>
                <Badge tone="violet">{ui.common.comingSoon}</Badge>
              </div>
            ))}
            <p className="text-sm text-subtle sm:col-span-3">
              {c.demos.noteStart}{" "}
              <a href={contextPulse.repositoryUrl} target="_blank" rel="noopener noreferrer" className="text-pulse-300 underline-offset-4 hover:underline">
                {c.demos.noteLink}
                <span className="sr-only"> {ui.common.opensNewTab}</span>
              </a>{" "}
              {c.demos.noteEnd}
            </p>
          </div>
        )}
      </Section>

      {/* JOURNEY */}
      <Section labelledBy="journey-title" className="border-t border-line">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            id="journey-title"
            eyebrow={c.journeyHeading.eyebrow}
            title={c.journeyHeading.title}
            description={<p>{c.journeyHeading.description}</p>}
          />
          <ol role="list" className="relative border-l border-line">
            {c.journey.map((j) => (
              <li key={j.title} className="relative pb-8 pl-8 last:pb-0">
                <span aria-hidden="true" className="absolute -left-[5px] top-1.5 size-2.5 rounded-full border-2 border-ink-950 bg-pulse-400" />
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-subtle">{j.date}</p>
                <h3 className="mt-1 font-display text-lg font-semibold text-text">{j.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{j.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* TEAM */}
      <Section labelledBy="team-title" className="border-t border-line">
        <SectionHeading id="team-title" eyebrow={c.team.eyebrow} title={c.team.title} description={<p>{c.team.note}</p>} />
        <ul role="list" className="mt-12 grid gap-5 sm:grid-cols-3">
          {c.team.members.map((m) => (
            <li key={m.name}>
              <Card className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pulse-500/30 to-violet-500/30 font-display font-semibold text-text ring-1 ring-line-strong"
                >
                  {initials(m.name)}
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-text">{m.name}</p>
                  {m.note && <p className="text-sm text-muted">{m.note}</p>}
                </div>
              </Card>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">{c.team.builtWith}</h3>
          <ul role="list" className="mt-4 flex flex-wrap gap-2">
            {STACK.map((s) => (
              <li key={s}>
                <Badge>{s}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* EARLY ACCESS */}
      <CtaBand
        id="early-access"
        eyebrow={ea.eyebrow}
        title={contextPulse.betaSignupUrl ? ea.titleOpen : ea.titleClosed}
        description={
          contextPulse.betaSignupUrl ? (
            <p>{ea.bodyOpen}</p>
          ) : (
            <p>
              {ea.bodyClosed}
              {notifyHref ? ea.bodyClosedEmail : "."}
            </p>
          )
        }
      >
        {contextPulse.betaSignupUrl && (
          <ButtonLink href={contextPulse.betaSignupUrl} size="lg" arrow>
            {ea.request}
          </ButtonLink>
        )}
        <ButtonLink href={contextPulse.repositoryUrl} size="lg" variant={contextPulse.betaSignupUrl ? "secondary" : "primary"}>
          <GitHubIcon size={16} /> {ea.watch}
        </ButtonLink>
        {!contextPulse.betaSignupUrl && notifyHref && (
          <ButtonLink href={notifyHref} size="lg" variant="secondary">
            {ea.emailMe}
          </ButtonLink>
        )}
      </CtaBand>
    </>
  );
}
