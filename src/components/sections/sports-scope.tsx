"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const SPORTS = [
  { emoji: "⚽", name: "Football", sub: "Soccer", span: "md:col-span-2 md:row-span-2" },
  { emoji: "🏀", name: "Basketball", sub: "NBA & Leagues", span: "md:col-span-1" },
  { emoji: "🏎️", name: "Motorsport", sub: "F1 & Racing", span: "md:col-span-1" },
  { emoji: "🎾", name: "Tennis", sub: "ATP / WTA", span: "md:col-span-1" },
  { emoji: "🏏", name: "Cricket", sub: "IPL & T20", span: "md:col-span-1" },
  { emoji: "🏉", name: "Rugby", sub: "Union & League", span: "md:col-span-1" },
  { emoji: "🏐", name: "Volleyball", sub: "Beach & Indoor", span: "md:col-span-1" },
  { emoji: "🥊", name: "Combat Sports", sub: "UFC & MMA", span: "md:col-span-1" },
];

interface SportCardProps {
  emoji: string;
  name: string;
  sub: string;
  span: string;
  index: number;
}

function SportCard({ emoji, name, sub, span, index }: SportCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);
  const background = useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(250,255,105,0.06), transparent 70%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(-999); mouseY.set(-999); }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-xl border border-hairline bg-surface-card p-6 flex flex-col justify-between min-h-[140px] cursor-default ${span}`}
    >
      {/* Radial glow follows mouse */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background }}
      />

      {/* Corner brackets — appear on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-primary" />
        <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-primary" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-primary" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-primary" />
      </div>

      <span className="text-4xl mb-3 block">{emoji}</span>
      <div>
        <p className="text-on-dark font-semibold text-base leading-tight">{name}</p>
        <p className="text-muted text-[13px] mt-0.5">{sub}</p>
      </div>
    </motion.div>
  );
}

export function SportsScope() {
  return (
    <section id="sports" className="bg-canvas py-24">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <span className="text-primary text-[12px] font-semibold tracking-widest uppercase">
            Built for Every Sport
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2
            className="text-on-dark font-bold mt-4 max-w-2xl"
            style={{ fontSize: "clamp(26px, 3.5vw, 40px)", lineHeight: 1.15, letterSpacing: "-1px" }}
          >
            Football, basketball, tennis, cricket, motorsport — every sport has fans. Every fan is a revenue opportunity.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-body-text mt-4 max-w-xl">
            Sportech&apos;s infrastructure is sport-agnostic. Any league, any club, any federation — if you have fans, we have the platform.
          </p>
        </ScrollReveal>

        {/* Bento grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 md:auto-rows-[minmax(140px,auto)] gap-3">
          {SPORTS.map((sport, i) => (
            <SportCard key={sport.name} {...sport} index={i} />
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <p
            className="text-on-dark font-bold text-center mt-16"
            style={{ fontSize: "clamp(22px, 2.5vw, 32px)", letterSpacing: "-0.5px" }}
          >
            One platform. Every sport. Infinite fans.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
