import type { ReactNode } from "react";
import type { Status } from "@/content/types";
import { getContent } from "@/i18n/server";
import { cn } from "@/lib/cn";

const tones = {
  pulse: "border-pulse-400/35 bg-pulse-500/10 text-pulse-300",
  violet: "border-violet-400/35 bg-violet-500/10 text-violet-300",
  amber: "border-amber-300/30 bg-amber-300/10 text-amber-300",
  emerald: "border-emerald-300/30 bg-emerald-300/10 text-emerald-300",
  signal: "border-signal-400/35 bg-signal-400/10 text-signal-300",
  neutral: "border-line-strong bg-ink-800/40 text-muted",
} as const;

export type Tone = keyof typeof tones;

const statusTone: Record<Status, Tone> = {
  live: "emerald",
  "in-development": "pulse",
  planned: "violet",
  exploring: "amber",
  forming: "signal",
};

export function Badge({ children, tone = "neutral", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[0.7rem] uppercase tracking-[0.08em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Status pill with a live dot. Always pairs colour with a (localised) text label. */
export async function StatusBadge({ status, className }: { status: Status; className?: string }) {
  const { ui } = await getContent();
  return (
    <Badge tone={statusTone[status]} className={className}>
      <span
        aria-hidden="true"
        className={cn("size-1.5 rounded-full bg-current", status === "in-development" && "animate-pulse-dot")}
      />
      <span>
        <span className="sr-only">{ui.common.statusPrefix}</span>
        {ui.status[status]}
      </span>
    </Badge>
  );
}
