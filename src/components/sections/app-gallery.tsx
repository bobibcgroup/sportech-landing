"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface PhoneScreenProps {
  label: string;
  badge?: string;
  badgeColor?: string;
  rows: { label: string; value: string; color?: string }[];
  accentLine?: string;
  delay?: number;
}

function PhoneScreen({ label, badge, badgeColor = "#faff69", rows, accentLine, delay = 0 }: PhoneScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-[220px] mx-auto"
    >
      {/* Phone frame */}
      <div className="rounded-[28px] bg-[#111] border border-[#2a2a2a] p-3 shadow-2xl">
        {/* Notch */}
        <div className="flex justify-center mb-3">
          <div className="w-16 h-[5px] rounded-full bg-[#2a2a2a]" />
        </div>

        {/* Screen */}
        <div className="rounded-2xl overflow-hidden bg-[#0a0a0a] border border-[#1e1e1e]">
          {/* Status bar */}
          <div className="flex items-center justify-between px-3 pt-2 pb-1">
            <span className="text-[10px] text-white/40 font-medium">9:41</span>
            {badge && (
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: badgeColor }}>
                {badge}
              </span>
            )}
          </div>

          {/* Screen label */}
          <div className="px-3 pb-2 pt-1">
            <p className="text-white/80 text-[11px] font-semibold">{label}</p>
          </div>

          {/* Content rows */}
          <div className="px-3 pb-3 space-y-1.5">
            {rows.map(({ label: rowLabel, value, color }) => (
              <div
                key={rowLabel}
                className="flex items-center justify-between px-2.5 py-2 rounded-lg"
                style={{ background: "#1a1a1a", border: "1px solid #222" }}
              >
                <span className="text-[11px] text-white/40">{rowLabel}</span>
                <span className="text-[11px] font-semibold" style={{ color: color || "#faff69" }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Accent bottom line */}
          {accentLine && (
            <div className="px-3 pb-3">
              <div
                className="w-full text-center py-2 rounded-lg text-[11px] font-semibold"
                style={{ background: "rgba(250,255,105,0.08)", color: "#faff69", border: "1px solid rgba(250,255,105,0.15)" }}
              >
                {accentLine}
              </div>
            </div>
          )}
        </div>

        {/* Home indicator */}
        <div className="flex justify-center mt-2">
          <div className="w-20 h-[4px] rounded-full bg-[#2a2a2a]" />
        </div>
      </div>
    </motion.div>
  );
}

export function AppGallery() {
  return (
    <section className="bg-canvas py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <span className="text-primary text-[12px] font-semibold tracking-widest uppercase">
            Inside the app
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2
            className="text-on-dark font-bold mt-4 max-w-2xl"
            style={{ fontSize: "clamp(26px, 3.5vw, 40px)", lineHeight: 1.15 }}
          >
            Fans open it every match day. Not because they have to. Because there's always something happening.
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          <PhoneScreen
            label="Player POV — Live"
            badge="LIVE"
            badgeColor="#22c55e"
            rows={[
              { label: "Active streams", value: "12 players", color: "#faff69" },
              { label: "Watching now", value: "84K fans", color: "#faff69" },
              { label: "Your player", value: "#10 Active", color: "#22c55e" },
            ]}
            accentLine="Watching from inside the pitch"
            delay={0}
          />

          <PhoneScreen
            label="Match Predictions"
            badge="OPEN"
            rows={[
              { label: "Al-Nassr win", value: "2.1×", color: "#faff69" },
              { label: "First scorer", value: "Ronaldo", color: "#faff69" },
              { label: "Your tokens", value: "1,240 PT", color: "#22c55e" },
            ]}
            accentLine="Place your prediction"
            delay={0.1}
          />

          <PhoneScreen
            label="Fan Vote — Live"
            badge="VOTING"
            badgeColor="#faff69"
            rows={[
              { label: "Sub Naif → Salim", value: "62% Yes", color: "#faff69" },
              { label: "4-3-3 formation", value: "77% Agree", color: "#22c55e" },
              { label: "Your vote tier", value: "Premium ×3", color: "#faff69" },
            ]}
            accentLine="Your club, your say"
            delay={0.2}
          />

          <PhoneScreen
            label="Revenue Dashboard"
            badge="THIS WEEK"
            rows={[
              { label: "Subscriptions", value: "+SAR 18K", color: "#22c55e" },
              { label: "Predictions", value: "+SAR 7.4K", color: "#22c55e" },
              { label: "Merch sales", value: "+SAR 4.1K", color: "#22c55e" },
            ]}
            accentLine="50% is yours, automatically"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}
