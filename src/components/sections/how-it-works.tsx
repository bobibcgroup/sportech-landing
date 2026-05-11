"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ease, dur, REVEAL_MARGIN } from "@/lib/animation";

const STEPS = [
  { num: "01", title: "We Build It", body: "We design, build, and operate everything. Your logo, colors, name. Live in weeks." },
  { num: "02", title: "Fans Engage", body: "Fans download your app, subscribe, predict, vote, buy merch, collect cards. All in one place." },
  { num: "03", title: "Revenue Splits", body: "Every purchase, every subscription, every token spent. We cover costs. You earn your agreed share.", highlight: true },
];

function ConnectorLine({ triggered }: { triggered: boolean }) {
  return (
    <svg className="absolute top-5 left-0 right-0 w-full hidden md:block" height="2" viewBox="0 0 800 2" preserveAspectRatio="none">
      <line x1="0" y1="1" x2="800" y2="1" stroke="rgba(250,255,105,0.12)" strokeWidth="1" />
      <motion.line
        x1="0" y1="1" x2="800" y2="1"
        stroke="rgba(250,255,105,0.5)" strokeWidth="1.5"
        strokeDasharray="800"
        initial={{ strokeDashoffset: 800 }}
        animate={{ strokeDashoffset: triggered ? 0 : 800 }}
        transition={{ duration: 1.2, ease: ease.out, delay: 0.3 }}
      />
    </svg>
  );
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggered = useInView(sectionRef, { once: true, margin: REVEAL_MARGIN });

  return (
    <section className="bg-canvas py-28 relative overflow-hidden" id="how-it-works">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.span
          initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: 0.3, ease: ease.out }}
          className="text-[12px] font-semibold tracking-widest uppercase block mb-4"
          style={{ color: "rgba(250,255,105,0.6)" }}
        >
          Zero Cost. Zero Risk. 100% Built.
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.slow, delay: 0.1, ease: ease.out }}
          className="text-on-dark font-bold mb-20 max-w-xl"
          style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.05, letterSpacing: "-2.5px" }}
        >
          We build it. Fans use it. You earn.
        </motion.h2>

        <div ref={sectionRef} className="relative">
          <ConnectorLine triggered={triggered} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {STEPS.map(({ num, title, body, highlight }, i) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 32 }}
                animate={triggered ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: dur.slow, delay: 0.4 + i * 0.2, ease: ease.out }}
                className="group"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={triggered ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.3, ease: ease.overshoot }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold mb-6 border"
                  style={{
                    background: highlight ? "#faff69" : "rgba(250,255,105,0.1)",
                    borderColor: highlight ? "#faff69" : "rgba(250,255,105,0.3)",
                    color: highlight ? "#0a0a0a" : "#faff69",
                  }}
                >
                  {num}
                </motion.div>
                <div
                  className="rounded-xl p-6 border transition-transform duration-200 group-hover:-translate-y-1"
                  style={{ background: "rgba(16,16,16,0.6)", borderColor: "rgba(250,255,105,0.08)" }}
                >
                  <h3 className="text-on-dark font-bold text-lg mb-3 tracking-tight">{title}</h3>
                  <p className="text-body-text text-sm leading-relaxed">{body}</p>
                  {highlight && (
                    <p className="font-bold mt-4" style={{ fontSize: 30, lineHeight: 1.15, letterSpacing: "-1px", color: "#faff69" }}>
                      YOUR SHARE
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.normal, delay: 0.4 }}
          className="text-on-dark font-bold text-center mt-20"
          style={{ fontSize: "clamp(18px, 2.5vw, 28px)", letterSpacing: "-0.5px" }}
        >
          &ldquo;We bring the infrastructure. You bring the badge.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
