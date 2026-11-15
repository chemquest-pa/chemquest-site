# ChemQuest website checklist

Everything on the site that's still a placeholder, a guess, or waiting on someone. The site isn't finished until every box is ticked. Each item says where the thing lives, so whoever fills it in knows which file to open. ([EDITING.md](EDITING.md) explains how to edit each kind of file.)

Last updated: November 14, 2026 (round 14). The launch steps (GitHub, domain, getting found, old sites) are in [TECH-PLAN.md](TECH-PLAN.md).

Changes to the original site that the presidents should OK (like the new sponsor prices) are in [PRESIDENTS.md](PRESIDENTS.md).

## Placeholders showing on the site right now

- [ ] **Photos (coming to Drive).** You're adding a batch of photos to Google Drive. Once they're there, I'll use them for the items below.
- [ ] **Officer bios and photos: 5 of 10 still to come.** Done: Andrea Yao, Andrea Hoang (last year's photo, at her request), Aarna Yogish, Anandi Pingle, Connor Liu. Still waiting on: Ethan Ruslim, Matilda Duong, Srinita Paul Chowdhury, Aneesha Chennareddy, and Lucas Zhao. Each officer is one file in `src/content/team/`: the bio goes under the second `---`, and the photo goes in `src/assets/team/` with a `photo:` line (see EDITING.md, "Officers").
- [ ] **Officer school and grade** (optional): add a `school:` line, like `school: Junior, Garnet Valley High School`.
- [ ] **Role titles.** From the Drive doc, I wrote the roles as Co-President, Vice President, Technology Chair, Volunteer Management Chair, Fundraising and Finance Chair, and Advertising Chair. Check those titles.
- [ ] **Group photo on the homepage.** "Who we are" now shows the eight volunteers in ChemQuest shirts from STEM Day (`src/assets/photos/volunteers-stem-day-2026.jpg`). Swap it for an officer group photo once you have one, and check that everyone in it is OK being on the site.
- [ ] **Gallery photos for each event.** Put them in `src/assets/gallery/<event file name>/`.
- [ ] **Tax ID (EIN)** on the Sponsor page. It says "Our tax ID (EIN) is coming soon." Fill in `ein` near the top of `src/pages/sponsor.astro`.
- [ ] **"Featured in the newsletter" photos** on the Try at home page: three placeholders until kids' photos come in (`src/pages/at-home.astro`).

## Newsletter section

- [ ] **When the domain changes:** in beehiiv, Settings → Emails → "Opt in redirect URL" points to chemquest.pages.dev/newsletter/. Change it to the new domain.

- [ ] **beehiiv's own sign-up page** (the purple "Join the ChemQuest Community!" page): in beehiiv's website builder, add a line under the heading saying what subscribers get (one email every other Sunday with a science topic and ChemQuest news, free, unsubscribe anytime), and use the full-size logo.

- [ ] **Finish GitHub** (github.com/chemquest-pa/chemquest-site): add the Cloudflare API token, finish the branch rule, run "Publish website" once, and invite the Technology Chairs. Steps in TECH-PLAN.md, section 3.
- [ ] **beehiiv editors.** beehiiv's free plan allows one login. Either the writers share the club's login, or upgrade: Lite allows 2 people (about $49 a month billed yearly, up to 1,000 subscribers), and Pro allows 10 (about $95 a month billed yearly). On a paid plan, a "Contributor" can write and edit posts without being able to send them. The website side is free either way.
- [ ] **The first 7 issues (optional).** Drive drafts 1 to 7 (December 2024 to March 2025) were sent before the newsletter moved to beehiiv, so they aren't in the website's archive. They're mostly STEM news and summer-program listings with 2025 deadlines. Decide whether to add them; I'd leave them out.
- [ ] **Pictures copied from other websites** in past issues, now also shown on the club's site. A newsletter email is gone in a day, but the website keeps them up. Replace or remove the ones you don't have permission for:
  - `2025-03-30-science-news-and-great-science-tv-shows`: five TV posters and logos (Wild Kratts, Octonauts, Magic School Bus, Brain Games, MythBusters).
  - Pictures with another site's watermark or logo, found in the review: Sally's Baking Addiction, Cleveland Clinic, RNZ, HowardLuksMD, GeeksforGeeks, ScienceFacts, a flight manual page, and a Ready Player One poster.
  - Each picture is a line like `![description](../../assets/newsletter/<issue>/03.jpg)` in the issue's file in `src/content/newsletter/`. Delete the line to remove it.
- [ ] **Kids' faces and a name in past issues.** Five issues show kids from ChemQuest events: Dunes to Discoveries (2025-07-08), Science Fair Success Guide (2025-08-24), Bioluminescence (2025-11-16, which also names a student in full), Spring Science Exploration Event (2026-03-22), and Evolution (2026-05-03). Same question as the STEM Day photos: confirm it's OK, or I'll take them out (or use first names only).
- [ ] **Each new issue: a quick check** after it's imported (title, topic, picture descriptions, headings). Five minutes for a Technology Chair; steps in [EDITING.md](EDITING.md) ("Newsletter").
- [ ] **Theme in beehiiv's subtitle** (optional). If writers put the week's theme in beehiiv's subtitle field instead of "Week of 11/15", the import uses it as the issue's title.

## Google Forms

- [ ] **Photo form owner (optional).** Uploaded photos go to the form owner's Drive, which is a personal account for now. To have them land in the club's Drive instead, transfer ownership to chemquestpa@gmail.com: in Drive, share the form with that account as an editor, then make it the owner. Google records each uploader's account name and email with their photo, so you can see who sent what.
- [ ] **Someone checks the photo form's responses** and picks photos for the newsletter.
- [ ] **Photo permission on each new event's forms.** The main volunteer interest form now asks it (see Done). For every new event, add one required multiple-choice question to the kids' RSVP form (the last one was "ChemQuest x Mathnasium STEM Day RSVP") and to that event's volunteer interest form:
  - Kids' RSVP: "May ChemQuest post photos from this event that show your child's face (newsletter, website, and social media)?" Choices: "Yes" / "No, please leave my child's face out of photos you post"
  - Event volunteer form: "May ChemQuest post photos of you from events (newsletter, website, and social media)?" Choices: "Yes" / "No"
  - Tip: if you make each new form by copying the last one, add the question once and it carries over.
- [ ] **Photos already on the site** show kids' faces, including the new STEM Day photos, and two older photo file names say "unblured". The STEM Day RSVP form didn't ask about photos, so confirm with the presidents that posting them is OK.

## Numbers to confirm

- [ ] **Registrations.** The tile says "130+". Ask the president for the exact total from the sign-up forms, then set `registrations` in `src/site.ts`. (An exact number reads as more real than a round one.)
- [ ] **Newsletter frequency and reach.** The Sponsor page says "200–300 views per issue". Officer bios said "biweekly". Is "1,000+ followers" still accurate?

## Decisions for you

- [ ] **Taxes (presidents):** confirm the 990-N e-Postcard for July 2025 to June 2026 is filed (TECH-PLAN.md, section 7).
- [ ] **Shared logins:** keep club passwords in a password manager, not in Google Docs (TECH-PLAN.md, section 7).

- [ ] **Our safety tips** on the Try at home page (an adult hands out the tablets; leave the cap off while it bubbles) are ChemQuest's own, not from Science Bob or PBS. Keep or cut them.

## Wording and facts to confirm

- [ ] **Experiment tiles** on the homepage (14). I rewrote the explanations in plainer words, following the team's procedure docs and slides in Drive where they exist. An officer should read them once. The "element symbols" on the front (Cm, Dn, De, Os, Ph, Ic, Lv, Et, Cd, Ba, In, Mt, Lu, Ob) are made up for fun.
- [ ] **Rewritten sentences** (round 7): the homepage intro, "Want to host a free event? Our volunteers bring all the supplies and run every station. We just need a room with tables.", "Kids move from table to table in small groups and spend about 15 minutes at each experiment…", the June 2024 event, the Impact and Education core values on About, and the Discord text on the homepage and Contact page.
- [ ] **Core-value tiles** on About (Im, Co, Ed).
- [ ] **Photo submission email:** the email opens with a permission line ("…permission to share this photo in its newsletter and on its website, with first name only"). Make sure the officers are happy with that wording, and that someone checks the inbox.
- [ ] **Event titles:** the old site had only dates, so past events got short names ("Spring STEM Day", "Winter STEM Day"…). Rename freely.
- [ ] **Location:** Brandywine Hundred Library is in Wilmington, DE, but the site says ChemQuest is from Glen Mills, PA. Confirm that's how you want to describe yourselves.
- [ ] **Sponsor reply line:** "We'll reply with next steps and ask for your logo" (Sponsor page).

## Outside the website

- [ ] **beehiiv "View all" page.** The newsletter's homepage lists real ChemQuest issues, but its Archive page (chemquests-newsletter.beehiiv.com/archive, where both "View all" buttons go) shows beehiiv's sample travel posts. Fix that page in beehiiv's website builder, or point beehiiv's "View all" buttons to the new Newsletter page once the site has its final address.
- [ ] **Old WordPress site:** unpublish the "Experimental :)" page.

## Before launch

- [ ] **Final address.** The draft is at https://chemquest.pages.dev (Cloudflare Pages project "chemquest", in your Cloudflare account). When you move to a real domain (for example, pointing chemquest.woob.site at it in Cloudflare), change `site:` in `astro.config.mjs` to match and upload again.
- [ ] **Custom domain.** Some networks and school-managed laptops refuse to look up `pages.dev` addresses ("server IP address could not be found"), because scammers misuse them. The site itself is fine. A real domain (for example chemquestpa.org, about $10–15 a year) avoids this and is needed for launch anyway. Connect it in Cloudflare under Workers & Pages → chemquest → Custom domains.
- [ ] **Officers review the draft** at https://chemquest.pages.dev. Anyone with the link can see it, but it isn't linked from anywhere.
- [ ] **Test on real phones** (an iPhone and an Android) and with a screen reader. The automated tests can't fully cover these.

## Done

- [x] Newsletter template (Template tab of "Newsletter IDEAS + TEMPLATE" in Drive) cleaned up: a how-to note, a line linking to the website, simpler sections, shorter volunteer and feedback blocks, and the current Discord invite (round 16). A footer link in every email would need a paid beehiiv plan, so the link lives in the template.

- [x] GitHub organization chemquest-pa and public repository chemquest-site, with the site uploaded (round 16). Cloudflare Web Analytics on. Google structured data on the homepage. Editing guide rewritten for new officers.

- [x] Newsletter sign-up box on our own site (beehiiv form "ChemQuest website (Newsletter page)", round 15). After confirming their email, new subscribers land on our Newsletter page instead of beehiiv's.

- [x] AI-look clean-up (round 14): white background with neutral text instead of cream and brown; no number tiles (the numbers are in "Who we are"); the whole headline in one color, and the experiment names go by once then stop; no fade-ins on scroll, no floating drawings or Discord logo, no drawings sliding with the mouse; buttons don't lift; no arrows after links; no "Error 404" label.

- [x] Newsletter section on the website (round 12): all 41 beehiiv issues copied over, with readable titles, a topic for each, written picture descriptions (94), cleaned-up headings, and links between issues kept on the site. The Newsletter page has topic tabs and search; each issue has "In this issue", older/newer links, and related issues. An import script adds new issues from beehiiv.
- [x] Newsletter frequency: every other Sunday (the issue dates in beehiiv confirm it).

- [x] Phone numbers changed to 267-541-8492 and 484-995-5992 (from a president, round 11).
- [x] Alumni grouped as "Class of 2024 graduates" (Charlotte, Matthew, and Bethsaida, with her bio) and "Class of 2026 graduates" (round 11).

- [x] STEM Day photos (round 10): from the "Photos" folder in Drive, 34 photos reviewed and 8 used: the event cover, 6 gallery photos, and the officer group photo on the homepage. Scaled down to 1,600px, with photo location data removed. (Round 17: the group photo was swapped for one where no one is blinking, with name tags left as they are.) The 2 videos aren't used.
- [x] Phone menu sub-pages are a list in a white panel (round 10).

- [x] Phone layout (round 9): smaller text everywhere, small-print footer, a new phone menu (no element tiles), experiment tiles in one swipeable row, and two-across officer badges and gallery photos.
- [x] Sponsor tiers back to the original $50 / $150 / $200 (round 11).

- [x] Draft site online at https://chemquest.pages.dev (Cloudflare Pages), checked on all 11 pages at 5 sizes.

- [x] The "ChemQuest Volunteer Interest Form" (the one the site links to) now ends with a required question: "May ChemQuest post photos of you from events (newsletter, website, and social media)?" Yes / No.
- [x] Photo form "ChemQuest at-home experiment photos" built and published in Google Forms (child's first name, age, experiment, one photo, required permission checkbox). The "Send us a photo" button on Try at home links to it, with email as the backup.
- [x] Headline loop and experiment tiles list only experiments ChemQuest has done (from the old site's event write-ups, the Drive procedures, and your list). Removed lava lamps, rock candy, balloon rockets, bouncy balls, and model lungs from the headline (round 8).
- [x] Experiment explanations rewritten in plainer words (round 8). The pH tile is now "Cabbage pH indicator", from the June 2024 plan in Drive, and the ice cream tile follows the team's Rock Salt Ice Cream slides.
- [x] Silver and gold tier bars: the color band now sits inside each card's border, the same width as the card (round 8).
- [x] Newsletter issues: 48 sent as of Nov 1, 2026. Drive drafts 8 to 48 are the 41 beehiiv issues on the site; drafts 1 to 7 came before beehiiv. The homepage tile now counts by itself (round 13).
- [x] Officer name spelled "Connor Liu".
- [x] Font: Figtree for everything (round 13), replacing Zilla Slab and Libre Franklin.
- [x] Tax-deductible: confirmed.
- [x] First event date: Aug 26, 2023 was a Saturday (Aug 29 was a Tuesday), so the site keeps Aug 26.
- [x] Venmo link works; both phone numbers stay public.
- [x] This year's 10 officers (names and roles) from the "ChemQuest Team 2026 - 2027" doc in Drive, with "Meet our 2026–27 officers" on the Our team page.
- [x] Handwritten notes removed (round 7).
- [x] Photo captions removed from the enlarged-photo view (round 7). Short descriptions stay in the code for screen readers, so there's nothing to rewrite.
- [x] Lava lamp photo: a Creative Commons photo from Flickr ("lava lamp -Gina" by nist6ss, CC BY-SA 2.0), credited under it.
- [x] Try at home steps and science taken from Science Bob and PBS KIDS for Parents, and credited on the page.
- [x] Discord: no "online now" count; the text says anyone 13 or older can join, including 7th and 8th graders.
- [x] STEM Day recap written from the event plan in Drive.
- [x] Discord invite that never expires (discord.gg/sMNHeNaaky). Discord confirms it has no expiry date.
- [x] Graduated officers (Nuha, Henry, Jay, Raksha, Rakhee, Nidhi, Ananya) moved to Alumni, now shown as small cards with a photo, name, and role.
- [x] Mathnasium isn't listed as a partner (the STEM Day recap thanks them for hosting).
- [x] Volunteer wording, one-time sponsorships, no sponsors listed yet, Discord open to the whole community.
