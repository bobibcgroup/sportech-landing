"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";

const STREAMS = [
  {
    title: "Subscriptions",
    description:
      "Recurring monthly and annual membership tiers — from free fans to high-value partners.",
  },
  {
    title: "Digital Currency",
    description:
      "Fans purchase PredictPro tokens to participate in predictions and win rewards.",
  },
  {
    title: "Sports Predictions",
    description:
      "Match outcomes, player performance, season results — every prediction is a revenue event.",
  },
  {
    title: "Interactive Voting",
    description:
      "Higher tiers pay for greater vote influence over club decisions.",
  },
  {
    title: "Tickets",
    description:
      "In-app purchase and peer-to-peer resale with platform commission on every transaction.",
  },
  {
    title: "Merchandise",
    description:
      "Official club gear — jerseys, accessories, limited editions — sold through the app.",
  },
  {
    title: "Digital Gift Cards",
    description:
      "Club-branded cards accepted at 150,000+ stores globally.",
  },
  {
    title: "NFT & Collectibles",
    description:
      "Digital trading cards, rare player tokens, seasonal drops — high-margin digital assets.",
  },
];

export function RevenueStreams() {
  return (
    <section className="bg-surface-card py-24">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <span className="text-primary text-[12px] font-semibold tracking-widest uppercase">
            Revenue Model
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-on-dark font-bold mt-4 max-w-2xl" style={{ fontSize: "clamp(26px, 3.5vw, 40px)", lineHeight: 1.15 }}>
            8 revenue streams. One platform. All running at once.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-body-text mt-4 max-w-2xl leading-relaxed">
            Most fan platforms generate revenue from one or two sources. Sportech generates it
            from every fan interaction — simultaneously, automatically, and at scale.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          {STREAMS.map(({ title, description }, index) => (
            <ScrollReveal key={title} delay={index * 0.08}>
              <div className="bg-surface-elevated rounded-xl p-6 border border-hairline flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center text-sm">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-on-dark font-semibold mb-1">{title}</h3>
                  <p className="text-body-text text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-16 text-center">
          <ScrollReveal>
            <p className="text-body-text text-center">
              Every transaction. Every interaction. Every engagement moment.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-primary font-bold mt-2 text-center" style={{ fontSize: 32 }}>
              50% stays with your club. Forever.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
