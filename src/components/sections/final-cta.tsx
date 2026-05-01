"use client";
import { motion, type Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.08,
      delayChildren: 0.5,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function FinalCTA() {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="bg-primary py-24"
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.span
            variants={itemVariants}
            className="block text-[12px] font-semibold tracking-widest uppercase"
            style={{ color: "rgba(10,10,10,0.7)" }}
          >
            Join the First Wave
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-on-primary font-bold mt-4"
            style={{ fontSize: "clamp(26px, 3.5vw, 40px)", lineHeight: 1.15 }}
          >
            Your club. Your app. Built and running before your competitors even start.
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-base mt-6 leading-relaxed max-w-lg mx-auto"
            style={{ color: "rgba(10,10,10,0.8)" }}
          >
            Sportech is onboarding a limited number of partner clubs in this first phase.
            Zero cost. Zero risk. Full platform. 50% of every dollar your fans spend.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8">
            <motion.a
              href="mailto:contact@sportech.com.sa"
              className="inline-flex items-center justify-center bg-on-primary text-primary text-sm font-semibold rounded-lg px-8 h-12 hover:bg-[#1a1a1a] transition-colors duration-200"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Partner With Us &rarr;
            </motion.a>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-sm mt-6"
            style={{ color: "rgba(10,10,10,0.6)" }}
          >
            Or reach us directly: contact@sportech.com.sa
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-[12px] mt-4 tracking-wider uppercase"
            style={{ color: "rgba(10,10,10,0.5)" }}
          >
            No platform cost. No tech overhead. No risk. Just revenue.
          </motion.p>
        </div>
      </div>
    </motion.section>
  );
}
