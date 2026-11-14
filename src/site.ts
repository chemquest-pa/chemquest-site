import { getCollection } from 'astro:content';

// Every outside link the site uses lives here, so a change only happens once.
export const links = {
  email: 'chemquestpa@gmail.com',
  // The newsletter's pages on this site (all past issues). Issues are written and emailed with beehiiv.
  newsletter: '/newsletter/',
  newsletterSubscribe: 'https://chemquests-newsletter.beehiiv.com/subscribe',
  newsletterFeedback: 'https://forms.gle/2xjo4Pr6GmSttj4J8',
  volunteerForm: 'https://forms.gle/vKJGkitbYFP8mfeN7',
  // Google Form for at-home experiment photos (Try at home page): "ChemQuest at-home experiment photos", made Nov 2026.
  // Leave it '' to show only the email button.
  photoForm: 'https://docs.google.com/forms/d/e/1FAIpQLSdKHAgAADYYSYaLAjoRzaPz_C0tMq9lJ6CjeRTtv6SAk0fEPg/viewform',
  discord: 'https://discord.gg/sMNHeNaaky',
  instagram: 'https://www.instagram.com/chemquestpa/',
  facebook: 'https://www.facebook.com/profile.php?id=61564862482932',
  linkedin: 'https://www.linkedin.com/company/chemquestpa/',
  venmo: 'https://venmo.com/u/Chemquest26',
  venmoHandle: '@Chemquest26',
  phones: ['267-541-8492', '484-995-5992'],
};

// beehiiv's sign-up form, so people subscribe without leaving our site. In beehiiv: Subscribers > Subscribe forms >
// Create new form (Inline) > Save & get embed code. Paste the code between the backticks. Leave it empty to show a
// button to beehiiv's sign-up page instead.
// Form "ChemQuest website (Newsletter page)" in beehiiv, made Nov 14, 2026.
export const newsletterForm = `<script async src="https://subscribe-forms.beehiiv.com/v3/loader.js" data-beehiiv-form="9cce7a66-8c49-4d86-806e-1586da28d45c"></script>`;

// Silver and Gold sponsors get a thank-you on the Sponsor page. Add each as { name: 'Business name', url: 'https://...' }.
// The "Thank you to our sponsors" list only appears once there's at least one.
export const sponsors: { name: string; url?: string }[] = [];

// Numbers on the homepage tiles. Event counts are worked out automatically; update these by hand.
// Sign-ups across all events, mentioned in "Who we are" on the homepage. Update it when the total changes.
export const stats = { registrations: 130 };

// Live member count for the Discord server, read from the public invite link.
// Fetched when the site is built, then refreshed in the visitor's browser. Returns null if Discord can't be reached.
export const discordInviteCode = links.discord.split('/').pop()!;
export async function getDiscordCounts(): Promise<{ members: number } | null> {
  try {
    const r = await fetch(`https://discord.com/api/v10/invites/${discordInviteCode}?with_counts=true`, { signal: AbortSignal.timeout(4000) });
    if (!r.ok) return null;
    const j = await r.json();
    return { members: j.approximate_member_count };
  } catch {
    return null;
  }
}

// The menu. Items with "children" get a dropdown on laptops and an indented list on phones.
// Set external: true for links that leave the site.
type NavLink = { href: string; label: string; external?: boolean };
export const nav: (NavLink & { children?: NavLink[] })[] = [
  { href: '/', label: 'Home' },
  { href: '/events/', label: 'Events', children: [
    { href: '/events/#upcoming', label: 'Upcoming events' },
    { href: '/events/#past', label: 'Past events' },
    { href: '/gallery/', label: 'Photo gallery' },
  ] },
  { href: '/newsletter/', label: 'Newsletter', children: [
    { href: '/newsletter/#all', label: 'All issues' },
    { href: links.newsletterSubscribe, label: 'Subscribe by email', external: true },
    { href: links.newsletterFeedback, label: 'Newsletter feedback form', external: true },
  ] },
  { href: '/at-home/', label: 'Try at home' },
  { href: '/volunteer/', label: 'Volunteer', children: [
    { href: '/volunteer/', label: 'How to volunteer' },
    { href: links.volunteerForm, label: 'Volunteer interest form', external: true },
    { href: links.discord, label: 'Discord server', external: true },
  ] },
  { href: '/sponsor/', label: 'Sponsor & donate', children: [
    { href: '/sponsor/#tiers', label: 'Sponsorship tiers' },
    { href: links.venmo, label: 'Donate on Venmo', external: true },
  ] },
  { href: '/about/', label: 'About us', children: [
    { href: '/about/', label: 'About ChemQuest' },
    { href: '/about/team/', label: 'Our team' },
    { href: '/about/alumni/', label: 'Alumni' },
  ] },
  { href: '/contact/', label: 'Contact' },
];

// The Discord logo (from Simple Icons, CC0), drawn on a 24×24 grid.
export const discordIcon = 'M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z';

// Events count as "upcoming" through the end of their day, Eastern time.
// ponytail: decided when the site is built, so rebuild after each event (or schedule a daily rebuild on the host).
export async function getEvents() {
  const all = (await getCollection('events')).sort((a, b) => +a.data.date - +b.data.date);
  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' }); // YYYY-MM-DD
  const day = (e: (typeof all)[number]) => e.data.date.toISOString().slice(0, 10);
  return {
    upcoming: all.filter((e) => day(e) >= today),
    past: all.filter((e) => day(e) < today).reverse(),
  };
}

export const longDate = (d: Date) =>
  d.toLocaleDateString('en-US', { timeZone: 'UTC', weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
export const shortDate = (d: Date) =>
  d.toLocaleDateString('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric', year: 'numeric' });
// Newsletter issues: "November 1, 2026" (no weekday; issues go out on Sundays).
export const issueDate = (d: Date) =>
  d.toLocaleDateString('en-US', { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' });
