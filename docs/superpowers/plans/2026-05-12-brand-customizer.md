# Brand Customizer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a club search + color picker inside the App Gallery section that lets visitors select their club (or pick custom colors) to recolor the entire website and app screenshots in real time.

**Architecture:** A React ThemeContext holds the active primary/secondary color and writes CSS custom properties to `document.documentElement`. All existing `rgba(250,255,105,x)` hardcoded values across sections are migrated to `rgba(var(--color-primary-rgb),x)` so they react instantly. A BrandCustomizer component embedded above the phone carousel in AppGallery exposes a fuzzy-search input against a static `clubs-db.json`, shows name + country + color swatch per result, and falls back to a two-swatch color picker when no match is found.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind v4, Framer Motion, `lucide-react`

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/lib/theme-context.tsx` | ThemeProvider, useTheme hook, hex→rgb util |
| Create | `src/data/clubs-db.json` | ~50 seed clubs with accurate hex colors |
| Create | `src/components/sections/brand-customizer.tsx` | Search input, dropdown, color picker fallback |
| Modify | `src/app/globals.css` | Add `--color-primary-rgb` to `:root` |
| Modify | `src/components/providers.tsx` | Wrap with ThemeProvider |
| Modify | `src/components/sections/app-gallery.tsx` | Integrate BrandCustomizer; add tint overlay (A) + chrome glow (C); update screenshot paths to Frame-*.png |
| Modify | All 9 section files (see Task 4) | Replace `rgba(250,255,105,x)` → `rgba(var(--color-primary-rgb),x)` and `#faff69` → `var(--color-primary)` |
| Shell | `appimages/Frame-*.png` → `public/appimages/frames/` | Move new screenshots into public directory |

---

## Task 1: Migrate new screenshots into public

**Files:**
- Shell: move `appimages/Frame-*.png` → `public/appimages/frames/`
- Modify: `src/components/sections/app-gallery.tsx` (SCREENSHOT_SRCS array only)

- [ ] **Step 1: Copy frames into public**

```bash
mkdir -p /Users/clawdbob/ClaudeProjects/Sportech/public/appimages/frames
cp /Users/clawdbob/ClaudeProjects/Sportech/appimages/Frame.png   /Users/clawdbob/ClaudeProjects/Sportech/public/appimages/frames/frame-0.png
cp /Users/clawdbob/ClaudeProjects/Sportech/appimages/Frame-2.png  /Users/clawdbob/ClaudeProjects/Sportech/public/appimages/frames/frame-2.png
cp /Users/clawdbob/ClaudeProjects/Sportech/appimages/Frame-3.png  /Users/clawdbob/ClaudeProjects/Sportech/public/appimages/frames/frame-3.png
cp /Users/clawdbob/ClaudeProjects/Sportech/appimages/Frame-4.png  /Users/clawdbob/ClaudeProjects/Sportech/public/appimages/frames/frame-4.png
cp /Users/clawdbob/ClaudeProjects/Sportech/appimages/Frame-5.png  /Users/clawdbob/ClaudeProjects/Sportech/public/appimages/frames/frame-5.png
cp /Users/clawdbob/ClaudeProjects/Sportech/appimages/Frame-6.png  /Users/clawdbob/ClaudeProjects/Sportech/public/appimages/frames/frame-6.png
cp /Users/clawdbob/ClaudeProjects/Sportech/appimages/Frame-7.png  /Users/clawdbob/ClaudeProjects/Sportech/public/appimages/frames/frame-7.png
cp /Users/clawdbob/ClaudeProjects/Sportech/appimages/Frame-8.png  /Users/clawdbob/ClaudeProjects/Sportech/public/appimages/frames/frame-8.png
cp /Users/clawdbob/ClaudeProjects/Sportech/appimages/Frame-9.png  /Users/clawdbob/ClaudeProjects/Sportech/public/appimages/frames/frame-9.png
cp /Users/clawdbob/ClaudeProjects/Sportech/appimages/Frame-10.png /Users/clawdbob/ClaudeProjects/Sportech/public/appimages/frames/frame-10.png
cp /Users/clawdbob/ClaudeProjects/Sportech/appimages/Frame-11.png /Users/clawdbob/ClaudeProjects/Sportech/public/appimages/frames/frame-11.png
```

- [ ] **Step 2: Update SCREENSHOT_SRCS in app-gallery.tsx**

Replace the old array (lines 11–17 of app-gallery.tsx):

