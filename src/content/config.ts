import { defineCollection, z } from "astro:content";
import { glob } from 'astro/loaders'

const blogCollection = defineCollection({
  loader: glob({pattern: "**/*.{md,mdx}", base: "./src/content/blogs"}),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    date: z.string(),
    slug: z.string(),
    ["estimate-reading-time"]: z.string(),
    img: z.object({
      src: z.string(),
      alt: z.string(),
    }),
  }),
});

const projectCollection = defineCollection({
  loader: glob({pattern: "**/*.{md,mdx}", base: "./src/content/projects"}),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
    slug: z.string(),
    skills: z.string(),
    img_logo: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    github: z.string().url().nullable(),
    website: z.string().url().nullable(),
  }),
});

const workExperienceCollection = defineCollection({
  loader: glob({pattern: "**/*.{md,mdx}", base: "./src/content/workexperience"}),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    role: z.string(),
    description: z.string(),
    slug: z.string(),
    img_logo: z.object({
      src: z.string(),
      alt: z.string(),
    }),
  }),
});

export const collections = {
  blogs: blogCollection,
  projects: projectCollection,
  experiences: workExperienceCollection,
};
