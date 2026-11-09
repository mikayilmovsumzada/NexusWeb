import type { Metadata } from "next";
import { siteConfig, mailtoHref } from "@/config/site";
import { getContent } from "@/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Section } from "@/components/ui/Section";
import { Card, IconTile } from "@/components/ui/Card";
import { GitHubIcon } from "@/components/ui/Icon";
import { SocialLinks } from "@/components/ui/SocialLinks";

export async function generateMetadata(): Promise<Metadata> {
  const { contact } = await getContent();
  return pageMetadata({ ...contact.meta, path: "/contact" });
}

export default async function ContactPage() {
  const { contact: c, ui } = await getContent();
  const email = siteConfig.contactEmail;

  return (
    <>
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} description={<p>{c.hero.description}</p>} />

      <Section labelledBy="contact-form-title">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="font-display text-2xl font-semibold text-text">{c.helpTitle}</h2>
            <ul role="list" className="mt-8 space-y-4">
              {c.reasons.map((r) => {
                const href = mailtoHref(`[NexusWeb] ${r.subject}`);
                return (
                  <li key={r.title}>
                    <Card className="flex gap-4 p-5 sm:p-5">
                      <IconTile icon={r.icon} className="shrink-0" />
                      <div>
                        <h3 className="font-medium text-text">{r.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{r.body}</p>
                        {href && (
                          <a href={href} className="mt-2 inline-block text-sm text-pulse-300 underline-offset-4 hover:underline">
                            {c.emailAboutThis}
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
              {email && (
                <p className="text-sm text-muted">
                  {c.emailLabel}{" "}
                  <a href={`mailto:${email}`} className="text-text underline-offset-4 hover:underline">
                    {email}
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

          <div className="edge-glow rounded-[var(--radius-card)] bg-gradient-to-b from-ink-800/90 to-ink-900/90 p-6 sm:p-9">
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
