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
  }),
});

export const collections = {
  blogs: blogCollection,
};
