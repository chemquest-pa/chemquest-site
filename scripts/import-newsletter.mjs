// Copies published issues from ChemQuest's beehiiv newsletter into the website.
//
//   npm run newsletter                        copy any new issues into the site
//   npm run newsletter -- --out test --all    re-import every issue into a "test" folder, to try changes
//                                             to this script without touching the real files
//
// Writers keep using beehiiv to write and email each issue. This script reads the public beehiiv
// site and, for every issue the website doesn't have yet:
//   - writes src/content/newsletter/<date>-<title>.md (the issue as Markdown), and
//   - saves its pictures, shrunk to at most 1,400 pixels, in src/assets/newsletter/<same name>/.
//
// It recognizes issues it has already copied by the `beehiiv:` link in each file, so you can rename
// or edit an imported file and it won't be copied again. To re-import an issue, delete its file and
// its picture folder, then run the script again.
//
// After importing, check each new file's title, topic, and picture descriptions (EDITING.md, "Newsletter").
import fs from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'node-html-parser';
import TurndownService from 'turndown';
import sharp from 'sharp';

const SITE = 'https://chemquests-newsletter.beehiiv.com';
const args = process.argv.slice(2);
const outRoot = args.includes('--out') ? args[args.indexOf('--out') + 1] : '.';
const importAll = args.includes('--all');
const OUT = path.join(outRoot, 'src/content/newsletter');
const IMG = path.join(outRoot, 'src/assets/newsletter');

// Sections that repeat in every issue. The website's newsletter page shows them once instead.
const SKIP = /^(volunteer hours|(news)?letter feedback form)/i;
// Sections that are ChemQuest news rather than the issue's science theme.
const NEWS = /chemquest news|upcoming events?|announcements?/i;

const get = async (url) => {
  const res = await fetch(url, { headers: { 'user-agent': 'ChemQuest website newsletter import' } });
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  return res;
};
// Text without emoji, with single spaces, and no space left before punctuation. Used for tests and titles.
const clean = (s) => s
  .replace(/\p{Extended_Pictographic}|️|‍/gu, '')
  .replace(/\s+/g, ' ')
  .replace(/\s+([.,!?;:)])/g, '$1')
  .trim();
// Text as written (emoji kept), on one line. Used for headings in the issue.
const tidy = (s) => s.replace(/\s+/g, ' ').trim();
// "Déjà Vu & Dreams" -> "deja-vu-and-dreams". Long titles are cut at a word, under 60 characters.
const slugify = (s) => {
  const full = s.normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/&/g, ' and ').replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return full.length <= 60 ? full : full.slice(0, 61).replace(/-[^-]*$/, '');
};
const yamlStr = (s) => JSON.stringify(s ?? '');
const longDate = (iso) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' });

// Bold text: <strong>/<b>, or beehiiv's <span style="font-weight:700">.
const isBold = (el) => /^(STRONG|B)$/.test(el.tagName) || /font-weight:\s*(700|800|900|bold)/i.test(el.getAttribute('style') || '');
const boldText = (node) => clean(node.querySelectorAll('*').filter(isBold).map((b) => b.text).join(' '));

const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', emDelimiter: '_' });
td.remove(['script', 'style', 'iframe', 'button', 'form']);
// Underlined labels ("Why Volunteer?") keep their emphasis as bold.
td.addRule('underline', {
  filter: (n) => n.nodeName === 'U' && !n.closest('strong, b, a'),
  replacement: (c) => {
    const t = c.trim();
    if (!t) return c;
    const [, lead, , trail] = c.match(/^(\s*)([\s\S]*?)(\s*)$/);
    return `${lead}**${t}**${trail}`;
  },
});

// Which beehiiv issues the website already has, and their web addresses (for links between issues).
await fs.mkdir(OUT, { recursive: true });
const have = new Map(); // beehiiv link -> slug
const slugs = new Set();
for (const f of await fs.readdir(OUT)) {
  if (!f.endsWith('.md')) continue;
  const slug = f.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
  slugs.add(slug);
  const m = (await fs.readFile(path.join(OUT, f), 'utf8')).match(/^beehiiv:\s*(\S+)/m);
  if (m) have.set(m[1].replace(/\/$/, ''), slug);
}

