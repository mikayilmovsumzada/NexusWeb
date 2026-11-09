"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { LOCALE_COOKIE, localeMeta, locales, localizePath, splitLocale, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

function rememberLocale(locale: Locale) {
  // One year; read by src/proxy.ts so unprefixed URLs respect the explicit choice.
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

/**
 * EN / AZ segmented switch. Links to the same page in the other language and
 * remembers the choice. Prefetch is off so the cookie is set before the request.
 */
export function LanguageSwitcher({ label, className, onSwitch }: { label: string; className?: string; onSwitch?: () => void }) {
  const pathname = usePathname() ?? "/";
  const { locale: current, path } = splitLocale(pathname);

  return (
    <nav aria-label={label} className={cn("inline-flex items-center gap-1", className)}>
      <Languages aria-hidden="true" size={15} className="mr-1 text-subtle" />
      <ul role="list" className="inline-flex rounded-full border border-line-strong p-0.5">
        {locales.map((l) => {
          const active = l === current;
          return (
            <li key={l}>
              <Link
                href={localizePath(l, path)}
                prefetch={false}
                hrefLang={localeMeta[l].htmlLang}
                lang={localeMeta[l].htmlLang}
                aria-current={active ? "true" : undefined}
                title={localeMeta[l].label}
                onClick={() => {
                  rememberLocale(l);
                  onSwitch?.();
                }}
                className={cn(
                  "inline-flex h-8 min-w-9 items-center justify-center rounded-full px-2.5 font-mono text-xs tracking-wider transition-colors",
                  active ? "bg-pulse-500 text-white" : "text-muted hover:text-text",
                )}
              >
                <span aria-hidden="true">{localeMeta[l].short}</span>
                <span className="sr-only">{localeMeta[l].label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
