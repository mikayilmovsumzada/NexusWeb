import { getContentFor } from "@/content";
import { defaultLocale, hasLocale, locales } from "@/i18n/config";
import { renderOgImage, ogSize } from "@/lib/og";

export const alt = "ContextPulse AI — a privacy-first developer context-recovery tool by NexusWeb (in development).";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { ui, contextPulse } = getContentFor(hasLocale(locale) ? locale : defaultLocale);
  return renderOgImage({
    eyebrow: ui.og.productEyebrow,
    status: ui.status["in-development"],
    title: "ContextPulse AI",
    subtitle: contextPulse.meta.ogSubtitle,
  });
}
