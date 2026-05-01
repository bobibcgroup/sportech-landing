"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";

const REGIONS = [
  {
    title: "Saudi Arabia & UAE",
    body: "Home market. Sportech launches with the region's premier clubs, reaching fans across both countries.",
    delay: 0,
  },
  {
    title: "China & Asia",
    body: "The largest international opportunity — driven by hundreds of millions of fans following Gulf clubs and their world-class rosters across Asian markets.",
    delay: 0.15,
  },
  {
    title: "Europe, Americas & Beyond",
    body: "Multi-language platform. Any fan, anywhere, can subscribe to their club's app and participate fully in the digital experience.",
    delay: 0.3,
  },
];

export function GlobalReach() {
  return (
    <section className="bg-surface-card py-24">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <span className="text-primary text-[12px] font-semibold tracking-widest uppercase">
            Global Reach
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-on-dark font-bold mt-4 max-w-2xl" style={{ fontSize: "clamp(26px, 3.5vw, 40px)", lineHeight: 1.15 }}>
            Built for the Gulf. Designed for the world.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-body-text mt-4 max-w-2xl leading-relaxed">
            The Saudi Pro League and UAE Pro League have some of the most globally followed clubs
            on the planet. Sportech turns that global fanbase into a global revenue base.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {REGIONS.map(({ title, body, delay }) => (
            <ScrollReveal key={title} delay={delay}>
              <div className="bg-surface-elevated border border-hairline rounded-xl p-8 h-full">
                <h3 className="text-on-dark font-semibold text-lg mb-3">{title}</h3>
                <p className="text-body-text text-sm leading-relaxed">{body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <p className="text-on-dark font-bold text-center mt-16" style={{ fontSize: 24 }}>
            One platform. Every language. Global fans. Local club.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
