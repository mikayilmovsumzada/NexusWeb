import type { Content } from "../en";
import { aboutContent } from "./about";
import { communityContent } from "./community";
import { contactContent } from "./contact";
import { contextPulseContent } from "./contextpulse";
import { educationContent } from "./education";
import { homeContent } from "./home";
import { productsContent } from "./products";
import { ui } from "./ui";

/** Azerbaijani content. Typed against the English shape, so missing keys fail the build. */
export const az: Content = {
  ui,
  home: homeContent,
  about: aboutContent,
  products: productsContent,
  contextPulse: contextPulseContent,
  education: educationContent,
  community: communityContent,
  contact: contactContent,
};
