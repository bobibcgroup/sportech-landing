"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ease, dur, REVEAL_MARGIN } from "@/lib/animation";
import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/translations";

const SPORTS = [
  { key: "football", src: "/cinematic/sport-football.jpg", fact: "4B+ global fans follow football worldwide", color: "rgba(20,80,30,0.45)" },
  { key: "basketball", src: "/cinematic/sport-basketball.jpg", fact: "2.5B fans … the second most watched sport on earth", color: "rgba(180,70,10,0.35)" },
  { key: "tennis", src: "/cinematic/sport-tennis.jpg", fact: "1B fans across 200+ countries", color: "rgba(160,180,10,0.3)" },
  { key: "cricket", src: "/cinematic/sport-cricket.jpg", fact: "2.5B fans, dominant in South Asia and the Gulf", color: "rgba(10,50,120,0.35)" },
  { key: "golf", src: "/cinematic/sport-golf.jpg", fact: "450M fans … the highest average income sport demographic", color: "rgba(20,100,50,0.3)" },
  { key: "swimming", src: "/cinematic/sport-swimming.jpg", fact: "2B Olympic viewers every four years", color: "rgba(0,120,160,0.35)" },
  { key: "athletics", src: "/cinematic/sport-athletics.jpg", fact: "Most-watched Olympic discipline across 200 nations", color: "rgba(160,30,20,0.3)" },
  { key: "mma", src: "/cinematic/sport-mma.jpg", fact: "Fastest growing sport in the Gulf … UFC Arabia launched 2024", color: "rgba(80,20,100,0.35)" },
];

function SportTile({ sport, index, name, isSelected, onSelect }: {
  sport: typeof SPORTS[0]; index: number; name: string; isSelected: boolean; onSelect: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: REVEAL_MARGIN }}
      transition={{ duration: dur.normal, delay: index * 0.06, ease: ease.out }}
      onClick={onSelect}
      className="relative rounded-xl overflow-hidden group cursor-pointer"
      style={{ aspectRatio: "4/3", background: "#0d0d0d" }}
    >
      <Image
        src={sport.src}
        alt={name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 50vw, 25vw"
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-400 group-hover:opacity-50"
        style={{ background: "rgba(10,10,10,0.55)" }}
      />

      {/* Sport name */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-on-dark font-bold text-sm tracking-tight">{name}</p>
        <motion.div
          animate={{ width: isSelected ? "48px" : "32px" }}
          transition={{ duration: 0.35, ease: ease.out }}
          className="h-[1.5px] mt-1.5"
          style={{ background: "#faff69" }}
        />
      </div>

      {/* Hover fact */}
      <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-full">
          <p className="text-[11px] leading-relaxed mt-6" style={{ color: "rgba(255,255,255,0.75)" }}>
            {sport.fact}
          </p>
        </div>
      </div>

      {/* Selected border */}
      <motion.div
        animate={{ opacity: isSelected ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 rounded-xl border-2 border-primary pointer-events-none"
      />
      {/* Hover border */}
      <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-primary transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
}

export function SportsScope() {
  const { lang } = useLanguage();
  const tx = t[lang].sports;
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  const selectedData = SPORTS.find(s => s.key === selectedSport);

  const sportNames: Record<string, string> = {
    football: lang === "en" ? "Football" : "كرة القدم",
    basketball: lang === "en" ? "Basketball" : "كرة السلة",
    tennis: lang === "en" ? "Tennis" : "التنس",
    cricket: lang === "en" ? "Cricket" : "الكريكيت",
    golf: lang === "en" ? "Golf" : "الجولف",
    swimming: lang === "en" ? "Swimming" : "السباحة",
    athletics: lang === "en" ? "Athletics" : "ألعاب القوى",
    mma: lang === "en" ? "Combat Sports" : "فنون القتال",
  };

  return (
    <section className="bg-canvas py-24 relative overflow-hidden" id="sports">
      {/* Sport theme tint — transitions on selection */}
      <AnimatePresence>
        {selectedData && (
          <motion.div
            key={selectedData.key}
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: ease.out }}
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% 60%, ${selectedData.color} 0%, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.span
          initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: 0.3, ease: ease.out }}
          className="text-[12px] font-semibold tracking-widest uppercase block mb-4"
          style={{ color: "rgba(250,255,105,0.6)" }}
        >
          {tx.badge}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.slow, delay: 0.1, ease: ease.out }}
          className="text-on-dark font-bold mb-14 max-w-2xl"
          style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.05, letterSpacing: "-2.5px" }}
        >
          {tx.heading}
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {SPORTS.map((sport, i) => (
            <SportTile
              key={sport.key}
              sport={sport}
              index={i}
              name={sportNames[sport.key] || sport.key}
              isSelected={selectedSport === sport.key}
              onSelect={() => setSelectedSport(prev => prev === sport.key ? null : sport.key)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
