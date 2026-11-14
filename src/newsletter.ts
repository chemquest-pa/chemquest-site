import { getCollection, type CollectionEntry } from 'astro:content';
import type { MarkdownHeading } from 'astro';
import type { ImageMetadata } from 'astro';

// The topics people can filter issues by. The key is what goes on an issue's `topic:` line.
export const topics = {
  body: 'Human body and brain',
  life: 'Living things',
  earth: 'Earth and environment',
  space: 'Space and physics',
  chemistry: 'Chemistry',
  tech: 'Technology',
  ideas: 'Big ideas',
  news: 'ChemQuest news',
  other: 'Other',
} as const;
export type Topic = keyof typeof topics;

export type Issue = CollectionEntry<'newsletter'> & {
  /** The web address after /newsletter/, from the file name without its date. */
  slug: string;
  minutes: number;
  /** The issue's first picture, for the list of issues. */
  thumb?: ImageMetadata;
};

const pictures = import.meta.glob<{ default: ImageMetadata }>('./assets/newsletter/*/*.{png,jpg,jpeg,gif,webp}', { eager: true });
const firstPicture = (id: string) =>
  Object.entries(pictures)
    .filter(([path]) => path.split('/').at(-2) === id)
    .sort(([a], [b]) => a.localeCompare(b))[0]?.[1].default;

const wordCount = (md = '') =>
  md.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ').replace(/\]\([^)]*\)/g, ' ').replace(/[#>*_`[\]]/g, ' ').split(/\s+/).filter(Boolean).length;

/** Every issue, newest first. */
export async function getIssues(): Promise<Issue[]> {
  const issues = (await getCollection('newsletter'))
    .map((e) => ({
      ...e,
      slug: e.id.replace(/^\d{4}-\d{2}-\d{2}-/, ''),
      // About 200 words a minute, the pace of a careful reader.
      minutes: Math.max(1, Math.round(wordCount(e.body) / 200)),
      // The picture folder the issue itself uses, so renaming the file never loses its thumbnail.
      thumb: firstPicture(e.body?.match(/assets\/newsletter\/([^/)]+)\//)?.[1] ?? e.id),
    }))
    .sort((a, b) => +b.data.date - +a.data.date);
  // Two files with the same name after the date would share one web address, and one issue would vanish.
  const seen = new Set<string>();
  for (const i of issues) {
    if (seen.has(i.slug)) throw new Error(`Two newsletter issues share the address /newsletter/${i.slug}/. Rename one of the files in src/content/newsletter/.`);
    seen.add(i.slug);
  }
  return issues;
}

/**
 * The summary without its opening greeting, for previews: "Hello everyone, and happy Sunday! Have you
 * ever wondered…" becomes "Have you ever wondered…". The issue itself keeps the greeting.
 */
export function teaser(summary = '') {
  const greeting = /^(hello|hi|hey|happy|welcome|good (morning|afternoon|evening)|greetings|we hope you)\b[^.!?]*[.!?]+\s*/i;
  let s = summary.trim();
  while (greeting.test(s)) s = s.replace(greeting, '');
  return s || summary;
}

const noEmoji = (s: string) => s.replace(/\p{Extended_Pictographic}|️|‍/gu, '').replace(/\s+/g, ' ').trim();

/** The "In this issue" list: the main sections, or the smaller ones when an issue has no main sections. */
export function contents(headings: MarkdownHeading[]) {
  const main = headings.filter((h) => h.depth === 2);
  const list = main.length >= 2 ? main : headings.filter((h) => h.depth <= 3);
  return list.map((h) => ({ slug: h.slug, text: noEmoji(h.text) })).filter((h) => h.text);
}
