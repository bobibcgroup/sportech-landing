"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const PILLARS = [
  {
    title: "Digital Transformation",
    body: "Saudi sports clubs at the forefront of fan technology. Not catching up to the West. Leading it.",
    delay: 0,
  },
  {
    title: "Local Innovation",
    body: "The patent is Saudi. The team is Saudi. The IP stays here.",
    delay: 0.15,
  },
  {
    title: "Sustainable Revenue Infrastructure",
    body: "Matchday revenue will never be enough on its own. This builds the revenue model that lasts.",
    delay: 0.3,
  },
];

export function Vision2030() {
  return (
    <section className="bg-canvas py-24">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <span className="text-primary text-[12px] font-semibold tracking-widest uppercase">
            Supporting Saudi Vision 2030
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-on-dark font-bold mt-4" style={{ fontSize: "clamp(26px, 3.5vw, 40px)", lineHeight: 1.15 }}>
            The digital sports economy. Built here.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {PILLARS.map(({ title, body, delay }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
              className="bg-surface-card border border-hairline rounded-xl p-8"
            >
              <h3 className="text-on-dark font-semibold text-lg mb-3">{title}</h3>
              <p className="text-body-text text-sm leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
