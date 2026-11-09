import type { ReactNode } from "react";
import { Container } from "@/components/ui/Section";

export function CtaBand({
  id = "cta-title",
  eyebrow,
  title,
  description,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description: ReactNode;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="relative py-20 sm:py-28">
      <Container>
        <div className="edge-glow relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-ink-800 via-ink-850 to-ink-900 px-6 py-14 sm:px-12 sm:py-16">
          <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_bottom_right,#000_10%,transparent_65%)]" />
          <div aria-hidden="true" className="absolute -bottom-32 -right-24 size-[420px] rounded-full bg-violet-500/15 blur-3xl" />
          <div aria-hidden="true" className="absolute -left-24 -top-32 size-[380px] rounded-full bg-pulse-500/15 blur-3xl" />
          <div className="relative max-w-2xl">
            {eyebrow && <p className="font-mono text-xs uppercase tracking-[0.18em] text-pulse-300">{eyebrow}</p>}
            <h2 id={id} className="mt-3 font-display text-3xl font-semibold tracking-tight text-text text-balance sm:text-4xl">
              {title}
            </h2>
            <div className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{description}</div>
            <div className="mt-8 flex flex-wrap gap-3">{children}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
