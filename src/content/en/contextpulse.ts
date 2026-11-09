import type { Feature, Status } from "../types";

/**
 * ContextPulse AI product page content.
 *
 * Every capability listed under `implemented` is verified against the public
 * repository README (FastAPI backend, Nov 2026). Keep this file in sync with
 * the repository — never list planned work as implemented.
 */
export const contextPulseContent = {
  meta: {
    title: "ContextPulse AI",
    description:
      "ContextPulse AI is a privacy-first developer context-recovery tool from NexusWeb, currently in active development. No screenshots, no keystroke logging, no reading of source code.",
    ogSubtitle: "AI-assisted context recovery for developers — built to support people, not to watch them.",
  },

  overview: {
    eyebrow: "NexusWeb Products",
    title: "ContextPulse AI",
    tagline: "AI-assisted context recovery for developers — built to support people, not to watch them.",
    description:
      "ContextPulse AI is a privacy-first developer workflow and context-recovery tool. When you come back from a meeting or a break, it reminds you where you left off. When a team keeps getting stuck, it helps leads see the pattern — without turning anyone into a surveillance target.",
    summary: "An AI-powered, privacy-first developer workflow and context-recovery solution.",
    statusLine: "In active development",
    demoCta: "Try Live Demo",
    demoUnavailable: "Live demo coming soon",
    repoCta: "View on GitHub",
    earlyAccessCta: "Early access",
  },

  /** "Try Live Demo" section. Describes only what the running prototype actually does. */
  demo: {
    eyebrow: "Live demo",
    title: "Try ContextPulse AI",
    intro:
      "Experience ContextPulse AI through an interactive developer and manager workflow simulation. Explore how development interruptions, context recovery, and team-level insights are represented in the current prototype.",
    notice: "Interactive prototype — currently in active development. Demo functionality may change.",
    experiences: [
      {
        icon: "code",
        title: "Developer experience",
        body: "Sign in to the developer panel, simulate a break, and get a short reminder of your last working context — written by AI, or by a safe template when the AI service is unavailable. Then note anonymously why you were interrupted.",
      },
      {
        icon: "radar",
        title: "Manager experience",
        body: "Sign in to the manager panel to see team-level blocker categories — shown only once enough people report them — track actions on them and post team-wide announcements.",
      },
    ] as Feature[],
    credentialsNote: "Demo sign-in details are shown on the application's own login screen.",
    cta: "Try Live Demo",
    newTabHint: "Opens the ContextPulse AI application in a new tab.",
    unavailableTitle: "Live demo not available yet",
    unavailableBody:
      "The ContextPulse AI application isn't publicly hosted yet — we'll link it here as soon as a secure public demo is online. In the meantime, the repository README explains how to run the prototype on your own computer.",
    unavailableLink: "How to run it locally",
  },

  problem: {
    eyebrow: "The problem",
    title: "Interruptions are expensive — and the usual fixes make things worse.",
    points: [
      {
        icon: "workflow",
        title: "Lost context",
        body: "After a meeting, a break or a task switch, developers spend time reconstructing what they were doing: which function, which error, which review comment.",
      },
      {
        icon: "radar",
        title: "Invisible blockers",
        body: "Team leads often can't see why work stalls — slow reviews, flaky CI, unclear requirements — until it is already a problem.",
      },
      {
        icon: "eye-off",
        title: "Monitoring backfires",
        body: "Screenshots, keystroke logging and per-person activity scores erode trust and raise ethical and legal concerns.",
      },
    ] as Feature[],
  },

  solution: {
    eyebrow: "The proposed solution",
    title: "Two sides of one loop.",
    sides: [
      {
        label: "For developers",
        title: "A reminder, not a report",
        body: "When you return, an AI-generated summary recovers your last working context: the function you last changed, an open error, a failing test, unresolved pull-request comments.",
      },
      {
        label: "For team leads",
        title: "Patterns, not people",
        body: "Developers can anonymously note why they were interrupted. Leads see blocker categories only at team level — and only once enough people have reported the same one.",
      },
      {
        label: "Closing the loop",
        title: "Action that developers can see",
        body: "Leads can track actions on visible blockers and post team-wide announcements, which appear live in every developer's panel.",
      },
    ],
  },

  implemented: {
    eyebrow: "What works today",
    title: "Capabilities in the current prototype",
    description:
      "These features exist in the public repository today. They run as a working prototype with demo data — not as a released product.",
    items: [
      {
        icon: "lock",
        title: "Metadata-only ingestion",
        body: "The API rejects events that flag screen capture, keystroke content or source code, as well as any field outside the schema (such as source_code).",
      },
      {
        icon: "brain",
        title: "Validated AI reminders",
        body: "Reminders are written by Gemini or Claude, then checked by code. If the output mentions a file, function, error code or PR that isn't in the metadata, a safe fallback text is used instead.",
      },
      {
        icon: "users",
        title: "K-anonymous team view",
        body: "A blocker category becomes visible to a lead only after at least five developers report it. Below that, it is shown as hidden — with no exact count.",
      },
      {
        icon: "radar",
        title: "Action tracking",
        body: "Leads can set a status, owning team and note on visible blockers. Acting on hidden groups is rejected by the server.",
      },
      {
        icon: "message",
        title: "Team announcements",
        body: "Team-wide messages appear live in developer panels via Server-Sent Events. They can't be addressed to an individual.",
      },
      {
        icon: "compass",
        title: "Bilingual interface",
        body: "Azerbaijani and English, including the AI reminders themselves.",
      },
    ] as Feature[],
  },

  principles: {
    eyebrow: "Privacy-first by design",
    title: "Support developers. Don't surveil them.",
    description:
      "Privacy isn't a feature added at the end — it shapes what the system is allowed to collect in the first place.",
    rules: [
      "No screenshots and no screen recording.",
      "No keystroke content.",
      "No reading of private source code.",
      "No individual identifiers in the lead's view.",
      "Small groups stay hidden, so individuals can't be singled out.",
      "Only validated metadata is sent to the AI model.",
    ],
  },

  limitations: {
    title: "Honest limitations",
    intro: "What the current prototype does not do yet:",
    items: [
      "There is no IDE extension yet — IDE events are currently generated by a simulator script.",
      "Storage uses SQLite for the demo; a production database is planned.",
      "K-anonymity does not fully protect against observation over time.",
      "Demo accounts and passwords are for local testing only.",
    ],
  },

  status: {
    value: "in-development" as Status,
    heading: "Development status",
    summary:
      "ContextPulse AI is in active development. It is a working prototype, not a commercially released or production-ready product. We are not publishing performance or time-saving figures until we have measured them properly.",
  },

  demos: {
    eyebrow: "Product demonstrations",
    title: "See it in action.",
    description: "Screenshots and walkthrough videos of the working prototype.",
    placeholders: ["Developer panel", "Team lead panel", "Walkthrough video"],
    noteStart: "Demonstration media will be published here as the prototype matures. Until then, the",
    noteLink: "repository README",
    noteEnd: "explains how to run the demo locally.",
  },

  journeyHeading: {
    eyebrow: "Development journey",
    title: "How it has evolved so far.",
    description: "Milestones from the public commit history.",
  },

  /** Development history, taken from the public repository's commit log. */
  journey: [
    { date: "Oct 2026", title: "First prototype", body: "A Streamlit prototype with mock data explores the context-recovery idea." },
    { date: "Oct 2026", title: "Reliable AI reminders", body: "Fallback AI models, timeouts, an output validator and automated tests are added." },
    { date: "Oct 2026", title: "Manager panel", body: "Action tracking on blockers and team-wide announcements close the feedback loop." },
    { date: "Oct 2026", title: "Interface redesign", body: "New routes, a role portal, legal pages and locally hosted fonts." },
    { date: "Nov 2026", title: "Server-side authentication", body: "A second redesign moves sign-in checks to the server and refreshes the test suite." },
    { date: "Nov 2026", title: "Multiple AI providers", body: "Claude models are supported alongside Gemini, with configurable provider order." },
    { date: "Nov 2026", title: "Security audit fixes", body: "Critical issues found in a security review are fixed, including keyed event ingestion." },
  ],

  team: {
    eyebrow: "Project team",
    title: "The people behind ContextPulse AI.",
    note: "The original ContextPulse AI concept was proposed by Nuran Əliyev. The project has been developed collaboratively by:",
    members: [
      { name: "Nuran Əliyev", note: "Proposed the original concept" },
      { name: "Elgün Hüseynli" },
      { name: "Mikayıl Mövsümzadə" },
    ] as Array<{ name: string; note?: string }>,
    builtWith: "Built with",
  },

  earlyAccess: {
    eyebrow: "Early access",
    titleOpen: "Join the early-access list.",
    titleClosed: "Early access isn't open yet.",
    bodyOpen: "We're looking for developers and teams willing to try ContextPulse AI and tell us honestly what works.",
    bodyClosed:
      "We'll open a beta-testing programme once the prototype is ready for real teams. Until then, the best way to follow progress is the public repository",
    bodyClosedEmail: " — or ask us to let you know by email.",
    request: "Request early access",
    watch: "Watch on GitHub",
    emailMe: "Email me when it opens",
    emailSubject: "ContextPulse AI early access",
    emailBody: "Hi NexusWeb team,\n\nPlease let me know when ContextPulse AI early access opens.\n",
  },
};

export type ContextPulseContent = typeof contextPulseContent;
