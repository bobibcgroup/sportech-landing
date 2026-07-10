"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
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

  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState<number | null>(0);

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

        {/* Desktop: question rail + animated answer panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }}
          transition={{ duration: dur.normal, delay: 0.15, ease: ease.out }}
          className="hidden md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 items-start"
        >
          <div role="tablist" aria-label="FAQ questions" className="flex flex-col">
            {tx.items.map((item, i) => (
              <button
                key={item.q}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className="text-start py-4 ps-5 pe-4 border-s-2 transition-all duration-200 cursor-pointer group"
                style={{
                  borderColor: active === i ? "var(--color-primary)" : "rgba(255,255,255,0.08)",
                  background: active === i ? "rgba(var(--color-primary-rgb),0.04)" : "transparent",
                }}
              >
                <span
                  className="text-[15px] font-semibold tracking-tight transition-colors duration-200 group-hover:text-white"
                  style={{ color: active === i ? "#ffffff" : "rgba(255,255,255,0.5)" }}
                >
                  {item.q}
                </span>
              </button>
            ))}
          </div>

          <div
            className="rounded-2xl border p-10 min-h-[260px]"
            style={{
              background: "rgba(10,10,10,0.6)",
              borderColor: "rgba(var(--color-primary-rgb),0.12)",
              backdropFilter: "blur(8px)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: ease.out }}
              >
                <h3 className="text-on-dark font-bold text-xl tracking-tight mb-4">
                  {tx.items[active].q}
                </h3>
                <p className="text-body-text text-[15px] leading-relaxed max-w-[58ch]">
                  {tx.items[active].a}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Mobile: tap-to-expand rows */}
        <div className="md:hidden">
          {tx.items.map((item, i) => {
            const isOpen = mobileOpen === i;
            return (
              <div key={item.q} className="border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <button
                  onClick={() => setMobileOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-5 text-start cursor-pointer"
                >
                  <span
                    className="text-[15px] font-semibold tracking-tight transition-colors duration-200"
                    style={{ color: isOpen ? "#ffffff" : "rgba(255,255,255,0.6)" }}
                  >
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2, ease: ease.out }}
                    className="shrink-0"
                    style={{ color: isOpen ? "var(--color-primary)" : "rgba(255,255,255,0.35)" }}
                  >
                    <Plus size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: ease.out }}
                      className="overflow-hidden"
                    >
                      <p className="text-body-text text-sm leading-relaxed pb-5">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
