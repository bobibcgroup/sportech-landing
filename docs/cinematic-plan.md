# Sportech — Cinematic Website Plan
**Creative Director Brief to Development Team**
Version 1.0 | 2026-05-01

---

## 1. Cinematic Vision Statement

A club executive opens this website the same way they walk into a Champions League stadium two hours before kickoff — the lights are already on, the scale is already apparent, and they know something significant is about to happen. The first seconds are not a pitch. They are a statement of gravity. The screen is almost entirely black. A single electric-yellow line pulses at the horizontal center. Then the stadium erupts.

The narrative arc is a progression from **hunger to revelation to conviction**. In the first third of the scroll — Hero through Opportunity — the executive is made to feel the scale of what they are currently leaving on the table. This is not accusation; it is diagnosis. Barcelona earned €200M. Manchester United grew loyalty by 35%. The executive knows their club's digital revenue. They know the gap. We make the gap feel physical. In the middle third — How It Works through Patented Camera — the mechanism is revealed. The product is shown not as a feature list but as a capability they cannot get anywhere else on the planet. The camera section is the pivot: this is the moment the executive leans forward and understands that something genuinely new exists. In the final third — Revenue Streams through CTA — the math becomes undeniable. Fifty percent of a growing revenue pool, zero upfront cost, their club's badge on the front. The final CTA does not feel like a contact form. It feels like the opening of a door.

Every section earns its darkness. The #0a0a0a canvas is not minimal design fashion — it is the color of a stadium at night, where everything that matters is lit from within. The electric yellow (#faff69) is the only color that matters to a fan in the dark. This palette is not chosen for aesthetics. It is chosen to make every number, every headline, every revenue figure feel like stadium floodlights switching on.

---

## 2. Visual Language

### Color and Light

The base palette evolves across the scroll journey — it does not stay flat. Each macro-zone has its own atmospheric temperature.

| Zone | Sections | Base Canvas | Atmospheric Color | Feeling |
|------|----------|-------------|-------------------|---------|
| **Opening** | Hero, Sports Scope | #0a0a0a | No atmosphere — pure dark | Pre-match silence |
| **Reckoning** | Opportunity | #0a0a0a | Deep stadium blue (#0d1b3e) bleeds in from left edge | The weight of what's possible |
| **Mechanism** | How It Works, Platform Features | #0a0a0a | Warm tungsten orange (#1a0f00) at 4% opacity, radial from center | Stadium floodlight warmth |
| **The Proof** | App Gallery, Patented Camera | #0a0a0a | Cold white fog (#f0f4f8) at 3% on edges, blue-black center | Clinical precision |
| **The Numbers** | Revenue Streams | #0a0a0a | Gold (#d4a017) at 6% radial glow behind key figures | Money, made visible |
| **The World** | Global Reach, Vision 2030 | #0a0a0a | Stadium blue + deep red (#1a0008) at 3% — Saudi colors barely present | Global with local anchor |
| **The Call** | Final CTA | #0a0a0a | Electric yellow (#faff69) at 8% full-screen radial from center | The door opening |

