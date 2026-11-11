import type { UiContent } from "../en/ui";

export const ui: UiContent = {
  site: {
    tagline: "İdeyaların, insanların və texnologiyanın birləşdiyi yer.",
    description:
      "NexusWeb kibertəhlükəsizlik, süni intellekt və proqram təminatı sahələrində insanları, ideyaları, bilikləri və rəqəmsal məhsulları birləşdirən, yeni formalaşan texnologiya ekosistemidir.",
  },

  nav: {
    mainLabel: "Əsas menyu",
    home: "Ana səhifə",
    homeAria: "NexusWeb ana səhifə",
    skipToContent: "Məzmuna keç",
    openMenu: "Menyunu aç",
    closeMenu: "Menyunu bağla",
    headerCta: "ContextPulse AI",
    mobileCta: "ContextPulse AI ilə tanış olun",
    themeToggle: "İşıqlı və qaranlıq tema arasında keçid",
    language: "Dil",
    items: [
      { label: "Haqqımızda", href: "/about" },
      { label: "Məhsullar", href: "/products" },
      { label: "Təhsil", href: "/learn" },
      { label: "İcma", href: "/community" },
      { label: "Əlaqə", href: "/contact" },
    ],
  },

  footer: {
    initiative: "Yeni formalaşan, müstəqil texnologiya təşəbbüsü — açıq şəkildə böyüyür.",
    builtInOpen: "Açıq şəkildə qurulur.",
    noTracking: "Bu saytda izləmə və analitika yoxdur.",
    groups: [
      {
        title: "Ekosistem",
        items: [
          { label: "Məhsullar", href: "/products" },
          { label: "ContextPulse AI", href: "/products/contextpulse-ai" },
          { label: "Təhsil", href: "/learn" },
          { label: "İcma", href: "/community" },
        ],
      },
      {
        title: "NexusWeb",
        items: [
          { label: "Haqqımızda", href: "/about" },
          { label: "Əlaqə", href: "/contact" },
        ],
      },
    ],
  },

  common: {
    opensNewTab: "(yeni pəncərədə açılır)",
    statusPrefix: "Status: ",
    repoLabel: "GitHub-da ContextPulse AI",
    comingSoon: "Tezliklə",
  },

  status: {
    live: "Aktiv",
    "in-development": "Hazırlanır",
    planned: "Planlaşdırılır",
    exploring: "Araşdırılır",
    forming: "Formalaşır",
  },

  categories: {
    "Artificial Intelligence": "Süni intellekt",
    Cybersecurity: "Kibertəhlükəsizlik",
    "Software Development": "Proqram təminatı",
    "Developer Productivity": "Proqramçı məhsuldarlığı",
    Privacy: "Məxfilik",
    "Technology Education": "Texnologiya təhsili",
  },

  productCard: {
    kicker: "NexusWeb məhsulu",
    categoriesLabel: "Texnologiya kateqoriyaları",
    details: "Məhsul haqqında ətraflı",
    repository: "Repozitoriya",
    repositoryFor: "—",
  },

  ecosystemDiagram: {
    title: "NexusWeb ekosistemi",
    description: "Məhsullar, Təhsil və İcma — həm bir-biri ilə, həm də NexusWeb nüvəsi ilə əlaqəlidir.",
    products: "Məhsullar",
    education: "Təhsil",
    community: "İcma",
  },

  reminder: {
    welcome: "Xoş gəldiniz",
    away: "42 dəqiqəlik fasilədən sonra",
    sentenceStart: "Siz bu funksiyada valyuta təhlilini düzəldirdiniz:",
    sentenceEnd: ". Bir test hələ də uğursuzdur.",
    items: [
      { k: "Son dəyişiklik", v: "parseInvoice()", sub: "billing/parser.py" },
      { k: "Uğursuz test", v: "test_parse_currency", sub: "1 xəta" },
      { k: "Açıq rəy", v: "2 həll olunmamış şərh", sub: "pull request-inizdə" },
    ],
    footnote: "Yalnız IDE və PR metadatası əsasında — ekran və klaviatura izlənmir.",
    caption: "Konsept təsviri · məhsulun ekran görüntüsü deyil",
  },

  notFound: {
    metaTitle: "Səhifə tapılmadı",
    kicker: "404 · Əlaqə tapılmadı",
    title: "Bu node şəbəkədə yoxdur.",
    body: "Axtardığınız səhifə mövcud deyil və ya başqa ünvana köçürülüb.",
    home: "Ana səhifəyə qayıt",
    products: "Məhsullara bax",
  },

  forbidden: {
    metaTitle: "Giriş qadağandır",
    kicker: "403 · Giriş qadağandır",
    title: "Bu node qorunur.",
    body: "Bu səhifəni açmaq üçün icazəniz yoxdur.",
    home: "Ana səhifəyə qayıt",
    contact: "Bizimlə əlaqə",
  },

  og: {
    homeEyebrow: "Texnologiya ekosistemi",
    homeTitle: "Ağılları birləşdiririk. Gələcəyi qururuq.",
    productEyebrow: "NexusWeb məhsulu",
  },
};
