"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const SPORTS = [
  { emoji: "⚽", label: "Football" },
  { emoji: "🏀", label: "Basketball" },
  { emoji: "🎾", label: "Tennis" },
  { emoji: "🏏", label: "Cricket" },
  { emoji: "🏎️", label: "Motorsport" },
  { emoji: "🏉", label: "Rugby" },
  { emoji: "🏐", label: "Volleyball" },
  { emoji: "🥊", label: "Combat Sports" },
];

export function SportsScope() {
  return (
    <section id="sports" className="bg-canvas section-padding">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <ScrollReveal>
          <p className="text-primary text-[12px] font-semibold tracking-widest uppercase mb-4">
            Built For Every Sport
          </p>
        </ScrollReveal>

        {/* Headline */}
        <ScrollReveal delay={0.1}>
          <h2
            className="text-on-dark font-bold leading-[1.15] tracking-[-1.5px] max-w-3xl mb-4"
            style={{ fontSize: "clamp(28px, 3.5vw, 40px)" }}
          >
            Football, basketball, tennis, cricket, motorsport — every sport has
            fans. Every fan is a revenue opportunity.
          </h2>
        </ScrollReveal>

        {/* Subheadline */}
        <ScrollReveal delay={0.2}>
          <p className="text-muted text-base leading-relaxed max-w-xl mb-12">
            Sportech&apos;s white-label SDK drops into any sport&apos;s broadcast or app
            stack. One integration, infinite fan moments.
          </p>
        </ScrollReveal>

        {/* Sports grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {SPORTS.map(({ emoji, label }, index) => (
            <ScrollReveal key={label} delay={index * 0.07}>
              <motion.div
                className="bg-surface-card rounded-lg p-6 text-center border border-hairline cursor-default select-none"
                whileHover={{
                  scale: 1.05,
                  borderColor: "#faff69",
                  transition: { duration: 0.2 },
                }}
              >
                <div className="text-4xl mb-3">{emoji}</div>
                <p className="text-on-dark text-[14px] font-semibold">{label}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Pull line */}
        <ScrollReveal delay={0.3}>
          <div className="mt-16 text-center">
            <p
              className="text-on-dark font-bold leading-[1.2] tracking-[-1px]"
              style={{ fontSize: "clamp(24px, 3vw, 32px)" }}
            >
              One platform. Every sport. Infinite fans.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
