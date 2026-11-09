import type { ReactNode } from "react";
import { Container, Eyebrow } from "@/components/ui/Section";
import { NetworkCanvas } from "@/components/visuals/NetworkCanvas";
import { cn } from "@/lib/cn";
import type { Accent } from "@/content/types";

const glow: Record<Accent, string> = {
  pulse: "from-pulse-500/25",
  violet: "from-violet-500/25",
  signal: "from-signal-400/20",
};

/** Hero used at the top of every inner page. */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  accent = "pulse",
  badge,
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
  accent?: Accent;
  badge?: ReactNode;
}) {
  return (
    <section aria-labelledby="page-title" className="relative overflow-hidden border-b border-line">
      <div aria-hidden="true" className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />
      <div
        aria-hidden="true"
        className={cn("absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-radial to-transparent to-70% blur-2xl", glow[accent])}
      />
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-1/2 opacity-60 [mask-image:linear-gradient(to_left,#000,transparent)] lg:block">
        <NetworkCanvas density={0.7} />
      </div>
      <Container className="relative pb-16 pt-16 sm:pb-24 sm:pt-24">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <Eyebrow>{eyebrow}</Eyebrow>
            {badge}
          </div>
          <h1
            id="page-title"
            className="mt-5 font-display text-4xl font-semibold tracking-tight text-text text-balance sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]"
          >
            {title}
          </h1>
          <div className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg text-pretty">{description}</div>
          {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