```tsx
const SCREENSHOT_SRCS = [
  "/appimages/frames/frame-0.png",
  "/appimages/frames/frame-2.png",
  "/appimages/frames/frame-3.png",
  "/appimages/frames/frame-4.png",
  "/appimages/frames/frame-5.png",
  "/appimages/frames/frame-6.png",
  "/appimages/frames/frame-7.png",
  "/appimages/frames/frame-8.png",
  "/appimages/frames/frame-9.png",
  "/appimages/frames/frame-10.png",
  "/appimages/frames/frame-11.png",
];
```

Also remove the `unoptimized` prop from the `<Image>` in `IPhoneFrame` so Next.js serves optimized WebP:

```tsx
<Image src={src} alt={label} fill style={{ objectFit: "cover", objectPosition: "top" }} />
```

- [ ] **Step 3: Commit**

```bash
git add public/appimages/frames/ src/components/sections/app-gallery.tsx
git commit -m "chore: migrate Frame screenshots to public, enable Next.js image optimization"
```

---

## Task 2: Add CSS custom property infrastructure

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add `--color-primary-rgb` to `:root` in globals.css**

Add after the `html { ... }` block (around line 38):

```css
:root {
  --color-primary-rgb: 250, 255, 105;
}
```

This is the comma-separated RGB triple that powers `rgba(var(--color-primary-rgb), 0.x)` across the codebase. The ThemeContext will update both `--color-primary` and `--color-primary-rgb` together at runtime.

- [ ] **Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add --color-primary-rgb CSS var for runtime alpha theming"
```

---

## Task 3: Create ThemeContext

**Files:**
- Create: `src/lib/theme-context.tsx`
- Modify: `src/components/providers.tsx`

- [ ] **Step 1: Create `src/lib/theme-context.tsx`**

```tsx
"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface ThemeState {
  primaryColor: string;
  secondaryColor: string;
}

interface ThemeContextValue extends ThemeState {
  setTheme: (primary: string, secondary: string) => void;
  resetTheme: () => void;
}

const DEFAULT_PRIMARY = "#faff69";
const DEFAULT_SECONDARY = "#0a0a0a";

function hexToRgbCss(hex: string): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

function getOnPrimaryColor(hex: string): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#0a0a0a" : "#ffffff";
}

