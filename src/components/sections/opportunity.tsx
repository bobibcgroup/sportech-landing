"use client";

import { motion, useMotionValue, useInView, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface CounterAnimationProps {
  target: number;
  prefix?: string;
  suffix?: string;
}

function CounterAnimation({ target, prefix = "", suffix = "" }: CounterAnimationProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);

  useEffect(() => {
    if (inView) {
      animate(mv, target, { duration: 2, ease: "easeOut" });
    }
  }, [inView, mv, target]);

  return (
    <span ref={ref}>
      <motion.span>{display}</motion.span>
    </span>
  );
}

const STATS = [
  {
    target: 200,
    prefix: "€",
    suffix: "M+",
    label: "Annual digital revenue FC Barcelona generates from its fan platform alone.",
    delay: 0,
  },
  {
    target: 35,
    prefix: "",
    suffix: "%",
    label: "Increase in fan loyalty Manchester United saw from digital membership in year one.",
    delay: 0.15,
  },
  {
    target: 100,
    prefix: "",
    suffix: "",
    label: "Countries PSG's fan token reached in its first year — generating $20M+ in digital currency sales.",
    delay: 0.3,
  },
];

export function Opportunity() {
  return (
    <section className="bg-canvas py-24">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <span className="text-primary text-[12px] font-semibold tracking-widest uppercase">
            The Opportunity
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-on-dark font-bold mt-4 max-w-2xl" style={{ fontSize: 40, lineHeight: 1.15 }}>
            The world&apos;s biggest sports clubs proved it. Now it&apos;s your turn.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {STATS.map(({ target, prefix, suffix, label, delay }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
              className="bg-surface-card border border-hairline rounded-xl p-8"
            >
              <div
                className="text-primary font-bold leading-none"
                style={{ fontSize: 56, letterSpacing: "-1.5px" }}
              >
                <CounterAnimation target={target} prefix={prefix} suffix={suffix} />
              </div>
              <p className="text-body-text text-sm leading-relaxed mt-4">{label}</p>
            </motion.div>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <p className="text-body-text text-center mt-12 max-w-3xl mx-auto leading-relaxed">
            These clubs built platforms from scratch, at enormous cost. Sportech gives you
            everything they built — and more — for free.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
