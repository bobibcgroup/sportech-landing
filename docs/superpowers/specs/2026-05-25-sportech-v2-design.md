# Sportech v2 — Design Spec

**Date:** 2026-05-25  
**Branch:** `v2`  
**Status:** Approved

---

## Overview

A complete ground-up rebuild of the Sportech landing page. Clean codebase, 9 narrative sections, cinematic scroll-driven animations, and AI-generated imagery. The goal is a higher perceived value, premium feel that matches the Sportech brand and drives demo requests from sports clubs.

---

## Core Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Scroll mechanism | CSS `scroll-snap` (native) | Hardware-accelerated, iOS Safari compatible, zero JS overhead |
| Cinematic transitions | GSAP ScrollTrigger | Industry-standard for scroll-driven morphing and crossfades |
| Micro-animations | Framer Motion | React-native, great for interactive UI feedback |
| Images | gpt-image-2, build-time | Zero runtime API cost, instant loads, committed to repo |
| Framework | Next.js 15 App Router | Clean routing, future extensibility, Vercel-native |
| Styling | Tailwind v4 | CSS variable-based theming, utility-first |
| Language | English only | Localization-ready architecture for AR later |
| Codebase | Clean slate on `v2` branch | No v1 legacy constraints; port only data + text |

---

## What's Ported from v1

- `src/data/clubs.ts` — 702-club database (football, basketball, cricket)
- Revenue simulator config (fan tiers, 8 stream gross values, calculation logic)
- Section copy text where relevant
- Brand color tokens (black `#0a0a0a`, yellow `#ffe600`)

---

## 9 Sections

### 01 — Hero: "Your Club's Revenue. Finally Unlocked."
- Full-viewport dark stadium aerial (gpt-image-2, 1920×1080)
- Headline animates in with Framer Motion stagger
- Revenue figures float up from below on entrance
- Primary CTA: "Request Demo" + secondary "Explore Platform"
- GSAP crossfade exit into Section 02

### 02 — Problem: "Billions in Fan Engagement Happen Every Day."
- Stadium aerial zooms out, glowing revenue numbers float above crowd
- GSAP-driven counter animates the $1.05B+ figure on entrance
- CSS particle effects simulate money/data flowing
- Reframes the message: the money exists, clubs aren't capturing it
- Background: gpt-image-2, 1920×1080

### 03 — Scope: "One Platform. Every Sport. Every Fan."
- Athletes from 8 sports stagger in (gpt-image-2, 1920×1080)
- Sport icon SVGs appear below with GSAP stagger
- Sports covered: Football, Basketball, Cricket, Tennis, Esports, Rugby, Boxing, Athletics
- Establishes platform breadth

### 04 — Revenue Streams: "Eight Ways to Turn Passion into Revenue."
- Pure CSS/SVG — no AI image needed
- Circular radial diagram: Sportech logo at center, 8 streams radiate out
- GSAP draws each spoke on scroll, stream label + example revenue fades in
- 8 streams: Subscriptions, Live Stream Gifting, Sports Predictions, Interactive Voting, Tickets, Merchandise, Digital Gift Cards, NFT & Collectibles
- Each stream has its own color (carried from v1 simulator palette)

### 05 — Brand Customizer: "See It in Your Colors. Your Brand. Your App."
- Phone mockup showing branded Sportech app
- Club search input (702-club DB) → selecting a club applies its colors via CSS variables
- Color picker fallback for custom colors
- Live preview updates phone chrome, nav bar, accent colors in real time
- Framer Motion animates the color transitions on the phone

### 06 — Revenue Simulator: "See Your Club's Potential."
**Inputs:**
- Fan base slider: 10K / 50K / 100K / 250K / 500K / 1M / 2M+
- 8 stream toggles (all on by default), each showing per-stream revenue

**Output:**
- Animated headline number (Framer Motion counter)
- Per-stream bar chart (CSS, updates live)
- "X of 8 streams active" label
- Disclaimer: "Calculations assume 25% active fan conversion"

**Data:** Ported gross-per-user values from v1 `STREAMS` config.

### 07 — Infrastructure: "Built to Scale. Easy to Launch."
- Pure CSS/SVG layout
- Key specs: white-label platform, club-managed, API integrations, multi-region
- Network topology SVG drawn on with GSAP ScrollTrigger
- Feature grid animates in with stagger

