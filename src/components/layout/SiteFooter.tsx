import { siteConfig } from "@/config/site";
import { getContent } from "@/i18n/server";
import { LocaleLink } from "@/i18n/LocaleLink";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Section";
import { SocialLinks } from "@/components/ui/SocialLinks";

export async function SiteFooter() {
  const { ui } = await getContent();
  return (
    <footer className="relative border-t border-line bg-ink-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pulse-400/50 to-transparent"
      />
      <Container className="grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <LocaleLink href="/" aria-label={ui.nav.homeAria} className="inline-block rounded-lg">
            <Logo />
          </LocaleLink>
          <p className="mt-4 text-sm leading-relaxed text-muted">{ui.site.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-subtle">{ui.footer.initiative}</p>
          <SocialLinks className="mt-6" includeRepository />
        </div>
        {ui.footer.groups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">{group.title}</h2>
            <ul role="list" className="mt-4 space-y-3">
              {group.items.map((item) => (
                <li key={item.href}>
                  <LocaleLink href={item.href} className="text-sm text-muted transition-colors hover:text-text">
                    {item.label}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <Container className="flex flex-col gap-2 border-t border-line py-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {siteConfig.copyrightYear} NexusWeb. {ui.footer.builtInOpen}
        </p>
        <p>{ui.footer.noTracking}</p>
      </Container>
    </footer>
  );
}
