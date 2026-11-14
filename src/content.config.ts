import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const events = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/events' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    time: z.string().optional(),
    place: z.string(),
    address: z.string().optional(),
    ages: z.string().optional(),
    cost: z.string().default('Free'),
    signup: z.string().url().optional(),
    photo: image().optional(),
    photoAlt: z.string().optional(),
    photoIsFlyer: z.boolean().default(false),
  }),
});

// One file per current officer. `order` sets their place on the Our team page (1 shows first).
const team = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/team' }),
  schema: ({ image }) => z.object({
    name: z.string(),
    role: z.string(),
    school: z.string().optional(),
    order: z.number().default(99),
    photo: image().optional(),
  }),
});

// One file per founder or graduated officer. The text under the --- is their favorite memory, in their words.
const alumni = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/alumni' }),
  schema: ({ image }) => z.object({
    name: z.string(),
    role: z.string(),
    college: z.string().optional(),
    major: z.string().optional(),
    memory: z.string().optional(),
    // The year they graduated high school. The Alumni page groups people by it.
    classOf: z.number(),
    order: z.number().default(99),
    photo: image().optional(),
  }),
});

// One file per at-home experiment, named by month (2026-11-lava-lamp.md). The newest month is featured.
// Every experiment comes from a trusted kids' science website, listed under `sources`, so we know it works.
// A photo from the web needs a free license (like Creative Commons) and its credit under `photoCredit`.
const experiments = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/experiments' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    month: z.string().regex(/^\d{4}-\d{2}$/),
    time: z.string().optional(),
    ages: z.string().optional(),
    supplies: z.array(z.string()),
    safety: z.array(z.string()).default([]),
    sources: z.array(z.object({ title: z.string(), site: z.string(), url: z.string().url() })).min(1),
    photo: image().optional(),
    photoAlt: z.string().optional(),
    photoCredit: z.object({ text: z.string(), url: z.string().url(), license: z.string(), licenseUrl: z.string().url() }).optional(),
  }),
});

// One file per newsletter issue, copied from beehiiv by `npm run newsletter` (see scripts/import-newsletter.mjs).
// The file name (minus the date) is the issue's web address: 2026-11-01-the-science-of-sleep.md -> /newsletter/the-science-of-sleep/
const newsletter = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/newsletter' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string().optional(),
    // The opening paragraph, shown in the list of issues.
    summary: z.string().optional(),
    // body, life, earth, space, chemistry, tech, ideas, or news. "other" means nobody has picked one yet.
    topic: z.enum(['body', 'life', 'earth', 'space', 'chemistry', 'tech', 'ideas', 'news', 'other']).default('other'),
    // The issue on beehiiv. The import script uses it to know which issues it already copied.
    beehiiv: z.string().url().optional(),
  }),
});

export const collections = { events, team, alumni, experiments, newsletter };
