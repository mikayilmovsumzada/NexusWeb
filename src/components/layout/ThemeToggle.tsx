"use client";

import { useEffect, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";
import { cn } from "@/lib/cn";

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

/**
 * Light/dark switch. The icon is chosen purely with CSS (`light:` variant), so
 * server and client markup always match — no hydration mismatch, no flash.
 *
 * Transition: where the View Transitions API is available, the new theme is
 * revealed in a circle expanding from the button. Otherwise colours cross-fade.
 * With reduced motion the switch is instant.
 */
export function ThemeToggle({ label, className }: { label: string; className?: string }) {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const stored = (): Theme | null => {
      try {
        const v = localStorage.getItem(THEME_STORAGE_KEY);
        return v === "light" || v === "dark" ? v : null;
      } catch {
        return null;
      }
    };

    // Safety net: if React re-rendered <html> (e.g. a streamed 404) and dropped the
    // attribute set by the inline script, restore it.
    if (!document.documentElement.dataset.theme) applyTheme(stored() ?? (mq.matches ? "light" : "dark"));

    // Follow OS changes until the visitor makes an explicit choice.
    const onChange = () => {
      if (!stored()) applyTheme(mq.matches ? "light" : "dark");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function toggle(e: MouseEvent<HTMLButtonElement>) {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      applyTheme(next);
      return;
    }

    if (!document.startViewTransition) {
      const root = document.documentElement;
      root.classList.add("theme-fade");
      applyTheme(next);
      window.setTimeout(() => root.classList.remove("theme-fade"), 400);
      return;
    }

    // Origin of the reveal: the pointer, or the button centre for keyboard use.
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || rect.left + rect.width / 2;
    const y = e.clientY || rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = document.startViewTransition(() => {
      flushSync(() => applyTheme(next));
    });
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 550, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "relative inline-flex size-10 items-center justify-center rounded-full border border-line-strong text-muted transition-colors hover:border-pulse-400/60 hover:text-text",
        className,
      )}
    >
      {/* Dark theme shows the sun (switch to light); light theme shows the moon. */}
      <Sun aria-hidden="true" size={17} className="light:hidden" />
      <Moon aria-hidden="true" size={17} className="hidden light:block" />
    </button>
  );
}
