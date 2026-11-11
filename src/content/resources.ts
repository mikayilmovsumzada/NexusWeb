/**
 * Technical articles, tutorials and recommended material shown in the carousel
 * on the Learn page (/learn#resources).
 *
 * To add an item, put a new object at the TOP of the list (newest first):
 *   kind:     "article"  – our own article (e.g. posted on LinkedIn, Medium, Instagram)
 *             "tutorial" – our own tutorial or video lesson
 *             "curated"  – useful material by someone else that we recommend
 *   title:    the title as published (any language)
 *   source:   where it lives, e.g. "LinkedIn", "YouTube", "Instagram", "OWASP"
 *   url:      full https:// link
 *   lang:     language of the material ("az" or "en")
 *   date:     optional, "YYYY-MM-DD"
 *   summary:  optional, one or two sentences
 *
 * While the list is empty, the page shows an honest "first posts are on their way" panel.
 */

export type ResourceKind = "article" | "tutorial" | "curated";

export type Resource = {
  kind: ResourceKind;
  title: string;
  source: string;
  url: string;
  lang: "az" | "en";
  date?: string;
  summary?: string;
};

export const resources: Resource[] = [];
