import { aboutContent } from "./about";
import { communityContent } from "./community";
import { contactContent } from "./contact";
import { contextPulseContent } from "./contextpulse";
import { educationContent } from "./education";
import { homeContent } from "./home";
import { productsContent } from "./products";
import { ui } from "./ui";

export const en = {
  ui,
  home: homeContent,
  about: aboutContent,
  products: productsContent,
  contextPulse: contextPulseContent,
  education: educationContent,
  community: communityContent,
  contact: contactContent,
};

/** The shape every locale must provide. Azerbaijani is type-checked against it. */
export type Content = typeof en;
