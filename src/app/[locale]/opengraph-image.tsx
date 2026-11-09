import { getContentFor } from "@/content";
import { defaultLocale, hasLocale, locales } from "@/i18n/config";
import { renderOgImage, ogSize } from "@/lib/og";

export const alt = "NexusWeb — Where Ideas, People & Technology Connect.";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { ui } = getContentFor(hasLocale(locale) ? locale : defaultLocale);
  return renderOgImage({ eyebrow: ui.og.homeEyebrow, title: ui.og.homeTitle, subtitle: ui.site.tagline });
}
