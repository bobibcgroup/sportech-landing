"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { blurSlide } from "@/lib/variants";

const COMPETITORS = [
  "PSG Fan Platform",
  "FC Barcelona Digital",
  "Manchester United Membership",
];

export function PatentedCamera() {
  return (
    <section className="bg-canvas py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left column */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <span className="text-primary text-[12px] font-semibold tracking-widest uppercase">
                A first for football
              </span>
            </ScrollReveal>

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={blurSlide}
              className="text-on-dark font-bold mt-4"
              style={{ fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.1 }}
            >
              Watch the game the way only players do.
            </motion.h2>

            <ScrollReveal delay={0.15}>
              <p className="text-body-text leading-relaxed mt-6">
                A tiny camera mounted on the jersey. Fans pick their player and watch the match from inside the pitch — live, during the game, with no delay.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-body-text leading-relaxed mt-4">
                PSG doesn&apos;t have this. Barcelona doesn&apos;t. Manchester United doesn&apos;t. It&apos;s ours, and it&apos;s patented.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <p className="text-primary font-semibold mt-4 text-sm">
                This is the one feature no other app can copy.
              </p>
            </ScrollReveal>

            {/* Comparison list */}
            <div className="mt-10 space-y-2">
              {COMPETITORS.map((name, i) => (
                <ScrollReveal key={name} delay={0.1 + i * 0.08}>
                  <div className="flex items-center justify-between bg-surface-card border border-hairline rounded-lg px-5 py-3">
                    <span className="text-muted text-sm">{name}</span>
                    <span className="text-muted text-sm">no player cameras ✗</span>
                  </div>
                </ScrollReveal>
              ))}
              <ScrollReveal delay={0.37}>
                <div className="flex items-center justify-between bg-surface-elevated border border-primary/30 rounded-lg px-5 py-3">
                  <span className="text-on-dark font-semibold text-sm">Sportech</span>
                  <span className="text-primary font-semibold text-sm">✓ Patented</span>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Right column — visual card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="bg-surface-card rounded-2xl border border-hairline p-6 flex flex-col items-center justify-center min-h-[400px]"
            >
              {/* Camera icon with glow */}
              <div className="relative flex items-center justify-center mb-2">
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 100,
                    height: 100,
                    background: "rgba(250,255,105,0.15)",
                    filter: "blur(28px)",
                  }}
                />
                <div
                  className="relative flex items-center justify-center w-20 h-20 rounded-full border border-hairline-strong"
                  style={{ background: "#242424" }}
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#faff69"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                    <circle cx="12" cy="13" r="3" />
                  </svg>
                </div>
              </div>

              <span className="text-primary tracking-widest text-sm uppercase font-semibold mt-4">
                Player POV
              </span>

              {/* LIVE badge */}
              <div className="flex items-center gap-2 mt-3">
                <span
                  className="w-2 h-2 rounded-full bg-accent-emerald"
                  style={{ animation: "float 1.5s ease-in-out infinite" }}
                />
                <span className="text-accent-emerald text-xs font-semibold uppercase tracking-wider">
                  Live
                </span>
              </div>

              <p className="text-muted text-sm text-center mt-4 leading-relaxed max-w-xs">
                Choose your player. Watch from inside the field.
              </p>

              {/* Simulated viewer stats */}
              <div className="w-full mt-6 space-y-2">
                {[
                  { label: "Active Streams", value: "12 Players" },
                  { label: "Watching Now", value: "84K Fans" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between px-4 py-2 rounded-lg"
                    style={{ background: "#242424", border: "1px solid #2a2a2a" }}
                  >
                    <span className="text-[12px] text-muted">{label}</span>
                    <span className="text-[12px] font-semibold text-primary">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
