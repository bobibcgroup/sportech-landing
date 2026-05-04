"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ease, dur, REVEAL_MARGIN } from "@/lib/animation";

const STREAMS = [
  { num: "01", title: "Subscriptions", desc: "Recurring tiers … free to premium." },
  { num: "02", title: "Digital Currency", desc: "Fans purchase tokens for predictions and rewards." },
  { num: "03", title: "Sports Predictions", desc: "Every match outcome prediction is a revenue event." },
  { num: "04", title: "Interactive Voting", desc: "Higher tiers pay for greater vote influence over club decisions." },
  { num: "05", title: "Tickets", desc: "In-app purchase and peer-to-peer resale with platform commission." },
  { num: "06", title: "Merchandise", desc: "Official club gear sold through the app … jerseys, editions, accessories." },
  { num: "07", title: "Digital Gift Cards", desc: "Club-branded cards accepted at 150,000+ stores globally." },
  { num: "08", title: "NFT & Collectibles", desc: "Digital trading cards, rare tokens, seasonal drops." },
];

export function RevenueStreams() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const glowScale = useTransform(scrollYProgress, [0.3, 0.65], [0.2, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0.3, 0.55, 0.85], [0, 1, 0.4]);

  return (
    <section ref={sectionRef} className="bg-canvas py-28 relative overflow-hidden" id="revenue">
      {/* Atmospheric gold glow — anchored right behind the 50% panel */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "50%", right: "-5%",
          transform: "translateY(-50%)",
          width: 700, height: 700,
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(212,160,23,0.14) 0%, transparent 65%)",
          scale: glowScale,
          opacity: glowOpacity,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.span
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }}
          transition={{ duration: dur.fast, ease: ease.out }}
          className="text-[12px] font-semibold tracking-widest uppercase block mb-4"
          style={{ color: "rgba(250,255,105,0.6)" }}
        >
          8 Revenue Streams. One Split.
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }}
          transition={{ duration: dur.slow, delay: 0.1, ease: ease.out }}
          className="text-on-dark font-bold mb-16 max-w-xl"
          style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.05, letterSpacing: "-2.5px" }}
        >
          Every time a fan opens the app, you earn.
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 items-start">
          {/* Stream list — two sub-columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
            {STREAMS.map(({ num, title, desc }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: REVEAL_MARGIN }}
                transition={{ duration: dur.normal, delay: i * 0.06, ease: ease.out }}
                className="flex items-start gap-4 py-4 border-b group cursor-default"
                style={{ borderColor: "rgba(250,255,105,0.08)" }}
              >
                <span
                  className="text-[11px] font-bold mt-0.5 shrink-0 tabular-nums"
                  style={{ color: "rgba(250,255,105,0.35)" }}
                >
                  {num}
                </span>
                <div>
                  <p className="text-on-dark text-sm font-semibold group-hover:text-primary transition-colors duration-200">
                    {title}
                  </p>
                  <p className="text-muted text-xs leading-relaxed mt-0.5">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 50% YOURS — sticky hero panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: REVEAL_MARGIN }}
            transition={{ duration: dur.slow, delay: 0.4, ease: ease.out }}
            className="lg:sticky lg:top-32 rounded-2xl p-8 border text-center"
            style={{
              background: "rgba(10,10,10,0.7)",
              borderColor: "rgba(212,160,23,0.2)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div
              className="font-bold leading-none"
              style={{
                fontSize: "clamp(72px, 10vw, 120px)",
                letterSpacing: "-6px",
                color: "#d4a017",
                textShadow: "0 0 80px rgba(212,160,23,0.35)",
              }}
            >
              50%
            </div>
            <div
              className="font-bold leading-none -mt-2 mb-6"
              style={{ fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-3px", color: "#d4a017" }}
            >
              YOURS
            </div>
            <div className="h-px w-12 mx-auto mb-6" style={{ background: "rgba(212,160,23,0.3)" }} />
            <p className="text-body-text text-sm leading-relaxed mb-5">
              The other 50% funds everything we build and operate for you. Zero upfront cost. Zero risk.
            </p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", lineHeight: 1.7 }}>
              Equivalent to what FC Barcelona&apos;s digital platform generates —{" "}
              <span style={{ color: "#d4a017" }}>over SAR 800M</span> annually.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
