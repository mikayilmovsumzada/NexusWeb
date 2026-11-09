import type { IconName } from "../types";

export const contactContent = {
  meta: {
    title: "Contact",
    description: "Get in touch with NexusWeb for general inquiries, collaboration opportunities or project discussions.",
  },

  hero: {
    eyebrow: "Contact",
    title: "Let's talk.",
    description:
      "Whether you have a question, an idea or a project in mind, we'd like to hear from you. We're a small team, so replies may take a few days — but every message is read.",
  },

  helpTitle: "How can we help?",
  reasons: [
    { icon: "mail", title: "General inquiries", body: "Questions about NexusWeb, our products or our plans.", subject: "General inquiry" },
    {
      icon: "handshake",
      title: "Collaboration",
      body: "Want to contribute skills, co-build a product or partner on an initiative?",
      subject: "Collaboration opportunity",
    },
    {
      icon: "rocket",
      title: "Project discussions",
      body: "Have a problem worth solving or an idea you'd like to explore together?",
      subject: "Project discussion",
    },
  ] as Array<{ icon: IconName; title: string; body: string; subject: string }>,
  emailAboutThis: "Email about this",

  elsewhere: "Elsewhere",
  emailLabel: "Email:",
  issuesLink: "ContextPulse AI feedback via GitHub issues",

  formTitle: "Send us a message",
  formRequired: "All fields are required.",

  /** Strings passed to the client-side ContactForm. */
  form: {
    topics: ["General inquiry", "Collaboration opportunity", "Project discussion", "ContextPulse AI feedback"],
    name: "Your name",
    email: "Your email",
    emailHint: "So we can reply to you.",
    topic: "Topic",
    message: "Message",
    placeholder: "Tell us a little about yourself and what you have in mind.",
    missing: "Please add your name, a valid email address and a message.",
    sending: "Sending…",
    sent: "Thank you! Your message has been received. We'll reply to your email address.",
    sendAnother: "Send another message",
    rateLimited: "Too many messages in a short time. Please try again later.",
    failed: "Your message couldn't be sent. Please try again, or write to us by email.",
    submit: "Send message",
    how: "Your message is stored securely and read only by the NexusWeb team. We use your email address only to reply.",
  },
};

export type ContactContent = typeof contactContent;
export type ContactFormStrings = ContactContent["form"];
