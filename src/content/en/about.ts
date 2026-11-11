import type { Feature } from "../types";

export const aboutContent = {
  meta: {
    title: "About",
    description:
      "What NexusWeb is, why it exists, and what the name means: an emerging technology ecosystem connecting people, ideas, knowledge and digital products.",
  },

  hero: {
    eyebrow: "About NexusWeb",
    title: "A technology ecosystem, built from the ground up.",
    description:
      "NexusWeb is an emerging initiative that connects people, ideas, knowledge and digital products. It is young, it is ambitious, and it is growing in public — one honest step at a time.",
  },

  story: {
    eyebrow: "Our story",
    title: "Why NexusWeb exists",
    paragraphs: [
      "Talented people interested in technology are everywhere — but they are often scattered. Students learn in isolation, developers build side projects that never see daylight, and good ideas stall because the right people never meet.",
      "NexusWeb started from a simple belief: technology moves forward fastest when people learn together, share what they know and build real things side by side. Instead of being only a portfolio, a blog or a course platform, NexusWeb aims to be the place where those activities connect.",
      "Our first product, ContextPulse AI, came out of exactly that kind of collaboration. It is proof of the model we want to repeat: identify a real problem, build a careful solution in the open, and learn from every step.",
    ],
  },

  name: {
    eyebrow: "The name",
    title: "What “Nexus” means",
    body: "A nexus is a connection point — the place where separate threads meet and become something stronger. NexusWeb is that point for people, ideas and technology: a web of connections where products, education and community reinforce each other.",
    meanings: [
      { term: "Nexus", definition: "A central link connecting multiple elements." },
      { term: "Web", definition: "The network that carries those connections — and the medium we build on." },
    ],
  },

  mission: {
    srTitle: "Mission and vision",
    mission: {
      label: "Mission",
      body: "To connect people who care about technology, help them learn practical skills, and turn good ideas into useful, trustworthy software.",
    },
    vision: {
      label: "Vision",
      body: "A growing ecosystem where learning, building and collaborating happen in one place — and where anyone with curiosity can find a way to contribute.",
    },
  },

  areas: {
    eyebrow: "Areas of activity",
    title: "What we work on",
    items: [
      { icon: "shield", title: "Cybersecurity", body: "Secure-by-default engineering, and accessible security learning." },
      { icon: "brain", title: "Artificial Intelligence", body: "Applied AI that is private, verifiable and genuinely helpful." },
      { icon: "code", title: "Software Development", body: "Well-built products and the craft of making them." },
      { icon: "graduation", title: "Technology Education", body: "Courses in cybersecurity, AI and programming; groups are forming." },
      { icon: "sparkles", title: "Digital Innovation", body: "Exploring new ideas and turning the promising ones into products." },
    ] as Feature[],
  },

  philosophy: {
    eyebrow: "Our philosophy",
    title: "Learn. Build. Collaborate.",
    items: [
      {
        icon: "book",
        title: "Learn",
        body: "We treat every project as a chance to learn, and we share what we learn so others can move faster.",
      },
      {
        icon: "terminal",
        title: "Build",
        body: "Ideas only matter once they ship. We build working software and describe it honestly — limitations included.",
      },
      {
        icon: "handshake",
        title: "Collaborate",
        body: "The best work comes from people with different skills working together. NexusWeb is designed to make that easier.",
      },
    ] as Feature[],
  },

  today: {
    title: "Where we are today",
    points: [
      "NexusWeb is an early-stage, independent initiative — not an established company.",
      "Our first product, ContextPulse AI, is in active development.",
      "The first course groups are forming; community programmes are being designed.",
    ],
  },

  cta: {
    eyebrow: "Grow with us",
    title: "NexusWeb is just getting started.",
    description: "If the idea resonates with you — as a learner, a builder or a future collaborator — there's a place for you here.",
    community: "Join the community",
    contact: "Contact us",
  },
};

export type AboutContent = typeof aboutContent;