**Primary accent** (#faff69) is used for exactly three things: numbers that represent revenue or opportunity, interactive CTAs, and section-defining headline words. Never for decoration.

**App blue** (#1a3a8f — Royal blue from the actual Sportech app) appears exclusively in App Gallery and Patented Camera — the product demonstration zone. This color says "this is the thing itself."

**Gold** (#d4a017, #b8860b) is reserved for the Revenue Streams and Final CTA sections. It is one step warmer than the primary yellow and reads as wealth rather than energy.

### Typography Direction

**Primary headlines (section openers):**
Inter 900, 88px desktop / 52px mobile, letter-spacing: -3.5px, line-height: 0.92.
Reveals in two passes: first the text slides in from 40px below at opacity 0 over 0.7s (easing: cubic-bezier(0.16, 1, 0.3, 1)), then letter-spacing animates from -1px to -3.5px over 0.4s with 80ms delay. The compression is the reveal — the word physically tightens as it arrives, like a fist closing.

**Revenue and stats figures:**
Inter 900, 120px desktop / 72px mobile, letter-spacing: -5px.
Color: #faff69 for opportunity numbers (competitor benchmarks), gold (#d4a017) for Sportech's own 50% split number. These are the largest type on the page.

**Subheadlines (section descriptors):**
Inter 400, 18px, letter-spacing: 0.08em, uppercase, color: #faff69 at 60% opacity. These are treated as pre-title labels — they appear first, at 0.3s before the main headline, sliding in from left at 24px offset.

**Body copy:**
Inter 400, 16px, color: rgba(255,255,255,0.72), line-height: 1.7. Reveals word-group by word-group (not character by character) with 30ms stagger. Never animates unless within viewport.

**Arabic (Cairo):**
Cairo 700 for headlines, Cairo 400 for body. Same sizing rules. RTL layout via dir="rtl" on the section wrapper. Arabic sub-labels use Cairo 500, not uppercase (uppercase Arabic is semantically wrong).

**Accent labels (e.g., "PATENTED", "ZERO COST"):**
Inter 700, 11px, letter-spacing: 0.25em, uppercase, color: #faff69. These appear on a pill with border: 1px solid rgba(250,255,105,0.3) and background: rgba(250,255,105,0.08). They do not animate — they are already visible as anchor points when other elements reveal.

### Texture and Grain

**Film grain:** A subtle noise layer sits at the top of every section's z-stack. SVG feTurbulence filter, baseFrequency: 0.65, numOctaves: 3, applied to a full-screen pseudo-element at opacity 0.035. It is imperceptible but removes the "too clean" digital feel. It reads as stadium atmosphere, not graphic design.

**Vignette:** Every full-screen section carries a radial gradient vignette: background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%). Intensity varies by section — strongest on Hero (0.85), lightest on How It Works (0.55).

**Lens flare (Hero and Patented Camera only):** A single horizontal flare streak — CSS gradient from transparent through rgba(250,255,105,0.15) to transparent — positioned at approximately y:38% of the viewport, animated with a 6s ease-in-out infinite pulse (scale-x from 0.7 to 1.3). This suggests a live broadcast camera.

**Edge blur (App Gallery):** The left and right 8% of the section carry a horizontal blur gradient (backdrop-filter: blur(12px) fading to 0), suggesting focus on the center iPhones.

### Motion Principles

**The fundamental rule: entries are slow and deliberate, exits are instant.**
Nothing fades out. When you scroll past a section, it simply ends — like a film cut. This prevents the soft dissolve feeling of most scroll sites and preserves cinematic sharpness.

**Entry timing philosophy:**
- Infrastructure/structural elements (frames, containers, lines): enter first, 0.6s, easing: cubic-bezier(0.16, 1, 0.3, 1)
- Primary content (headlines, main visual): 0.7–0.9s, same easing, 150ms after infrastructure
- Secondary content (body copy, supporting elements): 0.5s, 80ms word-stagger, 300ms after primary
- Numbers and stats: they do not slide — they count up from zero. Start counting when element is 20% into viewport.

**Parallax ratios:**
- Background video/image layers: 0.3 scroll multiplier (slow drift)
- Midground elements (cards, feature blocks): 0.15 multiplier
- Foreground text: no parallax (stays sharp and readable)

**Hover states:**
Cards and feature items scale to 1.02 over 0.2s on hover. Border brightens from rgba(250,255,105,0.1) to rgba(250,255,105,0.35). No color changes to text — the border does the work.

**Reduced-motion fallback (prefers-reduced-motion: reduce):**
All transform animations disabled. Opacity-only transitions, duration 0.2s. Counters display final value immediately. Parallax disabled. Grain filter disabled. The page remains fully legible and functional.

---

## 3. The Narrative Arc — Section by Section

---

### Section 1: NAV
**Scene title:** THE THRESHOLD

**Cinematic moment:** The nav is transparent on load, floating above the hero video. The Sportech wordmark sits left in Inter 700, white. A single "Book a Demo" pill CTA sits right in #faff69 with black text. Nothing else.

**Entry animation:** Nav fades in over 0.4s at page load, 800ms delay (after hero video begins playing). It does not slide — it materializes.

**Revenue/number focus:** None.

**Hero visual:** Transparent — the hero video shows through completely.

**Key interaction:** On scroll past 80px, nav background transitions to rgba(10,10,10,0.92) with backdrop-filter: blur(16px) over 0.3s. The wordmark gains a 0.5px yellow underline that sweeps left-to-right over 0.4s (scaleX from 0 to 1).

**21st.dev component type:** Search "sticky nav blur" or "glassmorphism navbar scroll"

**Atmosphere note:** The threshold into something serious — uncluttered, confident, already cinematic.

---

### Section 2: HERO
**Scene title:** THE STADIUM WAKES

**Cinematic moment:** Full-viewport, scroll-locked. A stadium at night from pitch level — the camera is at the center circle looking toward the south stand, all 60,000 seats lit white, a single player silhouetted at the edge of frame. This is a Sora-generated video loop (file: `public/cinematic/hero-bg.mp4`). Over this, in the upper-center third, the main headline: "YOUR CLUB'S REVENUE. FINALLY UNLOCKED." (EN) / Arabic below. The video plays in a seamless 8-second loop with a slow zoom (scale: 1.0 to 1.06 over 8s, then reset).

**Entry animation:** Page loads to black. At 600ms, the video cross-fades in over 1.2s. At 1800ms, the pre-headline label slides in from left ("THE FAN ENGAGEMENT PLATFORM"). At 2200ms, the main headline reveals: each word drops from y:-30px to y:0 with opacity 0→1, 120ms stagger between words. At 2800ms, the subline fades in. At 3200ms, the CTA pill pulses once (scale 1→1.04→1) then settles.

**Revenue/number focus:** None in the hero itself — the first scroll reveal is where numbers begin.

**Hero visual:** Sora video loop — `public/cinematic/hero-bg.mp4`. Fallback: Midjourney still `public/cinematic/hero-bg-fallback.jpg`.

**Key interaction:** Scroll down 1px starts the hero unpin animation — the video layer stays fixed, the content overlay scrolls away, then at the Sports Scope entry point the video fades to black and the page flow begins. This is the "cinematic chapter" transition.

**21st.dev component type:** Search "hero video background" or "fullscreen video loop hero"

**Atmosphere note:** The first second must communicate scale — this is a room for serious people making serious decisions.

---

### Section 3: SPORTS SCOPE
**Scene title:** THE ARENA OF EVERYTHING

**Cinematic moment:** 8 sport tiles in a 4×2 grid on desktop (2×4 on mobile), each a dark panel with a Midjourney-generated atmospheric sport image behind frosted glass. Sports: Football, Basketball, Tennis, Cricket, Golf, Swimming, Athletics, MMA. Each tile shows the sport name in Inter 700 24px + a thin yellow line below.

**Entry animation:** The section header ("BEYOND FOOTBALL. EVERY SPORT.") reveals first with the headline compression technique. Then the 8 tiles cascade in from bottom, each delayed by 60ms (tile 1 at 0ms, tile 8 at 420ms). Each tile starts at y:40px, opacity:0, scale:0.97 and arrives at y:0, opacity:1, scale:1 over 0.6s with cubic-bezier(0.16, 1, 0.3, 1).

**Revenue/number focus:** None in this section — it is breadth, not depth.

**Hero visual:** 8 Midjourney images, one per sport tile. Files: `public/cinematic/sport-football.jpg` through `public/cinematic/sport-mma.jpg`. Each image is behind a dark overlay (rgba(10,10,10,0.55)) that lifts to rgba(10,10,10,0.25) on hover.

**Key interaction:** Hover on any tile reveals a one-line fact about that sport's global audience, fading in at the bottom of the tile. The tile border illuminates in #faff69.

**21st.dev component type:** Search "image grid card reveal" or "bento grid animated"

**Atmosphere note:** Quiet confidence — Sportech is not a football product. It is a sports infrastructure. The breadth is stated here without argument.

---

### Section 4: OPPORTUNITY
**Scene title:** THE RECKONING

**Cinematic moment:** Three massive counter cards centered on screen. Each card is dark with a single illuminated number as the dominant visual. Stadium blue (#0d1b3e) atmospheric glow bleeds from the left edge of the viewport — a hint of something enormous nearby. The three cards represent the benchmarks: FC Barcelona €200M, Manchester United 35%, PSG 100 countries.

**Entry animation:** Cards enter sequentially with 200ms stagger. Each card starts at opacity:0, y:60px, filter:blur(8px). Arrives at full clarity over 0.8s. The number inside each card begins counting from 0 immediately upon card entry, reaching its final value in exactly 2.0s using an ease-out cubic curve (fast start, slow finish — the number "lands"). The €200M counter shows: 0 → €200M, formatted with the euro sign and M suffix appearing when the number first begins (they do not count — only the integer counts).

**Revenue/number focus:** This is the commercial hook. The three numbers are 96px Inter 900, #faff69, letter-spacing: -4px. Below each number, a two-line attribution in 14px Inter 400, rgba(255,255,255,0.55): "FC Barcelona annual digital revenue" / "Manchester United loyalty increase, Year 1" / "Countries with PSG fan token holders". The subtext beneath all three: "Your club does not have this yet." — 22px Inter 400, rgba(255,255,255,0.85), center-aligned.

**Hero visual:** The three card layout. No background image — the atmospheric color treatment and the numbers are the visual.

**Key interaction:** On scroll-progress through the section, the stadium blue atmospheric bleed intensifies from opacity 0 to opacity 1, then fades as the section exits. This is a Framer Motion useScroll + useTransform mapping scroll progress to opacity.

**21st.dev component type:** Search "counter animation card" or "number counter reveal scroll"

**Atmosphere note:** The gap between what the biggest clubs earn and what this executive's club earns is felt — not stated.

---

### Section 5: HOW IT WORKS
**Scene title:** THE ARCHITECTURE

**Cinematic moment:** Three steps in a horizontal timeline on desktop, vertical on mobile. Each step is a numbered node (01, 02, 03) connected by an animated line that draws left to right as the user scrolls. Step labels: "We Build It" / "You Brand It" / "We Split The Revenue". This is the entire business model stated in 9 words.

**Entry animation:** The section header ("ZERO COST. ZERO RISK. 100% BUILT.") reveals with character stagger at 14ms per character. Then the connector line draws in from left to right using an SVG stroke-dashoffset animation over 1.2s as the section enters the viewport. Each node marker pulses in (scale 0 → 1.1 → 1.0) at the moment the drawing line reaches it. Each step card fades in immediately after its node pulse (100ms delay), from opacity:0 y:20px to full.

**Revenue/number focus:** The number "50%" appears in step 03 at 88px Inter 900, #faff69. It is the first appearance of the core revenue split. It is not in a counter animation — it simply appears, fully formed, with a 0.3s opacity fade. It should feel inevitable, not dramatic.

**Hero visual:** The animated SVG connector line is the hero visual of this section. Color: rgba(250,255,105,0.4), 1px stroke, draws left to right. Warm tungsten orange atmospheric glow (radial from center) gives the section a "workshop" feel — this is where the mechanism is explained.

**Key interaction:** Hover on any step card slightly elevates it (y: -4px) and brightens its border to rgba(250,255,105,0.5). The connector line pulses briefly where it touches that node.

**21st.dev component type:** Search "timeline animated steps" or "process steps connector line"

**Atmosphere note:** Surgical clarity — three steps, nine words, one deal structure. The executive understands everything.

---

### Section 6: PLATFORM FEATURES
**Scene title:** THE ARSENAL

**Cinematic moment:** An 8-item feature grid. Each feature is a card: icon (custom SVG, #faff69), feature name in Inter 700 18px, one-line description in Inter 400 14px rgba(255,255,255,0.7). The grid is 4×2 on desktop, 2×4 on tablet, 1×8 on mobile. Warm tungsten atmospheric glow continues from the previous section.

**Entry animation:** Features cascade in with a diagonal wave pattern — not left-to-right, not top-to-bottom, but a diagonal sweep from top-left to bottom-right. Stagger: row n starts at (n-1) × 80ms, within each row items stagger by 60ms. Each item: y:30px → 0, opacity:0 → 1, 0.5s ease-out.

**Revenue/number focus:** No counters. The "Player Camera" feature card is visually distinguished: it has a #faff69 border (1px solid) at rest (all others have rgba(250,255,105,0.12) border), and a "PATENTED" pill in the top-right corner. This is the only card that has been pre-lit before the animation runs.

**Hero visual:** The 8-icon grid. Icons are custom SVG — camera, predictions graph, voting ballot, audio waveform, AR glasses, streaming bars, gift card, trophy collectible.

**Key interaction:** Hover on Player Camera card triggers a 0.5s sweep of a yellow line across the card's background (scaleX 0 → 1) and reveals a tooltip: "The only patented jersey-mounted player POV camera in existence." The tooltip appears below the card with a 4px blur-to-sharp transition.

**21st.dev component type:** Search "feature grid card hover" or "feature bento grid"

**Atmosphere note:** Competence on display — not a startup feature list, a production-ready platform being itemized like a dossier.

---

### Section 7: APP GALLERY
**Scene title:** THE PRODUCT

**Cinematic moment:** Four iPhone 15 Pro frames in perspective, slightly angled, displaying real app screenshots from the Sportech app (the Saudi Pro League blue UI). The center two iPhones are larger (scale: 1.0) and the outer two are smaller (scale: 0.88) and slightly recessed (z-translate: -40px). All four have a subtle rotation around the Y axis (±5°) that responds to mouse position — the entire cluster tracks the cursor slightly, as if they are physical objects on a table.

**Entry animation:** iPhones enter from below — each phone starts at y:80px, opacity:0, and arrives at staggered intervals (60ms each). The perspective grid lines (if used) draw in simultaneously. Screen content on each iPhone fades in 300ms after the phone frame arrives.

**Revenue/number focus:** None. This section is product evidence — it does not need numbers. The app's existence and quality is the claim.

**Hero visual:** The 4 iPhone frames with real screenshots (`/appimages/IMG_6873.PNG` through `IMG_6884.PNG` — select the 4 most visually representative). Cold white fog atmospheric treatment at edges gives the section a product-photography feel.

**Key interaction:** Mouse position drives a subtle gyroscope effect on the phone cluster — Framer Motion's useMotionValue + useSpring driving rotateX/rotateY on the cluster container. On mobile (no mouse): phones auto-animate with a 4s slow pendulum rotation.

**21st.dev component type:** Search "iPhone mockup 3D perspective" or "device frame gallery parallax"

**Atmosphere note:** The gap between "concept" and "product" closes here. This is built. It exists. The blue UI on the screens is the Saudi Pro League's colors — a specific credibility signal.

---

### Section 8: PATENTED CAMERA
**Scene title:** THE EDGE

**Cinematic moment:** Full-width, dark. On the left: a close-up image of a jersey-mounted camera (Midjourney, `public/cinematic/player-camera-hardware.jpg`) with dramatic rim lighting from below — it looks like an artifact being presented. On the right: a first-person video clip (`public/cinematic/player-pov.mp4`) showing a player running onto a pitch from the camera's own perspective — grass, boots, the roar of a crowd, then the stadium lights sweeping into frame. The video is in a rounded-corner frame (border-radius: 16px) and plays on loop, muted, autoplay. Above both: a centered "PATENTED" pill, then the headline: "SEE THE GAME FROM INSIDE IT."

**Entry animation:** The "PATENTED" pill appears first (opacity:0 → 1, 0.3s, no movement). Then the headline crashes in — each word drops 50px and arrives with a hard cubic-bezier(0.68, -0.3, 0.265, 1.35) (slight overshoot) over 0.6s, 100ms stagger. The hardware image slides in from left (x:-60px → 0, 0.8s ease-out). The POV video fades in from opacity:0 over 1.0s. Finally, the body copy beneath fades in word by word.

**Revenue/number focus:** No numbers — this is differentiation, not revenue. The monetization angle is addressed in a single line of body copy: "Fans pay to access it. Clubs earn 50% of everything they pay." This 50% appears in #faff69.

**Hero visual:** Dual: hardware photo (left) + POV video (right). The asymmetric layout with the video slightly taller than the image creates visual tension — the camera is the object, the video is what it sees. Between them, a thin vertical yellow line (2px, height: 60%) that pulses with a 3s ease-in-out infinite opacity cycle (0.4 → 1.0 → 0.4).

**Key interaction:** Hover on the POV video frame shows a subtle scanline overlay (CSS linear-gradient repeating pattern at 2% opacity) — a broadcast television aesthetic. Clicking the video (on desktop) enters a full-screen modal with the video playing at full size with audio unmuted.

**21st.dev component type:** Search "split layout video reveal" or "full-bleed media section"

**Atmosphere note:** The pivot moment. This is where a competitor comparison becomes irrelevant — nothing on the market does this.

---

### Section 9: REVENUE STREAMS
**Scene title:** THE LEDGER

**Cinematic moment:** The commercial core of the site. Eight revenue streams listed in two columns of four, with the "50% YOURS" headline at the absolute center of the viewport — the largest typographic moment on the entire page. Gold atmospheric glow radiates behind this central figure. Each revenue stream is a horizontal row with a thin yellow connector line, stream name, and a small icon.

**Entry animation:** The "50% YOURS" headline is the last thing to appear, not the first. Sequence: the section subtitle label appears ("8 REVENUE STREAMS. ONE SPLIT."). Then the 8 revenue rows cascade in from left and right simultaneously (left column from x:-30px, right column from x:30px), 80ms stagger each, 0.5s ease-out. Then, at a 600ms delay after the last row arrives, the "50% YOURS" appears — a single beat of silence before the number drops into place from y:-20px over 0.4s with a simultaneous gold glow expanding radially from 0% to 100% radius over 0.6s.

**Revenue/number focus:** "50%" at 144px Inter 900, letter-spacing: -6px, color: #d4a017 (gold). "YOURS" directly below at 72px Inter 900, same color. Together they are the largest text on the site. Below: "The other 50% funds everything we build for you." in 16px Inter 400, rgba(255,255,255,0.6). The 8 individual streams each show a revenue type name with no dollar amounts (those will exist post-launch) — instead, each row has a small animated dot that pulses yellow on a staggered 0.8s loop, suggesting these streams are live and generating.

**Hero visual:** The typographic moment is the hero. No imagery. The gold glow is CSS: box-shadow: 0 0 120px rgba(212,160,23,0.15) on the "50% YOURS" container, expanding to 200px on the reveal animation.

**Key interaction:** Hover on any revenue stream row brightens that row's connector line and shows a one-line description of how that revenue stream works (tooltip or inline reveal). The 8 pulses synchronize briefly (all light at once) and return to staggered on a 4s interval — a heartbeat.

**21st.dev component type:** Search "revenue list animated rows" or "animated feature list stagger"

**Atmosphere note:** The "aha" moment. The executive sees the model, understands the split, and does arithmetic with their club's fan base in their head.

---

### Section 10: CLUBS MARQUEE
**Scene title:** THE BROTHERHOOD

**Cinematic moment:** An infinite horizontal scroll of club logos — Al-Nassr, Al-Hilal, Al-Ahli, Al-Ittihad, UAE Pro League clubs — all treated in white monochrome, slightly dimmed (opacity: 0.6), on the #0a0a0a canvas. The scroll is seamless, two rows moving in opposite directions (top row: left-to-right, bottom row: right-to-left) at 30px/s. Between the two rows: a single yellow horizontal line, 1px, full width.

**Entry animation:** Both rows start outside the viewport (x: 100% and x: -100% respectively) and slide in simultaneously over 1.0s ease-out, then immediately begin the infinite scroll. The yellow center line draws in from center outward (scaleX 0 → 1 from transform-origin: center) over 0.8s.

**Revenue/number focus:** None. But the section header above the marquee reads "IN CONVERSATIONS WITH CLUBS ACROSS" followed on a new line with "3 LEAGUES. 10+ CLUBS." at 64px Inter 900, white. This is the social proof moment without overstating live deployments.

**Hero visual:** The dual-row logo marquee with yellow divider.

**Key interaction:** Hover on any logo pauses both scrolling rows and brightens that logo to opacity:1 with a #faff69 tint overlay at 20% opacity. All other logos dim to opacity:0.3. On mouse-leave, the rows resume and logos return to opacity:0.6 over 0.3s.

**21st.dev component type:** Search "infinite marquee logo scroll" or "logo ticker two-row"

**Atmosphere note:** Momentum. The executive sees names they recognize. The pipeline is real.

---

### Section 11: GLOBAL REACH
**Scene title:** THE MAP

**Cinematic moment:** A dark world map (SVG or canvas-rendered, not a raster image) with animated connection arcs — curved lines originating from Riyadh that arc to cities across Asia, Europe, North America. The arcs are drawn sequentially, each a thin yellow line (1px) with a traveling pulse (a bright dot moving along the path). Key cities highlighted: London, Barcelona, Manchester, Paris, Tokyo, Beijing, São Paulo, New York.

**Entry animation:** The map fades in (opacity:0 → 1, 0.8s). Then Riyadh pulses first — a concentric ring expansion (like a radar ping), 3 rings, 0.3s each, #faff69. Then arcs draw one by one, each arc: 0.8s SVG stroke-dashoffset animation. Destination cities light up as the arc reaches them. Total sequence: approximately 5 seconds of staggered arc-drawing.

**Revenue/number focus:** Floating stat labels appear near key regions as arcs reach them: "100+ Countries" near the arc endpoint cluster. These appear with a 0.2s opacity fade.

**Hero visual:** The animated SVG world map with connection arcs. No photography — the map IS the statement.

**Key interaction:** Hover over any destination city dot shows a micro-tooltip with a one-liner (e.g., "London — 50M+ Premier League global fans"). The city dot pulses on hover.

**21st.dev component type:** Search "world map animated connections" or "SVG map arc animation"

**Atmosphere note:** The local platform with global ambition — Riyadh is the center of this map, not a footnote.

---

### Section 12: VISION 2030
**Scene title:** THE MANDATE

**Cinematic moment:** A full-width section with a subtle Saudi architectural pattern (geometric, abstract — not a flag) in the background at 4% opacity. Foreground: the Vision 2030 logo mark (if licensable) or a custom geometric diamond in #faff69. Three alignment pillars listed with icons: "Digital Transformation" / "Sports Economy" / "Local Innovation". The section headline: "BUILT FOR SAUDI ARABIA'S NEXT CHAPTER." Arabic version in Cairo 700 directly below.

**Entry animation:** The geometric background pattern sweeps in from right to left (x:60px → 0, opacity:0 → 0.04, 1.0s). The headline reveals with the standard compression technique. The three pillars cascade in bottom-to-top (reverse of most sections — like rising) with 100ms stagger, y:20px → 0.

**Revenue/number focus:** A single stat: "SAR 1.8 Trillion — Saudi Vision 2030 sports sector target." Appears in 36px Inter 700, #faff69, after pillar cascade completes, with a 400ms counter animation (0 → 1.8T).

**Hero visual:** The geometric pattern background + the three pillars. No photography.

**Key interaction:** Scroll-progress within this section drives a slow clockwise rotation (0 → 12°) on the geometric background pattern, matching the feeling of a mandala or architectural feature turning into view.

**21st.dev component type:** Search "icon stat pillars" or "three column feature icons"

**Atmosphere note:** Political and economic alignment without flag-waving. This is context, not performance.

---

### Section 13: FINAL CTA
**Scene title:** THE DOOR

**Cinematic moment:** The simplest section on the page. Near-full-height viewport. Black canvas. A yellow glow at the center expands slowly — it is the only light source. Centered: "YOUR CLUB. YOUR REVENUE. YOUR MOVE." at 72px Inter 900. Below: Two CTAs — "BOOK A DEMO" (primary: #faff69 background, black text, 18px Inter 700) and "DOWNLOAD DECK" (secondary: 1px #faff69 border, #faff69 text, transparent background).

**Entry animation:** The yellow glow begins at opacity:0 radius:0 and expands to full size over 1.5s, easing out. The headline does not animate by word — it fades in as one unit at opacity:0 → 1 over 0.8s after glow reaches 60% size. The CTAs appear 400ms after headline, sliding up 16px from below.

**Revenue/number focus:** None. The commercial work is done. The CTA section earns silence.

**Hero visual:** The expanding yellow glow — CSS: radial-gradient(ellipse at center, rgba(250,255,105,0.12) 0%, transparent 70%), animated via Framer Motion from scale:0.3 to scale:1.

**Key interaction:** "BOOK A DEMO" button has a magnetic effect — on hover, the button slightly follows the cursor (max: ±8px offset, using useMousePosition + useSpring). The button background shifts to a brighter #ffff80 on hover. On click, a full-screen overlay modal slides up from the bottom (the contact/booking form).

**21st.dev component type:** Search "magnetic button CTA" or "glow radial CTA section"

**Atmosphere note:** The door is open. The only question is whether they walk through it.

---

## 4. Motion and Animation System

Global animation tokens — implement as a `lib/animation.ts` constants file.

| Token | Value | Rationale |
|-------|-------|-----------|
| `easeOut` | cubic-bezier(0.16, 1, 0.3, 1) | Primary entry easing — fast start, smooth landing |
| `easeOvershoot` | cubic-bezier(0.68, -0.3, 0.265, 1.35) | Headlines in Patented Camera — the "crash" |
| `durationFast` | 0.3s | Labels, tooltips, hovers |
| `durationNormal` | 0.6s | Standard content entry |
| `durationSlow` | 0.8s | Hero and landmark entries |
| `durationVerySlow` | 1.2s–1.5s | SVG draw animations, glow expansions |
| `staggerItem` | 60ms | Within a row/list |
| `staggerRow` | 80ms | Between rows in a grid |
| `staggerChar` | 12ms | Character-by-character labels only |
| `staggerWord` | 30ms | Body copy word groups |
| `counterDuration` | 2000ms | All numeric counters (easeOut curve) |
| `counterEase` | easeOut quadratic | Fast early, slow approach to final value |
| `parallaxBackground` | 0.3 | Background layer scroll multiplier |
| `parallaxMidground` | 0.15 | Card/element layer scroll multiplier |
| `parallaxForeground` | 0 | Text never parallaxes |
| `hoverScale` | 1.02 | Standard card hover scale |
| `hoverDuration` | 0.2s | Hover state transition |
| `revealOffset` | 40px | Default Y offset before reveal |
| `revealThreshold` | 0.15 | Fraction of element visible to trigger reveal |
| `reducedMotionDuration` | 0.2s | All transitions in prefers-reduced-motion |
| `filmGrainOpacity` | 0.035 | SVG noise filter opacity |
| `vignetteDefault` | 0.65 | Radial vignette darkness (most sections) |
| `vignetteHero` | 0.85 | Hero vignette (darkest) |

**Framer Motion implementation pattern:**

Use `useInView` with `once: true` and `margin: "-100px"` for all scroll-triggered reveals. Wrap repeating patterns in a `<Reveal>` component that accepts `delay`, `duration`, and `direction` props. For counters, use `useMotionValue` + `useTransform` with the `animate` function, not a library — keep the counter logic native to avoid bundle overhead.

---

## 5. The Revenue Moment — Special Treatment

The Revenue Streams section is the commercial core of the entire website. It must be engineered as a single, unforgettable typographic and spatial moment — not a data table, not a feature list, not an infographic.

**The hierarchy of revelation:**

1. The executive scrolls in and sees the 8 revenue streams list first — they appear one by one, horizontal rows, each named clearly (Subscriptions, Digital Currency, Sports Predictions, Voting, Tickets, Merchandise, Digital Gift Cards, NFTs/Collectibles). These rows feel comprehensive. The executive counts them. There are 8.

2. Then the split appears. "50% YOURS." It is 144px on desktop. It is the size of a scoreboard. The gold glow behind it radiates outward simultaneously, as if the number is generating its own light source. The atmosphere of the room changes.

3. Below the split, the zero-risk statement: "The other 50% funds everything we build for you." This line, in small gray text, is what completes the case. No setup cost. No risk. 50% of 8 revenue streams. The math does itself.

**Spatial treatment:**

The "50% YOURS" should be horizontally centered in a way that feels deliberately oversized — it should not fit cleanly in any conventional grid. On a 1440px desktop, at 144px it is approximately 520px wide for "50%". This means it dominates. The two columns of revenue streams sit flanking it (or above/below), but the number is the anchor.

**SAR equivalents:**

Below "50% YOURS", in smaller text (24px Inter 400, rgba(255,255,255,0.5)): a secondary line showing the benchmark in SAR: "Equivalent to the revenue FC Barcelona's digital platform generates for the club — ₁over SAR 800M annually." This number does not animate — it is already visible when the section enters the viewport. It serves as an anchor to the competitive benchmarks shown earlier in the Opportunity section, creating a satisfying narrative closure: "we showed you what the best clubs earn; now here is your path to it."

**The 50% color choice:**

#d4a017 (gold) rather than #faff69 (electric yellow) for this number is a deliberate signal. Electric yellow belongs to the platform, to energy, to action. Gold belongs to money, to wealth, to accumulated value. The color itself carries meaning. The executive's eye has been trained by the earlier sections to associate #faff69 with the platform. When the split number appears in gold, it registers as a different register — not "the product" but "the payout."

---

## 6. Asset Generation Todo List

### Table A — Video Clips (Sora/Runway)

| # | File name | Duration | Scene used in | Prompt (Sora) |
|---|-----------|----------|---------------|---------------|
| 1 | `public/cinematic/hero-bg.mp4` | 8s loop | Hero (Section 2) | Cinematic slow-zoom aerial view of a massive illuminated football stadium at night, 60,000 seats packed with fans holding white lights, center circle visible, one lone player silhouette at center, pitch level camera angle, hyper-realistic, photographic, 8K resolution, seamless loop, no motion blur artifacts, no text |
| 2 | `public/cinematic/player-pov.mp4` | 6s loop | Patented Camera (Section 8) | First-person POV video from a football player's chest running onto a stadium pitch, grass underfoot, crowd noise implied, stadium floodlights sweeping into frame, authentic jersey-mounted camera perspective with slight bounce and motion, cinematic 24fps, no color grading — natural stadium light, seamless loop |
| 3 | `public/cinematic/stadium-crowd-energy.mp4` | 6s loop | Global Reach (Section 11) | Time-lapse aerial of a football crowd in a packed stadium doing a Mexican wave, all white seats, thousands of fans, night match, stadium lights, cinematic quality, slow orbit drone shot, no faces identifiable, seamless loop |
| 4 | `public/cinematic/riyadh-night.mp4` | 8s loop | Vision 2030 (Section 12) | Cinematic slow pan of Riyadh skyline at night from above, modern glass towers, city lights, Kingdom Tower prominent, slightly desaturated blue-and-gold color grade, majestic and contemporary, drone perspective, seamless loop, no text |
| 5 | `public/cinematic/app-ui-demo.mp4` | 5s loop | App Gallery (Section 7) | Close-up screen recording of a premium sports fan app interface (blue and yellow color scheme), user tapping live player camera feed, switching between prediction game and live match stats, clean modern iOS UI, 60fps, no watermarks, seamless loop |
| 6 | `public/cinematic/data-flow.mp4` | 4s loop | How It Works (Section 5) | Abstract data visualization: thin golden lines flowing from a central node outward to multiple endpoints, dark background, particle trail effect, slow breathing pulse at center node, cinematic depth of field, seamless loop |

---

### Table B — Still Images (Midjourney)

| # | File name | Dimensions | Section used in | Prompt (Midjourney) |
|---|-----------|------------|-----------------|---------------------|
| 1 | `public/cinematic/hero-bg-fallback.jpg` | 1920×1080 | Hero fallback | Cinematic aerial photograph of a full football stadium at night, 60,000 seats lit white and gold, pitch level lens flare, crowd texture visible, #0a0a0a shadows, ultra-dramatic lighting --ar 16:9 --style raw --v 6 --q 2 |
| 2 | `public/cinematic/player-camera-hardware.jpg` | 1200×900 | Patented Camera | Product photography of a compact camera lens mounted on a jersey fabric, extreme close-up, dramatic rim lighting from below on dark background, yellow accent light source, precision engineering aesthetic, isolated on #0a0a0a --ar 4:3 --style raw --v 6 --q 2 |
| 3 | `public/cinematic/crowd-silhouette.jpg` | 1920×800 | Global Reach banner | Silhouette of a massive football crowd in a stadium at night, stadium lights creating rim-lighting on crowd tops, foreground completely black, #faff69 and white light palette, cinematic panorama --ar 21:9 --style raw --v 6 --q 2 |
| 4 | `public/cinematic/sport-football.jpg` | 800×600 | Sports Scope grid | Cinematic close-up of a football on a wet pitch at night, stadium lights reflected in water droplets, ultra-realistic, dark moody atmosphere, shallow depth of field --ar 4:3 --style raw --v 6 --q 2 |
| 5 | `public/cinematic/sport-basketball.jpg` | 800×600 | Sports Scope grid | Cinematic close-up of a basketball mid-arc above the rim, arena lights behind, lens flare, dark court below, crowd blur, ultra-realistic --ar 4:3 --style raw --v 6 --q 2 |
| 6 | `public/cinematic/sport-tennis.jpg` | 800×600 | Sports Scope grid | Cinematic bird's-eye of a floodlit tennis court at night, player serving, motion blur on racquet, hard court reflections, dark atmosphere --ar 4:3 --style raw --v 6 --q 2 |
| 7 | `public/cinematic/sport-cricket.jpg` | 800×600 | Sports Scope grid | Cinematic close-up of a cricket ball mid-pitch, dramatic stadium lighting, dark green turf, shallow DOF, photorealistic --ar 4:3 --style raw --v 6 --q 2 |
| 8 | `public/cinematic/sport-golf.jpg` | 800×600 | Sports Scope grid | Cinematic dusk golf course, single figure silhouette at top of backswing, golden hour light fading, dramatic clouds, ultra-realistic --ar 4:3 --style raw --v 6 --q 2 |
| 9 | `public/cinematic/sport-swimming.jpg` | 800×600 | Sports Scope grid | Cinematic underwater photography of an Olympic swimmer mid-stroke, blue chlorine light, bubbles and motion blur, dark water above, photorealistic --ar 4:3 --style raw --v 6 --q 2 |
| 10 | `public/cinematic/sport-athletics.jpg` | 800×600 | Sports Scope grid | Cinematic close-up of sprinter's feet leaving starting blocks, track rubber, stadium lights, motion blur, dark dramatic atmosphere --ar 4:3 --style raw --v 6 --q 2 |
| 11 | `public/cinematic/sport-mma.jpg` | 800×600 | Sports Scope grid | Cinematic photograph of an empty octagon cage at night, arena lights illuminating center, dark audience beyond, tension and silence, photorealistic --ar 4:3 --style raw --v 6 --q 2 |
| 12 | `public/cinematic/vision-pattern.jpg` | 1920×600 | Vision 2030 | Abstract geometric Islamic architectural pattern, dark navy background, gold and yellow line work, no color fill — line art only, seamless tile-able, ultra-high resolution, no text, no faces --ar 16:5 --style raw --v 6 --tile |
| 13 | `public/cinematic/cta-glow.jpg` | 1440×900 | Final CTA | Pure black background with a single radial gold and yellow glow emanating from dead center, no subject, no text, photographic quality lens flare feel, color palette: #faff69 at center bleeding to #d4a017 then transparent black, ultra minimal --ar 16:10 --style raw --v 6 --q 2 |

---

## 7. 21st.dev Component Shopping List

| Component name | Search term on 21st.dev | Used in section | Why this component |
|----------------|------------------------|-----------------|-------------------|
| Sticky blur navbar | `sticky nav blur scroll` | Nav (1) | Transparent-to-frosted transition on scroll, already animated |
| Fullscreen video hero | `hero video background fullscreen` | Hero (2) | Video loop with overlay content and scroll-unlock behavior |
| Animated counter card | `number counter animated scroll trigger` | Opportunity (4) | Counts up from 0 on viewport entry with easing control |
| Process timeline connector | `animated timeline steps connector` | How It Works (5) | SVG line-draw between numbered nodes |
| Bento feature grid | `feature bento grid hover glow` | Platform Features (6) | 4×2 grid with hover border illumination per card |
| 3D device mockup gallery | `iPhone mockup 3D perspective parallax` | App Gallery (7) | Multi-phone perspective cluster with mouse-tracking |
| Split media reveal | `split layout video image reveal scroll` | Patented Camera (8) | Two-column media section with staggered entry |
| Animated list rows | `stagger list reveal animated rows` | Revenue Streams (9) | Sequential row entry from both sides |
| Infinite dual marquee | `infinite marquee two rows opposite direction` | Clubs Marquee (10) | Two rows, opposite scroll directions, hover-pause |
| SVG world map arcs | `world map svg animated arcs connections` | Global Reach (11) | Path-drawn connection arcs with traveling pulse |
| Icon stat pillars | `three column stats icons animated` | Vision 2030 (12) | Three-up pillars with icons and stat labels |
| Magnetic CTA button | `magnetic button hover cursor follow` | Final CTA (13) | Cursor-following button effect |
| Radial glow background | `radial glow animated background dark` | Final CTA (13) | Expanding gold glow from center |
| Text character reveal | `character by character text reveal stagger` | All headlines | Per-character stagger reveal with tracking compression |
| Scroll progress indicator | `scroll progress bar top fixed` | Global (nav) | Thin yellow line at top showing scroll position |

---

## 8. Implementation Notes

### Order of Implementation

Build in this sequence — each phase is shippable independently:

**Phase 1 — Foundation (no assets needed)**
1. Global animation token file (`src/lib/animation.ts`)
2. `<Reveal>` wrapper component for scroll-triggered entry (wraps useInView + motion.div)
3. `<Counter>` component for number count-up
4. Film grain SVG filter (add to global CSS once)
5. Nav scroll behavior (transparent → blur)

**Phase 2 — Revenue-critical sections (highest business value)**
6. Opportunity section — counter cards with competitor benchmarks
7. Revenue Streams section — 8 rows + "50% YOURS" typographic moment
8. Final CTA section — radial glow + magnetic button

**Phase 3 — Product demonstration**
9. App Gallery — 3D iPhone cluster with existing `/appimages/` screenshots
10. Patented Camera — split layout (placeholder video while Sora generates)
11. Platform Features — animated feature grid

**Phase 4 — Supporting narrative**
12. Hero — replace existing hero with video loop (start with Midjourney still, swap for Sora video)
13. Sports Scope — image grid (replace placeholder images with Midjourney assets)
14. How It Works — SVG connector line
15. Global Reach — SVG world map arcs
16. Vision 2030 — geometric pattern + pillars
17. Clubs Marquee — dual-row infinite scroll

### Performance Warnings

**Video autoplay:**
- All video elements must have `autoPlay muted loop playsInline` — missing `playsInline` breaks iOS Safari autoplay
- Use `loading="lazy"` equivalent: wrap video in an IntersectionObserver and only set `src` when within 300px of viewport
- Provide `<source type="video/webm">` first (smaller file), `<source type="video/mp4">` as fallback
- Target video file sizes: Hero ≤4MB, Patented Camera POV ≤3MB, all others ≤2MB — compress with FFmpeg (CRF 28, scale 1920:-2)

**Image lazy loading:**
- All Midjourney images use Next.js `<Image>` with `loading="lazy"` except hero fallback (which uses `priority`)
- Sport grid images: use `sizes="(max-width: 768px) 50vw, 25vw"` for responsive srcset

**Framer Motion bundle:**
- Import only what is used: `import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'`
- Do NOT import the entire library at the root layout — use dynamic imports for section components

**Film grain performance:**
- The SVG feTurbulence filter is GPU-accelerated on modern browsers but expensive on older devices — disable via media query: `@media (prefers-reduced-motion: reduce), (max-device-memory: 4GB) and (hover: none)`

**Counter animation:**
- Do not use external counter libraries — a 15-line useEffect with requestAnimationFrame is sufficient and adds zero bundle weight

### Framer Motion Patterns

**Scroll-triggered reveal (standard):**
```
const ref = useRef(null)
const isInView = useInView(ref, { once: true, margin: "-100px" })
<motion.div ref={ref} animate={isInView ? "visible" : "hidden"} variants={revealVariants} />
```

**Parallax layer:**
```
const { scrollY } = useScroll()
const y = useTransform(scrollY, [sectionTop, sectionBottom], [0, parallaxRatio * sectionHeight])
```

**Counter animation (no library):**
```
useEffect(() => {
  const start = performance.now()
  const update = (now) => {
    const t = Math.min((now - start) / COUNTER_DURATION, 1)
    const ease = 1 - Math.pow(1 - t, 3) // cubic ease-out
    setDisplayValue(Math.round(ease * targetValue))
    if (t < 1) requestAnimationFrame(update)
  }
  requestAnimationFrame(update)
}, [isInView])
```

**Magnetic button:**
```
const mouseX = useMotionValue(0)
const mouseY = useMotionValue(0)
const springX = useSpring(mouseX, { stiffness: 150, damping: 15 })
const springY = useSpring(mouseY, { stiffness: 150, damping: 15 })
```

### Mapping Existing Infrastructure

The current codebase has scroll-reveal infrastructure in the existing section components. The migration path:

1. Identify any existing `useInView` or `IntersectionObserver` usage in the current sections — consolidate into the new `<Reveal>` component
2. The existing `framer-motion` dependency is already in `package.json` — no new install needed
3. Replace any CSS transition-based reveals with the Framer Motion `variants` pattern — this enables the stagger timing that CSS transitions cannot achieve reliably
4. The existing Tailwind dark theme config (`#0a0a0a` canvas, `#faff69` primary) maps directly to the tokens above — no Tailwind config changes required for the color system
5. The `src/components/sections/` directory structure is correct — one file per section, no reorganization needed
6. Add `src/lib/animation.ts` as the single source of truth for all animation tokens — import into every section component

---

*This document is the creative director's brief. Every decision has a reason. Deviate only with a better reason.*
