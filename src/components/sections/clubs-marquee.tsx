"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

const ROW1 = [
  "Al-Nassr", "Real Madrid", "FC Barcelona", "Manchester City", "PSG",
  "Bayern Munich", "Liverpool", "Al-Hilal", "Juventus",
];

const ROW2 = [
  "Chelsea", "Arsenal", "Al-Ahli", "Al-Ittihad", "Borussia Dortmund",
  "AC Milan", "Inter Milan", "Ajax", "Manchester United",
];

function Pill({ name }: { name: string }) {
  return (
    <span className="bg-surface-card border border-hairline text-muted text-sm font-medium rounded-lg px-4 py-2 shrink-0 mx-2 hover:text-on-dark hover:border-hairline-strong transition-colors duration-200 cursor-default whitespace-nowrap">
      {name}
    </span>
  );
}

export function ClubsMarquee() {
  return (
    <section className="bg-canvas py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <ScrollReveal>
          <span className="text-primary text-[12px] font-semibold tracking-widest uppercase">
            The clubs we're coming for next
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2
            className="text-on-dark font-bold mt-4 max-w-2xl"
            style={{ fontSize: "clamp(26px, 3.5vw, 40px)", lineHeight: 1.15 }}
          >
            World-class clubs are already doing this. Now it's your league's turn.
          </h2>
        </ScrollReveal>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <InfiniteSlider speed={35}>
            {ROW1.map((name) => <Pill key={name} name={name} />)}
          </InfiniteSlider>
        </div>
        <div className="relative">
          <InfiniteSlider speed={28} reverse>
            {ROW2.map((name) => <Pill key={name} name={name} />)}
          </InfiniteSlider>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        <ScrollReveal delay={0.15}>
          <p className="text-body-text text-sm text-center">
            From the Saudi Pro League to Europe's top five. One platform runs them all.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
