"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useInView, useTransform, useScroll, animate } from "framer-motion";
import { ease, dur, COUNTER_DURATION, REVEAL_MARGIN } from "@/lib/animation";
import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/translations";

interface CounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
}

function Counter({ target, prefix = "", suffix = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: REVEAL_MARGIN });
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, target, {
      duration: COUNTER_DURATION / 1000,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [inView, mv, target]);

  return <span ref={ref}><motion.span>{display}</motion.span></span>;
}

const STATS = [
  { target: 220, prefix: "$", suffix: "M+", attribution: "FC Barcelona annual digital revenue, publicly reported", delay: 0 },
  { target: 35, prefix: "", suffix: "%", attribution: "Manchester United fan loyalty increase, Year 1", delay: 0.2 },
  { target: 100, prefix: "", suffix: "+", attribution: "Countries with PSG fan token holders", delay: 0.4 },
];

export function Opportunity() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const glowOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.7, 1], [0, 0.6, 0.6, 0]);

  const { lang } = useLanguage();
  const tx = t[lang].opportunity;

  return (
    <section ref={sectionRef} className="bg-canvas py-28 relative overflow-hidden">
      {/* Stadium blue atmospheric bleed */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: glowOpacity,
          background: "radial-gradient(ellipse 60% 80% at 0% 50%, rgba(13,27,62,0.7) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }}
          transition={{ duration: dur.slow, delay: 0.1, ease: ease.out }}
          className="text-on-dark font-bold mb-16 max-w-2xl"
          style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-2px" }}
        >
          {tx.heading}
        </motion.h2>

        {/* Counter cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map(({ target, prefix, suffix, attribution, delay }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: REVEAL_MARGIN }}
              transition={{ duration: 0.8, delay, ease: ease.out }}
              className="rounded-2xl p-8 border"
              style={{
                background: "rgba(10,10,10,0.6)",
                borderColor: "rgba(var(--color-primary-rgb),0.12)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                className="font-bold leading-none mb-2"
                style={{ fontSize: "clamp(48px, 5vw, 82px)", letterSpacing: "-4px", color: "var(--color-primary)" }}
              >
                <Counter target={target} prefix={prefix} suffix={suffix} />
              </div>
              <p className="text-[13px] leading-relaxed mt-4" style={{ color: "rgba(255,255,255,0.5)" }}>
                {attribution}
              </p>
              <p className="text-body-text text-sm leading-relaxed mt-2">
                {tx.stats[i]}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }}
          transition={{ duration: dur.normal, delay: 0.6, ease: ease.out }}
          className="text-center mt-14 font-semibold"
          style={{ fontSize: "clamp(18px, 2vw, 22px)", color: "rgba(255,255,255,0.85)" }}
        >
          Your club does not have this yet.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }}
          transition={{ duration: dur.normal, delay: 0.8 }}
          className="text-body-text text-sm text-center mt-3 max-w-2xl mx-auto leading-relaxed"
        >
          {tx.footer}
        </motion.p>
      </div>
    </section>
  );
}
