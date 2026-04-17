# Salesforce Narrative Design Kit

The shared design system behind the NBA narrative, Westpac, and Decisioning
Hub pages. Drop this folder into any static site and you can build the same
kind of customer-facing narrative pages in an hour.

## What's in the box

```
design-kit/
├── tokens.css            ← colours, fonts, radii, shadows
├── components.css        ← every reusable block (nav, hero, cards, stack…)
├── template.html         ← blank starter — edit copy, swap logo, done
├── gate.js               ← password gate + visitor tracking
├── cloudflare-worker.js  ← backs gate.js — logs visitors to GitHub
├── apps-script.gs        ← optional: email alerts on each visit
├── STYLE-GUIDE.md        ← how to structure a page
└── assets/
    ├── logos/            ← sf-logo.jpeg, sf-logo-cloud.png
    ├── icons/            ← agentforce, data360, marketing, platform,
    │                        sales-revenue, slack, einstein, personalisation,
    │                        real-time orchestration, data cloud
    ├── characters/       ← astro + einstein mascots, gold star
    ├── graphics/         ← moments.svg (light + dark), anatomy-decisioning
    └── screenshots/      ← product UI screenshots for reference
```

## Quick start

1. Copy `design-kit/` into your new project (or clone this folder).
2. Open `template.html`, save as `your-page.html`.
3. Replace the placeholder strings:
   - `{{Customer}}`, `{{Story Title}}`, `{{Subtitle}}`, `{{Page Name Here}}`
   - Swap `REPLACE-customer-logo.png` with the customer's logo
   - Update `--accent` in the inline `<style>` block to the customer's brand colour
4. Fill in the sections. Delete the ones you don't need — every block is optional.
5. (Optional) Keep the `<script src="gate.js">` tag if you want the page gated + tracked. Remove it for public pages.

## Philosophy

- **One typeface:** Inter, loaded from Google Fonts. Everything uses it.
- **One grid:** 1200px max width, 48px horizontal padding.
- **Two blue variants + one customer accent.** That's the whole palette. Don't add more.
- **Dark hero, light sections.** Alternates white ↔ `--off-white` for rhythm.
- **Every block is a card.** Cards have 16–20px radii, 1px borders, 28px padding.
- **Numbers are the hero.** Big figures in the hero KPI grid, proof stats, and section eyebrows carry the narrative.

See `STYLE-GUIDE.md` for the page-structure playbook (why each section exists
and when to use it).

## Gating a page (optional)

`gate.js` is a self-contained visitor gate. One line at the bottom of any page:

```html
<script src="gate.js" data-page="Your Page Name"></script>
```

It:
- Blocks access until the user enters name / company / role / password
- Remembers them in `localStorage` so repeat visits are silent
- POSTs visit metadata (IP, geo, UA) to a Cloudflare Worker
- The Worker appends the visit to `tracking.json` in your repo
- Optionally emails you via web3forms on first visit

### Setup for your own tracking endpoint

1. Deploy `cloudflare-worker.js` to Cloudflare Workers (free tier).
2. Add a GitHub fine-grained PAT as the `GITHUB_TOKEN` secret on the Worker.
3. Update `GITHUB_REPO` at the top of the Worker to point at your repo.
4. Copy the Worker URL into `gate.js` → `C.workerUrl`.
5. Change the password in `gate.js` → `C.password` (default: `SFNBA2026!`).
6. (Optional) Replace `C.web3Key` with your own web3forms access key for email alerts.
   `apps-script.gs` is an older alternative using Google Apps Script if you prefer.

## License / use

Internal Salesforce use. Customer logos are owned by their respective companies —
swap them out per deal. Astro and Einstein characters are Salesforce-owned; don't
ship them to customer-branded deliverables without checking.
