#!/usr/bin/env npx tsx
/**
 * Run: npx tsx scripts/scrape-clubs.ts
 * No API key needed — uses ESPN's free public API which returns hex colors directly.
 * Sources:
 *   - ESPN site API: soccer (25+ leagues), NBA basketball — returns color + alternateColor as hex
 *   - Static dataset: cricket (ICC Full Members + IPL + BBL + PSL + CPL + SA20)
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

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function toHex(raw: string | undefined): string {
  if (!raw) return "#888888";
  const clean = raw.replace("#", "").trim();
  return clean.length === 6 ? `#${clean.toUpperCase()}` : "#888888";
}

// ─── ESPN soccer leagues → country ──────────────────────────────────────────
const SOCCER_LEAGUES: Record<string, string> = {
  "eng.1":  "England",
  "eng.2":  "England",
  "esp.1":  "Spain",
  "ger.1":  "Germany",
  "ita.1":  "Italy",
  "fra.1":  "France",
  "por.1":  "Portugal",
  "ned.1":  "Netherlands",
  "bra.1":  "Brazil",
  "arg.1":  "Argentina",
  "mex.1":  "Mexico",
  "usa.1":  "USA",
  "ksa.1":  "Saudi Arabia",
  "tur.1":  "Turkey",
  "scot.1": "Scotland",
  "bel.1":  "Belgium",
  "jpn.1":  "Japan",
  "aus.1":  "Australia",
  "chn.1":  "China",
  "ind.1":  "India",
  "col.1":  "Colombia",
  "chi.1":  "Chile",
  "uru.1":  "Uruguay",
  "ecu.1":  "Ecuador",
  "per.1":  "Peru",
  "gre.1":  "Greece",
  "cro.1":  "Croatia",
  "sco.1":  "Scotland",
  "ukr.1":  "Ukraine",
  "rus.1":  "Russia",
  "aut.1":  "Austria",
  "sui.1":  "Switzerland",
  "den.1":  "Denmark",
  "nor.1":  "Norway",
  "swe.1":  "Sweden",
  "fin.1":  "Finland",
  "cze.1":  "Czech Republic",
  "pol.1":  "Poland",
  "srb.1":  "Serbia",
  "rou.1":  "Romania",
  "hun.1":  "Hungary",
  "svk.1":  "Slovakia",
  "bul.1":  "Bulgaria",
  "irl.1":  "Ireland",
  "rsa.1":  "South Africa",
  "egy.1":  "Egypt",
  "mar.1":  "Morocco",
  "nga.1":  "Nigeria",
  "kor.1":  "South Korea",
};

interface EspnTeam {
  id: string;
  displayName: string;
  color?: string;
  alternateColor?: string;
}

interface EspnLeagueResponse {
  sports: Array<{
    leagues: Array<{
      teams: Array<{ team: EspnTeam }>;
    }>;
  }>;
}

async function fetchEspnSoccerClubs(): Promise<Club[]> {
  const clubs: Club[] = [];
  const seen = new Set<string>();

  for (const [leagueId, country] of Object.entries(SOCCER_LEAGUES)) {
    try {
      const url = `https://site.api.espn.com/apis/site/v2/sports/soccer/${leagueId}/teams?limit=100`;
      const res = await fetch(url, { headers: { "Accept": "application/json" } });
      if (!res.ok) continue;

      const data = await res.json() as EspnLeagueResponse;
      const teams = data?.sports?.[0]?.leagues?.[0]?.teams ?? [];
      let added = 0;

      for (const { team } of teams) {
        if (!team?.displayName) continue;
        const id = slugify(team.displayName);
        if (seen.has(id)) continue;
        seen.add(id);

        clubs.push({
          id,
          name: team.displayName,
          country,
          sport: "soccer",
          primaryColor: toHex(team.color),
          secondaryColor: toHex(team.alternateColor),
        });
        added++;
      }

      if (added > 0) console.log(`  ${leagueId.padEnd(8)} → ${country.padEnd(16)} ${added} clubs`);
    } catch {
      // skip failed leagues silently
    }
  }

  return clubs;
}

async function fetchEspnNbaClubs(): Promise<Club[]> {
  try {
    const url = "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams?limit=50";
    const res = await fetch(url);
    if (!res.ok) return [];

    const data = await res.json() as EspnLeagueResponse;
    const teams = data?.sports?.[0]?.leagues?.[0]?.teams ?? [];

    return teams
      .filter(({ team }) => team?.displayName)
      .map(({ team }) => ({
        id: slugify(team.displayName),
        name: team.displayName,
        country: team.displayName === "Toronto Raptors" ? "Canada" : "USA",
        sport: "basketball" as const,
        primaryColor: toHex(team.color),
        secondaryColor: toHex(team.alternateColor),
      }));
  } catch {
    return [];
  }
}

// ─── Static cricket (ESPN cricket doesn't expose hex colors) ────────────────
const CRICKET_TEAMS: Club[] = [
  // ICC Full Members
  { id: "afghanistan-cricket",      name: "Afghanistan Cricket",        country: "Afghanistan",  sport: "cricket", primaryColor: "#1D3461", secondaryColor: "#CE1126" },
  { id: "australia-cricket",        name: "Australia Cricket",          country: "Australia",    sport: "cricket", primaryColor: "#FFD700", secondaryColor: "#006400" },
  { id: "bangladesh-cricket",       name: "Bangladesh Cricket",         country: "Bangladesh",   sport: "cricket", primaryColor: "#006A4E", secondaryColor: "#F42A41" },
  { id: "england-cricket",          name: "England Cricket",            country: "England",      sport: "cricket", primaryColor: "#1D3461", secondaryColor: "#FFFFFF" },
  { id: "india-cricket",            name: "India Cricket",              country: "India",        sport: "cricket", primaryColor: "#003087", secondaryColor: "#FF671F" },
  { id: "ireland-cricket",          name: "Ireland Cricket",            country: "Ireland",      sport: "cricket", primaryColor: "#169B62", secondaryColor: "#FFFFFF" },
  { id: "new-zealand-cricket",      name: "New Zealand Cricket",        country: "New Zealand",  sport: "cricket", primaryColor: "#000000", secondaryColor: "#FFFFFF" },
  { id: "pakistan-cricket",         name: "Pakistan Cricket",           country: "Pakistan",     sport: "cricket", primaryColor: "#006600", secondaryColor: "#FFFFFF" },
  { id: "south-africa-cricket",     name: "South Africa Cricket",       country: "South Africa", sport: "cricket", primaryColor: "#007A4D", secondaryColor: "#FFB81C" },
  { id: "sri-lanka-cricket",        name: "Sri Lanka Cricket",          country: "Sri Lanka",    sport: "cricket", primaryColor: "#003087", secondaryColor: "#FFD700" },
  { id: "west-indies-cricket",      name: "West Indies Cricket",        country: "West Indies",  sport: "cricket", primaryColor: "#7B0041", secondaryColor: "#FFC72C" },
  { id: "zimbabwe-cricket",         name: "Zimbabwe Cricket",           country: "Zimbabwe",     sport: "cricket", primaryColor: "#008000", secondaryColor: "#FFD700" },
  // IPL 2024
  { id: "csk",                      name: "Chennai Super Kings",        country: "India",        sport: "cricket", primaryColor: "#F5C518", secondaryColor: "#003087" },
  { id: "dc-cricket",               name: "Delhi Capitals",             country: "India",        sport: "cricket", primaryColor: "#17479E", secondaryColor: "#EF1C25" },
  { id: "gt-cricket",               name: "Gujarat Titans",             country: "India",        sport: "cricket", primaryColor: "#1C1C1C", secondaryColor: "#A57C3A" },
  { id: "kkr",                      name: "Kolkata Knight Riders",      country: "India",        sport: "cricket", primaryColor: "#3B225F", secondaryColor: "#F5C518" },
  { id: "lsg-cricket",              name: "Lucknow Super Giants",       country: "India",        sport: "cricket", primaryColor: "#A72056", secondaryColor: "#FFDB01" },
  { id: "mi",                       name: "Mumbai Indians",             country: "India",        sport: "cricket", primaryColor: "#004BA0", secondaryColor: "#D1AB3E" },
  { id: "pbks-cricket",             name: "Punjab Kings",               country: "India",        sport: "cricket", primaryColor: "#ED1B24", secondaryColor: "#A7A9AC" },
  { id: "rr-cricket",               name: "Rajasthan Royals",           country: "India",        sport: "cricket", primaryColor: "#2D4DB5", secondaryColor: "#E91C8C" },
  { id: "rcb",                      name: "Royal Challengers Bangalore",country: "India",        sport: "cricket", primaryColor: "#EC1C24", secondaryColor: "#000000" },
  { id: "srh-cricket",              name: "Sunrisers Hyderabad",        country: "India",        sport: "cricket", primaryColor: "#F7A721", secondaryColor: "#FF4B00" },
  // BBL
  { id: "bbl-strikers",             name: "Adelaide Strikers",          country: "Australia",    sport: "cricket", primaryColor: "#0038A8", secondaryColor: "#FFD700" },
  { id: "bbl-heat",                 name: "Brisbane Heat",              country: "Australia",    sport: "cricket", primaryColor: "#E4002B", secondaryColor: "#27251F" },
  { id: "bbl-hurricanes",           name: "Hobart Hurricanes",          country: "Australia",    sport: "cricket", primaryColor: "#7C3592", secondaryColor: "#FFFFFF" },
  { id: "bbl-renegades",            name: "Melbourne Renegades",        country: "Australia",    sport: "cricket", primaryColor: "#CC2529", secondaryColor: "#000000" },
  { id: "bbl-stars",                name: "Melbourne Stars",            country: "Australia",    sport: "cricket", primaryColor: "#00A651", secondaryColor: "#FFD700" },
  { id: "bbl-scorchers",            name: "Perth Scorchers",            country: "Australia",    sport: "cricket", primaryColor: "#F15A29", secondaryColor: "#003087" },
  { id: "bbl-sixers",               name: "Sydney Sixers",              country: "Australia",    sport: "cricket", primaryColor: "#E11B8C", secondaryColor: "#FFFFFF" },
  { id: "bbl-thunder",              name: "Sydney Thunder",             country: "Australia",    sport: "cricket", primaryColor: "#6BBD45", secondaryColor: "#FFD700" },
  // PSL
  { id: "psl-united",               name: "Islamabad United",           country: "Pakistan",     sport: "cricket", primaryColor: "#E8192C", secondaryColor: "#1C1C1C" },
  { id: "psl-kings",                name: "Karachi Kings",              country: "Pakistan",     sport: "cricket", primaryColor: "#0066CC", secondaryColor: "#FFFFFF" },
  { id: "psl-qalandars",            name: "Lahore Qalandars",           country: "Pakistan",     sport: "cricket", primaryColor: "#006B3F", secondaryColor: "#FFD700" },
  { id: "psl-sultans",              name: "Multan Sultans",             country: "Pakistan",     sport: "cricket", primaryColor: "#7A4B89", secondaryColor: "#FFFFFF" },
  { id: "psl-zalmi",                name: "Peshawar Zalmi",             country: "Pakistan",     sport: "cricket", primaryColor: "#F5A623", secondaryColor: "#000000" },
  { id: "psl-gladiators",           name: "Quetta Gladiators",          country: "Pakistan",     sport: "cricket", primaryColor: "#00355E", secondaryColor: "#FFFFFF" },
  // CPL
  { id: "cpl-royals",               name: "Barbados Royals",            country: "Barbados",     sport: "cricket", primaryColor: "#003087", secondaryColor: "#FFD700" },
  { id: "cpl-warriors",             name: "Guyana Amazon Warriors",     country: "Guyana",       sport: "cricket", primaryColor: "#006233", secondaryColor: "#FFD700" },
  { id: "cpl-tkr",                  name: "Trinbago Knight Riders",     country: "Trinidad",     sport: "cricket", primaryColor: "#3B225F", secondaryColor: "#F5C518" },
  { id: "cpl-kings",                name: "Saint Lucia Kings",          country: "Saint Lucia",  sport: "cricket", primaryColor: "#003087", secondaryColor: "#FFD700" },
  { id: "cpl-patriots",             name: "St Kitts & Nevis Patriots",  country: "St Kitts",     sport: "cricket", primaryColor: "#008751", secondaryColor: "#FFD700" },
  { id: "cpl-tallawahs",            name: "Jamaica Tallawahs",          country: "Jamaica",      sport: "cricket", primaryColor: "#F5C518", secondaryColor: "#000000" },
  // SA20
  { id: "sa20-royals",              name: "Paarl Royals",               country: "South Africa", sport: "cricket", primaryColor: "#C8102E", secondaryColor: "#003087" },
  { id: "sa20-sunrisers",           name: "Sunrisers Eastern Cape",     country: "South Africa", sport: "cricket", primaryColor: "#F7A721", secondaryColor: "#FF4B00" },
  { id: "sa20-giants",              name: "Durban's Super Giants",      country: "South Africa", sport: "cricket", primaryColor: "#003087", secondaryColor: "#FFD700" },
  { id: "sa20-mi-cape",             name: "MI Cape Town",               country: "South Africa", sport: "cricket", primaryColor: "#004BA0", secondaryColor: "#D1AB3E" },
  { id: "sa20-joburg",              name: "Joburg Super Kings",         country: "South Africa", sport: "cricket", primaryColor: "#F5C518", secondaryColor: "#003087" },
  { id: "sa20-capitals",            name: "Pretoria Capitals",          country: "South Africa", sport: "cricket", primaryColor: "#003087", secondaryColor: "#FFD700" },
];

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  const dbPath = join(process.cwd(), "src/data/clubs-db.json");

  // Start fresh — rebuild from scratch using ESPN as source of truth
  console.log("\n📡 Fetching from ESPN free API (no key required)...\n");

  console.log("⚽ Soccer:");
  const soccerClubs = await fetchEspnSoccerClubs();

  console.log("\n🏀 NBA Basketball:");
  const nbaClubs = await fetchEspnNbaClubs();
  console.log(`  NBA → ${nbaClubs.length} teams`);

  const allClubs: Club[] = [...soccerClubs, ...nbaClubs, ...CRICKET_TEAMS];

  // Deduplicate by id
  const seen = new Set<string>();
  const deduped = allClubs.filter((c) => {
    if (seen.has(c.id)) return false;
    seen.add(c.id);
    return true;
  });

  writeFileSync(dbPath, JSON.stringify(deduped, null, 2));

  const bySport = deduped.reduce<Record<string, number>>((acc, c) => {
    acc[c.sport] = (acc[c.sport] ?? 0) + 1;
    return acc;
  }, {});

  const byCountry = deduped.reduce<Record<string, number>>((acc, c) => {
    acc[c.country] = (acc[c.country] ?? 0) + 1;
    return acc;
  }, {});

  const topCountries = Object.entries(byCountry)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([c, n]) => `${c}: ${n}`)
    .join(", ");

  console.log(`\n✅ Done — no API key used.`);
  console.log(`   Total clubs : ${deduped.length}`);
  console.log(`   By sport    : ${JSON.stringify(bySport)}`);
  console.log(`   Top countries: ${topCountries}`);
}

main().catch(console.error);
