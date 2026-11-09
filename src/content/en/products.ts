export const productsContent = {
  meta: {
    title: "Products",
    description:
      "Original technology products developed within the NexusWeb ecosystem, starting with ContextPulse AI — a privacy-first developer context-recovery tool.",
  },

  /** Translatable copy per product, keyed by slug (structure lives in src/content/products.ts). */
  items: {
    "contextpulse-ai": {
      name: "ContextPulse AI",
      tagline: "Get back into flow after an interruption — without being watched.",
      description:
        "A privacy-first developer workflow and context-recovery tool. It uses IDE and pull-request metadata to remind developers where they left off, and shows team leads blockers only at an anonymised, team level.",
    },
  } as Record<string, { name: string; tagline: string; description: string }>,

  hero: {
    eyebrow: "NexusWeb Products",
    title: "Software that solves real problems.",
    description:
      "NexusWeb develops original products in the open. Each one starts from a practical problem, is built with privacy and security in mind, and is described honestly — including what isn't finished yet.",
  },

  listTitle: "All products",

  next: {
    title: "The next product isn't decided yet",
    body: "New products will appear here as the ecosystem grows. Have an idea or a problem worth solving together?",
    cta: "Propose a project",
  },

  cta: {
    eyebrow: "Built in the open",
    title: "Follow products as they take shape.",
    description: "Every NexusWeb product shares its progress publicly — from the first prototype onwards.",
    explore: "Explore ContextPulse AI",
    involved: "Ways to get involved",
  },
};

export type ProductsContent = typeof productsContent;
