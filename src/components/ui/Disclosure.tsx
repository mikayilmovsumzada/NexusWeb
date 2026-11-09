import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Accessible expandable panel built on native <details>/<summary>:
 * keyboard and screen-reader support with zero JavaScript.
 */
export function Disclosure({
  summary,
  children,
  defaultOpen = false,
  className,
}: {
  summary: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}) {
  return (
    <details
      open={defaultOpen}
      className={cn(
        "group rounded-[var(--radius-card)] border border-line bg-gradient-to-b from-ink-800/70 to-ink-900/70 transition-colors open:border-line-strong",
        className,
      )}
    >
      <summary className="flex cursor-pointer list-none items-center gap-4 p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0 flex-1">{summary}</div>
        <ChevronDown
          aria-hidden="true"
          size={20}
          className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <div className="px-5 pb-6 sm:px-6">{children}</div>
    </details>
  );
}
