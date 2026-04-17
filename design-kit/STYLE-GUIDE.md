# Style Guide — how to build a narrative page

This is the playbook behind pages like Westpac, Bunnings, IAG and the
Decisioning Hub framing. Follow the structure below and the page will
read the way customers expect.

## The page shape (top-to-bottom)

| # | Section | Purpose | Component |
|---|---------|---------|-----------|
| 1 | **Nav** | Co-branded lockup, confidentiality tag | `nav` + `.nav-lockup` |
| 2 | **Hero** | One headline, one sub, one quote, four KPIs | `.hero` + `.hero-kpi` |
| 3 | **Why Now** | Four cards proving the moment is right | `.card-grid-2` with `.card-accent-*` |
| 4 | **The Gap** | Today vs. Tomorrow comparison | `.compare-wrap` |
| 5 | **Connected Stack** | Layered architecture diagram | `.stack-wrap` |
| 6 | **Beachheads** | Where to start — two use-case cards | `.beach-card` x 2 |
| 7 | **Scale Story** | Phase 2 — how it extends | `.scale-card` x 3 |
| 8 | **Proof** | Customer quote + four stat tiles | `.proof-wrap` |
| 9 | **Roadmap** | Two phase cards with deliverables | `.phase-card` x 2 |
| 10 | **Closing** | Three-step CTA with primary highlight | `.closing-inner` |

Delete sections you don't need. Don't add new ones — if a new idea doesn't
fit one of these, it's usually a second page.

## The rules

### Voice
- **Declarative, not tentative.** "The decisions that used to require a human can now be made in milliseconds." Not "We believe…" or "Could potentially…"
- **Short clauses, em-dash driven.** Break long thoughts with em-dashes (—), not commas.
- **Bold the punchlines.** Each `card-body` gets one bolded phrase. That's the line the reader remembers.
- **Name the customer's language.** If their programme is "UNITE", use UNITE. Don't translate to generic terms.

### Copy lengths
- **H1:** 6–10 words, split onto two lines with a `<br/>`. Second line wrapped in `<em>` to pick up `--sf-blue-l`.
- **Hero sub:** 1–2 sentences, ~40 words max.
- **Card title:** 4–6 words.
- **Card body:** 2–3 sentences, one strong bolded clause.
- **Eyebrows:** 1–3 words, ALL UPPERCASE (done via CSS), letter-spacing 0.1em.

### Numbers
- **Use them everywhere.** The hero KPIs, proof stats, and section eyebrows carry the narrative as much as the prose.
- **Format:** whole integer + unit. `90 days`, `$660m`, `350 bankers`, `75%`.
- **Colour:** wrap the number itself in a `<span>` to pick up `--sf-blue-l` on dark backgrounds. Leaves the label neutral.

### Rhythm
Pages alternate:
- `section` (white) → `section-bg` (off-white) → `section` (white) → `section-bg` …
- Put an `<hr class="divider" />` between sections.
- End every block with bottom padding (handled by `.section { padding: 80px 48px }`).

## Per-page override

Everything else stays the same — the one thing you change per deal is the
accent colour. In the `<head>` of every page, after the main stylesheets:

```html
<style>
  :root {
    --accent:   #DA1710;   /* Westpac red */
    --accent-l: #FF4A3D;
  }
</style>
```

Customer accents seen so far:
- Westpac: `#DA1710` / `#FF4A3D`
- Bunnings: green (use their brand hex)
- IAG: blue (check their brand book)
- Xero: `#13B5EA` with teal secondary `#0B8A7D`
- Asahi: red, black, white

## Assets — when to use which

| File | Use when |
|------|----------|
| `sf-logo.jpeg` | Nav lockup, primary Salesforce mark |
| `sf-logo-cloud.png` | Hero/footer, Salesforce cloud mark |
| `icon-agentforce.png` | Referring to Agentforce specifically |
| `icon-data360.png` | Data Cloud / Data 360 |
| `icon-marketing.png` | Marketing Cloud |
| `icon-platform.png` | Platform capabilities |
| `icon-salesrevenue.png` | Sales Cloud / revenue use cases |
| `icon-slack.png` | Slack integrations |
| `xero-einstein-icon.png` | Einstein Studio (the icon name is a legacy — re-use anywhere) |
| `xero-perso-icon.png` | Personalisation |
| `xero-rtom-icon.png` | Real-Time Orchestration |
| `dc-logo.png` | Data Cloud standalone |
| `char-agent-astro-*.png` | Astro-as-agent moments — hero accents, feature cards |
| `char-agent-einstein-1.png` | Einstein-as-agent moments |
| `char-astro-jumping.png` | Kinetic moments — closing CTAs, excitement |
| `sf-star-gold.png` | Premium badge / award callouts |
| `moments.svg` / `moments-light.svg` | Decorative backdrop for dark (or light) sections |
| `anatomy-decisioning.png` | When explaining the decisioning architecture |
| `screenshots/*` | In-context product screenshots — use sparingly |

## Gating

If the page is customer-facing and you want visitor analytics, drop:

```html
<script src="gate.js" data-page="Westpac NBA Narrative"></script>
```

- `data-page` → shows up in tracking logs and email subject lines
- Password is set in `gate.js` (default `SFNBA2026!`) — override per script tag via `data-password="..."`
- Visitors only enter credentials once per browser — `localStorage` remembers them across all pages in the series

## Things to avoid

- **No emoji-dense layouts.** One emoji per card icon is the limit.
- **No gradient text.** The brand is flat navy / blue / accent. Save gradients for the `closing-inner` background.
- **No drop shadows on dark backgrounds.** Use subtle borders instead.
- **No more than 4 KPI cards in the hero.** Readers can't parse more.
- **No stack diagram with more than 7 layers.** If you have more, the story is too complex.
- **No tables of feature bullets.** Use cards. Bullets read as a backlog, not a narrative.
