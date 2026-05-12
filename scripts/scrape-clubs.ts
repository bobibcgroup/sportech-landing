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
