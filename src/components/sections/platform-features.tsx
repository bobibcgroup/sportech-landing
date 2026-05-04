"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease, dur, REVEAL_MARGIN } from "@/lib/animation";

const FEATURES = [
  { patented: true, title: "Player Camera", body: "Jersey-mounted POV. Fans choose their player and watch live. No one else on earth offers this.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg> },
  { title: "Interactive Voting", body: "Fans vote on tactics, subs, and formations live. Premium tiers carry more weight.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> },
  { title: "Sports Predictions", body: "Match predictions using platform tokens. Fully Sharia-compliant, fully engaging.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { title: "Live Audio Rooms", body: "Fans debate the match in real time with live stats in the background.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg> },
  { title: "Augmented Reality", body: "Point your phone at the pitch and see live player stats overlaid on the action.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg> },
  { title: "Global Commentary", body: "Your international fans hear the same stadium commentator as the home crowd. Live.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg> },
  { title: "Tickets & Merchandise", body: "Tickets, resale, official gear, same-day delivery. All in one place, all earning.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12v-2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2"/><rect x="2" y="12" width="20" height="8" rx="2"/></svg> },
  { title: "NFT Collectibles", body: "Digital trading cards, rare player tokens, seasonal drops — high-margin digital assets.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> },
];

function FeatureCard({ feature, index }: { feature: (typeof FEATURES)[0]; index: number }) {
  const [tip, setTip] = useState(false);
  const delay = Math.floor(index / 4) * 0.08 + (index % 4) * 0.06;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.normal, delay, ease: ease.out }}
      className="relative rounded-xl p-6 border cursor-default"
      style={{ background: "rgba(10,10,10,0.5)", borderColor: feature.patented ? "#faff69" : "rgba(250,255,105,0.10)" }}
      whileHover={{ scale: 1.02, borderColor: feature.patented ? "#faff69" : "rgba(250,255,105,0.35)", transition: { duration: 0.2 } }}
      onHoverStart={() => feature.patented && setTip(true)}
      onHoverEnd={() => setTip(false)}
    >
      {feature.patented && (
        <span className="absolute top-3 right-3 text-[9px] font-bold tracking-[0.2em] uppercase px-2 py-0.5 rounded-full"
          style={{ color: "#faff69", border: "1px solid rgba(250,255,105,0.4)", background: "rgba(250,255,105,0.08)" }}>
          PATENTED
        </span>
      )}
      <div className="text-primary mb-3">{feature.icon}</div>
      <h3 className="text-on-dark font-semibold text-sm mb-2">{feature.title}</h3>
      <p className="text-body-text text-xs leading-relaxed">{feature.body}</p>
      <AnimatePresence>
        {tip && (
          <motion.div
            initial={{ opacity: 0, y: 4, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="absolute -bottom-11 left-0 right-0 z-20 rounded-lg px-3 py-2 text-[11px] text-on-dark"
            style={{ background: "rgba(26,26,26,0.95)", border: "1px solid rgba(250,255,105,0.2)" }}
          >
            The only patented jersey-mounted player POV camera in existence.
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function PlatformFeatures() {
  return (
    <section className="bg-canvas py-24 relative overflow-hidden" id="platform-features">
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(250,255,105,0.25) 30%, rgba(250,255,105,0.5) 50%, rgba(250,255,105,0.25) 70%, transparent)" }}
      />
      <div className="max-w-7xl mx-auto px-6">
        <motion.span
          initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: 0.3, ease: ease.out }}
          className="text-[12px] font-semibold tracking-widest uppercase block mb-4"
          style={{ color: "rgba(250,255,105,0.6)" }}
        >
          The Arsenal
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.slow, delay: 0.1, ease: ease.out }}
          className="text-on-dark font-bold mb-12 max-w-xl"
          style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-2px" }}
        >
          Eight features. One platform. Your badge on all of it.
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => <FeatureCard key={f.title} feature={f} index={i} />)}
        </div>
      </div>
    </section>
  );
}
