# Hackathon Demo Script — 2 Minutes

## Setup (what the audience sees when you start)
- Tableau Next dashboard open showing attribution data across all channels
- Both click-based AND impression-based touchpoints visible in the model
- Impression signals (video views, display, CTV) are already in the SDM — don't explain how, just show they're there

---

## Beat 1: The Problem (15 seconds)

> "Marketing Intelligence gives us multi-touch attribution across every channel. But today, impressions — display, video, CTV — are invisible in the model. And even when we can see attribution, there's no action layer. The marketer has to manually interpret this dashboard and decide where to move budget."

---

## Beat 2: Impression Signals in the SDM (20 seconds)

> "Stream 1 — we've extended the Semantic Data Model to treat impression-based signals as first-class touchpoints. Video completions, viewable impressions, CTV exposures — they're in the model alongside clicks, with identity resolution applied consistently."

**Action**: Point at the dashboard. Show impression touchpoints alongside click touchpoints in the attribution breakdown. Don't click anything — just show it's there.

---

## Beat 3: Touchpoint Weight Configuration (30 seconds)

> "But how much credit should an impression get? That's Stream 2. The marketer defines it — no code, no data science team."

**Action**: Open the weight configuration UI. Adjust sliders:
- Video completion 100% → 80% of a click
- Raw impression with no engagement → 10% of a click
- Recency boost within 7 days → 2x multiplier

> "Watch the dashboard — as I change the weights, the attribution model recalculates."

**Action**: Show the dashboard shift. Display and video channels gain some credit, Paid Search share drops slightly. The story changes.

---

## Beat 4: The Agent (45 seconds) — THIS IS THE MONEY SHOT

> "Attribution is insight. But the marketer still has to figure out what to do about it. That's Stream 3."

**Action**: Open the Paid Media Optimisation Agent. Ask:

> "Based on this week's attribution, where should I move budget?"

**Wait for agent response.** Agent returns structured recommendations:

- **Increase Paid Search by $12,000** — 34% of conversions, only 22% of spend
- **Reallocate $8,000 from Display to Paid Social** — Display showing diminishing returns
- **Flag Meta video for review** — self-attribution bias detected, platform claims 340 conversions but model credits 180
- **Increase Email nurture by $2,000** — highest efficiency channel at 3.2x index

> "Every recommendation has a dollar amount, the reasoning, a confidence score, and a warning where the data is weak. The marketer can explain this to their CFO."

---

## Beat 5: Close (10 seconds)

> "Impression signals in the model. Marketer-controlled weights. An agent that turns attribution into specific budget actions — with guardrails and honest confidence scoring. That's the loop closed."

---

## If Asked

- **"Is Mode A (algorithmic) built?"** — "This demo shows Mode B, marketer-controlled weights. Mode A uses the same architecture but with ML-determined weights — the interface is the same, the source of the weights changes."
- **"How does this compare to Mutinex?"** — "Mutinex gives you aggregate budget recommendations from MMM. This gives you campaign-level, touchpoint-level recommendations grounded in user-level MTA — more granular, more actionable, and the marketer can see exactly why."
- **"What about the self-attribution problem?"** — "We flag it. The agent won't recommend increasing spend on a channel with known self-attribution bias without an explicit warning. That's the trust layer."
- **"Is this real data?"** — "Synthetic seed data that matches real-world patterns. The architecture is production-ready — SDM extension, weight engine, and agent layer all running on Data Cloud."
