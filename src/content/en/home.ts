import type { Accent, Feature, IconName, Status } from "../types";

export type Pillar = {
  key: string;
  icon: IconName;
  accent: Accent;
  name: string;
  status: Status;
  statusNote: string;
  body: string;
  points: string[];
  href: string;
  linkLabel: string;
};

export type BuildingItem = { title: string; status: Status; body: string; href?: string };

export const homeContent = {
  meta: { title: "Home" },

  hero: {
    eyebrow: "An emerging technology ecosystem",
    title: "Connecting Minds. Building What's Next.",
    description:
      "An emerging technology ecosystem where ambitious ideas become digital products, knowledge becomes opportunity, and people build the future together.",
    primaryCta: { label: "Explore Our Ecosystem", href: "#ecosystem" },
    secondaryCta: { label: "Discover ContextPulse AI", href: "/products/contextpulse-ai" },
    focusLabel: "Focus areas",
    focusTags: ["Cybersecurity", "Artificial Intelligence", "Software Development", "Technology Education"],
  },

  ecosystem: {
    eyebrow: "Our ecosystem",
    title: "Three pillars, one connected system.",
    description:
      "NexusWeb is built around products, education and community. Each pillar feeds the others: what we build becomes something to teach, and the people we learn with shape what gets built next.",
    pillars: [
      {
        key: "products",
        icon: "boxes",
        accent: "pulse",
        name: "NexusWeb Products",
        status: "in-development",
        statusNote: "First product in active development",
        body: "Original software that tackles practical problems — designed carefully, built in the open, and honest about where it stands.",
        points: ["ContextPulse AI is our first product", "Public repositories and development updates", "More products as the ecosystem grows"],
        href: "/products",
        linkLabel: "See our products",
      },
      {
        key: "education",
        icon: "graduation",
        accent: "violet",
        name: "NexusWeb Education",
        status: "forming",
        statusNote: "Groups are forming",
        body: "Accessible, hands-on technology learning: cybersecurity, programming and AI, taught through real projects rather than theory alone.",
        points: ["Courses in cybersecurity, AI and programming", "Technical articles and tutorials", "A curated selection of useful material"],
        href: "/learn",
        linkLabel: "See the courses",
      },
      {
        key: "community",
        icon: "users",
        accent: "signal",
        name: "NexusWeb Community",
        status: "forming",
        statusNote: "Early days — help shape it",
        body: "A place for developers, security enthusiasts, students and creators to exchange knowledge, discuss ideas and build together.",
        points: ["Follow and contribute on GitHub", "Share feedback on our products", "Propose collaborations and projects"],
        href: "/community",
        linkLabel: "Explore the community vision",
      },
    ] as Pillar[],
  },

  featured: {
    eyebrow: "Featured product",
    title: "ContextPulse AI",
    tagline: "Pick up exactly where you left off.",
    description:
      "Interruptions break a developer's train of thought. ContextPulse AI uses IDE and pull-request metadata to remind you what you were working on — the last function you changed, the failing test, the unresolved review comment — so you can get back into flow faster.",
    principles: [
      { icon: "eye-off", title: "No screenshots, no keystroke logging", body: "It is designed to work from metadata only. Source code content is not read." },
      { icon: "brain", title: "AI-assisted context recovery", body: "A short, validated reminder of your last working context when you return." },
      { icon: "users", title: "Team insights, not surveillance", body: "Leads see blockers only at team level, and only once enough people report them." },
    ] as Feature[],
    explore: "Explore ContextPulse AI",
    github: "View on GitHub",
  },

  focus: {
    eyebrow: "Our focus",
    title: "Where we spend our energy.",
    description:
      "We concentrate on a few areas where we can learn deeply and build something useful — and where we believe the next generation of technologists needs better resources.",
    areas: [
      {
        icon: "shield",
        title: "Cybersecurity",
        body: "Security-conscious engineering in everything we build, and practical, ethical security education for people starting out.",
      },
      {
        icon: "brain",
        title: "Artificial Intelligence",
        body: "Applying AI where it genuinely helps people, with privacy and verifiable output treated as requirements, not afterthoughts.",
      },
      {
        icon: "code",
        title: "Software Engineering",
        body: "Clean, maintainable, tested software — and sharing how it gets made, from first prototype to production decisions.",
      },
    ] as Feature[],
  },

  building: {
    eyebrow: "What we're building",
    title: "A transparent view of where things stand.",
    description: "No inflated roadmaps. Here is what exists today, what is in progress, and what is still a plan.",
    items: [
      {
        title: "ContextPulse AI",
        status: "in-development",
        body: "Working prototype with a FastAPI backend, AI-generated context reminders, team-level K-anonymous blocker insights and a bilingual (Azerbaijani / English) interface.",
        href: "/products/contextpulse-ai",
      },
      {
        title: "NexusWeb website",
        status: "live",
        body: "The site you are reading: the public home of the ecosystem, built as a reusable foundation for future products and learning content.",
      },
      {
        title: "NexusWeb Education",
        status: "forming",
        body: "Courses in cybersecurity, AI and programming. The first groups are forming and applications are open.",
        href: "/learn",
      },
      {
        title: "NexusWeb Community",
        status: "forming",
        body: "Today the community lives around our public repository. Dedicated spaces will follow once there are people to fill them.",
        href: "/community",
      },
    ] as BuildingItem[],
  },

  join: {
    eyebrow: "Join the journey",
    title: "Be part of it from the beginning.",
    description:
      "NexusWeb is growing in public. Follow the development of ContextPulse AI, share feedback, or reach out if you'd like to build something together.",
    github: "Follow on GitHub",
    community: "Join the community",
    contact: "Get in touch",
  },
};

export type HomeContent = typeof homeContent;
