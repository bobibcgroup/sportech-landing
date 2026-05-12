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