const sitemap = await (await get(`${SITE}/sitemap.xml`)).text();
const urls = [...new Set([...sitemap.matchAll(/<loc>(https:[^<]+\/p\/[^<]+)<\/loc>/g)].map((m) => m[1]))];
let added = 0;

for (const url of urls) {
  if (have.has(url) && !importAll) continue;
  const doc = parse(await (await get(url)).text());
  const meta = (p) => doc.querySelector(`meta[property="${p}"]`)?.getAttribute('content');
  // The date in Eastern time, so an issue sent on Sunday evening stays dated Sunday.
  const published = meta('article:published_time');
  const date = published && new Date(published).toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
  const body = doc.querySelector('#content-blocks');
  if (!date || !body) { console.warn('Skipped (no date or content):', url); continue; }

  // Clean up links: real email addresses instead of Cloudflare's hidden ones, and no tracking codes.
  for (const a of body.querySelectorAll('a[href]')) {
    const href = a.getAttribute('href');
    if (href.includes('/cdn-cgi/l/email-protection')) {
      const hex = href.split('#')[1] || a.querySelector('[data-cfemail]')?.getAttribute('data-cfemail') || '';
      const bytes = hex.match(/../g)?.map((h) => parseInt(h, 16)) ?? [];
      const email = bytes.slice(1).map((b) => String.fromCharCode(b ^ bytes[0])).join('');
      if (email.includes('@')) { a.setAttribute('href', `mailto:${email}`); a.set_content(email); }
      continue;
    }
    try {
      const u = new URL(href);
      for (const k of [...u.searchParams.keys()]) if (/^utm_|^_bhlid$/.test(k)) u.searchParams.delete(k);
      // Links to other issues point to the same issue on this site.
      const local = have.get(`${u.origin}${u.pathname}`.replace(/\/$/, ''));
      a.setAttribute('href', local ? `/newsletter/${local}/` : u.toString());
    } catch { /* not a full web address; leave it */ }
  }

  // Split the issue into sections at each top-level heading.
  const blocks = body.querySelectorAll('h1, h2, h3, h4, p, ul, ol, blockquote, img, hr, table');
  const top = blocks.filter((el) => !blocks.some((other) => other !== el && other.innerHTML.includes(el.outerHTML)));
  const sections = [{ heading: '', raw: '', nodes: [] }];
  for (const el of top) {
    if (el.tagName === 'H2' || el.tagName === 'H1') sections.push({ heading: clean(el.text), raw: tidy(el.text), nodes: [] });
    else sections.at(-1).nodes.push(el);
  }
  const kept = sections.filter((s) => !SKIP.test(s.heading));

  for (const s of kept) {
    // Newer issues mark sections with a short, all-bold line instead of a heading. Make those headings.
    // Questions and exclamations count. Lines ending in . : , ; or starting with "(" don't, and neither do
    // one-word labels or short questions like "Where?" and "How much?" (a question needs 3+ words).
    // ponytail: a list of bold names (like new officers, each followed by a short bio) still looks like
    // sections to this rule; EDITING.md asks whoever imports to check the headings.
    for (const node of s.nodes) {
      const t = clean(node.text);
      if (node.tagName !== 'P' || !t || t.length >= 70) continue;
      if (/^(sources|references):?$/i.test(t)) { node.tagName = 'H3'; node.set_content(t.replace(/:$/, '')); continue; }
      const words = t.split(' ').length;
      // (An exclamation over 6 words is a sentence, like "They are accurate to within a second over millions of years!")
      const shapeOk = !/[.:,;]$/.test(t) && !t.startsWith('(') && words >= 2
        && (!t.endsWith('?') || words >= 3) && (!t.endsWith('!') || words <= 6);
      if (shapeOk && boldText(node).length >= t.length - 1) {
        node.tagName = 'H3';
        node.set_content(tidy(node.text));
      }
    }
    // Drop the repeated sections, whether they show up as a heading or as a plain line.
    let skipping = false;
    s.nodes = s.nodes.filter((node) => {
      const t = clean(node.text);
      if (/^H[34]$/.test(node.tagName) || SKIP.test(t)) skipping = SKIP.test(t);
      return !skipping;
    });
  }

  // Author ("Written by …") and the opening paragraph, used as the issue's summary.
  const intro = kept[0].nodes;
  const byline = intro.find((n) => /^\s*written by/i.test(n.text));
  const author = byline ? clean(byline.text.replace(/^\s*written by\s*/i, '')) : '';
  const summaryNode = intro.find((n) => n !== byline && n.tagName === 'P' && clean(n.text).length > 40);
  const summary = summaryNode ? clean(summaryNode.text) : '';
  kept[0].nodes = intro.filter((n) => n !== byline);

  // Title: the theme heading if there is one, otherwise beehiiv's subtitle if it reads like a title
  // (not "Week of …", at least two words). Otherwise the file gets a dated name and a placeholder title.
  const theme = kept.find((s) => s.heading && !NEWS.test(s.heading))?.heading;
  const subtitle = clean(meta('og:description') || '');
  const usable = (t) => t && !/^week of/i.test(t) && t.split(' ').length >= 2 && t.length >= 8;
  const title = theme || (usable(subtitle) ? subtitle : '');
  let slug = title ? slugify(title) : `newsletter-${date}`;
  for (let n = 2; slugs.has(slug); n++) slug = `${title ? slugify(title) : `newsletter-${date}`}-${n}`;
  slugs.add(slug);
  const id = `${date}-${slug}`;
  if (!title) console.warn(`  ${id}: no title found. Give it one in its file (see EDITING.md).`);

  // Save pictures locally so the site doesn't depend on beehiiv's servers.
  await fs.mkdir(path.join(IMG, id), { recursive: true });
  let n = 0;
  for (const s of kept) for (const node of s.nodes) for (const img of [node, ...node.querySelectorAll('img')].filter((x) => x.tagName === 'IMG')) {
    const src = img.getAttribute('src');
    if (!src || !/^https?:/.test(src)) continue;
    try {
      const res = await get(src.replace(/\/cdn-cgi\/image\/[^/]+\//, '/'));
      const type = res.headers.get('content-type') || '';
      const ext = type.includes('png') ? 'png' : type.includes('gif') ? 'gif' : 'jpg';
      const file = `${String(++n).padStart(2, '0')}.${ext}`;
      let buf = Buffer.from(await res.arrayBuffer());
      if (ext !== 'gif') {
        buf = await sharp(buf).rotate().resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
          .toFormat(ext === 'png' ? 'png' : 'jpeg', ext === 'png' ? { palette: true } : { quality: 80, mozjpeg: true }).toBuffer();
      }
      await fs.writeFile(path.join(IMG, id, file), buf);
      img.setAttribute('src', `../../assets/newsletter/${id}/${file}`);
      // A placeholder description. Replace it with what the picture actually shows (EDITING.md).
      img.setAttribute('alt', clean(img.getAttribute('alt') || '') || `TODO: describe this picture`);
    } catch (e) { console.warn('  picture skipped:', src, e.message); img.remove(); }
  }
  if (!n) await fs.rmdir(path.join(IMG, id)).catch(() => {});

  let md = kept
    .map((s) => (s.raw ? `## ${s.raw}\n\n` : '') + td.turndown(s.nodes.map((x) => x.outerHTML).join('\n')))
    .join('\n\n')
    // No bold markers inside headings, lines with only spaces become empty, no runs of blank lines.
    .replace(/^(#{2,6} )(.*)$/gm, (m, h, t) => h + t.replace(/\*\*/g, '').trim())
    .replace(/^[ \t]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  // Issues whose sections are all small headings: move every heading up a level, so they follow the page title.
  if (!/^## /m.test(md)) md = md.replace(/^#(#{2,5}) /gm, '$1 ');

  const front = [
    '---',
    `title: ${yamlStr(title || `Newsletter for ${longDate(date)}`)}`,
    `date: ${date}`,
    author && `author: ${yamlStr(author)}`,
    summary && `summary: ${yamlStr(summary)}`,
    '# topic: body, life, earth, space, chemistry, tech, ideas, or news (see EDITING.md)',
    'topic: other',
    `beehiiv: ${url}`,
    '---',
  ].filter(Boolean).join('\n');
  await fs.writeFile(path.join(OUT, `${id}.md`), `${front}\n\n${md}\n`, { flag: 'wx' }).catch((e) => {
    throw new Error(`Not overwriting ${id}.md (${e.code}). Rename or delete it first.`);
  });
  console.log('Added', id);
  added++;
}
console.log(`Done: ${added} new issue(s). The website has ${have.size + (importAll ? 0 : added)} of the ${urls.length} issues on beehiiv.`);
