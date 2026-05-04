"use client";

import { useState, useEffect, useRef } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { ease, dur, REVEAL_MARGIN } from "@/lib/animation";

const TIERS = [
  { label: "10K",  fans: 10_000 },
  { label: "50K",  fans: 50_000 },
  { label: "100K", fans: 100_000 },
  { label: "250K", fans: 250_000 },
  { label: "500K", fans: 500_000 },
  { label: "1M",   fans: 1_000_000 },
  { label: "2M+",  fans: 2_000_000 },
];

const ACTIVE_RATIO = 0.25;
const GROSS_PER_USER = [4, 500, 500, 100, 1000, 1000, 500, 50].reduce((a, b) => a + b, 0);

const STREAMS = [
  { key: "subscriptions", label: "Subscriptions",       gross: 4,    color: "#faff69" },
  { key: "gifting",       label: "Live Stream Gifting", gross: 500,  color: "#ff78c8" },
  { key: "predictions",   label: "Sports Predictions",  gross: 500,  color: "#a8ff78" },
  { key: "voting",        label: "Interactive Voting",  gross: 100,  color: "#78e8ff" },
  { key: "tickets",       label: "Tickets",             gross: 1000, color: "#78c1ff" },
  { key: "merchandise",   label: "Merchandise",         gross: 1000, color: "#ffb878" },
  { key: "giftcards",     label: "Digital Gift Cards",  gross: 500,  color: "#c8a8ff" },
  { key: "nft",           label: "NFT & Collectibles",  gross: 50,   color: "#ff9878" },
];

function AnimatedNumber({ value }: { value: number }) {
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => `$${Math.round(v).toLocaleString()}`);
  const prevRef = useRef(0);

  useEffect(() => {
    const from = prevRef.current;
    prevRef.current = value;
    const controls = animate(mv, value, { duration: 0.6, ease: "easeOut", from });
    return () => controls.stop();
  }, [value, mv]);

  return <motion.span>{display}</motion.span>;
}

function StreamCard({ label, revenue, color, index }: {
  label: string; revenue: number; color: string; index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: REVEAL_MARGIN }}
      transition={{ duration: dur.normal, delay: 0.05 * index, ease: ease.out }}
      className="flex items-center gap-4 rounded-xl px-4 py-3.5 border"
      style={{
        background: "rgba(255,255,255,0.03)",
        borderColor: "rgba(255,255,255,0.06)",
        borderLeft: `3px solid ${color}`,
      }}
    >
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium truncate" style={{ color: "rgba(255,255,255,0.5)" }}>
          {label}
        </p>
      </div>
      <p className="font-bold tabular-nums shrink-0" style={{ color, fontSize: 15, letterSpacing: "-0.5px" }}>
        <AnimatedNumber value={revenue} />
      </p>
    </motion.div>
  );
}

export function RevenueSimulator() {
  const [selectedTier, setSelectedTier] = useState(2);

  const totalFans   = TIERS[selectedTier].fans;
  const activeUsers = Math.round(totalFans * ACTIVE_RATIO);

  const streams = STREAMS.map(s => ({
    ...s,
    revenue: Math.round(activeUsers * s.gross * 0.5),
  }));
  const total = streams.reduce((sum, s) => sum + s.revenue, 0);

  return (
    <section className="bg-canvas py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(250,255,105,0.04) 0%, transparent 70%)",
      }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.span
          initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: 0.3, ease: ease.out }}
          className="text-[12px] font-semibold tracking-widest uppercase block mb-4"
          style={{ color: "rgba(250,255,105,0.6)" }}
        >
          Revenue Simulator
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.slow, delay: 0.1, ease: ease.out }}
          className="text-on-dark font-bold mb-3"
          style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-2.5px" }}
        >
          See your club&apos;s potential.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.normal, delay: 0.2 }}
          className="text-body-text text-sm mb-10"
        >
          Select your total fanbase size. Only 25% is counted as active users — the rest is upside.
        </motion.p>

        {/* Tier selector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.normal, delay: 0.3, ease: ease.out }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {TIERS.map((tier, i) => (
            <button
              key={tier.label}
              onClick={() => setSelectedTier(i)}
              className="px-5 h-10 rounded-lg text-sm font-semibold transition-all duration-200"
              style={{
                background: selectedTier === i ? "#faff69" : "rgba(250,255,105,0.06)",
                color: selectedTier === i ? "#0a0a0a" : "rgba(255,255,255,0.5)",
                border: `1px solid ${selectedTier === i ? "#faff69" : "rgba(250,255,105,0.14)"}`,
              }}
            >
              {tier.label}
            </button>
          ))}
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.normal, delay: 0.4, ease: ease.out }}
          className="rounded-2xl border overflow-hidden"
          style={{ background: "rgba(10,10,10,0.65)", borderColor: "rgba(250,255,105,0.12)", backdropFilter: "blur(16px)" }}
        >
          {/* Total header */}
          <div className="px-8 py-7 border-b" style={{ borderColor: "rgba(250,255,105,0.08)" }}>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: "rgba(250,255,105,0.45)" }}>
                Estimated annual share — your 50%
              </span>
              <span
                className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                style={{ background: "rgba(250,255,105,0.08)", color: "rgba(250,255,105,0.55)", border: "1px solid rgba(250,255,105,0.15)" }}
              >
                {activeUsers.toLocaleString()} active users · 25% of {TIERS[selectedTier].label}
              </span>
            </div>
            <div
              className="font-bold"
              style={{ fontSize: "clamp(48px, 7vw, 80px)", letterSpacing: "-4px", color: "#faff69", lineHeight: 1 }}
            >
              <AnimatedNumber value={total} />
            </div>
            <p className="text-muted text-xs mt-1.5">per year</p>
          </div>

          {/* Stream cards grid */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {streams.map((s, i) => (
              <StreamCard key={s.key} label={s.label} revenue={s.revenue} color={s.color} index={i} />
            ))}
          </div>

          {/* Per-user spend note */}
          <div className="px-6 pb-5 pt-1 border-t" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.28)", lineHeight: 1.6 }}>
              Each active user spends an average of{" "}
              <span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>
                ${GROSS_PER_USER.toLocaleString()}
              </span>{" "}
              per year across all 8 streams.
            </p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.normal, delay: 0.6 }}
          className="text-center mt-5"
          style={{ fontSize: 11, color: "rgba(255,255,255,0.22)", lineHeight: 1.7 }}
        >
          Calculations assume 25% active user conversion and club&apos;s 50% revenue share per stream.
          Actual results vary by engagement, market, and content strategy.
        </motion.p>
      </div>
    </section>
  );
}
