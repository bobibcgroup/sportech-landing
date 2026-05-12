#!/usr/bin/env npx tsx
/**
 * Run: FOOTBALL_DATA_API_KEY=your_key npx tsx scripts/scrape-clubs.ts
 * Expands src/data/clubs-db.json with clubs from:
 *   - football-data.org (soccer — top leagues worldwide)
 *   - Static NBA dataset (all 30 teams)
 *   - Static cricket dataset (ICC Full Members + IPL + BBL + PSL + CPL)
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

// ─── Soccer color overrides from official brand guides ─────────────────────
const SOCCER_COLOR_MAP: Record<string, { primaryColor: string; secondaryColor: string }> = {
  "Real Madrid CF":           { primaryColor: "#FFFFFF", secondaryColor: "#00529F" },
  "Real Madrid":              { primaryColor: "#FFFFFF", secondaryColor: "#00529F" },
  "FC Barcelona":             { primaryColor: "#A50044", secondaryColor: "#004D98" },
  "Manchester City FC":       { primaryColor: "#6CABDD", secondaryColor: "#1C2C5B" },
  "Manchester City":          { primaryColor: "#6CABDD", secondaryColor: "#1C2C5B" },
  "Manchester United FC":     { primaryColor: "#DA291C", secondaryColor: "#FBE122" },
  "Manchester United":        { primaryColor: "#DA291C", secondaryColor: "#FBE122" },
  "Liverpool FC":             { primaryColor: "#C8102E", secondaryColor: "#F6EB61" },
  "Liverpool":                { primaryColor: "#C8102E", secondaryColor: "#F6EB61" },
  "Chelsea FC":               { primaryColor: "#034694", secondaryColor: "#FFFFFF" },
  "Chelsea":                  { primaryColor: "#034694", secondaryColor: "#FFFFFF" },
  "Arsenal FC":               { primaryColor: "#EF0107", secondaryColor: "#063672" },
  "Arsenal":                  { primaryColor: "#EF0107", secondaryColor: "#063672" },
  "Tottenham Hotspur FC":     { primaryColor: "#132257", secondaryColor: "#FFFFFF" },
  "Tottenham Hotspur":        { primaryColor: "#132257", secondaryColor: "#FFFFFF" },
  "Newcastle United FC":      { primaryColor: "#241F20", secondaryColor: "#FFFFFF" },
  "Aston Villa FC":           { primaryColor: "#95BFE5", secondaryColor: "#670E36" },
  "West Ham United FC":       { primaryColor: "#7A263A", secondaryColor: "#1BB1E7" },
  "Brighton & Hove Albion FC":{ primaryColor: "#0057B8", secondaryColor: "#FFFFFF" },
  "Brentford FC":             { primaryColor: "#E30613", secondaryColor: "#FFFFFF" },
  "Fulham FC":                { primaryColor: "#CC0000", secondaryColor: "#000000" },
  "Crystal Palace FC":        { primaryColor: "#1B458F", secondaryColor: "#C4122E" },
  "Everton FC":               { primaryColor: "#003399", secondaryColor: "#FFFFFF" },
  "Wolverhampton Wanderers FC":{ primaryColor: "#FDB913", secondaryColor: "#231F20" },
  "Nottingham Forest FC":     { primaryColor: "#DD0000", secondaryColor: "#FFFFFF" },
  "Leicester City FC":        { primaryColor: "#003090", secondaryColor: "#FDBE11" },
  "Southampton FC":           { primaryColor: "#D71920", secondaryColor: "#130C0E" },
  "Ipswich Town FC":          { primaryColor: "#0044A9", secondaryColor: "#FFFFFF" },
  "FC Bayern München":        { primaryColor: "#DC052D", secondaryColor: "#0066B2" },
  "Bayern Munich":            { primaryColor: "#DC052D", secondaryColor: "#0066B2" },
  "Borussia Dortmund":        { primaryColor: "#FDE100", secondaryColor: "#000000" },
  "Bayer 04 Leverkusen":      { primaryColor: "#E32221", secondaryColor: "#000000" },
  "RB Leipzig":               { primaryColor: "#DD0741", secondaryColor: "#001E62" },
  "Eintracht Frankfurt":      { primaryColor: "#E1000F", secondaryColor: "#000000" },
  "VfB Stuttgart":            { primaryColor: "#E32219", secondaryColor: "#FFFFFF" },
  "SC Freiburg":              { primaryColor: "#E3000F", secondaryColor: "#000000" },
  "1. FC Union Berlin":       { primaryColor: "#EB1923", secondaryColor: "#0059A3" },
  "Borussia Mönchengladbach": { primaryColor: "#000000", secondaryColor: "#FFFFFF" },
  "TSG 1899 Hoffenheim":      { primaryColor: "#1961AC", secondaryColor: "#FFFFFF" },
  "SV Werder Bremen":         { primaryColor: "#1D9053", secondaryColor: "#FFFFFF" },
  "VfL Wolfsburg":            { primaryColor: "#65B32E", secondaryColor: "#003C64" },
  "FC Augsburg":              { primaryColor: "#BA3733", secondaryColor: "#007A5E" },
  "1. FSV Mainz 05":          { primaryColor: "#C3001F", secondaryColor: "#FFFFFF" },
  "VfL Bochum 1848":          { primaryColor: "#004F9E", secondaryColor: "#FFFFFF" },
  "1. FC Heidenheim 1846":    { primaryColor: "#E2001A", secondaryColor: "#1A1A1A" },
  "FC St. Pauli 1910":        { primaryColor: "#6B2B2B", secondaryColor: "#FFFFFF" },
  "Holstein Kiel":            { primaryColor: "#003F8E", secondaryColor: "#DE0119" },
  "Paris Saint-Germain FC":   { primaryColor: "#004170", secondaryColor: "#DA291C" },
  "Paris Saint-Germain":      { primaryColor: "#004170", secondaryColor: "#DA291C" },
  "Olympique de Marseille":   { primaryColor: "#009AC7", secondaryColor: "#FFFFFF" },
  "Olympique Lyonnais":       { primaryColor: "#003B85", secondaryColor: "#BE1622" },
  "AS Monaco FC":             { primaryColor: "#E8192C", secondaryColor: "#FFFFFF" },
  "LOSC Lille":               { primaryColor: "#E52629", secondaryColor: "#FFFFFF" },
  "Stade Rennais FC 1901":    { primaryColor: "#000000", secondaryColor: "#E63328" },
  "RC Lens":                  { primaryColor: "#E3A01D", secondaryColor: "#C5222E" },
  "OGC Nice":                 { primaryColor: "#000000", secondaryColor: "#CF142B" },
  "Stade de Reims":           { primaryColor: "#C8102E", secondaryColor: "#FFFFFF" },
  "Montpellier HSC":          { primaryColor: "#F68B1F", secondaryColor: "#003087" },
  "FC Nantes":                { primaryColor: "#F5C518", secondaryColor: "#07803A" },
  "Juventus FC":              { primaryColor: "#000000", secondaryColor: "#FFFFFF" },
  "Juventus":                 { primaryColor: "#000000", secondaryColor: "#FFFFFF" },
  "AC Milan":                 { primaryColor: "#FB090B", secondaryColor: "#000000" },
  "FC Internazionale Milano": { primaryColor: "#010E80", secondaryColor: "#000000" },
  "Inter Milan":              { primaryColor: "#010E80", secondaryColor: "#000000" },
  "SSC Napoli":               { primaryColor: "#12A0C3", secondaryColor: "#FFFFFF" },
  "AS Roma":                  { primaryColor: "#8E1F2F", secondaryColor: "#F0BC42" },
  "SS Lazio":                 { primaryColor: "#87D8F7", secondaryColor: "#FFFFFF" },
  "ACF Fiorentina":           { primaryColor: "#4E2987", secondaryColor: "#FFFFFF" },
  "Atalanta BC":              { primaryColor: "#1E73BE", secondaryColor: "#000000" },
  "Torino FC":                { primaryColor: "#8B1A1A", secondaryColor: "#FFFFFF" },
  "Bologna FC 1909":          { primaryColor: "#1A1A1A", secondaryColor: "#E30A17" },
  "Udinese Calcio":           { primaryColor: "#000000", secondaryColor: "#FFFFFF" },
  "Genoa CFC":                { primaryColor: "#C70D3A", secondaryColor: "#003087" },
  "Cagliari Calcio":          { primaryColor: "#003087", secondaryColor: "#C8102E" },
  "Hellas Verona FC":         { primaryColor: "#003E7E", secondaryColor: "#F5C518" },
  "Empoli FC":                { primaryColor: "#0055A4", secondaryColor: "#FFFFFF" },
  "Frosinone Calcio":         { primaryColor: "#F5C518", secondaryColor: "#003087" },
  "Lecce":                    { primaryColor: "#F5C518", secondaryColor: "#C8102E" },
  "Venezia FC":               { primaryColor: "#1A1A1A", secondaryColor: "#F5A623" },
  "Club Atlético de Madrid":  { primaryColor: "#CE3524", secondaryColor: "#FFFFFF" },
  "Atlético de Madrid":       { primaryColor: "#CE3524", secondaryColor: "#FFFFFF" },
  "Sevilla FC":               { primaryColor: "#D9000D", secondaryColor: "#FFFFFF" },
  "Real Betis Balompié":      { primaryColor: "#00954C", secondaryColor: "#FFFFFF" },
  "Athletic Club":            { primaryColor: "#EE2523", secondaryColor: "#FFFFFF" },
  "Real Sociedad de Fútbol":  { primaryColor: "#003DA5", secondaryColor: "#FFFFFF" },
  "Villarreal CF":            { primaryColor: "#FFE135", secondaryColor: "#002D66" },
  "RC Celta de Vigo":         { primaryColor: "#80C2E1", secondaryColor: "#FFFFFF" },
  "Rayo Vallecano de Madrid": { primaryColor: "#C8102E", secondaryColor: "#FFFFFF" },
  "Getafe CF":                { primaryColor: "#003087", secondaryColor: "#FFFFFF" },
  "RCD Espanyol de Barcelona":{ primaryColor: "#003DA5", secondaryColor: "#FFFFFF" },
  "Girona FC":                { primaryColor: "#C8102E", secondaryColor: "#FFFFFF" },
  "UD Las Palmas":            { primaryColor: "#F5C518", secondaryColor: "#003087" },
  "Deportivo Alavés":         { primaryColor: "#003087", secondaryColor: "#FFFFFF" },
  "RCD Mallorca":             { primaryColor: "#C8102E", secondaryColor: "#000000" },
  "Valencia CF":              { primaryColor: "#F5A623", secondaryColor: "#000000" },
  "SL Benfica":               { primaryColor: "#E01F27", secondaryColor: "#FFFFFF" },
  "FC Porto":                 { primaryColor: "#003087", secondaryColor: "#FFFFFF" },
  "Sporting CP":              { primaryColor: "#008B2D", secondaryColor: "#F5C518" },
  "SC Braga":                 { primaryColor: "#C8102E", secondaryColor: "#FFFFFF" },
  "AFC Ajax":                 { primaryColor: "#D2122E", secondaryColor: "#FFFFFF" },
  "Ajax":                     { primaryColor: "#D2122E", secondaryColor: "#FFFFFF" },
  "PSV Eindhoven":            { primaryColor: "#C8102E", secondaryColor: "#FFFFFF" },
  "Feyenoord Rotterdam":      { primaryColor: "#C8102E", secondaryColor: "#FFFFFF" },
  "AZ Alkmaar":               { primaryColor: "#C8102E", secondaryColor: "#FFFFFF" },
  "Celtic FC":                { primaryColor: "#16A33A", secondaryColor: "#FFFFFF" },
  "Rangers FC":               { primaryColor: "#003087", secondaryColor: "#FFFFFF" },
  "Al Nassr FC":              { primaryColor: "#F5C518", secondaryColor: "#003087" },
  "Al-Nassr FC":              { primaryColor: "#F5C518", secondaryColor: "#003087" },
  "Al Hilal SFC":             { primaryColor: "#1D4FA1", secondaryColor: "#FFFFFF" },
  "Al-Hilal":                 { primaryColor: "#1D4FA1", secondaryColor: "#FFFFFF" },
  "Al Ahli Saudi FC":         { primaryColor: "#006633", secondaryColor: "#FFFFFF" },
  "Ittihad FC":               { primaryColor: "#F5C518", secondaryColor: "#000000" },
  "Flamengo":                 { primaryColor: "#E82C2A", secondaryColor: "#000000" },
  "Palmeiras":                { primaryColor: "#006437", secondaryColor: "#FFFFFF" },
  "Fluminense FC":            { primaryColor: "#8B0000", secondaryColor: "#6DBE45" },
  "Athletico Paranaense":     { primaryColor: "#CC0000", secondaryColor: "#000000" },
  "Atlético Mineiro":         { primaryColor: "#000000", secondaryColor: "#FFFFFF" },
  "Grêmio FBPA":              { primaryColor: "#1B67B0", secondaryColor: "#000000" },
  "CR Vasco da Gama":         { primaryColor: "#000000", secondaryColor: "#FFFFFF" },
  "São Paulo FC":             { primaryColor: "#E01F27", secondaryColor: "#000000" },
  "Sport Club Corinthians Paulista": { primaryColor: "#000000", secondaryColor: "#FFFFFF" },
  "Santos FC":                { primaryColor: "#000000", secondaryColor: "#FFFFFF" },
  "Botafogo de Futebol e Regatas": { primaryColor: "#000000", secondaryColor: "#FFFFFF" },
  "Internacional":            { primaryColor: "#E00E1E", secondaryColor: "#FFFFFF" },
  "Bahia":                    { primaryColor: "#003087", secondaryColor: "#C8102E" },
  "Fortaleza EC":             { primaryColor: "#003087", secondaryColor: "#C8102E" },
  "Cruzeiro EC":              { primaryColor: "#003087", secondaryColor: "#FFFFFF" },
  "EC Vitória":               { primaryColor: "#C8102E", secondaryColor: "#000000" },
  "RB Bragantino":            { primaryColor: "#DD0741", secondaryColor: "#FFFFFF" },
  "Juventude":                { primaryColor: "#006233", secondaryColor: "#FFFFFF" },
  "Cuiabá EC":                { primaryColor: "#F5A623", secondaryColor: "#003087" },
};

// ─── All 30 NBA teams ───────────────────────────────────────────────────────
const NBA_TEAMS: Club[] = [
  { id: "atlanta-hawks",         name: "Atlanta Hawks",          country: "USA", sport: "basketball", primaryColor: "#E03A3E", secondaryColor: "#26282A" },
  { id: "boston-celtics",        name: "Boston Celtics",         country: "USA", sport: "basketball", primaryColor: "#007A33", secondaryColor: "#BA9653" },
  { id: "brooklyn-nets",         name: "Brooklyn Nets",          country: "USA", sport: "basketball", primaryColor: "#000000", secondaryColor: "#FFFFFF" },
  { id: "charlotte-hornets",     name: "Charlotte Hornets",      country: "USA", sport: "basketball", primaryColor: "#1D1160", secondaryColor: "#00788C" },
  { id: "chicago-bulls",         name: "Chicago Bulls",          country: "USA", sport: "basketball", primaryColor: "#CE1141", secondaryColor: "#000000" },
  { id: "cleveland-cavaliers",   name: "Cleveland Cavaliers",    country: "USA", sport: "basketball", primaryColor: "#860038", secondaryColor: "#041E42" },
  { id: "dallas-mavericks",      name: "Dallas Mavericks",       country: "USA", sport: "basketball", primaryColor: "#00538C", secondaryColor: "#002B5E" },
  { id: "denver-nuggets",        name: "Denver Nuggets",         country: "USA", sport: "basketball", primaryColor: "#0E2240", secondaryColor: "#FEC524" },
  { id: "detroit-pistons",       name: "Detroit Pistons",        country: "USA", sport: "basketball", primaryColor: "#C8102E", secondaryColor: "#1D42BA" },
  { id: "golden-state-warriors", name: "Golden State Warriors",  country: "USA", sport: "basketball", primaryColor: "#1D428A", secondaryColor: "#FFC72C" },
  { id: "houston-rockets",       name: "Houston Rockets",        country: "USA", sport: "basketball", primaryColor: "#CE1141", secondaryColor: "#000000" },
  { id: "indiana-pacers",        name: "Indiana Pacers",         country: "USA", sport: "basketball", primaryColor: "#002D62", secondaryColor: "#FDBB30" },
  { id: "la-clippers",           name: "LA Clippers",            country: "USA", sport: "basketball", primaryColor: "#C8102E", secondaryColor: "#1D428A" },
  { id: "los-angeles-lakers",    name: "Los Angeles Lakers",     country: "USA", sport: "basketball", primaryColor: "#552583", secondaryColor: "#FDB927" },
  { id: "memphis-grizzlies",     name: "Memphis Grizzlies",      country: "USA", sport: "basketball", primaryColor: "#5D76A9", secondaryColor: "#12173F" },
  { id: "miami-heat",            name: "Miami Heat",             country: "USA", sport: "basketball", primaryColor: "#98002E", secondaryColor: "#F9A01B" },
  { id: "milwaukee-bucks",       name: "Milwaukee Bucks",        country: "USA", sport: "basketball", primaryColor: "#00471B", secondaryColor: "#EEE1C6" },
  { id: "minnesota-timberwolves",name: "Minnesota Timberwolves", country: "USA", sport: "basketball", primaryColor: "#0C2340", secondaryColor: "#236192" },
  { id: "new-orleans-pelicans",  name: "New Orleans Pelicans",   country: "USA", sport: "basketball", primaryColor: "#0C2340", secondaryColor: "#85714D" },
  { id: "new-york-knicks",       name: "New York Knicks",        country: "USA", sport: "basketball", primaryColor: "#006BB6", secondaryColor: "#F58426" },
  { id: "oklahoma-city-thunder", name: "Oklahoma City Thunder",  country: "USA", sport: "basketball", primaryColor: "#007AC1", secondaryColor: "#EF3B24" },
  { id: "orlando-magic",         name: "Orlando Magic",          country: "USA", sport: "basketball", primaryColor: "#0077C0", secondaryColor: "#C4CED4" },
  { id: "philadelphia-76ers",    name: "Philadelphia 76ers",     country: "USA", sport: "basketball", primaryColor: "#006BB6", secondaryColor: "#ED174C" },
  { id: "phoenix-suns",          name: "Phoenix Suns",           country: "USA", sport: "basketball", primaryColor: "#1D1160", secondaryColor: "#E56020" },
  { id: "portland-trail-blazers",name: "Portland Trail Blazers", country: "USA", sport: "basketball", primaryColor: "#E03A3E", secondaryColor: "#000000" },
  { id: "sacramento-kings",      name: "Sacramento Kings",       country: "USA", sport: "basketball", primaryColor: "#5A2D81", secondaryColor: "#63727A" },
  { id: "san-antonio-spurs",     name: "San Antonio Spurs",      country: "USA", sport: "basketball", primaryColor: "#C4CED4", secondaryColor: "#000000" },
  { id: "toronto-raptors",       name: "Toronto Raptors",        country: "Canada", sport: "basketball", primaryColor: "#CE1141", secondaryColor: "#000000" },
  { id: "utah-jazz",             name: "Utah Jazz",              country: "USA", sport: "basketball", primaryColor: "#002B5C", secondaryColor: "#00471B" },
  { id: "washington-wizards",    name: "Washington Wizards",     country: "USA", sport: "basketball", primaryColor: "#002B5C", secondaryColor: "#E31837" },
];

// ─── Cricket: ICC Full Members + IPL + BBL + PSL + CPL ─────────────────────
const CRICKET_TEAMS: Club[] = [
  // ICC Full Members (national teams)
  { id: "afghanistan-cricket",    name: "Afghanistan Cricket",    country: "Afghanistan",   sport: "cricket", primaryColor: "#1D3461", secondaryColor: "#CE1126" },
  { id: "australia-cricket",      name: "Australia Cricket",      country: "Australia",     sport: "cricket", primaryColor: "#FFD700", secondaryColor: "#006400" },
  { id: "bangladesh-cricket",     name: "Bangladesh Cricket",     country: "Bangladesh",    sport: "cricket", primaryColor: "#006A4E", secondaryColor: "#F42A41" },
  { id: "england-cricket",        name: "England Cricket",        country: "England",       sport: "cricket", primaryColor: "#1D3461", secondaryColor: "#FFFFFF" },
  { id: "india-cricket",          name: "India Cricket",          country: "India",         sport: "cricket", primaryColor: "#003087", secondaryColor: "#FF671F" },
  { id: "ireland-cricket",        name: "Ireland Cricket",        country: "Ireland",       sport: "cricket", primaryColor: "#169B62", secondaryColor: "#FFFFFF" },
  { id: "new-zealand-cricket",    name: "New Zealand Cricket",    country: "New Zealand",   sport: "cricket", primaryColor: "#000000", secondaryColor: "#FFFFFF" },
  { id: "pakistan-cricket",       name: "Pakistan Cricket",       country: "Pakistan",      sport: "cricket", primaryColor: "#006600", secondaryColor: "#FFFFFF" },
  { id: "south-africa-cricket",   name: "South Africa Cricket",   country: "South Africa",  sport: "cricket", primaryColor: "#007A4D", secondaryColor: "#FFB81C" },
  { id: "sri-lanka-cricket",      name: "Sri Lanka Cricket",      country: "Sri Lanka",     sport: "cricket", primaryColor: "#003087", secondaryColor: "#FFD700" },
  { id: "west-indies-cricket",    name: "West Indies Cricket",    country: "West Indies",   sport: "cricket", primaryColor: "#7B0041", secondaryColor: "#FFC72C" },
  { id: "zimbabwe-cricket",       name: "Zimbabwe Cricket",       country: "Zimbabwe",      sport: "cricket", primaryColor: "#008000", secondaryColor: "#FFD700" },
  // IPL 2024 (10 teams)
  { id: "csk",                    name: "Chennai Super Kings",    country: "India",         sport: "cricket", primaryColor: "#F5C518", secondaryColor: "#003087" },
  { id: "dc-cricket",             name: "Delhi Capitals",         country: "India",         sport: "cricket", primaryColor: "#17479E", secondaryColor: "#EF1C25" },
  { id: "gt-cricket",             name: "Gujarat Titans",         country: "India",         sport: "cricket", primaryColor: "#1C1C1C", secondaryColor: "#A57C3A" },
  { id: "kkr",                    name: "Kolkata Knight Riders",  country: "India",         sport: "cricket", primaryColor: "#3B225F", secondaryColor: "#F5C518" },
  { id: "lsg-cricket",            name: "Lucknow Super Giants",   country: "India",         sport: "cricket", primaryColor: "#A72056", secondaryColor: "#FFDB01" },
  { id: "mi",                     name: "Mumbai Indians",         country: "India",         sport: "cricket", primaryColor: "#004BA0", secondaryColor: "#D1AB3E" },
  { id: "pbks-cricket",           name: "Punjab Kings",           country: "India",         sport: "cricket", primaryColor: "#ED1B24", secondaryColor: "#A7A9AC" },
  { id: "rr-cricket",             name: "Rajasthan Royals",       country: "India",         sport: "cricket", primaryColor: "#2D4DB5", secondaryColor: "#E91C8C" },
  { id: "rcb",                    name: "Royal Challengers Bangalore", country: "India",    sport: "cricket", primaryColor: "#EC1C24", secondaryColor: "#000000" },
  { id: "srh-cricket",            name: "Sunrisers Hyderabad",    country: "India",         sport: "cricket", primaryColor: "#F7A721", secondaryColor: "#FF4B00" },
  // BBL (Big Bash League — Australia)
  { id: "bbl-strikers",           name: "Adelaide Strikers",      country: "Australia",     sport: "cricket", primaryColor: "#0038A8", secondaryColor: "#FFD700" },
  { id: "bbl-heat",               name: "Brisbane Heat",          country: "Australia",     sport: "cricket", primaryColor: "#E4002B", secondaryColor: "#27251F" },
  { id: "bbl-hurricanes",         name: "Hobart Hurricanes",      country: "Australia",     sport: "cricket", primaryColor: "#7C3592", secondaryColor: "#FFFFFF" },
  { id: "bbl-renegades",          name: "Melbourne Renegades",    country: "Australia",     sport: "cricket", primaryColor: "#CC2529", secondaryColor: "#000000" },
  { id: "bbl-stars",              name: "Melbourne Stars",        country: "Australia",     sport: "cricket", primaryColor: "#00A651", secondaryColor: "#FFD700" },
  { id: "bbl-scorchers",          name: "Perth Scorchers",        country: "Australia",     sport: "cricket", primaryColor: "#F15A29", secondaryColor: "#003087" },
  { id: "bbl-sixers",             name: "Sydney Sixers",          country: "Australia",     sport: "cricket", primaryColor: "#E11B8C", secondaryColor: "#FFFFFF" },
  { id: "bbl-thunder",            name: "Sydney Thunder",         country: "Australia",     sport: "cricket", primaryColor: "#6BBD45", secondaryColor: "#FFD700" },
  // PSL (Pakistan Super League)
  { id: "psl-united",             name: "Islamabad United",       country: "Pakistan",      sport: "cricket", primaryColor: "#E8192C", secondaryColor: "#1C1C1C" },
  { id: "psl-kings",              name: "Karachi Kings",          country: "Pakistan",      sport: "cricket", primaryColor: "#0066CC", secondaryColor: "#FFFFFF" },
  { id: "psl-qalandars",          name: "Lahore Qalandars",       country: "Pakistan",      sport: "cricket", primaryColor: "#006B3F", secondaryColor: "#FFD700" },
  { id: "psl-sultans",            name: "Multan Sultans",         country: "Pakistan",      sport: "cricket", primaryColor: "#7A4B89", secondaryColor: "#FFFFFF" },
  { id: "psl-zalmi",              name: "Peshawar Zalmi",         country: "Pakistan",      sport: "cricket", primaryColor: "#F5A623", secondaryColor: "#000000" },
  { id: "psl-gladiators",         name: "Quetta Gladiators",      country: "Pakistan",      sport: "cricket", primaryColor: "#00355E", secondaryColor: "#FFFFFF" },
  // CPL (Caribbean Premier League)
  { id: "cpl-tridents",           name: "Barbados Royals",        country: "Barbados",      sport: "cricket", primaryColor: "#003087", secondaryColor: "#FFD700" },
  { id: "cpl-warriors",           name: "Guyana Amazon Warriors", country: "Guyana",        sport: "cricket", primaryColor: "#006233", secondaryColor: "#FFD700" },
  { id: "cpl-knight-riders",      name: "Trinbago Knight Riders", country: "Trinidad",      sport: "cricket", primaryColor: "#3B225F", secondaryColor: "#F5C518" },
  { id: "cpl-tallahassee",        name: "Saint Lucia Kings",      country: "Saint Lucia",   sport: "cricket", primaryColor: "#003087", secondaryColor: "#FFD700" },
  { id: "cpl-patriots",           name: "St Kitts & Nevis Patriots", country: "St Kitts",  sport: "cricket", primaryColor: "#008751", secondaryColor: "#FFD700" },
  { id: "cpl-tridents-jam",       name: "Jamaica Tallawahs",      country: "Jamaica",       sport: "cricket", primaryColor: "#F5C518", secondaryColor: "#000000" },
  // SA20 (South Africa)
  { id: "sa20-capitals",          name: "Paarl Royals",           country: "South Africa",  sport: "cricket", primaryColor: "#C8102E", secondaryColor: "#003087" },
  { id: "sa20-sunrisers",         name: "Sunrisers Eastern Cape", country: "South Africa",  sport: "cricket", primaryColor: "#F7A721", secondaryColor: "#FF4B00" },
  { id: "sa20-dolphins",          name: "Durban's Super Giants",  country: "South Africa",  sport: "cricket", primaryColor: "#003087", secondaryColor: "#FFD700" },
  { id: "sa20-braves",            name: "MI Cape Town",           country: "South Africa",  sport: "cricket", primaryColor: "#004BA0", secondaryColor: "#D1AB3E" },
  { id: "sa20-warriors",          name: "Joburg Super Kings",     country: "South Africa",  sport: "cricket", primaryColor: "#F5C518", secondaryColor: "#003087" },
  { id: "sa20-bulls",             name: "Pretoria Capitals",      country: "South Africa",  sport: "cricket", primaryColor: "#003087", secondaryColor: "#FFD700" },
];

// ─── Soccer scraper ──────────────────────────────────────────────────────────
async function fetchSoccerClubs(): Promise<Club[]> {
  const competitionIds = [
    "PL",   // English Premier League
    "ELC",  // English Championship
    "PD",   // La Liga
    "BL1",  // Bundesliga
    "SA",   // Serie A
    "FL1",  // Ligue 1
    "PPL",  // Primeira Liga (Portugal)
    "BSA",  // Brasileirão Série A
    "EL",   // UEFA Europa League
    "CL",   // UEFA Champions League
    "CLI",  // Copa Libertadores
  ];

  const clubs: Club[] = [];
  const seen = new Set<string>();

  for (const comp of competitionIds) {
    try {
      const res = await fetch(`https://api.football-data.org/v4/competitions/${comp}/teams`, {
        headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY ?? "" },
      });
      if (!res.ok) {
        console.log(`  Skipped ${comp}: HTTP ${res.status}`);
        continue;
      }
      const data = await res.json() as { teams: Array<{ name: string; area: { name: string } }> };
      let added = 0;
      for (const team of data.teams ?? []) {
        if (seen.has(team.name)) continue;
        seen.add(team.name);
        const colors = SOCCER_COLOR_MAP[team.name] ?? { primaryColor: "#888888", secondaryColor: "#FFFFFF" };
        clubs.push({
          id: slugify(team.name),
          name: team.name,
          country: team.area?.name ?? "Unknown",
          sport: "soccer",
          ...colors,
        });
        added++;
      }
      console.log(`  ${comp}: ${added} clubs`);
    } catch (err) {
      console.log(`  Skipped ${comp}: ${err}`);
    }
  }
  return clubs;
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  const dbPath = join(process.cwd(), "src/data/clubs-db.json");
  const existing: Club[] = JSON.parse(readFileSync(dbPath, "utf-8"));
  const existingIds = new Set(existing.map((c) => c.id));

  // Wipe and rebuild so static lists are always current
  const staticClubs = [
    ...NBA_TEAMS.filter((c) => !existingIds.has(c.id)),
    ...CRICKET_TEAMS.filter((c) => !existingIds.has(c.id)),
  ];

  console.log("\nFetching soccer clubs from football-data.org...");
  const soccerClubs = await fetchSoccerClubs();
  const newSoccer = soccerClubs.filter((c) => !existingIds.has(c.id));

  const merged = [...existing, ...staticClubs, ...newSoccer];
  writeFileSync(dbPath, JSON.stringify(merged, null, 2));

  const bySport = merged.reduce<Record<string, number>>((acc, c) => {
    acc[c.sport] = (acc[c.sport] ?? 0) + 1;
    return acc;
  }, {});

  console.log(`\n✅ Done.`);
  console.log(`   Added: ${staticClubs.length} static (NBA + cricket) + ${newSoccer.length} soccer`);
  console.log(`   Total: ${merged.length} clubs`);
  console.log(`   By sport: ${JSON.stringify(bySport)}`);
}

main().catch(console.error);
