"use client";

import { useState, useEffect, useRef } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { ease, dur, REVEAL_MARGIN } from "@/lib/animation";

const TIERS = [
  { label: "10K", fans: 10_000 },
  { label: "50K", fans: 50_000 },
  { label: "100K", fans: 100_000 },
  { label: "250K", fans: 250_000 },
  { label: "500K", fans: 500_000 },
  { label: "1M", fans: 1_000_000 },
  { label: "2M+", fans: 2_000_000 },
];

const STREAMS_CONFIG = [
  { key: "subscriptions", label: "Subscriptions", arpu: 1.80, color: "#faff69" },
  { key: "predictions", label: "Predictions", arpu: 0.24, color: "#a8ff78" },
  { key: "merchandise", label: "Merchandise", arpu: 0.50, color: "#78c1ff" },
  { key: "tokens", label: "Digital Currency", arpu: 0.45, color: "#ffb878" },
];

const TOTAL_ARPU = STREAMS_CONFIG.reduce((sum, s) => sum + s.arpu, 0);

function AnimatedCounter({ value }: { value: number }) {
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => `$${Math.round(v).toLocaleString()}`);
  const prevRef = useRef(0);

  useEffect(() => {
    const from = prevRef.current;
    prevRef.current = value;
    const controls = animate(mv, value, { duration: 0.75, ease: "easeOut", from });
    return () => controls.stop();
  }, [value, mv]);

  return <motion.span>{display}</motion.span>;
}

export function RevenueSimulator() {
  const [selectedTier, setSelectedTier] = useState(2);

  const fans = TIERS[selectedTier].fans;
  const streams = STREAMS_CONFIG.map(s => ({ ...s, revenue: Math.round(fans * s.arpu) }));
  const total = Math.round(fans * TOTAL_ARPU);

  return (
    <section className="bg-canvas py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(250,255,105,0.04) 0%, transparent 70%)"
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
          Select your active fanbase size to estimate your annual revenue share.
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

        {/* Revenue card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.normal, delay: 0.4, ease: ease.out }}
          className="rounded-2xl p-8 border"
          style={{
            background: "rgba(10,10,10,0.65)",
            borderColor: "rgba(250,255,105,0.12)",
            backdropFilter: "blur(16px)",
          }}
        >
          {/* Total figure */}
          <div className="mb-8 pb-8 border-b" style={{ borderColor: "rgba(250,255,105,0.08)" }}>
            <p className="text-[11px] font-semibold tracking-widest uppercase mb-2" style={{ color: "rgba(250,255,105,0.45)" }}>
              Estimated annual share — your 50%
            </p>
            <div
              className="font-bold"
              style={{ fontSize: "clamp(48px, 7vw, 80px)", letterSpacing: "-4px", color: "#faff69", lineHeight: 1 }}
            >
              <AnimatedCounter value={total} />
            </div>
            <p className="text-muted text-xs mt-1.5">per year · based on {TIERS[selectedTier].label} active fans</p>
          </div>

          {/* Stream breakdown */}
          <div className="space-y-5">
            {streams.map((stream) => {
              const pct = total > 0 ? (stream.revenue / total) * 100 : 0;
              return (
                <div key={stream.key}>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {stream.label}
                    </span>
                    <span className="text-xs font-bold tabular-nums" style={{ color: stream.color }}>
                      ${stream.revenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <motion.div
                      className="h-full rounded-full"
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.65, ease: ease.out }}
                      style={{ background: stream.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.normal, delay: 0.6 }}
          className="text-center mt-5"
          style={{ fontSize: 11, color: "rgba(255,255,255,0.22)", lineHeight: 1.7 }}
        >
          Projections use conservative industry ARPU benchmarks. Actual results vary by engagement, market, and content strategy.
        </motion.p>
      </div>
    </section>
  );
}
