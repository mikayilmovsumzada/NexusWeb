import type { Feature, IconName, Status } from "../types";

export type CommunityWay = { icon: IconName; title: string; body: string; action: "repo" | "issues" | "contact" };
export type RoadmapItem = { title: string; status: Status; body: string };

export const communityContent = {
  meta: {
    title: "Community",
    description:
      "The NexusWeb community is forming: a place for developers, security enthusiasts, students and creators to share knowledge and build together.",
  },

  hero: {
    eyebrow: "NexusWeb Community",
    title: "Find your people. Build something together.",
    description:
      "We want NexusWeb to become a place where technology-minded people exchange knowledge, discuss ideas and collaborate on real projects. The community is just forming — which means the earliest members get to shape what it becomes.",
    cta: "Ways to get involved",
  },

  audience: {
    eyebrow: "Who it's for",
    title: "Anyone curious enough to build.",
    groups: [
      { icon: "code", title: "Developers", body: "Who want to work on meaningful projects and learn from other builders." },
      { icon: "shield", title: "Security enthusiasts", body: "Interested in ethical, practical cybersecurity and secure engineering." },
      { icon: "graduation", title: "Students", body: "Looking for real-world experience, mentors and a place to grow." },
      { icon: "brain", title: "AI explorers", body: "Experimenting with how AI can help people — responsibly." },
      { icon: "lightbulb", title: "Creators & designers", body: "Who bring ideas, design and communication skills to technical work." },
      { icon: "users", title: "Future collaborators", body: "Anyone who wants to partner on a project, idea or initiative." },
    ] as Feature[],
  },

  today: {
    eyebrow: "Get involved today",
    title: "Real ways to participate right now.",
    description: "There's no forum or chat server yet — we won't pretend otherwise. Here's what you can genuinely do today:",
  },

  ways: [
    {
      icon: "git",
      title: "Follow ContextPulse AI on GitHub",
      body: "Star or watch the repository to follow development as it happens.",
      action: "repo",
    },
    {
      icon: "message",
      title: "Report issues and share ideas",
      body: "Open an issue on the repository with feedback, bug reports or feature ideas.",
      action: "issues",
    },
    {
      icon: "handshake",
      title: "Propose a collaboration",
      body: "Have a project, skill or idea to contribute? Reach out and tell us about it.",
      action: "contact",
    },
  ] as CommunityWay[],

  actionLabels: { repo: "Open repository", issues: "Open an issue", contact: "Contact us" },
  followTitle: "Follow NexusWeb",

  roadmap: {
    eyebrow: "What's next",
    title: "How the community will grow",
    items: [
      { title: "Open repositories", status: "live", body: "Our work is public on GitHub, where anyone can follow and contribute." },
      { title: "Community space", status: "planned", body: "A dedicated place for discussion once there are enough people to make it worthwhile." },
      { title: "Collaborative projects", status: "planned", body: "Projects that members can join, from idea to shipped product." },
      { title: "Events & study groups", status: "exploring", body: "Workshops, study sessions and build days — online at first." },
    ] as RoadmapItem[],
  },

  valuesTitle: "Community values",
  values: [
    "Be generous with knowledge.",
    "Be honest about what you know and don't know.",
    "Respect people's privacy and time.",
    "Use security knowledge ethically and legally.",
  ],

  cta: {
    eyebrow: "Start here",
    title: "The first members shape everything.",
    description: "Introduce yourself, tell us what you're working on, and let's find out what we can build together.",
    introduce: "Introduce yourself",
    github: "Follow on GitHub",
  },
};

export type CommunityContent = typeof communityContent;
