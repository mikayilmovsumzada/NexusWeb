import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "../globals.css";
import { siteConfig } from "@/config/site";
import { localeMeta, locales } from "@/i18n/config";
import { getContent, getLocale } from "@/i18n/server";
import { themeInitScript } from "@/lib/theme";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { InlineScript } from "@/components/layout/InlineScript";

const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext"], display: "swap" });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin", "latin-ext"], display: "swap" });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin", "latin-ext"], display: "swap" });

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { ui } = await getContent();
  const title = `${siteConfig.name} — ${ui.site.tagline}`;
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: title, template: `%s · ${siteConfig.name}` },
    description: ui.site.description,
    applicationName: siteConfig.name,
    keywords: ["NexusWeb", "ContextPulse AI", "cybersecurity", "artificial intelligence", "software development", "technology education", "kibertəhlükəsizlik", "süni intellekt"],
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#04060c" },
    { media: "(prefers-color-scheme: light)", color: "#f5f7fc" },
  ],
  colorScheme: "dark light",
};

export default async function RootLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await getLocale();
  const { ui } = await getContent();

  return (
    // data-theme is set by the inline script before first paint; React must not fight it.
    <html
      lang={localeMeta[locale].htmlLang}
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <InlineScript html={themeInitScript} />
      </head>
      <body className="flex min-h-full flex-col">
        <SiteHeader
          labels={{
            nav: ui.nav.items,
            mainLabel: ui.nav.mainLabel,
            home: ui.nav.home,
            homeAria: ui.nav.homeAria,
            skipToContent: ui.nav.skipToContent,
            openMenu: ui.nav.openMenu,
            closeMenu: ui.nav.closeMenu,
            headerCta: ui.nav.headerCta,
            mobileCta: ui.nav.mobileCta,
            themeToggle: ui.nav.themeToggle,
            language: ui.nav.language,
          }}
        />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
