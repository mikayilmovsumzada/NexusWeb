import type { Status, TechCategory } from "../types";

/** Shared interface copy: navigation, header/footer, badges, illustrations, 404. */
export const ui = {
  site: {
    tagline: "Where Ideas, People & Technology Connect.",
    description:
      "NexusWeb is an emerging technology ecosystem connecting people, ideas, knowledge and digital products across cybersecurity, AI and software development.",
  },

  nav: {
    mainLabel: "Main",
    home: "Home",
    homeAria: "NexusWeb home",
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    headerCta: "ContextPulse AI",
    mobileCta: "Discover ContextPulse AI",
    themeToggle: "Switch between light and dark theme",
    language: "Language",
    items: [
      { label: "About", href: "/about" },
      { label: "Products", href: "/products" },
      { label: "Learn", href: "/learn" },
      { label: "Community", href: "/community" },
      { label: "Contact", href: "/contact" },
    ],
  },

  footer: {
    initiative: "An emerging, independent technology initiative — growing in public.",
    builtInOpen: "Built in the open.",
    noTracking: "No tracking or analytics on this site.",
    groups: [
      {
        title: "Ecosystem",
        items: [
          { label: "Products", href: "/products" },
          { label: "ContextPulse AI", href: "/products/contextpulse-ai" },
          { label: "Learn", href: "/learn" },
          { label: "Community", href: "/community" },
        ],
      },
      {
        title: "NexusWeb",
        items: [
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ],
      },
    ],
  },

  common: {
    opensNewTab: "(opens in a new tab)",
    statusPrefix: "Status: ",
    repoLabel: "ContextPulse AI on GitHub",
    comingSoon: "Coming soon",
  },

  status: {
    live: "Live",
    "in-development": "In Development",
    planned: "Planned",
    exploring: "Exploring",
    forming: "Forming",
  } as Record<Status, string>,

  categories: {
    "Artificial Intelligence": "Artificial Intelligence",
    Cybersecurity: "Cybersecurity",
    "Software Development": "Software Development",
    "Developer Productivity": "Developer Productivity",
    Privacy: "Privacy",
    "Technology Education": "Technology Education",
  } as Record<TechCategory, string>,

  productCard: {
    kicker: "NexusWeb Product",
    categoriesLabel: "Technology categories",
    details: "View product details",
    repository: "Repository",
    repositoryFor: "for",
  },

  ecosystemDiagram: {
    title: "The NexusWeb ecosystem",
    description: "Products, Education and Community, each connected to one another and to the NexusWeb core.",
    products: "Products",
    education: "Education",
    community: "Community",
  },

  reminder: {
    welcome: "Welcome back",
    away: "after 42 min away",
    sentenceStart: "You were fixing currency parsing in",
    sentenceEnd: ". One test is still failing.",
    items: [
      { k: "Last edit", v: "parseInvoice()", sub: "billing/parser.py" },
      { k: "Failing test", v: "test_parse_currency", sub: "1 failure" },
      { k: "Open review", v: "2 unresolved comments", sub: "on your pull request" },
    ],
    footnote: "Built from IDE & PR metadata only — no screen or keystroke capture.",
    caption: "Concept illustration · not a product screenshot",
  },

  notFound: {
    metaTitle: "Page not found",
    kicker: "404 · Connection not found",
    title: "This node isn't on the network.",
    body: "The page you're looking for doesn't exist or has moved.",
    home: "Back to home",
    products: "See products",
  },

  og: {
    homeEyebrow: "Technology ecosystem",
    homeTitle: "Connecting Minds. Building What's Next.",
    productEyebrow: "NexusWeb Product",
  },
};

export type UiContent = typeof ui;
