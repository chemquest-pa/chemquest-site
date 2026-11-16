# ChemQuest tech plan

How to launch the new website, get it found, retire the old sites, and keep ChemQuest's online accounts safe from year to year. Written for the Technology Chairs. Prices and rules were checked on November 14, 2026.

## 1. How the pieces fit

| Piece | What it does | Who edits it |
|---|---|---|
| **The website** (Astro, hosted free on Cloudflare Pages) | Every page: events, volunteer, sponsor, about, and the newsletter archive | Technology Chairs, on GitHub |
| **beehiiv** | Writing and emailing each newsletter, and the subscriber list | Newsletter writers |
| **The import script** | Copies each new beehiiv issue onto the website | Runs by itself on Sundays right after the 11 AM issue goes out. GitHub's own schedule never fired for this repository, so a free Cloudflare timer (Workers & Pages → **chemquest-newsletter-timer**, code in `automation/`) starts it every 15 minutes from 11:07 AM to about 1 PM, plus Monday morning. The Sunday Claude tidy task is a second backup. If an issue is still missing: Actions → Import newsletter → Run workflow |

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

**Set up (November 14, 2026):** the club organization is **github.com/chemquest-pa**, and the site is in the public repository **chemquest-site**. The Cloudflare account ID is saved as a secret. Visitor stats are on (Cloudflare → Workers & Pages → chemquest → Metrics).

**Still to do once:**

1. Finish the branch protection: Settings → Rules → Rulesets → New branch ruleset named "Protect main", target the default branch, Active, with **Restrict deletions** and **Block force pushes** ticked. (GitHub asks the owner to confirm by email first.)
2. Add a Cloudflare API token (Cloudflare → My Profile → API Tokens → Create Token → Custom token, permission **Account → Cloudflare Pages → Edit**). In GitHub, add it under the repository's Settings → Secrets and variables → Actions → New repository secret, named `CLOUDFLARE_API_TOKEN`.
3. Actions tab → **Publish website** → Run workflow. A green check means it works.
4. Invite the Technology Chairs: github.com/orgs/chemquest-pa/people → Invite member. Make at least one of them an **Owner**, so the club doesn't depend on one person.

**Day to day:** open a file on github.com, click the pencil, edit, then **Commit changes**. The site updates in about two minutes. Bigger changes: edit on your computer, preview with `npm run dev`, then Commit and Push in GitHub Desktop. To undo something, open the file's History and revert it.

**The newsletter timer's GitHub token expires** (about a year after November 15, 2026). When it does, new issues stop appearing on their own. To renew it: make a new fine-grained token at github.com/settings/personal-access-tokens/new (owner **chemquest-pa**, only the **chemquest-site** repository, permission **Actions: Read and write**), then in a terminal run `npx.cmd --yes wrangler@4 secret put GITHUB_TOKEN --name chemquest-newsletter-timer` and paste it. The token currently belongs to the account of the person who set it up; when Technology Chairs change, have a current one make a new token.

**Two things to know:**
- GitHub pauses scheduled jobs in a public repository after 60 days with no changes (summer). If new issues stop appearing, Actions → Import newsletter → Enable workflow / Run workflow.
- Keep the existing Cloudflare project ("chemquest"). Cloudflare can't switch it to connect to GitHub directly, which is why the publishing goes through GitHub Actions instead.

How to edit: [EDITING.md](EDITING.md).

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
1. **Done (November 14, 2026):** every old page now sends visitors to its match on the new site with a permanent (301) redirect, made with the free **Redirection** plugin (WordPress → Tools → Redirection). The "Experimental :)" page and the sample "Hello world" post redirect to the new homepage. Logging is off, so no visitor data is stored.
2. **When the club gets its own domain:** in Tools → Redirection, change each target from chemquest.pages.dev to the new domain (or leave them: chemquest.pages.dev will forward to the domain anyway). Then in Google Search Console (verified for both sites), use **Change of Address**.
3. Make sure a current officer has an Administrator login with the club email, not only a graduate's personal account. Don't delete the WordPress site or the plugin, or the redirects stop.
4. Keep the old site and its redirects up for at least a year, then delete it.
5. Free alternative to buying a domain: ask Woobsites to point `chemquest.woob.site` at Cloudflare (a CNAME to `chemquest.pages.dev`, after adding it under Custom domains). It's free, but the address still depends on someone else's domain.

**The beehiiv site (chemquests-newsletter.beehiiv.com).** Keep it: it sends the emails, has the subscribe page, and the import reads from it. Don't pay for a custom domain there (about $49 a month).
- **Done (November 15, 2026):** the Archive page shows the real issues (it used to show beehiiv's sample travel posts), the fake social icons (X, TikTok, YouTube, Threads, Bluesky) are gone, the Discord icon now goes to the current server (it went to "ChemQuest (old)"), and the footer links to chemquest.pages.dev. Social links live in Website → Settings → Socials. The free plan can't edit the beehiiv site through Claude's beehiiv connector, so changes are made in the site editor.
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
