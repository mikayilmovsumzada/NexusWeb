/**
 * Technical articles, tutorials and recommended material shown in the carousel
 * on the Learn page (/learn#resources).
 *
 * To add an item, put a new object at the TOP of the list (newest first):
 *   kind:     "article"  – our own article (e.g. posted on LinkedIn, Medium, Instagram)
 *             "tutorial" – our own tutorial or video lesson
 *             "curated"  – useful material by someone else that we recommend
 *   title:    the title as published (any language)
 *   source:   where it lives, e.g. "LinkedIn", "YouTube", "Instagram", "OWASP"
 *   url:      full https:// link
 *   lang:     language of the material ("az" or "en")
 *   date:     optional, "YYYY-MM-DD": the day the item was added to this site (not the original publication date)
 *   summary:  optional, one or two sentences
 *   author:   optional, shown on the card; use it for material written by someone else
 *
 * PDFs we host (with the author's permission) live in public/resources/ and use url "/resources/<file>.pdf".
 *
 * While the list is empty, the page shows an honest "first posts are on their way" panel.
 */

export type ResourceKind = "article" | "tutorial" | "curated";

export type Resource = {
  kind: ResourceKind;
  title: string;
  source: string;
  url: string;
  lang: "az" | "en";
  date?: string;
  summary?: string;
  author?: string;
};

export const resources: Resource[] = [
  {
    kind: "curated",
    title: "Web Security",
    source: "PDF · 7 səh.",
    url: "/resources/web-security.pdf",
    lang: "az",
    date: "2026-11-14",
    summary: "Veb tətbiqlərin hücum səthi, OWASP Top 10 kateqoriyaları və front-end / back-end zəifliklərinə ümumi baxış.",
  },
  {
    kind: "curated",
    title: "HTTP Fundamentals",
    source: "PDF · 8 səh.",
    url: "/resources/http-fundamentals.pdf",
    lang: "az",
    date: "2026-11-14",
    summary: "HTTP sorğu və cavabları, URL-in quruluşu, başlıqlar və status kodları.",
  },
  {
    kind: "curated",
    title: "Introduction to Web Applications",
    source: "PDF · 13 səh.",
    url: "/resources/introduction-to-web-applications.pdf",
    lang: "az",
    date: "2026-11-14",
    summary: "Veb tətbiq nədir, infrastruktur modelləri, komponentlər, mikroxidmətlər, front-end və back-end.",
  },
  {
    kind: "curated",
    title: "Kompyuterin əsasları: mikroprosessor və aparat təminatı",
    source: "PDF · 13 səh.",
    url: "/resources/kompyuter-esaslari-mikroprosessor.pdf",
    lang: "az",
    date: "2026-11-14",
    summary: "Mikroprosessor, BIOS/CMOS, operativ və daxili yaddaş, videokart, drayverlər, msconfig və İdarəetmə paneli.",
  },
];