### 08 — Future: "The Match Is Just the Beginning."
- Cinematic collage of future use cases: AR overlays, gaming, social commerce, NFTs, metaverse
- Background: gpt-image-2, 1920×1080
- GSAP morphs through use case labels as user dwells
- CSS blend modes for layered atmospheric effect

### 09 — CTA: "Unlock the Economy Behind Your Fans."
- CSS-animated globe with fan connection lines
- GSAP reveal of the globe on entrance
- Two CTAs: "Request Demo" (primary, yellow) + "Explore the Platform" (ghost)
- Emotional close of the narrative arc

---

## Animation Architecture

```
CSS scroll-snap (section container)
  └─ GSAP ScrollTrigger (section crossfades, pinned morphs, counters, SVG draw-ons)
       └─ Framer Motion (in-section micro-animations: buttons, toggles, counters, hover states)
```

**Section transition pattern:**
- Each `<Section>` component registers a GSAP ScrollTrigger on mount
- Exit: `opacity` + `y` translate out, crossfade overlay activates
- Enter: staggered children animate in from below with `opacity` + `y`
- Mobile: same pattern, reduced motion via `prefers-reduced-motion`

**`section-transition.tsx`:** A shared wrapper rendered between adjacent sections. Mounts a GSAP timeline that plays on scroll — fades out the exiting section's overlay while fading in the entering section's background. Keeps transition logic out of individual section components.

---

## AI Image Generation

| Section | Prompt Theme | Resolution | Quality |
|---------|-------------|------------|---------|
| 01 Hero | Dark cinematic stadium aerial, crowd glow, neon data overlays, deep blacks and yellows | 1920×1080 | high |
| 02 Problem | Stadium aerial zoomed out, glowing revenue numbers floating above crowd, green/cyan data streams | 1920×1080 | high |
| 03 Scope | 8 athletes from different sports in dramatic action poses, dark studio, neon accent lighting | 1920×1080 | high |
| 08 Future | Futuristic sports metaverse: AR overlays, gaming, NFT cards, streaming interfaces, dark cinematic | 1920×1080 | high |

**Generation:** `scripts/generate-images.ts` — runs once at build setup, saves to `public/images/v2/*.webp`. Requires `OPENAI_API_KEY` in `.env.local`. Model: `gpt-image-2`.

---

## File Structure

```
src/
  app/
    page.tsx              — snap container, mounts all 9 sections
    layout.tsx
  components/
    sections/
      01-hero.tsx
      02-problem.tsx
      03-scope.tsx
      04-streams.tsx
      05-brand.tsx
      06-simulator.tsx
      07-infra.tsx
      08-future.tsx
      09-cta.tsx
    ui/
      snap-container.tsx  — CSS scroll-snap wrapper
      section-transition.tsx — GSAP crossfade layer
      animated-counter.tsx
      stream-toggle.tsx
      nav-dots.tsx        — section progress indicator
  data/
    clubs.ts              — ported 702-club DB
    simulator.ts          — ported revenue config (fan tiers + stream gross values)
  lib/
    gsap.ts               — GSAP + ScrollTrigger registration
    theme.ts              — CSS variable tokens
scripts/
  generate-images.ts      — gpt-image-2 build-time image generation
public/
  images/v2/
    hero.webp
    problem.webp
    scope.webp
    future.webp
```

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Scroll | CSS `scroll-snap-type: y mandatory` |
| Animation | GSAP 3 + ScrollTrigger + Framer Motion |
| Image gen | OpenAI gpt-image-2 (build-time) |
| Data | Static TS files (no DB) |
| Deployment | Vercel (existing project) |

---

## Out of Scope (v2.0)

- Arabic localization (architecture will support it, implemented in v2.1)
- Blog, pricing, or inner pages (landing page only)
- User accounts or auth
- CMS integration

---

## Execution Phases

1. **Branch + scaffold** — v2 branch, Next.js 15 init, deps, scroll-snap layout, port data files
2. **Generate images** — write + run `generate-images.ts` with OPENAI_API_KEY
3. **Sections 01–03** — Hero, Problem, Scope; establish GSAP transition pattern
4. **Sections 04–06** — Streams diagram, Brand Customizer, Simulator (most complex)
5. **Sections 07–09** — Infra, Future, CTA; add nav dots
6. **Polish** — tune crossfades, mobile QA, performance audit, Vercel preview deploy
