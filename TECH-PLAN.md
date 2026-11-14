# ChemQuest tech plan

How to launch the new website, get it found, retire the old sites, and keep ChemQuest's online accounts safe from year to year. Written for the Technology Chairs. Prices and rules were checked on November 14, 2026.

## 1. How the pieces fit

| Piece | What it does | Who edits it |
|---|---|---|
| **The website** (Astro, hosted free on Cloudflare Pages) | Every page: events, volunteer, sponsor, about, and the newsletter archive | Technology Chairs, on GitHub |
| **beehiiv** | Writing and emailing each newsletter, and the subscriber list | Newsletter writers |
| **The import script** | Copies each new beehiiv issue onto the website | Runs by itself every Sunday night once GitHub is set up |

Astro is the tool that builds the website. beehiiv is still the newsletter's home. Writers don't need to change anything: they write and send in beehiiv as they do now, and the website picks the issue up.

## 2. What's left before launch

The site works. What's missing is content and decisions, all listed in [CHECKLIST.md](CHECKLIST.md): officer photos and bios, the tax ID, photo permissions, and the presidents' sign-off on [PRESIDENTS.md](PRESIDENTS.md). Launch in this order:

1. Presidents review the draft at https://chemquest.pages.dev and PRESIDENTS.md.
2. Set up GitHub (section 3).
3. Buy the domain (section 4).
4. Do the "get found" steps (section 5).
5. Point the old sites at the new one (section 6).

## 3. Publishing with GitHub

GitHub keeps the website's files, lets several people edit them, and publishes every change automatically. Free.

**One-time setup** (an hour, one person):

1. Each Technology Chair makes a GitHub account (13 or older). Students can also claim the free GitHub Student Developer Pack.
2. One of them creates a **free organization** (github.com → profile picture → Your organizations → New organization → Free), for example `chemquest-pa`. Make at least two people **owners**: both Technology Chairs, plus one officer or adult who will still be around next year.
3. Create a **public** repository in it, named `chemquest-site`. Public is free and lets you protect the main branch. Nothing in the project is secret (the `.gitignore` file leaves out private notes).
4. Upload the project folder. Easiest is GitHub Desktop (desktop.github.com): File → Add local repository → choose the folder → Publish repository → pick the organization. `node_modules`, `dist`, and `.astro` are skipped automatically.
5. In Cloudflare: My Profile → API Tokens → Create Token → Custom token. Permission: **Account → Cloudflare Pages → Edit**, for the ChemQuest account only. Copy the token.
6. In the GitHub repository: Settings → Secrets and variables → Actions → New repository secret. Add `CLOUDFLARE_API_TOKEN` (the token) and `CLOUDFLARE_ACCOUNT_ID` (shown in Cloudflare on the Workers & Pages page).
7. Settings → Rules → Rulesets → New branch ruleset for `main`: tick **Restrict deletions** and **Block force pushes** only. (Don't require pull requests, or the newsletter import can't save.)
8. Actions tab → **Publish website** → Run workflow. A green check means it worked. Then run **Import newsletter** once the same way.

**Day to day:** open a file on github.com, click the pencil, edit, then **Commit changes**. The site updates in about two minutes. Bigger changes: edit on your computer, preview with `npm run dev`, then Commit and Push in GitHub Desktop. To undo something, open the file's History and revert it.

**Two things to know:**
- GitHub pauses scheduled jobs in a public repository after 60 days with no changes (summer). If new issues stop appearing, Actions → Import newsletter → Enable workflow / Run workflow.
- Keep the existing Cloudflare project ("chemquest"). Cloudflare can't switch it to connect to GitHub directly, which is why the publishing goes through GitHub Actions instead.

More detail: [EDITING.md](EDITING.md), "Working together on GitHub" and "Newsletter".

## 4. Get a real domain (about $8.50 a year)

Some school and home networks block `pages.dev` addresses, Google's nonprofit programs need a real domain, and it looks more trustworthy on flyers.

