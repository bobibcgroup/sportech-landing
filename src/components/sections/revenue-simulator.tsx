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
  { label: "2M",   fans: 2_000_000 },
  { label: "20M",  fans: 20_000_000 },
  { label: "50M",  fans: 50_000_000 },
  { label: "100M", fans: 100_000_000 },
];

// Three-scenario model: conservative default; base case benchmarked
// against top-tier club app data (12-20% paid engagement).
const SCENARIOS = [
  { key: "conservative", label: "Conservative", rate: 0.08 },
  { key: "base",         label: "Base Case",    rate: 0.15 },
  { key: "upside",       label: "Upside",       rate: 0.25 },
];

// Per-user annual spend by stream — sums to the $30 ARPU; top 3 streams
// (subscriptions, tickets, gifting) hold ~72% per the committed model.
const STREAMS = [
  { key: "subscriptions", label: "Subscriptions",       gross: 9.0, color: "var(--color-primary)" },
  { key: "gifting",       label: "Live Stream Gifting", gross: 6.0, color: "#ff78c8" },
  { key: "predictions",   label: "Sports Predictions",  gross: 1.8, color: "#a8ff78" },
  { key: "voting",        label: "Interactive Voting",  gross: 0.9, color: "#78e8ff" },
  { key: "tickets",       label: "Tickets",             gross: 6.6, color: "#78c1ff" },
  { key: "merchandise",   label: "Merchandise",         gross: 3.6, color: "#ffb878" },
  { key: "giftcards",     label: "Digital Gift Cards",  gross: 1.5, color: "#c8a8ff" },
  { key: "nft",           label: "NFT & Collectibles",  gross: 0.6, color: "#ff9878" },
];

const ARPU_PER_USER = STREAMS.reduce((sum, s) => sum + s.gross, 0);

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
  const [selectedScenario, setSelectedScenario] = useState(0);

  const scenario    = SCENARIOS[selectedScenario];
  const ratePct     = Math.round(scenario.rate * 100);
  const totalFans   = TIERS[selectedTier].fans;
  const payingUsers = Math.round(totalFans * scenario.rate);

  const streams = STREAMS.map(s => ({
    ...s,
    revenue: Math.round(payingUsers * s.gross),
  }));
  const total = streams.reduce((sum, s) => sum + s.revenue, 0);

  return (
    <section className="bg-canvas py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(var(--color-primary-rgb),0.04) 0%, transparent 70%)",
      }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.span
          initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: 0.3, ease: ease.out }}
          className="text-[12px] font-semibold tracking-widest uppercase block mb-4"
          style={{ color: "rgba(var(--color-primary-rgb),0.6)" }}
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
          Select your fanbase size and a scenario. The conservative case counts just 8% of fans as paying users. The base case reflects what top-tier club apps already achieve.
        </motion.p>

        {/* Scenario selector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.normal, delay: 0.25, ease: ease.out }}
          className="inline-flex rounded-lg border p-1 mb-6"
          style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}
          role="group"
          aria-label="Revenue scenario"
        >
          {SCENARIOS.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setSelectedScenario(i)}
              aria-pressed={selectedScenario === i}
              className="px-4 h-9 rounded-md text-[13px] font-semibold transition-all duration-200 cursor-pointer"
              style={{
                background: selectedScenario === i ? "rgba(var(--color-primary-rgb),0.12)" : "transparent",
                color: selectedScenario === i ? "var(--color-primary)" : "rgba(255,255,255,0.45)",
                border: `1px solid ${selectedScenario === i ? "rgba(var(--color-primary-rgb),0.35)" : "transparent"}`,
              }}
            >
              {s.label} · {Math.round(s.rate * 100)}%
            </button>
          ))}
        </motion.div>

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
              aria-pressed={selectedTier === i}
              className="px-5 h-10 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer"
              style={{
                background: selectedTier === i ? "var(--color-primary)" : "rgba(var(--color-primary-rgb),0.06)",
                color: selectedTier === i ? "#0a0a0a" : "rgba(255,255,255,0.5)",
                border: `1px solid ${selectedTier === i ? "var(--color-primary)" : "rgba(var(--color-primary-rgb),0.14)"}`,
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
          style={{ background: "rgba(10,10,10,0.65)", borderColor: "rgba(var(--color-primary-rgb),0.12)", backdropFilter: "blur(16px)" }}
        >
          {/* Total header */}
          <div className="px-8 py-7 border-b" style={{ borderColor: "rgba(var(--color-primary-rgb),0.08)" }}>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: "rgba(var(--color-primary-rgb),0.45)" }}>
                Estimated example annual revenue
              </span>
              <span
                className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                style={{ background: "rgba(var(--color-primary-rgb),0.08)", color: "rgba(var(--color-primary-rgb),0.55)", border: "1px solid rgba(var(--color-primary-rgb),0.15)" }}
              >
                {payingUsers.toLocaleString()} paying users · {ratePct}% of {TIERS[selectedTier].label}
              </span>
            </div>
            <div
              className="font-bold"
              style={{ fontSize: "clamp(38px, 7vw, 80px)", letterSpacing: "-3px", color: "var(--color-primary)", lineHeight: 1 }}
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
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
              Each paying user generates an average of{" "}
              <span style={{ color: "rgba(255,255,255,0.75)", fontWeight: 600 }}>
                ${ARPU_PER_USER.toLocaleString()}
              </span>{" "}
              per year across the full stream mix as it phases in.
            </p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.normal, delay: 0.6 }}
          className="text-center mt-5"
          style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}
        >
          Calculations assume the selected fan-to-paying-user rate at $30 average revenue per user per year.
          The base case is benchmarked against top-tier club app engagement of 12 to 20%.
          Revenue share is structured per partnership agreement. Actual results vary by engagement, market, and content strategy.
        </motion.p>
      </div>
    </section>
  );
}
