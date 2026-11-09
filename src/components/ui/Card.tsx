import type { ReactNode } from "react";
import type { Accent, Feature } from "@/content/types";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-line bg-gradient-to-b from-ink-800/70 to-ink-900/70 p-6 sm:p-7",
        className,
      )}
    >
      {children}
    </div>
  );
}

const accentIcon: Record<Accent, string> = {
  pulse: "text-pulse-300 bg-pulse-500/10 ring-pulse-400/25",
  violet: "text-violet-300 bg-violet-500/10 ring-violet-400/25",
  signal: "text-signal-300 bg-signal-400/10 ring-signal-400/25",
};

export function IconTile({ icon, accent = "pulse", className }: { icon: Feature["icon"]; accent?: Accent; className?: string }) {
  return (
    <span className={cn("inline-flex size-11 items-center justify-center rounded-xl ring-1", accentIcon[accent], className)}>
      <Icon name={icon} size={20} />
    </span>
  );
}

export function FeatureCard({ feature, accent = "pulse", headingLevel = 3 }: { feature: Feature; accent?: Accent; headingLevel?: 3 | 4 }) {
  const Heading = headingLevel === 3 ? "h3" : "h4";
  return (
    <Card className="h-full transition-colors duration-300 hover:border-line-strong">
      <IconTile icon={feature.icon} accent={accent} />
      <Heading className="mt-5 font-display text-lg font-semibold text-text">{feature.title}</Heading>
      <p className="mt-2 text-sm leading-relaxed text-muted">{feature.body}</p>
    </Card>
  );
}

export function FeatureGrid({
  features,
  accent = "pulse",
  columns = 3,
}: {
  features: Feature[];
  accent?: Accent;
  columns?: 2 | 3 | 4;
}) {
  const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <ul role="list" className={cn("grid gap-5", cols)}>
      {features.map((f) => (
        <li key={f.title}>
          <FeatureCard feature={f} accent={accent} />
        </li>
      ))}
    </ul>
  );
}
