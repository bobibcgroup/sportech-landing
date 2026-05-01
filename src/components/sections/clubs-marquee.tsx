"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";

const ROW_ONE = [
  "Al-Nassr", "Real Madrid", "FC Barcelona", "Manchester City", "PSG",
  "Bayern Munich", "Liverpool", "Al-Hilal", "Juventus", "Chelsea", "Arsenal", "Al-Ahli",
];

const ROW_TWO = [
  "Formula 1", "LA Lakers", "Golden State Warriors", "UFC", "Al-Ittihad",
  "Borussia Dortmund", "AC Milan", "Inter Milan", "Ajax", "Manchester United",
  "Miami Heat", "Red Bull Racing",
];

interface MarqueeRowProps {
  clubs: string[];
  reverse?: boolean;
}

function MarqueeRow({ clubs, reverse = false }: MarqueeRowProps) {
  const doubled = [...clubs, ...clubs];
  return (
    <div className="overflow-hidden py-2">
      <div
        className="flex gap-0 w-max"
        style={{
          animation: "marquee 30s linear infinite",
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {doubled.map((club, i) => (
          <span
            key={`${club}-${i}`}
            className="bg-surface-card border border-hairline text-muted text-sm font-medium rounded-lg px-4 py-2 shrink-0 mx-2 hover:text-on-dark hover:border-hairline-strong transition-colors duration-200 cursor-default"
          >
            {club}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ClubsMarquee() {
  return (
    <section className="bg-canvas py-24">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <span className="text-primary text-[12px] font-semibold tracking-widest uppercase">
            Built for Sport
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-on-dark font-bold mt-4 max-w-2xl" style={{ fontSize: 40, lineHeight: 1.15 }}>
            The platform any of these clubs could deploy tomorrow.
          </h2>
        </ScrollReveal>
      </div>

      <div className="mt-12 space-y-3">
        <MarqueeRow clubs={ROW_ONE} />
        <MarqueeRow clubs={ROW_TWO} reverse />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal delay={0.1}>
          <p className="text-muted text-sm text-center mt-12">
            One platform. Every sport. Built to deploy at global scale.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
