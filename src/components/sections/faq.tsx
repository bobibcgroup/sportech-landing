"use client";

import { motion } from "framer-motion";
import { ease, dur, REVEAL_MARGIN } from "@/lib/animation";
import { useLanguage } from "@/lib/language-context";

const COPY = {
  en: {
    heading: "The questions every club asks.",
    items: [
      {
        q: "What does the platform cost the club?",
        a: "Nothing. We design, build, operate and fund the entire platform. Your club earns an agreed share of every transaction from day one of launch.",
      },
      {
        q: "How fast can we launch?",
        a: "A white-label app in your club's identity is typically live within weeks. Core revenue streams activate at launch, and the full set of eight phases in across your first year.",
      },
      {
        q: "Are match predictions a form of betting?",
        a: "No. Predictions are skill-based entertainment using platform tokens. No real money is staked, and the fan wallet is closed-loop, working like a loyalty program.",
      },
      {
        q: "Who operates payments, ticketing and support?",
        a: "Sportech runs the full stack end to end through a modular API architecture, integrated with regional payment and ticketing providers.",
      },
      {
        q: "Where is fan data stored?",
        a: "In-region, per market, and governed by the partnership agreement, with tiered identity verification built in.",
      },
      {
        q: "How is the revenue share structured?",
        a: "Per partnership, with a minimum guarantee floor for the club. Full commercial terms are set out in the agreement.",
      },
    ],
  },
  ar: {
    heading: "الأسئلة التي يطرحها كل نادٍ.",
    items: [
      {
        q: "كم تكلّف المنصة النادي؟",
        a: "لا شيء. نحن نصمم ونبني ونشغّل ونموّل المنصة بالكامل. ناديك يحصل على حصة متفق عليها من كل عملية منذ يوم الإطلاق.",
      },
      {
        q: "ما سرعة الإطلاق؟",
        a: "تطبيق بهوية ناديك يكون جاهزاً عادة خلال أسابيع. تنطلق تدفقات الإيراد الأساسية مع الإطلاق، وتكتمل الثمانية تدريجياً خلال السنة الأولى.",
      },
      {
        q: "هل التنبؤات شكل من أشكال المراهنة؟",
        a: "لا. التنبؤات ترفيه قائم على المهارة باستخدام رموز المنصة. لا تُراهن أموال حقيقية، ومحفظة المشجع مغلقة وتعمل كبرنامج ولاء.",
      },
      {
        q: "من يدير المدفوعات والتذاكر والدعم؟",
        a: "سبورتك تدير المنظومة كاملة من البداية إلى النهاية عبر بنية برمجية معيارية، متكاملة مع مزودي الدفع والتذاكر الإقليميين.",
      },
      {
        q: "أين تُخزَّن بيانات المشجعين؟",
        a: "داخل المنطقة، لكل سوق على حدة، ووفق اتفاقية الشراكة، مع تحقق متدرج من الهوية.",
      },
      {
        q: "كيف تُنظَّم حصة الإيرادات؟",
        a: "لكل شراكة شروطها، مع حد أدنى مضمون للنادي. تُحدَّد الشروط التجارية الكاملة في الاتفاقية.",
      },
    ],
  },
} as const;

export function FAQ() {
  const { lang } = useLanguage();
  const tx = COPY[lang];

  return (
    <section className="bg-canvas py-28 relative overflow-hidden" id="faq">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }}
          transition={{ duration: dur.slow, ease: ease.out }}
          className="text-on-dark font-bold mb-14 max-w-xl"
          style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-2px" }}
        >
          {tx.heading}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {tx.items.map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: REVEAL_MARGIN }}
              transition={{ duration: dur.normal, delay: (i % 2) * 0.08, ease: ease.out }}
            >
              <h3 className="text-on-dark font-semibold text-base tracking-tight mb-2">
                {item.q}
              </h3>
              <p className="text-body-text text-sm leading-relaxed max-w-[52ch]">
                {item.a}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
