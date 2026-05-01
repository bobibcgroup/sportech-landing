"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";

const REGIONS = [
  {
    title: "Saudi Arabia & UAE",
    body: "Home turf. Saudi and UAE's biggest clubs first.",
    delay: 0,
  },
  {
    title: "China & Asia",
    body: "The biggest untapped market. Hundreds of millions of fans across Asia follow Gulf football, and almost none of them have a way to engage.",
    delay: 0.15,
  },
  {
    title: "Europe, Americas & Beyond",
    body: "The platform runs in any language. A fan in London, Jakarta, or Buenos Aires can subscribe to your club app and feel like they're in the stands.",
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
            Al-Nassr has fans in Tokyo and São Paulo. Your digital revenue should too.
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
            Your fans are everywhere. Your revenue should be too.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
