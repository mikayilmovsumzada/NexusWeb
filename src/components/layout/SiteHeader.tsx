"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { splitLocale } from "@/i18n/config";
import { LocaleLink } from "@/i18n/LocaleLink";
import { Logo } from "@/components/ui/Logo";
import { buttonClasses } from "@/components/ui/ButtonBase";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";

export type HeaderLabels = {
  nav: Array<{ label: string; href: string }>;
  mainLabel: string;
  home: string;
  homeAria: string;
  skipToContent: string;
  openMenu: string;
  closeMenu: string;
  headerCta: string;
  mobileCta: string;
  themeToggle: string;
  language: string;
};

function isActive(path: string, href: string) {
  if (href === "/") return path === "/";
  return path === href || path.startsWith(`${href}/`);
}

export function SiteHeader({ labels }: { labels: HeaderLabels }) {
  const { path } = splitLocale(usePathname() ?? "/");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Cache Components keeps routes mounted (React <Activity>); reset the menu when hidden.
  useLayoutEffect(() => () => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the menu and returns focus; lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close the mobile menu if the viewport grows past the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || open ? "border-line bg-ink-950/85 backdrop-blur-xl" : "border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-pulse-500 focus:px-4 focus:py-2 focus:text-white"
      >
        {labels.skipToContent}
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <LocaleLink href="/" onNavigate={close} aria-label={labels.homeAria} className="shrink-0 rounded-lg">
          <Logo />
        </LocaleLink>

        <nav aria-label={labels.mainLabel} className="hidden lg:block">
          <ul role="list" className="flex items-center gap-1">
            {labels.nav.map((item) => {
              const active = isActive(path, item.href);
              return (
                <li key={item.href}>
                  <LocaleLink
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-3 py-2 text-sm transition-colors",
                      active ? "text-text" : "text-muted hover:text-text",
                    )}
                  >
                    {item.label}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-pulse-400 to-violet-400"
                      />
                    )}
                  </LocaleLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Wrappers carry the responsive display, so it never conflicts with the children's own inline-flex. */}
          <div className="hidden sm:block">
            <LanguageSwitcher label={labels.language} />
          </div>
          <ThemeToggle label={labels.themeToggle} />
          <div className="hidden xl:block">
            <LocaleLink href="/products/contextpulse-ai" className={buttonClasses("secondary", "md")}>
              {labels.headerCta}
            </LocaleLink>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-line-strong text-text lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">{open ? labels.closeMenu : labels.openMenu}</span>
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-ink-950 lg:hidden"
      >
        <nav aria-label={labels.mainLabel}>
          <ul role="list" className="flex flex-col gap-1 px-4 py-6">
            {[{ label: labels.home, href: "/" }, ...labels.nav].map((item) => {
              const active = isActive(path, item.href);
              return (
                <li key={item.href}>
                  <LocaleLink
                    href={item.href}
                    onNavigate={close}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-lg",
                      active ? "bg-ink-800 text-text" : "text-muted hover:bg-ink-850 hover:text-text",
                    )}
                  >
                    {item.label}
                    {active && <span aria-hidden="true" className="size-1.5 rounded-full bg-pulse-400" />}
                  </LocaleLink>
                </li>
              );
            })}
            <li className="mt-4 px-1">
              <LocaleLink href="/products/contextpulse-ai" onNavigate={close} className={buttonClasses("primary", "lg", "w-full")}>
                {labels.mobileCta}
              </LocaleLink>
            </li>
            <li className="mt-6 flex justify-center sm:hidden">
              <LanguageSwitcher label={labels.language} onSwitch={close} />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
