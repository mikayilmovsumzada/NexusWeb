import type { Accent, IconName, Status } from "../types";

export type LearningTrack = {
  id: string;
  icon: IconName;
  accent: Accent;
  title: string;
  summary: string;
  status: Status;
  /** Topics we intend to cover. These are plans, not published lessons. */
  plannedTopics: string[];
  formats: string[];
  /** When lessons exist, link them here; the page will show them instead of the "planned" note. */
  lessons?: Array<{ title: string; href: string }>;
};

export const educationContent = {
  meta: {
    title: "Learn",
    description:
      "NexusWeb Education is in development: planned hands-on tutorials, labs and courses in cybersecurity, AI and programming. No courses are published yet.",
  },

  hero: {
    eyebrow: "NexusWeb Education",
    title: "Practical technology education — coming soon.",
    description:
      "We're designing a learning platform focused on doing, not just reading: tutorials, hands-on labs and project walkthroughs across cybersecurity, AI and programming. Nothing is published yet. This page shows what we're planning, so you know what to expect.",
    cta: "Preview the planned tracks",
  },

  principlesHeading: { eyebrow: "How we'll teach", title: "Learning that sticks." },

  principles: [
    { icon: "flask", title: "Hands-on first", body: "Every topic should end with something you built, broke or secured yourself." },
    { icon: "shield", title: "Ethical by default", body: "Security content is taught for defence and learning, in legal lab environments." },
    { icon: "layers", title: "From real projects", body: "Lessons grounded in the products we actually build, like ContextPulse AI." },
  ] as Array<{ icon: IconName; title: string; body: string }>,

  tracksHeading: {
    eyebrow: "Planned learning tracks",
    title: "What we intend to cover.",
    description:
      "Expand a track to see the topics we're planning. These are intentions, not published lessons — each track will be marked clearly as content goes live.",
  },

  labels: { availableLessons: "Available lessons", plannedTopics: "Planned topics", formats: "Formats" },

  tracks: [
    {
      id: "cybersecurity",
      icon: "shield",
      accent: "pulse",
      title: "Cybersecurity",
      summary: "Foundations of defensive security, from networks to secure application design.",
      status: "planned",
      plannedTopics: [
        "Networking fundamentals for security",
        "Web application security basics",
        "Secure authentication and session handling",
        "Threat modelling for small projects",
        "Capture-the-flag style practice labs",
      ],
      formats: ["Tutorials", "Labs"],
    },
    {
      id: "ai",
      icon: "brain",
      accent: "violet",
      title: "Artificial Intelligence",
      summary: "Using AI models responsibly in real software — including privacy and output validation.",
      status: "planned",
      plannedTopics: [
        "How large language models fit into applications",
        "Prompt design and validating model output",
        "Privacy-conscious data handling for AI features",
        "Building fallbacks when AI services fail",
      ],
      formats: ["Guides", "Project walkthroughs"],
    },
    {
      id: "programming",
      icon: "code",
      accent: "signal",
      title: "Programming & Software Development",
      summary: "Writing clean, tested, maintainable software — and shipping it.",
      status: "planned",
      plannedTopics: [
        "Python and backend APIs",
        "Modern web front-ends with TypeScript",
        "Testing and continuous integration",
        "Version control and collaborating with Git",
      ],
      formats: ["Courses", "Tutorials"],
    },
    {
      id: "tutorials",
      icon: "book",
      accent: "pulse",
      title: "Technical Articles & Tutorials",
      summary: "Focused, practical write-ups on specific tools, techniques and problems.",
      status: "planned",
      plannedTopics: ["Step-by-step technical guides", "Explanations of security and AI concepts", "Lessons learned from building our products"],
      formats: ["Articles", "Guides"],
    },
    {
      id: "projects",
      icon: "terminal",
      accent: "violet",
      title: "Hands-on Projects",
      summary: "Guided projects that combine skills from several tracks into something real.",
      status: "planned",
      plannedTopics: [
        "Build-along project walkthroughs",
        "How ContextPulse AI was designed and built",
        "Open-ended challenges to practise independently",
      ],
      formats: ["Labs", "Walkthroughs"],
    },
  ] as LearningTrack[],

  cta: {
    eyebrow: "Shape the curriculum",
    title: "What would you like to learn?",
    description: "We'd rather build the lessons people actually need. Tell us which topics would help you most.",
    emailSubject: "Learning topic suggestion for NexusWeb Education",
    suggestByEmail: "Suggest a topic by email",
    suggest: "Suggest a topic",
    community: "Join the community",
  },
};

export type EducationContent = typeof educationContent;
