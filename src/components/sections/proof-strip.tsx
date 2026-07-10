"use client";

import { motion } from "framer-motion";
import { ease, dur, REVEAL_MARGIN } from "@/lib/animation";
import { useLanguage } from "@/lib/language-context";

const ITEMS = {
  en: [
    {
      title: "Signed with a Tier 1 club",
      sub: "Going live in Q4 2026",
    },
    {
      title: "FIFA preliminary approval",
      sub: "For the patented player camera technology",
    },
    {
      title: "Pipeline under NDA",
      sub: "Clubs across KSA, UAE and international markets",
    },
  ],
  ar: [
    {
      title: "اتفاقية موقَّعة مع نادٍ من الفئة الأولى",
      sub: "الإطلاق في الربع الأخير من 2026",
    },
    {
      title: "موافقة أولية من FIFA",
      sub: "لتقنية كاميرا اللاعب الحاصلة على براءة اختراع",
    },
    {
      title: "شراكات قيد التفاوض",
      sub: "أندية في السعودية والإمارات وأسواق عالمية",
    },
  ],
} as const;

export function ProofStrip() {
  const { lang } = useLanguage();
  const items = ITEMS[lang];

  return (
    <section className="bg-canvas border-y border-hairline relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: REVEAL_MARGIN }}
              transition={{ duration: dur.normal, delay: i * 0.1, ease: ease.out }}
              className="py-8 px-2 md:px-8 text-center md:border-s first:border-s-0 border-t md:border-t-0 first:border-t-0"
              style={{ borderColor: "var(--color-hairline)" }}
            >
              <p className="text-on-dark font-semibold text-[15px] tracking-tight">
                {item.title}
              </p>
              <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                {item.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
