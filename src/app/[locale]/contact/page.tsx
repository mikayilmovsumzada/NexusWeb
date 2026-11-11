import type { Metadata } from "next";
import { ArrowUpRight, GraduationCap, Phone } from "lucide-react";
import { siteConfig, composeHref, formatPhone } from "@/config/site";
import { getContent } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { LocaleLink } from "@/i18n/LocaleLink";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Section } from "@/components/ui/Section";
import { Card, IconTile } from "@/components/ui/Card";
import { buttonClasses } from "@/components/ui/ButtonBase";
import { GitHubIcon } from "@/components/ui/Icon";
import { SocialLinks } from "@/components/ui/SocialLinks";

export async function generateMetadata(): Promise<Metadata> {
  const { contact } = await getContent();
  return pageMetadata({ ...contact.meta, path: "/contact" });
}

export default async function ContactPage() {
  const { contact: c, ui } = await getContent();
  const email = siteConfig.contactEmail;
  const phone = siteConfig.contactPhone;

  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} description={<p>{c.hero.description}</p>} />

      <Section labelledBy="contact-form-title">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            {/* Course enrolment: the main action for students, so it stands apart from the other reasons. */}
            <div className="edge-glow relative overflow-hidden rounded-[var(--radius-card)] bg-gradient-to-br from-pulse-500/25 via-ink-850 to-violet-500/20 p-6 sm:p-7">
              <div aria-hidden="true" className="absolute -right-16 -top-16 size-48 rounded-full bg-pulse-500/20 blur-3xl" />
              <div className="relative">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-pulse-500 text-white shadow-[0_0_0_1px_rgb(92_157_255/0.5)]">
                    <GraduationCap aria-hidden="true" size={22} />
                  </span>
                  <span className="rounded-full border border-emerald-300/40 bg-emerald-300/10 px-2.5 py-0.5 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-emerald-300">
                    {c.enrollCard.badge}
                  </span>
                </div>
                <h2 className="mt-5 font-display text-2xl font-semibold text-text">{c.enrollCard.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.enrollCard.body}</p>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <a href="#enroll" className={buttonClasses("primary", "md")}>
                    {c.enrollCard.cta}
                  </a>
                  <LocaleLink href="/learn#courses" className="text-sm font-medium text-pulse-300 underline-offset-4 hover:underline">
                    {c.enrollCard.courses}
                  </LocaleLink>
                </div>
              </div>
            </div>

            <h2 className="mt-12 font-display text-2xl font-semibold text-text">{c.helpTitle}</h2>
            <ul role="list" className="mt-8 space-y-4">
              {c.reasons.map((r) => {
                const href = composeHref(`[NexusWeb] ${r.subject}`);
                return (
                  <li key={r.title}>
                    <Card className="flex gap-4 p-5 sm:p-5">
                      <IconTile icon={r.icon} className="shrink-0" />
                      <div>
                        <h3 className="font-medium text-text">{r.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{r.body}</p>
                        {href && (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1 text-sm text-pulse-300 underline-offset-4 hover:underline"
                          >
                            {c.emailAboutThis}
                            <ArrowUpRight aria-hidden="true" size={14} className="shrink-0" />
                            <span className="sr-only"> {ui.common.opensNewTab}</span>
                          </a>
                        )}
                      </div>
                    </Card>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">{c.elsewhere}</h3>
              {phone && (
                <p className="flex items-center gap-2 text-sm text-muted">
                  <Phone aria-hidden="true" size={15} className="shrink-0" />
                  {c.phoneLabel}{" "}
                  <a href={`tel:${phone.replace(/\s+/g, "")}`} className="text-text underline-offset-4 hover:underline">
                    {formatPhone(phone)}
                  </a>
                </p>
              )}
              {email && (
                <p className="text-sm text-muted">
                  {c.emailLabel}{" "}
                  <a href={composeHref()} target="_blank" rel="noopener noreferrer" className="text-text underline-offset-4 hover:underline">
                    {email}
                    <span className="sr-only"> {ui.common.opensNewTab}</span>
                  </a>
                </p>
              )}
              <a
                href={`${siteConfig.contextPulse.repositoryUrl}/issues`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
              >
                <GitHubIcon size={16} /> {c.issuesLink}
                <span className="sr-only"> {ui.common.opensNewTab}</span>
              </a>
              <SocialLinks />
            </div>
          </div>

          <div id="form" className="edge-glow scroll-mt-24 self-start rounded-[var(--radius-card)] bg-gradient-to-b from-ink-800/90 to-ink-900/90 p-6 sm:p-9">
            <h2 id="contact-form-title" className="font-display text-2xl font-semibold text-text">
              {c.formTitle}
            </h2>
            <p className="mt-2 mb-7 text-sm text-muted">{c.formRequired}</p>
            <ContactForm t={c.form} />
          </div>
        </div>
      </Section>
    </>
  );
}
