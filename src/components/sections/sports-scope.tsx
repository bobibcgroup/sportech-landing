"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ease, dur, REVEAL_MARGIN } from "@/lib/animation";
import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/translations";

const CYCLE_MS = 4500;

const SPORTS = [
  {
    key: "football",
    src: "/sportscreens/soccer.webp",
    en: { name: "Football", fact: "4B+ fans worldwide. The biggest game there is." },
    ar: { name: "كرة القدم", fact: "أكثر من 4 مليارات مشجع حول العالم. اللعبة الأكبر على الإطلاق." },
  },
  {
    key: "basketball",
    src: "/sportscreens/basketball.webp",
    en: { name: "Basketball", fact: "2.5B fans. The second most-watched sport on earth." },
    ar: { name: "كرة السلة", fact: "2.5 مليار مشجع. ثاني أكثر الرياضات مشاهدة في العالم." },
  },
  {
    key: "motorsport",
    src: "/sportscreens/formula1.webp",
    en: { name: "Motorsport", fact: "1.5B+ cumulative F1 viewers every season, with a Saudi GP on the calendar." },
    ar: { name: "موتورسبورت", fact: "أكثر من 1.5 مليار مشاهدة للفورمولا 1 كل موسم، وجائزة السعودية الكبرى على الروزنامة." },
  },
  {
    key: "cricket",
    src: "/sportscreens/cricket.webp",
    en: { name: "Cricket", fact: "2.5B fans, dominant in South Asia and the Gulf." },
    ar: { name: "الكريكيت", fact: "2.5 مليار مشجع، الرياضة الأولى في جنوب آسيا والخليج." },
  },
  {
    key: "tennis",
    src: "/sportscreens/tennis.webp",
    en: { name: "Tennis", fact: "1B fans across 200+ countries." },
    ar: { name: "كرة المضرب", fact: "مليار مشجع في أكثر من 200 دولة." },
  },
  {
    key: "combat",
    src: "/sportscreens/martialarts.webp",
    en: { name: "Combat Sports", fact: "The fastest-growing sport in the Gulf." },
    ar: { name: "فنون القتال", fact: "الرياضة الأسرع نمواً في الخليج." },
  },
  {
    key: "esports",
    src: "/sportscreens/esports.webp",
    en: { name: "Esports", fact: "500M+ fans, and Riyadh hosts the Esports World Cup." },
    ar: { name: "الرياضات الإلكترونية", fact: "أكثر من 500 مليون مشجع، والرياض تستضيف كأس العالم للرياضات الإلكترونية." },
  },
  {
    key: "nfl",
    src: "/sportscreens/nfl.webp",
    en: { name: "American Football", fact: "The highest-revenue league on earth." },
    ar: { name: "كرة القدم الأمريكية", fact: "الدوري الأعلى إيراداً في العالم." },
  },
  {
    key: "baseball",
    src: "/sportscreens/baseball.webp",
    en: { name: "Baseball", fact: "70M+ stadium visits every MLB season." },
    ar: { name: "البيسبول", fact: "أكثر من 70 مليون حضور في ملاعب MLB كل موسم." },
  },
  {
    key: "volleyball",
    src: "/sportscreens/volleyball.webp",
    en: { name: "Volleyball", fact: "800M fans across five continents." },
    ar: { name: "الكرة الطائرة", fact: "800 مليون مشجع في خمس قارات." },
  },
  {
    key: "swimming",
    src: "/sportscreens/swimming.webp",
    en: { name: "Swimming", fact: "2B Olympic viewers every four years." },
    ar: { name: "السباحة", fact: "ملياري مشاهد أولمبي كل أربع سنوات." },
  },
  {
    key: "polo",
    src: "/sportscreens/polo.webp",
    en: { name: "Polo", fact: "A heritage sport with an ultra-premium fanbase." },
    ar: { name: "البولو", fact: "رياضة عريقة بقاعدة جماهيرية فائقة التميز." },
  },
  {
    key: "dance",
    src: "/sportscreens/dance.webp",
    en: { name: "Dance", fact: "Breaking made its Olympic debut at Paris 2024." },
    ar: { name: "الرقص الرياضي", fact: "البريك دانس ظهر لأول مرة في أولمبياد باريس 2024." },
  },
];

export function SportsScope() {
  const { lang } = useLanguage();
  const tx = t[lang].sports;
  const [active, setActive] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });

  const sport = SPORTS[active];
  const next = SPORTS[(active + 1) % SPORTS.length];

  useEffect(() => {
    if (!autoPlay || hovered || reduceMotion || !inView) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % SPORTS.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [autoPlay, hovered, reduceMotion, inView]);

  return (
    <section ref={sectionRef} className="bg-canvas py-24 relative overflow-hidden" id="sports">
      {/* Faint brand glow behind the showcase */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/3 bottom-0 pointer-events-none"
        style={{ background: "radial-gradient(55% 45% at 50% 55%, rgba(var(--color-primary-rgb), 0.045) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.slow, delay: 0.1, ease: ease.out }}
          className="text-on-dark font-bold max-w-2xl"
          style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.05, letterSpacing: "-2.5px" }}
        >
          {tx.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.slow, delay: 0.2, ease: ease.out }}
          className="mt-5 max-w-xl text-[15px] leading-relaxed"
          style={{ color: "var(--color-muted)" }}
        >
          {tx.body}
        </motion.p>

        {/* Sport switcher */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.normal, delay: 0.3, ease: ease.out }}
          role="tablist"
          aria-label={tx.heading}
          className="mt-10 flex flex-wrap gap-2"
        >
          {SPORTS.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => { setActive(i); setAutoPlay(false); }}
                className={`rounded-full border px-4 py-2 text-[13px] font-semibold tracking-tight transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  isActive
                    ? "bg-primary text-on-primary border-transparent"
                    : "text-muted border-white/10 hover:text-white hover:border-primary/50"
                }`}
              >
                {s[lang].name}
              </button>
            );
          })}
        </motion.div>

        {/* App screens showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.slow, delay: 0.35, ease: ease.out }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div
            className="relative mt-8 rounded-2xl overflow-hidden aspect-[16/9]"
            style={{ background: "#000", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={sport.key}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.015 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.6, ease: ease.out }}
              >
                <Image
                  src={sport.src}
                  alt={`Sportech app screens for ${sport.en.name.toLowerCase()}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1330px) 94vw, 1232px"
                />
              </motion.div>
            </AnimatePresence>

            {/* Prefetch the upcoming sport so the crossfade never flashes */}
            <div aria-hidden className="absolute inset-0 opacity-0 pointer-events-none">
              <Image src={next.src} alt="" fill className="object-contain" sizes="(max-width: 768px) 100vw, (max-width: 1330px) 94vw, 1232px" />
            </div>
          </div>

          {/* Caption */}
          <div className="mt-4 min-h-[24px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={sport.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: reduceMotion ? 0 : 0.3, ease: ease.out }}
                className="text-sm"
                style={{ color: "var(--color-muted)" }}
              >
                <span className="text-on-dark font-semibold">{sport[lang].name}.</span>{" "}
                {sport[lang].fact}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
