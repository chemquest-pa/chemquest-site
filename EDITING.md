# How to update the ChemQuest website

You don't need to know how to code. Almost everything on the site comes from short text files, and you change the site by editing those files on GitHub.

## The basics

1. Go to **github.com/chemquest-pa/chemquest-site** (ask a Technology Chair to add you if you can't edit).
2. Find the file you want (the sections below say where), click it, then click the **pencil** icon.
3. Make your change and click **Commit changes**.
4. Wait about 2 minutes. The site at chemquest.pages.dev updates by itself.

Made a mistake? Open the file, click **History**, and you can see and undo any change. Nothing you do here is permanent.

To add a photo, open the folder it belongs in, click **Add file → Upload files**, and drag it in.

## Add an event

Events live in the folder `src/content/events`. Each event is one file. The easiest way is to copy the newest one: open it, copy everything, then **Add file → Create new file**, name it by date (like `2027-03-14-spring-stem-day.md`), paste, and change the details.

```
---
title: Spring STEM Day
date: 2027-03-14
time: "1:00–3:00 PM"
place: Brandywine Hundred Library
address: "1300 Foulk Rd, Wilmington, DE 19803"
ages: Ages 4 and up
signup: https://forms.gle/your-rsvp-form
---
One or two sentences about what kids will do.
```

The site moves events from "upcoming" to "past" on its own. After an event, add a photo (upload it to `src/assets/events` and add a line like `photo: ../../assets/events/2027-03-spring.jpg`) and change the sentence to past tense.

## Officers

Each officer is one file in `src/content/team`. Write their bio under the second `---`. For a photo, upload it to `src/assets/team` and add a line like `photo: ../../assets/team/their-name.jpg`.

When officers graduate, move their file to `src/content/alumni` and add `classOf: 2027` (their graduation year).

## Links, emails, and phone numbers

Every link the site uses (forms, Discord, Instagram, Venmo, email, phone numbers) is in one file: `src/site.ts`. Change it there and it changes everywhere.

## Newsletter

Keep writing and sending the newsletter in beehiiv like always. The website copies each new issue by itself the night it goes out.

After a new issue appears on the site, take 5 minutes to check its file in `src/content/newsletter`:

- **Title:** if it says "Newsletter for (date)", give it a real one.
- **Topic:** change `topic: other` to one of `body`, `life`, `earth`, `space`, `chemistry`, `tech`, `ideas`, or `news`.
- **Pictures:** each picture comes in with the text `TODO: describe this picture`. Replace it with a few words about what's in the picture. Screen readers read this out loud for people who can't see it.

If new issues stop showing up (this can happen after a quiet summer), go to the **Actions** tab on GitHub, click **Import newsletter**, and click **Run workflow**.

## Other things you might change

- **Try at home experiment:** one file per month in `src/content/experiments`. Copy last month's and change it. Always base it on a trusted kids' science site and list it under `sources`.
- **Sponsors:** add them to the `sponsors` list in `src/site.ts`. A thank-you list appears on the Sponsor page.
- **Event photos for the gallery:** upload them to a folder in `src/assets/gallery` named exactly like the event's file.
- **Any other words on a page:** the pages are in `src/pages` (for example `src/pages/volunteer.astro`). The text is right there between the tags, so you can change wording without touching anything else.

## Good habits

- Use real photos from ChemQuest events, and only post kids' faces when parents said yes on the form.
- Write like you'd talk to a parent at an event. Short and plain beats fancy.
- If something looks broken after a change, undo it from **History**. The site goes right back.

## For the Technology Chairs

- Setup details, the domain, and getting the site noticed are in [TECH-PLAN.md](TECH-PLAN.md).
- Open to-dos are in [CHECKLIST.md](CHECKLIST.md).
- To work on your own computer instead of github.com: install Node.js, then run `npm install` once and `npm run dev` to preview at localhost:4321.
