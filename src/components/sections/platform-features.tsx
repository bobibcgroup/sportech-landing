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
    body: "A small camera on the jersey. Fans pick a player and watch the match through their eyes, live. Nobody else on earth offers this.",
  },
  {
    title: "Interactive Voting",
    body: "Fans vote on tactics, subs, and formations live during the match. Premium subscribers get a bigger say.",
  },
  {
    title: "Sports Predictions",
    body: "Match predictions using platform tokens, not real money. Fully Sharia-compliant, fully engaging.",
  },
  {
    title: "Live Rooms",
    body: "Audio rooms where fans argue about the match in real time, with live stats in the background.",
  },
  {
    title: "Augmented Reality",
    body: "Point your phone at the pitch and see live player stats and match data overlaid on the action.",
  },
  {
    title: "Live Commentator Feed",
    body: "Your global fans hear the same stadium commentator as the home crowd. Live, no delay.",
  },
  {
    title: "Tickets & Merchandise",
    body: "Tickets, resale, official gear, same-day delivery. All in one place, all earning.",
  },
  {
    title: "Digital Store & NFTs",
    body: "Digital collectibles, player cards, limited seasonal drops. High margin. Zero inventory.",
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
          <h2 className="text-on-dark font-bold mt-4 max-w-2xl" style={{ fontSize: "clamp(26px, 3.5vw, 40px)", lineHeight: 1.15 }}>
            Eight features. One app. Fully yours.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-body-text mt-4 max-w-2xl leading-relaxed">
            A complete fan platform your club owns. Every feature earns. None of it comes off your balance sheet.
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
