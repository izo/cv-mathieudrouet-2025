import { defineCollection, z } from 'astro:content';

const cvCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    iconSet: z.enum(['carbon', 'tabler', 'lucide', 'heroicons', 'feather']).optional().default('carbon'),
    theme: z.enum(['lumon', 'atari']).optional().default('lumon'),
  }),
});

const aboutCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = {
  cv: cvCollection,
  about: aboutCollection,
};