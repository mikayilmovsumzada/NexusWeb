import type { Metadata } from "next";
import { getContent } from "@/i18n/server";
import { Container } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

export async function generateMetadata(): Promise<Metadata> {
  const { ui } = await getContent();
  return { title: ui.notFound.metaTitle, robots: { index: false } };
}

export default async function NotFound() {
  const t = (await getContent()).ui.notFound;
  return (
    <section aria-labelledby="nf-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,#000_10%,transparent_65%)]" />
      <Container className="relative flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-pulse-300">{t.kicker}</p>
        <h1 id="nf-title" className="mt-5 font-display text-4xl font-semibold tracking-tight text-text sm:text-5xl">
          {t.title}
        </h1>
        <p className="mt-4 max-w-md text-muted">{t.body}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" arrow>
            {t.home}
          </ButtonLink>
          <ButtonLink href="/products" variant="secondary">
            {t.products}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
