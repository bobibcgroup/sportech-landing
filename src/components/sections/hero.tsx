"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedGrid } from "@/components/ui/animated-grid";
import { fadeUp, blurSlide } from "@/lib/variants";

const FEATURE_PILLS = [
  "Patented Player Camera",
  "Live Predictions",
  "Fan Voting",
  "AR Match View",
  "NFT Store",
  "Live Rooms",
  "Merchandise",
  "Tickets",
];

const HEADLINE_LINES = [
  { text: "Your sport.", yellow: false },
  { text: "Your app.", yellow: false },
  { text: "Your revenue.", yellow: true },
];

export function Hero() {
  const { scrollY } = useScroll();
  const phoneY = useTransform(scrollY, [0, 500], [0, -60]);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-canvas"
    >
      {/* Layer 1: Animated grid */}
      <AnimatedGrid />

      {/* Layer 2: Ambient orbs */}
      <div
        className="absolute top-20 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "rgba(250,255,105,0.08)",
          filter: "blur(120px)",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-20 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "rgba(59,130,246,0.08)",
          filter: "blur(100px)",
          animation: "float 6s ease-in-out infinite reverse",
        }}
      />

      {/* Layer 3: Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left column */}
          <div className="lg:col-span-7 flex flex-col">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
              }}
            >
              {/* Badge */}
              <motion.div variants={fadeUp} className="mb-6">
                <span className="inline-flex items-center bg-surface-card text-primary text-[12px] font-semibold tracking-widest uppercase rounded-full px-4 py-2 border border-hairline">
                  The Fan Engagement Infrastructure
                </span>
              </motion.div>

              {/* Headline */}
              <div className="mb-6">
                {HEADLINE_LINES.map(({ text, yellow }) => (
                  <motion.div
                    key={text}
                    variants={blurSlide}
                  >
                    <h1
                      className="block leading-[1.05] tracking-[-2.5px] font-bold"
                      style={{ fontSize: "clamp(48px, 6vw, 72px)" }}
                    >
                      <span className={yellow ? "text-primary" : "text-on-dark"}>
                        {text}
                      </span>
                    </h1>
                  </motion.div>
                ))}
              </div>

              {/* Subheadline */}
              <motion.p
                variants={fadeUp}
                className="text-body-text text-base font-normal leading-relaxed max-w-lg mb-6"
                transition={{ delay: 0.4 }}
              >
                One white-label platform that turns every match into an interactive
                revenue engine — live cameras, predictions, voting, AR, and more.
                Built for clubs, leagues, and broadcasters.
              </motion.p>

              {/* Feature pills */}
              <motion.div
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.6 } },
                }}
                className="flex flex-wrap gap-2 mb-8"
              >
                {FEATURE_PILLS.map((pill) => (
                  <motion.span
                    key={pill}
                    variants={fadeUp}
                    className="bg-surface-card border border-hairline text-body-text text-[13px] rounded-full px-3 py-1"
                  >
                    {pill}
                  </motion.span>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 bg-primary text-on-primary text-sm font-semibold rounded-lg px-5 h-11 hover:bg-primary-active transition-colors duration-200"
                >
                  Partner With Us →
                </a>
                <a
                  href="#platform"
                  className="inline-flex items-center gap-1 bg-surface-card border border-hairline text-on-dark text-sm font-semibold rounded-lg px-5 h-11 hover:bg-surface-elevated transition-colors duration-200"
                >
                  Explore the Platform ↓
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right column — phone mockup */}
          <div className="hidden lg:flex lg:col-span-5 justify-center lg:justify-end">
            <motion.div
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: phoneY }}
              className="w-full max-w-[340px]"
            >
              <PhoneMockup />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div
          className="text-muted text-xl"
          style={{ animation: "bounce-y 2s ease-in-out infinite" }}
        >
          ↓
        </div>
      </div>
    </section>
  );
}

function PhoneMockup() {
  return (
    <div className="rounded-2xl bg-surface-card border border-hairline p-4 shadow-2xl">
      {/* Status bar */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-[11px] text-muted font-medium">9:41</span>
        <div className="flex items-center gap-1">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "#22c55e" }}
          />
          <span className="text-[11px] font-semibold text-accent-emerald uppercase tracking-wider">
            Live
          </span>
        </div>
      </div>

      {/* App screen */}
      <div
        className="rounded-xl overflow-hidden flex flex-col items-center justify-center"
        style={{
          background: "linear-gradient(160deg, #121212 0%, #0a0a0a 100%)",
          minHeight: 320,
          border: "1px solid #2a2a2a",
        }}
      >
        {/* Camera icon glow */}
        <div className="relative flex items-center justify-center mb-4">
          <div
            className="absolute rounded-full"
            style={{
              width: 80,
              height: 80,
              background: "rgba(250,255,105,0.15)",
              filter: "blur(20px)",
            }}
          />
          <div
            className="relative flex items-center justify-center w-14 h-14 rounded-full border border-hairline-strong"
            style={{ background: "#1a1a1a" }}
          >
            <svg
              width="28"
              height="28"
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

        <p className="text-[11px] font-semibold tracking-widest uppercase text-primary mb-6">
          Player POV — Live
        </p>

        {/* Simulated stats */}
        <div className="w-full px-4 space-y-2">
          {[
            { label: "Fan Engagement", value: "98.2%", up: true },
            { label: "Live Viewers", value: "124K", up: true },
            { label: "Predictions Active", value: "3,412", up: false },
          ].map(({ label, value, up }) => (
            <div
              key={label}
              className="flex items-center justify-between px-3 py-2 rounded-lg"
              style={{ background: "#242424", border: "1px solid #2a2a2a" }}
            >
              <span className="text-[12px] text-muted">{label}</span>
              <span
                className="text-[12px] font-semibold"
                style={{ color: up ? "#22c55e" : "#faff69" }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
