"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ease, dur, REVEAL_MARGIN } from "@/lib/animation";

const PILLARS = [
  {
    title: "Saudi-Built Technology",
    body: "The IP, the team, the patent — all Saudi. We didn't import a solution. We invented one, and we're proud of where it comes from.",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#faff69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  },
  {
    title: "Global Sport",
    body: "Football in Asia. Basketball in the Americas. Cricket across South Asia. Sport is universal — our platform is built to go wherever fans are.",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#faff69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  },
  {
    title: "Built Here. Scaling Everywhere.",
    body: "We started in Saudi Arabia. Now we're taking it to every league, every continent, every fanbase. The IP stays Saudi — the impact goes global.",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#faff69" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  },
];

function GeometricPattern({ rotation }: { rotation: ReturnType<typeof useTransform<number, number>> }) {
  return (
    <motion.div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ rotate: rotation, opacity: 0.04 }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="geo" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <polygon points="40,4 76,20 76,60 40,76 4,60 4,20" fill="none" stroke="#faff69" strokeWidth="0.8" />
            <polygon points="40,14 66,26 66,54 40,66 14,54 14,26" fill="none" stroke="#faff69" strokeWidth="0.5" />
            <line x1="40" y1="4" x2="40" y2="76" stroke="#faff69" strokeWidth="0.3" />
            <line x1="4" y1="40" x2="76" y2="40" stroke="#faff69" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#geo)" />
      </svg>
    </motion.div>
  );
}

export function Vision2030() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 12]);

  return (
    <section ref={sectionRef} className="bg-canvas py-24 relative overflow-hidden">
      <GeometricPattern rotation={rotation} />

      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 50% at 80% 50%, rgba(26,0,8,0.3) 0%, transparent 70%)"
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.span
          initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: 0.3, ease: ease.out }}
          className="text-[12px] font-semibold tracking-widest uppercase block mb-4"
          style={{ color: "rgba(250,255,105,0.6)" }}
        >
          Made in Saudi Arabia
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.slow, delay: 0.1, ease: ease.out }}
          className="text-on-dark font-bold mb-16 max-w-2xl"
          style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.05, letterSpacing: "-2.5px" }}
        >
          SAUDI TECH.{" "}
          <span style={{ color: "#faff69" }}>BUILT HERE, DEPLOYED GLOBALLY.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map(({ title, body, icon }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: REVEAL_MARGIN }}
              transition={{ duration: dur.normal, delay: 0.2 + i * 0.1, ease: ease.out }}
              className="rounded-xl p-6 border"
              style={{ background: "rgba(12,12,12,0.5)", borderColor: "rgba(250,255,105,0.08)" }}
            >
              <div className="mb-4">{icon}</div>
              <h3 className="text-on-dark font-bold text-base mb-2 tracking-tight">{title}</h3>
              <p className="text-body-text text-sm leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
