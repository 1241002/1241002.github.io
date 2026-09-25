import { getCollection, type CollectionEntry } from "astro:content";
import type { Locale } from "@/i18n/ui";
import { joinProjects } from "@/lib/join-projects";

export type ProjectPt = CollectionEntry<"projects">;
export type ProjectEn = CollectionEntry<"projectsEn">;

export interface Project {
  id: string;
  /** Canonical metadata (dates, areas, cover, links…) from pt.md. */
  meta: ProjectPt["data"];
  /** Text in the requested language. */
  title: string;
  summary: string;
  coverAlt: string;
  /** Entry whose Markdown body is rendered for this language. */
  entry: ProjectPt | ProjectEn;
}

/** Published projects in `lang`, newest first. */
export async function getProjects(lang: Locale): Promise<Project[]> {
  const joined = joinProjects(
    await getCollection("projects"),
    await getCollection("projectsEn"),
  );
  return joined.map(({ id, pt, en }) => {
    const text = lang === "pt" ? pt : en;
    return {
      id,
      meta: pt.data,
      title: text.data.title,
      summary: text.data.summary,
      coverAlt: text.data.coverAlt,
      entry: text,
    };
  });
}
