import type { Locale } from "@/i18n/config";
import { az } from "./az";
import { en, type Content } from "./en";

const byLocale: Record<Locale, Content> = { en, az };

export function getContentFor(locale: Locale): Content {
  return byLocale[locale];
}

export type { Content };
