import { Container } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

/** Shared layout for error pages (404, 403): same grid backdrop, typography and actions. */
export function StatusPage({
  kicker,
  title,
  body,
  primary,
  secondary,
}: {
  kicker: string;
  title: string;
  body: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
}) {
  return (
    <section aria-labelledby="status-page-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,#000_10%,transparent_65%)]" />
      <Container className="relative flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-pulse-300">{kicker}</p>
        <h1 id="status-page-title" className="mt-5 font-display text-4xl font-semibold tracking-tight text-text sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-md text-muted">{body}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href={primary.href} arrow>
            {primary.label}
          </ButtonLink>
          <ButtonLink href={secondary.href} variant="secondary">
            {secondary.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
