"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ease, dur, REVEAL_MARGIN } from "@/lib/animation";

const STREAMS_LEFT = [
  { title: "Subscriptions", desc: "Recurring monthly and annual tiers — free to premium." },
  { title: "Digital Currency", desc: "Fans purchase tokens for predictions and rewards." },
  { title: "Sports Predictions", desc: "Every match outcome prediction is a revenue event." },
  { title: "Interactive Voting", desc: "Higher tiers pay for greater vote influence over club decisions." },
];

const STREAMS_RIGHT = [
  { title: "Tickets", desc: "In-app purchase and peer-to-peer resale with platform commission." },
  { title: "Merchandise", desc: "Official club gear sold through the app — jerseys, editions, accessories." },
  { title: "Digital Gift Cards", desc: "Club-branded cards accepted at 150,000+ stores globally." },
  { title: "NFT & Collectibles", desc: "Digital trading cards, rare tokens, seasonal drops." },
];

function StreamRow({ title, desc, delay, direction }: { title: string; desc: string; delay: number; direction: "left" | "right" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === "left" ? -32 : 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: REVEAL_MARGIN }}
      transition={{ duration: dur.normal, delay, ease: ease.out }}
      className="flex items-start gap-3 py-3 border-b group cursor-default"
      style={{ borderColor: "rgba(250,255,105,0.08)" }}
    >
      <div
        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 transition-colors duration-300 group-hover:bg-primary"
        style={{ background: "rgba(250,255,105,0.3)", animation: "dot-pulse 2s ease-in-out infinite" }}
      />
      <div>
        <p className="text-on-dark text-sm font-semibold group-hover:text-primary transition-colors duration-200">{title}</p>
        <p className="text-muted text-xs leading-relaxed mt-0.5">{desc}</p>
      </div>
    </motion.div>
  );
}

export function RevenueStreams() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const glowScale = useTransform(scrollYProgress, [0.3, 0.65], [0.2, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0.3, 0.55, 0.8], [0, 1, 0.5]);

  return (
    <section ref={sectionRef} className="bg-canvas py-28 relative overflow-hidden" id="revenue">
      {/* Gold glow behind the 50% figure */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(212,160,23,0.18) 0%, transparent 70%)",
          scale: glowScale,
          opacity: glowOpacity,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.span
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }}
          transition={{ duration: dur.fast, ease: ease.out }}
          className="text-[12px] font-semibold tracking-widest uppercase block mb-3"
          style={{ color: "rgba(250,255,105,0.6)" }}
        >
          8 Revenue Streams. One Split.
        </motion.span>

        {/* Two-column revenue list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 mb-16">
          <div>
            {STREAMS_LEFT.map((s, i) => (
              <StreamRow key={s.title} {...s} delay={i * 0.08} direction="left" />
            ))}
          </div>
          <div>
            {STREAMS_RIGHT.map((s, i) => (
              <StreamRow key={s.title} {...s} delay={0.32 + i * 0.08} direction="right" />
            ))}
          </div>
        </div>

        {/* The typographic moment */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }}
          transition={{ duration: 0.5, delay: 0.7, ease: ease.out }}
          className="text-center"
        >
          <div
            className="font-bold leading-none"
            style={{
              fontSize: "clamp(80px, 12vw, 144px)",
              letterSpacing: "-6px",
              color: "#d4a017",
              textShadow: "0 0 120px rgba(212,160,23,0.25)",
            }}
          >
            50%
          </div>
          <div
            className="font-bold leading-none -mt-2"
            style={{ fontSize: "clamp(44px, 6vw, 72px)", letterSpacing: "-4px", color: "#d4a017" }}
          >
            YOURS
          </div>

          <p className="text-body-text text-base mt-6 max-w-lg mx-auto leading-relaxed">
            The other 50% funds everything we build for you.
          </p>

          <p className="mt-3 max-w-xl mx-auto" style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
            Equivalent to the revenue FC Barcelona&apos;s digital platform generates for the club — over{" "}
            <span style={{ color: "#d4a017" }}>SAR 800M</span> annually.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
