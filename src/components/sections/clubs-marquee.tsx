"use client";

import { motion } from "framer-motion";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ease, dur, REVEAL_MARGIN } from "@/lib/animation";

const ROW1 = ["Al-Nassr FC", "Al-Hilal FC", "Real Madrid", "FC Barcelona", "Manchester City", "PSG", "Bayern Munich", "Liverpool FC", "Al-Ahli FC"];
const ROW2 = ["Al-Ittihad FC", "Chelsea FC", "Arsenal FC", "Borussia Dortmund", "AC Milan", "Inter Milan", "Manchester United", "Ajax", "Juventus"];

function Pill({ name }: { name: string }) {
  return (
    <span className="bg-surface-card border border-hairline text-muted text-sm font-medium rounded-lg px-5 py-2 shrink-0 mx-2 hover:text-on-dark hover:border-hairline-strong transition-colors duration-200 cursor-default whitespace-nowrap">
      {name}
    </span>
  );
}

export function ClubsMarquee() {
  return (
    <section className="bg-canvas py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.span
          initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: 0.3, ease: ease.out }}
          className="text-[12px] font-semibold tracking-widest uppercase block mb-4"
          style={{ color: "rgba(var(--color-primary-rgb),0.6)" }}
        >
          The Brotherhood
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.slow, delay: 0.1, ease: ease.out }}
          className="text-on-dark font-bold max-w-xl"
          style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.05, letterSpacing: "-2.5px" }}
        >
          IN CONVERSATIONS WITH CLUBS ACROSS{" "}
          <span style={{ color: "var(--color-primary)" }}>3 LEAGUES. 10+ CLUBS.</span>
        </motion.h2>
      </div>

      <div className="space-y-0">
        <motion.div
          initial={{ x: "100%" }} whileInView={{ x: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }}
          transition={{ duration: 1.0, ease: ease.out }}
        >
          <InfiniteSlider speed={35}>
            {ROW1.map((name) => <Pill key={name} name={name} />)}
          </InfiniteSlider>
        </motion.div>

        {/* Yellow center divider */}
        <div className="w-full h-[1px] my-3" style={{ background: "rgba(var(--color-primary-rgb),0.25)" }} />

        <motion.div
          initial={{ x: "-100%" }} whileInView={{ x: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }}
          transition={{ duration: 1.0, ease: ease.out }}
        >
          <InfiniteSlider speed={28} reverse>
            {ROW2.map((name) => <Pill key={name} name={name} />)}
          </InfiniteSlider>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.normal, delay: 0.3 }}
          className="text-body-text text-sm text-center"
        >
          From the Saudi Pro League to Europe&apos;s top five. One platform runs them all.
        </motion.p>
      </div>
    </section>
  );
}
