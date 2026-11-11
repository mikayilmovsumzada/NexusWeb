import type { Accent, IconName, Status } from "../types";

/** Course ids are also used by the contact form ("enrol in a course") and by /learn#<id> anchors. */
export const COURSE_IDS = ["cybersecurity", "ai", "programming"] as const;
export type CourseId = (typeof COURSE_IDS)[number];

export type Course = {
  id: CourseId;
  icon: IconName;
  accent: Accent;
  title: string;
  summary: string;
  status: Status;
  /** Topics the course is planned to cover. Plans, not a published syllabus. */
  topics: string[];
  formats: string[];
};

export const educationContent = {
  meta: {
    title: "Learn",
    description:
      "NexusWeb Education: hands-on courses in cybersecurity, artificial intelligence and programming. Groups are forming now, plus technical articles, tutorials and useful learning material.",
  },

  hero: {
    eyebrow: "NexusWeb Education",
    title: "Courses in cybersecurity, AI and programming.",
    description:
      "Hands-on courses focused on doing, not just reading. The first groups are forming now: apply for a course and we'll contact you about the start date, schedule and terms.",
    enroll: "Apply for a course",
    browse: "See the courses",
  },

  principlesHeading: { eyebrow: "How we teach", title: "Learning that sticks." },

  principles: [
    { icon: "flask", title: "Hands-on first", body: "Every topic should end with something you built, broke or secured yourself." },
    { icon: "shield", title: "Ethical by default", body: "Security content is taught for defence and learning, in legal lab environments." },
    { icon: "layers", title: "From real projects", body: "Lessons grounded in the products we actually build, like ContextPulse AI." },
  ] as Array<{ icon: IconName; title: string; body: string }>,

  coursesHeading: {
    eyebrow: "Courses",
    title: "Three courses, one practical approach.",
    description:
      "Groups are forming now. The topics below are what each course is planned to cover; we'll share the final syllabus with applicants before the course starts.",
  },

  labels: { topics: "What the course will cover", formats: "Formats", enroll: "Apply for this course" },

  courses: [
    {
      id: "cybersecurity",
      icon: "shield",
      accent: "pulse",
      title: "Cybersecurity",
      summary: "Foundations of defensive security, from networks to secure application design.",
      status: "forming",
      topics: [
        "Networking fundamentals for security",
        "Web application security basics",
        "Secure authentication and session handling",
        "Threat modelling for small projects",
        "Capture-the-flag style practice labs",
      ],
      formats: ["Lessons", "Labs"],
    },
    {
      id: "ai",
      icon: "brain",
      accent: "violet",
      title: "Artificial Intelligence",
      summary: "Using AI models responsibly in real software, including privacy and output validation.",
      status: "forming",
      topics: [
        "How large language models fit into applications",
        "Prompt design and validating model output",
        "Privacy-conscious data handling for AI features",
        "Building fallbacks when AI services fail",
      ],
      formats: ["Lessons", "Project work"],
    },
    {
      id: "programming",
      icon: "code",
      accent: "signal",
      title: "Programming & Software Development",
      summary: "Writing clean, tested, maintainable software, and shipping it.",
      status: "forming",
      topics: [
        "Python and backend APIs",
        "Modern web front-ends with TypeScript",
        "Testing and continuous integration",
        "Version control and collaborating with Git",
      ],
      formats: ["Lessons", "Projects"],
    },
  ] as Course[],

  resources: {
    eyebrow: "Technical articles & tutorials",
    title: "Read, watch and practise.",
    description:
      "Our own articles and tutorials, the posts we share on other platforms, and useful material we found elsewhere, all collected in one place.",
    kinds: { article: "Article", tutorial: "Tutorial", curated: "Recommended" },
    emptyTitle: "The first posts are on their way",
    emptyBody: "Articles, tutorials and recommended material will appear here as we publish and collect them.",
    prev: "Previous",
    next: "Next",
    open: "Open",
    listLabel: "Articles and tutorials",
  },

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
