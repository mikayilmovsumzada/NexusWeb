import {
  BookOpen,
  Boxes,
  BrainCircuit,
  CodeXml,
  Compass,
  EyeOff,
  FlaskConical,
  GitBranch,
  GraduationCap,
  Handshake,
  Landmark,
  Layers,
  Lightbulb,
  Lock,
  Mail,
  MessagesSquare,
  Radar,
  Rocket,
  ShieldCheck,
  Sparkles,
  Terminal,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/content/types";

const icons: Record<IconName, LucideIcon> = {
  boxes: Boxes,
  graduation: GraduationCap,
  users: Users,
  shield: ShieldCheck,
  brain: BrainCircuit,
  code: CodeXml,
  workflow: Workflow,
  "eye-off": EyeOff,
  lock: Lock,
  radar: Radar,
  layers: Layers,
  book: BookOpen,
  flask: FlaskConical,
  terminal: Terminal,
  git: GitBranch,
  message: MessagesSquare,
  compass: Compass,
  sparkles: Sparkles,
  rocket: Rocket,
  lightbulb: Lightbulb,
  mail: Mail,
  handshake: Handshake,
  landmark: Landmark,
};

export function Icon({ name, className, size = 20 }: { name: IconName; className?: string; size?: number }) {
  const Component = icons[name];
  return <Component aria-hidden="true" className={className} size={size} strokeWidth={1.6} />;
}

/** GitHub mark (brand icons are not shipped by lucide). */
export function GitHubIcon({ className, size = 18 }: { className?: string; size?: number }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}