1. An adult with the club's card buys the domain at **Cloudflare Registrar**, in the same Cloudflare account as the site (Domain Registration → Register Domains). `chemquestpa.org` appeared available on Nov 14; `chemquest.org` is taken. A `.org` costs about $8.50 a year at cost. Turn on auto-renew.
2. Workers & Pages → chemquest → Custom domains → add `chemquestpa.org` and `www.chemquestpa.org`.
3. In the project, change `site:` in `astro.config.mjs` to `https://chemquestpa.org` and publish.
4. Rules → Bulk Redirects: send `chemquest.pages.dev` to `https://chemquestpa.org` (301, tick all four options), so old links keep working.

**Free email at the domain:** Cloudflare Email Routing (free) can forward `hello@chemquestpa.org` to the club Gmail. Replies still come from the Gmail address unless you later get Google Workspace for Nonprofits (section 7).

## 5. Getting the websites known

The site already has a sitemap (`/sitemap-index.xml`), a `robots.txt`, and canonical links. After the domain is live:

1. **Google Search Console** (search.google.com/search-console), signed in as the club Gmail: add a *Domain* property, verify it with the TXT record Google gives you (Cloudflare → DNS → Add record), then Sitemaps → submit `sitemap-index.xml`.
2. **Bing Webmaster Tools**: "Import from Google Search Console". That also covers DuckDuckGo and Yahoo. In Cloudflare, turn on **Crawler Hints** so Bing hears about changes right away.
3. **Cloudflare Web Analytics**: Workers & Pages → chemquest → Metrics → Enable. Free, no cookie banner needed. It shows visits, top pages, and where visitors came from.
4. **Every event gets links from the places parents already look:**
   - Ask the host library to list it on their events calendar with a link to chemquestpa.org/events/.
   - Post it on Patch (free community calendar) and Nextdoor (free community post).
   - If your school district uses Peachjar e-flyers, nonprofits can send one free flyer per district every 28 days through "Community Free" (the flyer has to say the event is free, and it can't ask for donations).
   - Flyers: one QR code to the events page, one to the newsletter subscribe page.
5. **Instagram bio:** use Instagram's built-in links (up to 5) to the website's Events, Newsletter, Volunteer, Sponsor, and Discord pages, instead of raw Google Form links.
6. **Ask partners to link to you:** the libraries, Mathnasium, sponsors (Silver and Gold sponsors get a mention on our site; ask them to link back), and your high school's club page. Links from real local organizations matter more to Google than anything else here.
7. **beehiiv:** free plans can't use the referral program, but **Grow → Recommendations** is free. Swap recommendations with 2–4 kid science, parenting, or local newsletters.
8. **Once a month (15 minutes):** note Cloudflare visits and top pages, Search Console clicks and searches, and beehiiv's new subscribers in one Google Sheet. The numbers are useful in sponsor emails.

**Later, with an adult (18+) representative:** apply to **Google for Nonprofits** through Goodstack with the EIN. It unlocks free Google Workspace (custom-domain email and shared drives) and Google Ad Grants (up to $10,000 a month of free Google search ads). Ad Grants needs someone to manage it every month, so only apply if someone will.

**Skip:** Google Business Profile (it needs a place customers visit; events at libraries you don't run don't count), beehiiv paid plans, and paid Patch listings.

## 6. The old websites

**The old WordPress site (chemquest.woob.site).** It's hosted by Woobsites (a small web company, on Hostinger), and ChemQuest doesn't own the `woob.site` domain, which renews May 11, 2027.
1. Now: in WordPress, trash the "Experimental :)" page (`/additional/`) and the sample "Hello world" post. Stop editing the old site.
2. Make sure a current officer has an Administrator login with the club email, not only a graduate's personal account.
3. At launch: install the free **Redirection** plugin and add 301 redirects to the new domain: `/get-involved/` → `/volunteer/`, `/sponsorships/` → `/sponsor/`, `/our-team/` → `/about/team/`, `/alumni/` → `/about/alumni/`, and everything else to the same path. Then in Search Console (verified for both sites), use **Change of Address**.
4. Keep the old site and its redirects up for at least a year, then delete it.
5. Free alternative to buying a domain: ask Woobsites to point `chemquest.woob.site` at Cloudflare (a CNAME to `chemquest.pages.dev`, after adding it under Custom domains). It's free, but the address still depends on someone else's domain.

**The beehiiv site (chemquests-newsletter.beehiiv.com).** Keep it: it sends the emails, has the subscribe page, and the import reads from it. Don't pay for a custom domain there (about $49 a month).
- Fix its Archive page (sample travel posts) and its five placeholder social links, and add a link to the website's Newsletter page.
- After launch, consider turning off "Discoverable on the web" (Website → Builder → Settings → Site settings → SEO & sharing) so Google sends people to the website's archive. Afterward, check that the import still works (`npm run newsletter -- --out test --all`).

**Also found: an old Wix site** (`chemquestpa.wixsite.com/chemquest`), still showing an April event. ChemQuest controls it, so either replace its home page with "We've moved to chemquestpa.org" or unpublish it. Update any Drive email templates that still link to it.

## 7. Suggestions for ChemQuest's tech, by priority

1. **Club-owned accounts.** Every service (beehiiv, Cloudflare, GitHub, Canva, Discord, Instagram, WordPress, Google Forms) should belong to `chemquestpa@gmail.com`, with at least two officers as admins. Set the Gmail's recovery email and phone to a long-term adult (an adviser or parent), and give that adult the printed backup codes. Personal accounts leave with graduates.
2. **No passwords in Google Docs.** Keep club logins in a password manager instead: Bitwarden's free organization covers 2 people, and the GitHub Student Pack includes 1Password free for 2 years. If a password was ever written in a shared doc, change it and delete it from the doc.
3. **Taxes (urgent, for the presidents).** The research found ChemQuest in IRS public records as "Chemquest Youth Organization" (EIN 33-4172854). The most recent 990-N e-Postcard on file covers the year ending June 2025. If the tax year ends June 30, the next one was due by November 16, 2026. It's a free 5-minute online filing; missing three years in a row cancels tax-exempt status. Presidents, please confirm. (Once confirmed, that EIN can also go on the Sponsor page.)
4. **Donations.** Venmo's rules say personal profiles shouldn't collect nonprofit donations. Zeffy is free for nonprofits (no fees; it needs the EIN and a bank account in the club's name). Or switch Venmo to a charity profile.
5. **Kids' privacy.** Address RSVP forms to parents, ask only what you need, keep the photo-permission question on every form, and delete RSVP responses about 30 days after each event. A short "Privacy and photos" page on the site would help parents trust you.
6. **Discord safety** (members as young as 13): Server Settings → Safety Setup: verification level High, explicit-image filter for everyone, 2FA required for moderators, all AutoMod presets on, plus a rule that adults don't DM members under 18.
7. **Canva for Nonprofits** (free Canva Pro, 50 people) for flyers and posts, verified through Goodstack like Google's program.
8. **A one-page tech handbook** owned by the club Gmail: every account (service, login email, admins, renewal date, where backup codes are, no passwords), how to publish the site, how the newsletter import works, and the handoff checklist.
9. **Yearly handoff (May/June):** graduating officers transfer their Drive files to the club Gmail, owners are swapped on GitHub, Cloudflare, Discord, Meta, and Canva, recovery info is checked, and the website's team page is updated.
10. **Every semester:** download the beehiiv subscriber list to Drive and test the donate and sign-up links.

## 8. Tools that help with design (optional)

Free checkers anyone can run on the live site:
- **PageSpeed Insights** (pagespeed.web.dev): speed and basic accessibility. Aim for 90+ on mobile.
- **WAVE** browser extension: accessibility problems on each page.
- Try every page with only the keyboard (Tab and Enter), and at 200% zoom.

Claude Code plugins (install from the desktop app's plugin menu):
- **frontend-design** (by Anthropic): design guidance for building pages, including a list of the "AI default" looks to avoid.
- **Impeccable** (community, `pbakaus/impeccable`): its `detect` command checks a site for AI-look patterns, and `/impeccable critique` gives a design review. Use it as a checker; ignore its "bolder / animate / delight" suggestions.
- **Humanizer** (community, `blader/humanizer`): checks writing for AI-sounding phrases. Useful for newsletter copy and site text.
