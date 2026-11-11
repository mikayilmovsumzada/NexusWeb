"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Resource } from "@/content/resources";
import { cn } from "@/lib/cn";

type Strings = {
  kinds: Record<Resource["kind"], string>;
  prev: string;
  next: string;
  open: string;
  listLabel: string;
  opensNewTab: string;
};

const kindTone: Record<Resource["kind"], string> = {
  article: "border-pulse-400/35 bg-pulse-500/10 text-pulse-300",
  tutorial: "border-violet-400/35 bg-violet-500/10 text-violet-300",
  curated: "border-emerald-300/30 bg-emerald-300/10 text-emerald-300",
};

/**
 * Horizontal carousel built on native scroll-snap: swipe on touch screens,
 * scroll with trackpad, or use the prev/next buttons. Each card is a real link.
 */
export function ResourceCarousel({ items, t, locale }: { items: Resource[]; t: Strings; locale: "en" | "az" }) {
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    update();
    const el = track.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const dateFmt = new Intl.DateTimeFormat(locale === "az" ? "az-AZ" : "en-GB", { day: "numeric", month: "short", year: "numeric" });
  const navBtn =
    "inline-flex size-10 items-center justify-center rounded-full border border-line-strong bg-ink-800/40 text-text transition-colors hover:border-pulse-400/60 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div>
      {items.length > 1 && (
        <div className="mb-5 flex justify-end gap-2">
          <button type="button" className={navBtn} onClick={() => scrollBy(-1)} disabled={edges.start} aria-label={t.prev}>
            <ChevronLeft aria-hidden="true" size={18} />
          </button>
          <button type="button" className={navBtn} onClick={() => scrollBy(1)} disabled={edges.end} aria-label={t.next}>
            <ChevronRight aria-hidden="true" size={18} />
          </button>
        </div>
      )}
      <ul
        ref={track}
        role="list"
        aria-label={t.listLabel}
        className="relative -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto scroll-smooth px-4 pb-4 sm:scroll-px-6 lg:scroll-px-8 [scrollbar-width:thin] sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      >
        {items.map((r) => (
          <li key={r.url} className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]">
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              lang={r.lang}
              className="group relative flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-gradient-to-b from-ink-800/70 to-ink-900/70 p-6 transition-colors hover:border-pulse-400/50"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className={cn("rounded-full border px-2.5 py-0.5 font-mono text-[0.7rem] uppercase tracking-[0.08em]", kindTone[r.kind])}>
                  {t.kinds[r.kind]}
                </span>
                <span className="font-mono text-xs text-subtle">{r.source}</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-text">{r.title}</h3>
              {r.summary && <p className="mt-2 text-sm leading-relaxed text-muted">{r.summary}</p>}
              <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-sm">
                <span className="text-subtle">{r.date ? dateFmt.format(new Date(r.date)) : ""}</span>
                <span className="inline-flex items-center gap-1 font-medium text-pulse-300">
                  {t.open}
                  <ArrowUpRight aria-hidden="true" size={15} className="shrink-0 transition-transform group-hover:-translate-y-px group-hover:translate-x-0.5" />
                </span>
              </div>
              <span className="sr-only"> {t.opensNewTab}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
