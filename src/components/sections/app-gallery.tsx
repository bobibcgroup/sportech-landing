"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ease, dur, REVEAL_MARGIN } from "@/lib/animation";
import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/translations";

const SCREENSHOT_SRCS = [
  "/appimages/IMG_6873.PNG",
  "/appimages/IMG_6875.PNG",
  "/appimages/IMG_6876.PNG",
  "/appimages/IMG_6877.PNG",
  "/appimages/IMG_6878.PNG",
];

function IPhoneFrame({ src, label, badge }: { src: string; label: string; badge: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: 220, height: 450 }}>
        <div
          className="absolute inset-0 rounded-[42px]"
          style={{
            background: "linear-gradient(160deg, #2e2e2e 0%, #181818 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.8), 0 0 0 0.5px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        />
        {/* Side buttons */}
        <div className="absolute" style={{ left: -3, top: 88, width: 3, height: 28, borderRadius: "2px 0 0 2px", background: "#252525" }} />
        <div className="absolute" style={{ left: -3, top: 126, width: 3, height: 48, borderRadius: "2px 0 0 2px", background: "#252525" }} />
        <div className="absolute" style={{ left: -3, top: 184, width: 3, height: 48, borderRadius: "2px 0 0 2px", background: "#252525" }} />
        <div className="absolute" style={{ right: -3, top: 132, width: 3, height: 72, borderRadius: "0 2px 2px 0", background: "#252525" }} />
        {/* Screen */}
        <div className="absolute overflow-hidden bg-black" style={{ inset: 8, borderRadius: 36 }}>
          <Image src={src} alt={label} fill style={{ objectFit: "cover", objectPosition: "top" }} unoptimized />
        </div>
        {/* Dynamic Island */}
        <div className="absolute z-20"
          style={{ top: 19, left: "50%", transform: "translateX(-50%)", width: 96, height: 28, borderRadius: 16, background: "#0a0a0a" }}
        />
      </div>
      <div className="text-center">
        <span className="text-primary text-[10px] font-bold tracking-widest uppercase">{badge}</span>
        <p className="text-white/60 text-[13px] font-medium mt-0.5">{label}</p>
      </div>
    </div>
  );
}

export function AppGallery() {
  const frameRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const tx = t[lang].gallery;

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-8, 8]), { stiffness: 60, damping: 20 });
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [5, -5]), { stiffness: 60, damping: 20 });

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % SCREENSHOT_SRCS.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + SCREENSHOT_SRCS.length) % SCREENSHOT_SRCS.length);
  }, []);

  const goTo = useCallback((idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }, [current]);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  function handleMouseMove(e: React.MouseEvent) {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const variants = {
    enter: (dir: number) => ({ x: dir * 50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -50, opacity: 0 }),
  };

  return (
    <section className="bg-canvas py-24 overflow-hidden relative" id="platform">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(250,255,105,0.25) 30%, rgba(250,255,105,0.5) 50%, rgba(250,255,105,0.25) 70%, transparent)" }}
      />
      {/* Edge focus blur */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(90deg, rgba(0,0,0,0.5) 0%, transparent 8%, transparent 92%, rgba(0,0,0,0.5) 100%)"
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.span
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }}
          transition={{ duration: 0.3, ease: ease.out }}
          className="text-[12px] font-semibold tracking-widest uppercase block mb-4"
          style={{ color: "rgba(250,255,105,0.6)" }}
        >
          {tx.badge}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }}
          transition={{ duration: dur.slow, delay: 0.1, ease: ease.out }}
          className="text-on-dark font-bold mb-16 max-w-xl"
          style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-2px" }}
        >
          {tx.heading}
        </motion.h2>

        {/* Slider */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-6 md:gap-10">
            {/* Prev */}
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 hover:scale-110"
              style={{ background: "rgba(250,255,105,0.06)", border: "1px solid rgba(250,255,105,0.14)" }}
              aria-label="Previous screen"
            >
              <ChevronLeft size={18} style={{ color: "rgba(250,255,105,0.7)" }} />
            </button>

            {/* Phone frame with AnimatePresence */}
            <motion.div
              ref={frameRef}
              style={{ rotateY, rotateX, perspective: 1000 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="cursor-grab active:cursor-grabbing"
            >
              <div style={{ position: "relative", width: 220, height: 490, overflow: "visible" }}>
                <AnimatePresence custom={direction} initial={false} mode="wait">
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ position: "absolute", inset: 0 }}
                  >
                    <IPhoneFrame
                      src={SCREENSHOT_SRCS[current]}
                      label={tx.screens[current].label}
                      badge={tx.screens[current].badge}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Next */}
            <button
              onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 hover:scale-110"
              style={{ background: "rgba(250,255,105,0.06)", border: "1px solid rgba(250,255,105,0.14)" }}
              aria-label="Next screen"
            >
              <ChevronRight size={18} style={{ color: "rgba(250,255,105,0.7)" }} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex gap-2 mt-10">
            {SCREENSHOT_SRCS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 20 : 7,
                  height: 7,
                  background: i === current ? "#faff69" : "rgba(255,255,255,0.2)",
                }}
                aria-label={`Go to screen ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
