"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface Feature {
  badge?: string;
  title: string;
  body: string;
}

const FEATURES: Feature[] = [
  {
    badge: "★ PATENTED",
    title: "Player Camera",
    body: "Jersey-mounted cameras stream live first-person footage directly to fans during matches. A world-first. No other fan platform has this.",
  },
  {
    title: "Interactive Voting",
    body: "Members vote on tactical decisions, substitutions, and formations in real time. Vote weight scales with subscription tier.",
  },
  {
    title: "Sports Predictions",
    body: "Fans predict match outcomes and player performance using platform digital currency. Sharia-compliant — no cash betting.",
  },
  {
    title: "Live Rooms",
    body: "Private and public audio spaces where fans debate matches live, backed by real-time stats and AI insights.",
  },
  {
    title: "Augmented Reality",
    body: "Live stats, player profiles, and match data overlaid on the viewing experience. Compatible with AR glasses.",
  },
  {
    title: "Live Commentator Feed",
    body: "Fans worldwide listen to the official in-stadium commentator feed — live, as if sitting in the stands.",
  },
  {
    title: "Tickets & Merchandise",
    body: "Integrated ticket purchase, peer-to-peer resale, official club gear, and same-day delivery — all inside your app.",
  },
  {
    title: "Digital Store & NFTs",
    body: "Club-branded gift cards accepted at 150,000+ stores. Digital trading cards, rare player NFTs, and limited seasonal drops.",
  },
];

export function PlatformFeatures() {
  return (
    <section className="bg-canvas py-24" id="platform">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <span className="text-primary text-[12px] font-semibold tracking-widest uppercase">
            The Platform
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-on-dark font-bold mt-4 max-w-2xl" style={{ fontSize: 40, lineHeight: 1.15 }}>
            Every tool a fan needs. Every touchpoint a club earns from.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-body-text mt-4 max-w-2xl leading-relaxed">
            Not just an app. A complete fan engagement operating system — modular, white-labeled,
            and built to turn every fan interaction into revenue.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {FEATURES.map((feature, index) => {
            const isPatented = index === 0;
            return (
              <ScrollReveal key={feature.title} delay={index * 0.07}>
                <motion.div
                  className="bg-surface-card border border-hairline rounded-xl p-6 h-full"
                  style={
                    isPatented
                      ? { boxShadow: "0 0 40px rgba(250,255,105,0.08)" }
                      : undefined
                  }
                  whileHover={{ y: -4, boxShadow: "0 8px 32px rgba(250,255,105,0.08)" }}
                  transition={{ duration: 0.2 }}
                >
                  {feature.badge && (
                    <span className="bg-primary text-on-primary text-[11px] font-semibold tracking-widest uppercase rounded-full px-3 py-1 mb-3 inline-block">
                      {feature.badge}
                    </span>
                  )}
                  <h3
                    className={`font-semibold text-base mb-2 ${isPatented ? "text-primary" : "text-on-dark"}`}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-body-text text-sm leading-relaxed">{feature.body}</p>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.1}>
          <p className="text-muted text-sm text-center mt-8">
            All features are modular. Every club activates what fits their sport and their fans.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
