import { Lock } from "lucide-react";
import { getContent } from "@/i18n/server";
import { cn } from "@/lib/cn";

/**
 * An illustrative mock of the kind of context reminder ContextPulse AI
 * produces. It is explicitly labelled as a concept illustration, not a
 * screenshot — swap in real screenshots via `contextPulseContent.media`.
 */
export async function ReminderIllustration({ className }: { className?: string }) {
  const t = (await getContent()).ui.reminder;
  return (
    <figure className={cn("relative", className)}>
      <div className="glass edge-glow rounded-[1.5rem] p-5 shadow-[0_30px_80px_-30px_rgb(58_123_255/0.45)] sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-pulse-400 opacity-50 motion-reduce:hidden" />
              <span className="relative inline-flex size-2.5 rounded-full bg-pulse-400" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-pulse-300">{t.welcome}</span>
          </div>
          <span className="text-right font-mono text-[0.7rem] text-subtle">{t.away}</span>
        </div>
        <p className="mt-4 font-display text-lg leading-snug text-text">
          {t.sentenceStart} <span className="text-pulse-300">parseInvoice()</span>
          {t.sentenceEnd}
        </p>
        <dl className="mt-5 space-y-2.5">
          {t.items.map((i) => (
            <div key={i.k} className="flex items-center justify-between gap-4 rounded-xl border border-line bg-ink-950/50 px-4 py-3">
              <dt className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-subtle">{i.k}</dt>
              <dd className="text-right">
                <span className="block font-mono text-sm text-text">{i.v}</span>
                <span className="block text-xs text-subtle">{i.sub}</span>
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-xs text-muted">
          <Lock aria-hidden="true" size={13} className="shrink-0 text-emerald-300" /> {t.footnote}
        </div>
      </div>
      <figcaption className="mt-3 text-center font-mono text-[0.7rem] uppercase tracking-[0.14em] text-subtle">{t.caption}</figcaption>
    </figure>
  );
}
