"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps } from "react";
import { defaultLocale, hasLocale, localizePath } from "./config";

/**
 * Drop-in replacement for next/link that keeps visitors in their language:
 * internal hrefs ("/about") are prefixed for the current locale ("/az/about").
 * Usable from both Server and Client Components.
 */
export function LocaleLink({ href, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  const params = useParams<{ locale?: string }>();
  const locale = hasLocale(params?.locale) ? params.locale : defaultLocale;
  return <Link href={localizePath(locale, href)} {...props} />;
}
