# Bullseye — Product Vision & Demo Experience

## Context

**StaffingEdge** is a firm that generates new business for staffing agencies. The core value prop: we track hiring signals — government contract wins, job postings across major boards, headcount growth, expansion signals — and use that intelligence to identify companies that are about to need labor, before they even start actively recruiting through staffing partners.

**Bullseye** is the proprietary GTM intelligence tool that powers this. The `govt-leads` app is one vertical slice of Bullseye (government contract awards). The full vision is broader — Bullseye aggregates signals across millions of companies to surface who is growing, hiring, and expanding.

## What This App Is For

This is a **Loom demo app**. It is not a production SaaS tool. It is not a product we are selling. It exists to be shown briefly in outbound Loom videos sent to staffing agency decision-makers. Every design decision should serve that purpose.

The Loom is **not** a product demo. It's a casual, confident screen recording where the founder briefly pulls back the curtain on how he tracks the market. The viewer should walk away thinking: "This person clearly has deep visibility into who's growing and hiring — I want them generating leads for me."

## Tone & Energy

- **Casual, not performative.** The founder is sharing his workflow, not pitching a product. The energy is "let me show you how I found this" — not "look at my cool thing."
- **Analyst sharing intel, not vendor showing software.** Language like "one thing we're seeing right now..." — market briefing, not feature walkthrough.
- **The app should look like a power user's internal tool.** Dense, functional, information-rich. Not a polished SaaS with onboarding flows and empty states. It should look like it's been *used*, not like it's being *shown off*.

## Design Direction

- **Dark mode.** Sleek, modern, high-contrast.
- **Dense but not cluttered.** Bloomberg terminal energy, not Salesforce dashboard.
- **No marketing copy.** No welcome messages, no illustrations, no onboarding. Data everywhere. It's clearly mid-use.
- **Subtle color accents.** Muted palette with one or two accent colors that pop on signal indicators and key metrics.
- **Smooth transitions.** Framer Motion for modal animations, card transitions, panel slides. Everything should feel fluid and fast.

## The Loom Arc (5 Beats)

### Beat 1: The Opening Frame
Bullseye is already on screen when the Loom starts. The viewer sees density and freshness before the founder even speaks.

**Opening line (approximate):**
> "So what you're looking at here is Bullseye — this is basically how I track what's happening across the market. Contract wins, hiring surges, expansion signals... I pull it all into one place so I can see who's growing before they even start posting jobs."

### Beat 2: The Market Insight ("One thing we're seeing...")
The founder gestures at a graph or data visualization and delivers a market insight casually:
> "One thing we're seeing right now is industrial spending in the Southeast is up significantly this quarter..."

Below the graph, cards show the specific companies driving that trend. The graph = scale ("we see the whole market"). The cards = specificity ("we know exactly who").

### Beat 3: The "How We'd Work Together" Bridge
Transition from "here's what I see" to "here's what this looks like for you":
> "When we work with a partner, we align on the roles you actually place, which industries, which regions — so for example, if you're doing industrial staffing in the Midwest..."

This is the **Cmd+K moment**. The founder opens the command palette, types something specific to a vertical, and the dashboard reshapes — a filtered intelligence view with a pre-built list. Results should flood in, not trickle. The transition from "curated feed" to "filtered view" is the moment the viewer thinks "this is real."

### Beat 4: The Dossier Flash
Click one company from the filtered list. A company profile/dossier slides in — headcount growth, recent contracts, job postings, location data. The founder doesn't narrate every field:
> "...and you can see they're already posting for welders, headcount's up 30% year over year..."

Close it. Move on. The viewer absorbed the depth without a walkthrough.

### Beat 5: The Close
Wrap up quickly. The mystery tabs ("Trends", "Market Intel", "Watchlists") are visible but untouched throughout the entire Loom. The viewer's imagination fills in something better than anything we could build.

## Page Structure & Tabs

### Tab Bar
- **Signals** — the default/home view. The landing state with cards and market insights.
- **Lists** — pre-built, filtered lists. Where the Cmd+K search lands. Shows curated groupings of companies by signal type, region, vertical.
- **Companies** — the dossier/profile view when a company is selected.
- **Trends** — *never opened in the Loom.* Pure intrigue. Implies time-series analysis, market direction.
- **Market Intel** — *never opened in the Loom.* Implies deeper research, sector reports, competitive landscape.
- **Watchlists** — *never opened in the Loom.* Implies ongoing monitoring — "he's watching these companies over time."

The untouched tabs are almost more powerful than the ones shown. They signal depth without requiring us to build depth.

## Key Components

### 1. Signal Cards (Signals tab — landing state)
Cards showing specific, recent signals:
- Company name, location
- Signal type (contract win, hiring surge, expansion, funding round)
- Key metric (contract value, number of roles posted, headcount growth %)
- Timestamp / recency indicator ("3 days ago", "This week")
- Industry/sector tag

These must feel **specific and fresh**. Not aggregated stats — individual companies with individual signals.

### 2. Market Insight Section (Signals tab)
- One or two clean graphs/charts — contract volume by sector over time, geographic heat map, or similar
- Expressed as an *insight*, not raw data. The section header might read something like "Defense sector contract velocity" rather than "Bar Chart"
- Below the graph: the cards that represent the specific companies driving the trend
- Potential for a slider control (e.g., time range, minimum contract value) — interactive but not over-designed

### 3. Command Palette (Cmd+K)
- Opens as a centered modal with backdrop blur
- Search input with fast, dense results
- Results grouped by type (companies, signals, lists, sectors)
- Selecting a result transitions the main view — not just a navigation link, but a visual state change
- Should feel snappy and powerful

### 4. Company Dossier (slide-in panel or full view)
- Company name, logo placeholder, location, sector
- Key stats: headcount, headcount growth %, year founded, revenue estimate
- Recent signals timeline (contract wins, job postings, funding events)
- Active job postings with role titles and locations
- Should feel like a quick-glance intelligence brief, not a CRM record

### 5. Pre-Built Lists (Lists tab)
- Named, curated lists: "Southeast Defense Contractors — Q1 2026", "Midwest Manufacturing — Hiring Surge"
- Each list shows company count, total signal strength, last updated
- Clicking into a list shows the filtered company cards
- These represent the output of "when we align on your verticals, this is what we build for you"

## Technical Stack

- **Next.js 16** (App Router)
- **Tailwind CSS** — dark mode, custom design tokens
- **Framer Motion** — all animations and transitions
- **cmdk** — command palette
- **Recharts** — market insight graphs
- **Lucide React** — icons
- **React Router** — not needed now, may be added later if the tool is used in live sales calls

## Data

All data is mock/dummy data. It should be realistic and specific — real-sounding company names, plausible contract values, actual US cities and states, realistic NAICS codes and agency names. The data should feel like it came from a real database, not a faker library.

## What Success Looks Like

A staffing agency owner watches a 90-second Loom and thinks:
1. "This person has serious visibility into who's growing and hiring."
2. "The companies he's tracking are exactly the kind of companies my clients need to be."
3. "I want him doing this for my agency."

The app is the set. The Loom is the performance. Every pixel serves the close.
