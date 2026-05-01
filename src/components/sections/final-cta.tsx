"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function FinalCTA() {
  return (
    <motion.section
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="bg-primary py-24"
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <span
              className="text-[12px] font-semibold tracking-widest uppercase"
              style={{ color: "rgba(10,10,10,0.7)" }}
            >
              Join the First Wave
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-on-primary font-bold mt-4" style={{ fontSize: 40, lineHeight: 1.15 }}>
              Your club. Your app. Built and running before your competitors even start.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p
              className="text-base mt-6 leading-relaxed max-w-lg mx-auto"
              style={{ color: "rgba(10,10,10,0.8)" }}
            >
              Sportech is onboarding a limited number of partner clubs in this first phase.
              Zero cost. Zero risk. Full platform. 50% of every dollar your fans spend.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-8">
              <motion.a
                href="mailto:contact@sportech.com.sa"
                className="inline-flex items-center justify-center bg-on-primary text-primary text-sm font-semibold rounded-lg px-8 h-12 hover:bg-[#1a1a1a] transition-colors duration-200"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Partner With Us &rarr;
              </motion.a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <p className="text-sm mt-6" style={{ color: "rgba(10,10,10,0.6)" }}>
              Or reach us directly: contact@sportech.com.sa
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p
              className="text-[12px] mt-4 tracking-wider uppercase"
              style={{ color: "rgba(10,10,10,0.5)" }}
            >
              No platform cost. No tech overhead. No risk. Just revenue.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </motion.section>
  );
}
