import { defineCollection, z } from "astro:content";
import { docsSchema } from "@astrojs/starlight/schema";

export const collections = {
  docs: defineCollection({
    schema: docsSchema({
      extend: z.object({
        author: z.string().optional(),
        date: z.date().or(z.string()).optional(),
        keywords: z.array(z.string()).optional(),
      }),
    }),
  }),
};
