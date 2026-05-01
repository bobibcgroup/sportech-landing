"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const STEPS = [
  {
    number: "1",
    title: "We Build It",
    description:
      "We design, build, and run everything. Your logo, your colors, your name. Ready in weeks.",
    delay: 0,
  },
  {
    number: "2",
    title: "Fans Engage",
    description:
      "Fans download your app, subscribe, predict match results, vote on tactics, buy merch, collect digital cards. Normal fan stuff, now on your terms.",
    delay: 0.2,
  },
  {
    number: "3",
    title: "Revenue Splits 50/50",
    description:
      "Every purchase, every subscription, every token spent. We cover the costs and take 50%. The rest lands in your account.",
    delay: 0.4,
  },
];

export function HowItWorks() {
  return (
    <section className="bg-surface-card py-24">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <span className="text-primary text-[12px] font-semibold tracking-widest uppercase">
            How It Works
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-on-dark font-bold mt-4 max-w-2xl" style={{ fontSize: "clamp(26px, 3.5vw, 40px)", lineHeight: 1.15 }}>
            We build it. Your fans use it. You collect half.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {STEPS.map(({ number, title, description, delay }) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-10 h-10 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center text-sm mb-5">
                {number}
              </div>
              <h3 className="text-on-dark font-semibold text-lg mb-3">{title}</h3>
              <p className="text-body-text text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <p className="text-on-dark font-bold text-center mt-16" style={{ fontSize: 32 }}>
            &ldquo;We bring the infrastructure. You bring the badge.&rdquo;
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