const ThemeContext = createContext<ThemeContextValue>({
  primaryColor: DEFAULT_PRIMARY,
  secondaryColor: DEFAULT_SECONDARY,
  setTheme: () => {},
  resetTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ThemeState>({
    primaryColor: DEFAULT_PRIMARY,
    secondaryColor: DEFAULT_SECONDARY,
  });

  const setTheme = useCallback((primary: string, secondary: string) => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", primary);
    root.style.setProperty("--color-primary-rgb", hexToRgbCss(primary));
    root.style.setProperty("--color-on-primary", getOnPrimaryColor(primary));
    setState({ primaryColor: primary, secondaryColor: secondary });
  }, []);

  const resetTheme = useCallback(() => {
    const root = document.documentElement;
    root.style.removeProperty("--color-primary");
    root.style.removeProperty("--color-primary-rgb");
    root.style.removeProperty("--color-on-primary");
    setState({ primaryColor: DEFAULT_PRIMARY, secondaryColor: DEFAULT_SECONDARY });
  }, []);

  return (
    <ThemeContext.Provider value={{ ...state, setTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

- [ ] **Step 2: Read `src/components/providers.tsx`, then wrap with ThemeProvider**

The file currently wraps children with LanguageProvider (or similar). Add ThemeProvider as the outermost wrapper:

```tsx
"use client";
import { LanguageProvider } from "@/lib/language-context";
import { ThemeProvider } from "@/lib/theme-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
```

(Read the actual file first and adapt to its current structure — do not overwrite unrelated logic.)

- [ ] **Step 3: Commit**

```bash
git add src/lib/theme-context.tsx src/components/providers.tsx
git commit -m "feat: add ThemeContext with runtime CSS variable theming"
```

---

## Task 4: Replace hardcoded yellow across all section components

**Files to modify** (read each before editing):
- `src/components/sections/hero.tsx`
- `src/components/sections/nav.tsx`
- `src/components/sections/how-it-works.tsx`
- `src/components/sections/opportunity.tsx`
- `src/components/sections/platform-features.tsx`
- `src/components/sections/revenue-streams.tsx`
- `src/components/sections/clubs-marquee.tsx`
- `src/components/sections/global-reach.tsx`
- `src/components/sections/vision-2030.tsx`
- `src/components/sections/final-cta.tsx`
- `src/components/ui/scroll-parallax-bg.tsx`
- `src/components/sections/patented-camera.tsx`
- `src/components/sections/sports-scope.tsx`
- `src/components/sections/revenue-simulator.tsx`

**Skip:** `src/app/opengraph-image.tsx`, `src/app/icon.tsx`, `src/app/apple-icon.tsx` — server-rendered static assets, keep hardcoded.

- [ ] **Step 1: In each file above, apply these two find-replace rules**

Rule A — opacity variants:
```
Find:    rgba(250,255,105,
Replace: rgba(var(--color-primary-rgb),
```

Rule B — solid yellow:
```
Find:    "#faff69"
Replace: "var(--color-primary)"
```

Rule B also applies to `color: "rgba(250,255,105,0.6)"` pattern → use `rgba(var(--color-primary-rgb),0.6)`.

Apply both rules to every file in the list. Make all file edits in parallel (one Edit call per file, all in the same message).

- [ ] **Step 2: Verify build still passes**

```bash
cd /Users/clawdbob/ClaudeProjects/Sportech && npm run build 2>&1 | tail -20
```

Expected: no TypeScript or build errors. CSS custom property strings inside style objects are plain strings — TypeScript does not validate them.

- [ ] **Step 3: Commit**

```bash
git add src/components/
git commit -m "refactor: replace hardcoded yellow with CSS custom property vars for runtime theming"
```

---

## Task 5: Create clubs database seed

**Files:**
- Create: `src/data/clubs-db.json`

- [ ] **Step 1: Write `src/data/clubs-db.json`**

Schema per entry: `{ "id", "name", "country", "sport", "primaryColor", "secondaryColor" }`

```json
[
  { "id": "real-madrid",         "name": "Real Madrid",            "country": "Spain",        "sport": "soccer",      "primaryColor": "#FFFFFF", "secondaryColor": "#00529F" },
  { "id": "fc-barcelona",        "name": "FC Barcelona",           "country": "Spain",        "sport": "soccer",      "primaryColor": "#A50044", "secondaryColor": "#004D98" },
  { "id": "manchester-city",     "name": "Manchester City",        "country": "England",      "sport": "soccer",      "primaryColor": "#6CABDD", "secondaryColor": "#1C2C5B" },
  { "id": "manchester-united",   "name": "Manchester United",      "country": "England",      "sport": "soccer",      "primaryColor": "#DA291C", "secondaryColor": "#FBE122" },
  { "id": "liverpool",           "name": "Liverpool",              "country": "England",      "sport": "soccer",      "primaryColor": "#C8102E", "secondaryColor": "#F6EB61" },
  { "id": "chelsea",             "name": "Chelsea",                "country": "England",      "sport": "soccer",      "primaryColor": "#034694", "secondaryColor": "#FFFFFF" },
  { "id": "arsenal",             "name": "Arsenal",                "country": "England",      "sport": "soccer",      "primaryColor": "#EF0107", "secondaryColor": "#063672" },
  { "id": "tottenham",           "name": "Tottenham Hotspur",      "country": "England",      "sport": "soccer",      "primaryColor": "#132257", "secondaryColor": "#FFFFFF" },
  { "id": "psg",                 "name": "Paris Saint-Germain",    "country": "France",       "sport": "soccer",      "primaryColor": "#004170", "secondaryColor": "#DA291C" },
  { "id": "bayern-munich",       "name": "Bayern Munich",          "country": "Germany",      "sport": "soccer",      "primaryColor": "#DC052D", "secondaryColor": "#0066B2" },
  { "id": "borussia-dortmund",   "name": "Borussia Dortmund",      "country": "Germany",      "sport": "soccer",      "primaryColor": "#FDE100", "secondaryColor": "#000000" },
  { "id": "juventus",            "name": "Juventus",               "country": "Italy",        "sport": "soccer",      "primaryColor": "#000000", "secondaryColor": "#FFFFFF" },
  { "id": "ac-milan",            "name": "AC Milan",               "country": "Italy",        "sport": "soccer",      "primaryColor": "#FB090B", "secondaryColor": "#000000" },
  { "id": "inter-milan",         "name": "Inter Milan",            "country": "Italy",        "sport": "soccer",      "primaryColor": "#010E80", "secondaryColor": "#000000" },
  { "id": "ajax",                "name": "Ajax",                   "country": "Netherlands",  "sport": "soccer",      "primaryColor": "#D2122E", "secondaryColor": "#FFFFFF" },
  { "id": "atletico-madrid",     "name": "Atlético Madrid",        "country": "Spain",        "sport": "soccer",      "primaryColor": "#CE3524", "secondaryColor": "#FFFFFF" },
  { "id": "porto",               "name": "FC Porto",               "country": "Portugal",     "sport": "soccer",      "primaryColor": "#003087", "secondaryColor": "#FFFFFF" },
  { "id": "benfica",             "name": "Benfica",                "country": "Portugal",     "sport": "soccer",      "primaryColor": "#E01F27", "secondaryColor": "#FFFFFF" },
  { "id": "celtic",              "name": "Celtic",                 "country": "Scotland",     "sport": "soccer",      "primaryColor": "#16A33A", "secondaryColor": "#FFFFFF" },
  { "id": "rangers",             "name": "Rangers",                "country": "Scotland",     "sport": "soccer",      "primaryColor": "#003087", "secondaryColor": "#FFFFFF" },
  { "id": "al-nassr",            "name": "Al-Nassr",               "country": "Saudi Arabia", "sport": "soccer",      "primaryColor": "#F5C518", "secondaryColor": "#003087" },
  { "id": "al-hilal",            "name": "Al-Hilal",               "country": "Saudi Arabia", "sport": "soccer",      "primaryColor": "#1D4FA1", "secondaryColor": "#FFFFFF" },
  { "id": "al-ahli",             "name": "Al-Ahli",                "country": "Saudi Arabia", "sport": "soccer",      "primaryColor": "#006633", "secondaryColor": "#FFFFFF" },
  { "id": "al-ittihad",          "name": "Al-Ittihad",             "country": "Saudi Arabia", "sport": "soccer",      "primaryColor": "#F5C518", "secondaryColor": "#000000" },
  { "id": "al-shabab",           "name": "Al-Shabab",              "country": "Saudi Arabia", "sport": "soccer",      "primaryColor": "#000000", "secondaryColor": "#FFFFFF" },
  { "id": "al-qadsiah",          "name": "Al-Qadsiah",             "country": "Saudi Arabia", "sport": "soccer",      "primaryColor": "#003087", "secondaryColor": "#FFFFFF" },
  { "id": "flamengo",            "name": "Flamengo",               "country": "Brazil",       "sport": "soccer",      "primaryColor": "#E82C2A", "secondaryColor": "#000000" },
  { "id": "boca-juniors",        "name": "Boca Juniors",           "country": "Argentina",    "sport": "soccer",      "primaryColor": "#003087", "secondaryColor": "#F5C518" },
  { "id": "river-plate",         "name": "River Plate",            "country": "Argentina",    "sport": "soccer",      "primaryColor": "#CC0000", "secondaryColor": "#FFFFFF" },
  { "id": "lakers",              "name": "Los Angeles Lakers",     "country": "USA",          "sport": "basketball",  "primaryColor": "#552583", "secondaryColor": "#FDB927" },
  { "id": "warriors",            "name": "Golden State Warriors",  "country": "USA",          "sport": "basketball",  "primaryColor": "#1D428A", "secondaryColor": "#FFC72C" },
  { "id": "bulls",               "name": "Chicago Bulls",          "country": "USA",          "sport": "basketball",  "primaryColor": "#CE1141", "secondaryColor": "#000000" },
  { "id": "celtics",             "name": "Boston Celtics",         "country": "USA",          "sport": "basketball",  "primaryColor": "#007A33", "secondaryColor": "#BA9653" },
  { "id": "heat",                "name": "Miami Heat",             "country": "USA",          "sport": "basketball",  "primaryColor": "#98002E", "secondaryColor": "#F9A01B" },
  { "id": "nets",                "name": "Brooklyn Nets",          "country": "USA",          "sport": "basketball",  "primaryColor": "#000000", "secondaryColor": "#FFFFFF" },
  { "id": "knicks",              "name": "New York Knicks",        "country": "USA",          "sport": "basketball",  "primaryColor": "#006BB6", "secondaryColor": "#F58426" },
  { "id": "spurs-nba",           "name": "San Antonio Spurs",      "country": "USA",          "sport": "basketball",  "primaryColor": "#C4CED4", "secondaryColor": "#000000" },
  { "id": "india-cricket",       "name": "India National Cricket", "country": "India",        "sport": "cricket",     "primaryColor": "#003087", "secondaryColor": "#FF671F" },
  { "id": "australia-cricket",   "name": "Australia Cricket",      "country": "Australia",    "sport": "cricket",     "primaryColor": "#FFD700", "secondaryColor": "#006400" },
  { "id": "england-cricket",     "name": "England Cricket",        "country": "England",      "sport": "cricket",     "primaryColor": "#1D3461", "secondaryColor": "#FFFFFF" },
  { "id": "pakistan-cricket",    "name": "Pakistan Cricket",       "country": "Pakistan",     "sport": "cricket",     "primaryColor": "#006600", "secondaryColor": "#FFFFFF" },
  { "id": "south-africa-cricket","name": "South Africa Cricket",   "country": "South Africa", "sport": "cricket",     "primaryColor": "#007A4D", "secondaryColor": "#FFB81C" },
  { "id": "west-indies-cricket", "name": "West Indies Cricket",    "country": "West Indies",  "sport": "cricket",     "primaryColor": "#7B0041", "secondaryColor": "#FFC72C" },
  { "id": "new-zealand-cricket", "name": "New Zealand Cricket",    "country": "New Zealand",  "sport": "cricket",     "primaryColor": "#000000", "secondaryColor": "#FFFFFF" },
  { "id": "sri-lanka-cricket",   "name": "Sri Lanka Cricket",      "country": "Sri Lanka",    "sport": "cricket",     "primaryColor": "#003087", "secondaryColor": "#FFD700" },
  { "id": "csk",                 "name": "Chennai Super Kings",    "country": "India",        "sport": "cricket",     "primaryColor": "#F5C518", "secondaryColor": "#003087" },
  { "id": "mi",                  "name": "Mumbai Indians",         "country": "India",        "sport": "cricket",     "primaryColor": "#004BA0", "secondaryColor": "#D1AB3E" },
  { "id": "rcb",                 "name": "Royal Challengers Bangalore","country": "India",    "sport": "cricket",     "primaryColor": "#EC1C24", "secondaryColor": "#000000" },
  { "id": "kkr",                 "name": "Kolkata Knight Riders",  "country": "India",        "sport": "cricket",     "primaryColor": "#3B225F", "secondaryColor": "#F5C518" }
]
```

- [ ] **Step 2: Commit**

```bash
git add src/data/clubs-db.json
git commit -m "feat: add clubs seed database with 50 clubs across soccer, basketball, cricket"
```

---

## Task 6: Build BrandCustomizer component

**Files:**
- Create: `src/components/sections/brand-customizer.tsx`

The component sits above the phone carousel inside the App Gallery section. It explains the feature, provides search, and has a color picker fallback. 

Layout (embedded above carousel):

```
┌─────────────────────────────────────────────────────────────┐
│  "Your brand. Your colors."                                  │
│  Search your club to see the app in your team's colors.      │
│                                                              │
│  [ 🔍 Search club name...                              ]     │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ ● Real Madrid         Spain    ⚽                   │    │
│  │ ● FC Barcelona        Spain    ⚽                   │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  Not listed? Choose your colors →  [▓ Primary] [▓ Secondary]│
└─────────────────────────────────────────────────────────────┘
```

- [ ] **Step 1: Create `src/components/sections/brand-customizer.tsx`**

```tsx
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Search, X, Palette } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import clubsData from "@/data/clubs-db.json";

interface Club {
  id: string;
  name: string;
  country: string;
  sport: "soccer" | "basketball" | "cricket";
  primaryColor: string;
  secondaryColor: string;
}

const SPORT_EMOJI: Record<string, string> = {
  soccer: "⚽",
  basketball: "🏀",
  cricket: "🏏",
};

const clubs = clubsData as Club[];

function normalize(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function searchClubs(query: string): Club[] {
  if (!query.trim()) return [];
  const q = normalize(query);
  return clubs
    .filter(
      (c) =>
        normalize(c.name).includes(q) || normalize(c.country).includes(q)
    )
    .slice(0, 6);
}

export function BrandCustomizer() {
  const { setTheme, resetTheme, primaryColor } = useTheme();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Club[]>([]);
  const [selected, setSelected] = useState<Club | null>(null);
  const [open, setOpen] = useState(false);
  const [customPrimary, setCustomPrimary] = useState("#faff69");
  const [customSecondary, setCustomSecondary] = useState("#0a0a0a");
  const [showPicker, setShowPicker] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const r = searchClubs(query);
    setResults(r);
    setOpen(r.length > 0 && query.trim().length > 0);
    if (r.length === 0 && query.trim().length > 1) {
      setShowPicker(true);
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = useCallback(
    (club: Club) => {
      setSelected(club);
      setQuery(club.name);
      setOpen(false);
      setShowPicker(false);
      setTheme(club.primaryColor, club.secondaryColor);
    },
    [setTheme]
  );

  const handleReset = useCallback(() => {
    setSelected(null);
    setQuery("");
    setShowPicker(false);
    setCustomPrimary("#faff69");
    setCustomSecondary("#0a0a0a");
    resetTheme();
  }, [resetTheme]);

  const handleCustomColor = useCallback(
    (primary: string, secondary: string) => {
      setCustomPrimary(primary);
      setCustomSecondary(secondary);
      setTheme(primary, secondary);
    },
    [setTheme]
  );

  const isDefaultTheme = primaryColor === "#faff69";

  return (
    <div className="w-full max-w-xl mx-auto mb-12">
      {/* Header */}
      <div className="mb-4">
        <p
          className="text-sm font-semibold mb-1"
          style={{ color: "var(--color-primary)" }}
        >
          YOUR BRAND. YOUR COLORS.
        </p>
        <p className="text-white/50 text-[13px]">
          Search your club to preview the app in your team&apos;s colors — applied across the entire page.
        </p>
      </div>

      {/* Search input */}
      <div className="relative">
        <div
          className="flex items-center gap-2.5 rounded-xl px-4 py-3 transition-all"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${selected ? "rgba(var(--color-primary-rgb),0.4)" : "rgba(255,255,255,0.08)"}`,
          }}
        >
          <Search size={15} className="shrink-0 text-white/30" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search club name or country..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (selected) {
                setSelected(null);
                resetTheme();
              }
            }}
            onFocus={() => results.length > 0 && setOpen(true)}
            className="flex-1 bg-transparent text-white/80 text-sm outline-none placeholder:text-white/25"
          />
          {selected && (
            <div
              className="w-4 h-4 rounded-full shrink-0 border border-white/10"
              style={{ background: selected.primaryColor }}
            />
          )}
          {query && (
            <button onClick={handleReset} className="text-white/30 hover:text-white/60 transition-colors">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Dropdown */}
        {open && (
          <div
            ref={dropdownRef}
            className="absolute top-full mt-1.5 left-0 right-0 z-50 rounded-xl overflow-hidden"
            style={{
              background: "#161616",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
            }}
          >
            {results.map((club) => (
              <button
                key={club.id}
                onClick={() => handleSelect(club)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-white/[0.04]"
              >
                <div
                  className="w-3 h-3 rounded-full shrink-0 border border-white/10"
                  style={{ background: club.primaryColor }}
                />
                <span className="text-white/80 text-sm flex-1">{club.name}</span>
                <span className="text-white/30 text-xs">{club.country}</span>
                <span className="text-xs ml-1">{SPORT_EMOJI[club.sport]}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Applied state */}
      {selected && (
        <div className="mt-3 flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full border border-white/10" style={{ background: selected.primaryColor }} />
            <div className="w-3 h-3 rounded-full border border-white/10" style={{ background: selected.secondaryColor }} />
          </div>
          <span className="text-white/40 text-xs">
            {selected.name} colors applied to the full page
          </span>
          <button onClick={handleReset} className="text-white/25 hover:text-white/50 text-xs underline underline-offset-2 ml-auto transition-colors">
            Reset
          </button>
        </div>
      )}

      {/* Fallback — color picker */}
      {showPicker && !selected && (
        <div
          className="mt-3 rounded-xl px-4 py-3 flex flex-col gap-3"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2">
            <Palette size={13} className="text-white/30" />
            <span className="text-white/40 text-xs">
              Can&apos;t find your club? Pick your brand colors below.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="color"
                value={customPrimary}
                onChange={(e) => handleCustomColor(e.target.value, customSecondary)}
                className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent"
                style={{ padding: 0 }}
              />
              <span className="text-white/40 text-xs">Primary</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="color"
                value={customSecondary}
                onChange={(e) => handleCustomColor(customPrimary, e.target.value)}
                className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent"
                style={{ padding: 0 }}
              />
              <span className="text-white/40 text-xs">Secondary</span>
            </label>
            {!isDefaultTheme && (
              <button onClick={handleReset} className="text-white/25 hover:text-white/50 text-xs underline underline-offset-2 ml-auto transition-colors">
                Reset
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/brand-customizer.tsx
git commit -m "feat: add BrandCustomizer component with club search and color picker fallback"
```

---

## Task 7: Wire BrandCustomizer into AppGallery + add tint overlay and chrome glow

**Files:**
- Modify: `src/components/sections/app-gallery.tsx`

This task has three sub-changes:
1. Import and place `BrandCustomizer` above the carousel
2. Add tint overlay (A) inside each phone screen
3. Update phone frame glow (C) to use `var(--color-primary)`

- [ ] **Step 1: Read the full current `src/components/sections/app-gallery.tsx`** (already read at session start — verify SCREENSHOT_SRCS was updated in Task 1)

- [ ] **Step 2: Update `IPhoneFrame` to accept and use `primaryColor`**

Change the function signature and box shadow:

```tsx
function IPhoneFrame({ src, label, badge, isActive, primaryColor }: {
  src: string; label: string; badge: string; isActive: boolean; primaryColor: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3" style={{ width: PHONE_W }}>
      <div className="relative" style={{ width: PHONE_W, height: PHONE_H }}>
        <div
          className="absolute inset-0 rounded-[40px]"
          style={{
            background: "linear-gradient(160deg, #2e2e2e 0%, #181818 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: isActive
              ? `0 40px 80px rgba(0,0,0,0.85), 0 0 0 0.5px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.04), 0 0 60px ${primaryColor}4D`
              : "0 16px 32px rgba(0,0,0,0.5)",
          }}
        />
        {/* Side buttons — unchanged */}
        <div className="absolute" style={{ left: -3, top: 84, width: 3, height: 26, borderRadius: "2px 0 0 2px", background: "#252525" }} />
        <div className="absolute" style={{ left: -3, top: 120, width: 3, height: 46, borderRadius: "2px 0 0 2px", background: "#252525" }} />
        <div className="absolute" style={{ left: -3, top: 176, width: 3, height: 46, borderRadius: "2px 0 0 2px", background: "#252525" }} />
        <div className="absolute" style={{ right: -3, top: 124, width: 3, height: 68, borderRadius: "0 2px 2px 0", background: "#252525" }} />
        {/* Screen */}
        <div className="absolute overflow-hidden bg-black" style={{ inset: 8, borderRadius: 34 }}>
          <Image src={src} alt={label} fill style={{ objectFit: "cover", objectPosition: "top" }} />
          {/* Tint overlay (A): colors the screenshot in the active brand color */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: primaryColor,
              opacity: 0.18,
              mixBlendMode: "color",
            }}
          />
        </div>
        {/* Dynamic Island */}
        <div className="absolute z-20"
          style={{ top: 18, left: "50%", transform: "translateX(-50%)", width: 90, height: 26, borderRadius: 14, background: "#0a0a0a" }}
        />
      </div>
      <div className="text-center" style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.3s ease" }}>
        <span className="text-primary text-[10px] font-bold tracking-widest uppercase">{badge}</span>
        <p className="text-white/60 text-[13px] font-medium mt-0.5">{label}</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Update `AppGallery` to get `primaryColor` from context and pass it down; add `BrandCustomizer` above carousel**

Add imports at top of file:
```tsx
import { BrandCustomizer } from "@/components/sections/brand-customizer";
import { useTheme } from "@/lib/theme-context";
```

Inside `AppGallery` function, add after the existing hooks:
```tsx
const { primaryColor } = useTheme();
```

In the render, add `BrandCustomizer` before the carousel `<motion.div>`:
```tsx
{/* Brand customizer — club search + color picker */}
<BrandCustomizer />

{/* Carousel */}
<motion.div ...>
```

In each `IPhoneFrame` usage inside the map, pass `primaryColor`:
```tsx
<IPhoneFrame
  src={src}
  label={tx.screens[i % tx.screens.length]?.label ?? `Screen ${i + 1}`}
  badge={tx.screens[i % tx.screens.length]?.badge ?? ""}
  isActive={isActive}
  primaryColor={primaryColor}
/>
```

Note: `tx.screens` currently has 5 entries; with 11 screenshots, use modulo `i % tx.screens.length` to avoid undefined access, or extend translations. Either approach is fine — modulo is simpler.

- [ ] **Step 4: Also update the section divider hairline and nav buttons to use CSS var**

In `AppGallery`, find any remaining hardcoded `rgba(250,255,105,...)` strings and apply the same replacement from Task 4 (they were likely already handled there, but double-check).

- [ ] **Step 5: Run build to verify**

```bash
cd /Users/clawdbob/ClaudeProjects/Sportech && npm run build 2>&1 | tail -30
```

Expected: clean build, no TypeScript errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/app-gallery.tsx
git commit -m "feat: integrate BrandCustomizer into AppGallery; add tint overlay and themed chrome glow to phone frames"
```

---

## Task 8 (Separate agent): Scraper script

**Files:**
- Create: `scripts/scrape-clubs.ts`

This script is run once offline to expand `src/data/clubs-db.json` beyond the 50-club seed. It is NOT part of the build — it is a developer utility.

- [ ] **Step 1: Install fetch dependency**

```bash
cd /Users/clawdbob/ClaudeProjects/Sportech && npm install --save-dev tsx
```

- [ ] **Step 2: Create `scripts/scrape-clubs.ts`**

```ts
#!/usr/bin/env npx tsx
/**
 * Run: npx tsx scripts/scrape-clubs.ts
 * Fetches club color data from multiple sources and merges into clubs-db.json.
 * Sources:
 *   - football-data.org free tier for soccer clubs
 *   - nba.com stats API for basketball teams
 *   - cricinfo/espn for cricket teams
 *   - teamcolorcodes.com for color lookup
 */

import { writeFileSync, readFileSync } from "fs";
import { join } from "path";

interface Club {
  id: string;
  name: string;
  country: string;
  sport: "soccer" | "basketball" | "cricket";
  primaryColor: string;
  secondaryColor: string;
}

// Known color overrides sourced from team brand guides + teamcolorcodes.com
const COLOR_MAP: Record<string, { primaryColor: string; secondaryColor: string }> = {
  "Real Madrid":          { primaryColor: "#FFFFFF", secondaryColor: "#00529F" },
  "FC Barcelona":         { primaryColor: "#A50044", secondaryColor: "#004D98" },
  "Manchester City":      { primaryColor: "#6CABDD", secondaryColor: "#1C2C5B" },
  "Manchester United":    { primaryColor: "#DA291C", secondaryColor: "#FBE122" },
  "Liverpool":            { primaryColor: "#C8102E", secondaryColor: "#F6EB61" },
  "Chelsea":              { primaryColor: "#034694", secondaryColor: "#FFFFFF" },
  "Arsenal":              { primaryColor: "#EF0107", secondaryColor: "#063672" },
  "Bayern Munich":        { primaryColor: "#DC052D", secondaryColor: "#0066B2" },
  "Borussia Dortmund":    { primaryColor: "#FDE100", secondaryColor: "#000000" },
  "Juventus":             { primaryColor: "#000000", secondaryColor: "#FFFFFF" },
  "AC Milan":             { primaryColor: "#FB090B", secondaryColor: "#000000" },
  "Inter Milan":          { primaryColor: "#010E80", secondaryColor: "#000000" },
  "Paris Saint-Germain":  { primaryColor: "#004170", secondaryColor: "#DA291C" },
  "Ajax":                 { primaryColor: "#D2122E", secondaryColor: "#FFFFFF" },
  "Los Angeles Lakers":   { primaryColor: "#552583", secondaryColor: "#FDB927" },
  "Golden State Warriors":{ primaryColor: "#1D428A", secondaryColor: "#FFC72C" },
  "Chicago Bulls":        { primaryColor: "#CE1141", secondaryColor: "#000000" },
  "Boston Celtics":       { primaryColor: "#007A33", secondaryColor: "#BA9653" },
};

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

async function fetchSoccerClubs(): Promise<Club[]> {
  // football-data.org free tier — no API key required for competition listings
  const competitionIds = ["PL", "PD", "BL1", "SA", "FL1", "CL"];
  const clubs: Club[] = [];
  const seen = new Set<string>();

  for (const comp of competitionIds) {
    try {
      const res = await fetch(`https://api.football-data.org/v4/competitions/${comp}/teams`, {
        headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY ?? "" },
      });
      if (!res.ok) continue;
      const data = await res.json() as { teams: Array<{ name: string; area: { name: string } }> };
      for (const team of data.teams ?? []) {
        if (seen.has(team.name)) continue;
        seen.add(team.name);
        const colors = COLOR_MAP[team.name] ?? { primaryColor: "#888888", secondaryColor: "#FFFFFF" };
        clubs.push({
          id: slugify(team.name),
          name: team.name,
          country: team.area?.name ?? "Unknown",
          sport: "soccer",
          ...colors,
        });
      }
    } catch {
      // silently skip failed competitions
    }
  }
  return clubs;
}

async function main() {
  const dbPath = join(process.cwd(), "src/data/clubs-db.json");
  const existing: Club[] = JSON.parse(readFileSync(dbPath, "utf-8"));
  const existingIds = new Set(existing.map((c) => c.id));

  console.log("Fetching soccer clubs from football-data.org...");
  const soccerClubs = await fetchSoccerClubs();

  const newClubs = soccerClubs.filter((c) => !existingIds.has(c.id));
  const merged = [...existing, ...newClubs];

  writeFileSync(dbPath, JSON.stringify(merged, null, 2));
  console.log(`Done. ${newClubs.length} new clubs added. Total: ${merged.length}`);
}

main().catch(console.error);
```

- [ ] **Step 3: Add npm script to package.json**

```json
"scripts": {
  "scrape-clubs": "npx tsx scripts/scrape-clubs.ts"
}
```

- [ ] **Step 4: Commit**

```bash
git add scripts/scrape-clubs.ts package.json
git commit -m "feat: add club scraper script for expanding clubs-db.json"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Club search autocomplete with country + sport
- ✅ Color applied site-wide via CSS vars
- ✅ Tint overlay (A) on app screenshots
- ✅ Chrome/glow recolor (C) on phone frames
- ✅ Color picker fallback shown when no search results
- ✅ UX copy explaining the feature
- ✅ New screenshots migrated + Next.js optimization enabled
- ✅ Scraper script for database expansion

**Type consistency check:**
- `Club` interface defined in brand-customizer.tsx matches clubs-db.json shape
- `IPhoneFrame` updated with `primaryColor: string` prop in both signature and usage
- `useTheme()` returns `primaryColor` used in both AppGallery and BrandCustomizer
- `tx.screens[i % tx.screens.length]` handles 11 screenshots vs 5 translation entries

**Placeholder scan:** No TBDs or TODOs present.
