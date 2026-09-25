import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// One folder per project: src/content/projects/<slug>/{pt.md,en.md,images}.
// pt.md is canonical (all metadata); en.md only translates text.
const base = "./src/content/projects";
const slugFromPath = ({ entry }: { entry: string }) => entry.split("/")[0]!;

export const areas = ["software", "hardware", "robotics"] as const;
export const contexts = ["isep", "personal"] as const;

const projects = defineCollection({
  loader: glob({ pattern: "*/pt.md", base, generateId: slugFromPath }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().max(160),
      date: z.coerce.date(),
      areas: z.array(z.enum(areas)).min(1),
      context: z.enum(contexts),
      course: z.string().optional(),
      tech: z.array(z.string()).default([]),
      cover: image(),
      coverAlt: z.string().min(1),
      featured: z.boolean().default(false),
      links: z
        .object({
          repo: z.url().optional(),
          demo: z.url().optional(),
          docs: z.url().optional(),
        })
        .optional(),
      draft: z.boolean().default(false),
    }),
});

const projectsEn = defineCollection({
  loader: glob({ pattern: "*/en.md", base, generateId: slugFromPath }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(160),
    coverAlt: z.string().min(1),
  }),
});

export const collections = { projects, projectsEn };
