"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ease, dur, REVEAL_MARGIN } from "@/lib/animation";
import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/translations";
import { BrandCustomizer } from "@/components/sections/brand-customizer";
import { useTheme } from "@/lib/theme-context";

const SCREENSHOT_SRCS = [
  "/appimages/frames/frame-0.png",
  "/appimages/frames/frame-2.png",
  "/appimages/frames/frame-3.png",
  "/appimages/frames/frame-4.png",
  "/appimages/frames/frame-5.png",
  "/appimages/frames/frame-6.png",
  "/appimages/frames/frame-7.png",
  "/appimages/frames/frame-8.png",
  "/appimages/frames/frame-9.png",
  "/appimages/frames/frame-10.png",
  "/appimages/frames/frame-11.png",
];

const N = SCREENSHOT_SRCS.length;
const PHONE_W = 210;
const PHONE_H = 450;
const SLOT_W = 200; // center-to-center distance between adjacent slots

function wrappedDist(i: number, current: number): number {
  const raw = i - current;
  if (raw > N / 2) return raw - N;
  if (raw < -N / 2) return raw + N;
  return raw;
}

function IPhoneFrame({ src, label, badge, isActive, primaryColor }: {
  src: string; label: string; badge: string; isActive: boolean; primaryColor: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3" style={{ width: PHONE_W }}>
      <div className="relative" style={{ width: PHONE_W, height: PHONE_H }}>
        <div
          className="absolute inset-0 rounded-[40px]"
          style={{
            background: "linear-gradient(160deg, #2e2e2e 0%, #181818 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: isActive
              ? `0 40px 80px rgba(0,0,0,0.85), 0 0 0 0.5px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.04), 0 0 60px ${primaryColor}4D`
              : "0 16px 32px rgba(0,0,0,0.5)",
          }}
        />
        {/* Side buttons */}
        <div className="absolute" style={{ left: -3, top: 84, width: 3, height: 26, borderRadius: "2px 0 0 2px", background: "#252525" }} />
        <div className="absolute" style={{ left: -3, top: 120, width: 3, height: 46, borderRadius: "2px 0 0 2px", background: "#252525" }} />
        <div className="absolute" style={{ left: -3, top: 176, width: 3, height: 46, borderRadius: "2px 0 0 2px", background: "#252525" }} />
        <div className="absolute" style={{ right: -3, top: 124, width: 3, height: 68, borderRadius: "0 2px 2px 0", background: "#252525" }} />
        {/* Screen */}
        <div className="absolute overflow-hidden bg-black" style={{ inset: 8, borderRadius: 34 }}>
          <Image src={src} alt={label} fill style={{ objectFit: "cover", objectPosition: "top" }} />
          {/* Tint overlay (A): colors the screenshot in the active brand color */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: primaryColor,
              opacity: 0.5,
              mixBlendMode: "overlay",
            }}
          />
        </div>
        {/* Dynamic Island */}
        <div className="absolute z-20"
          style={{ top: 18, left: "50%", transform: "translateX(-50%)", width: 90, height: 26, borderRadius: 14, background: "#0a0a0a" }}
        />
      </div>
      <div className="text-center" style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.3s ease" }}>
        <span className="text-primary text-[10px] font-bold tracking-widest uppercase">{badge}</span>
        <p className="text-white/60 text-[13px] font-medium mt-0.5">{label}</p>
      </div>
    </div>
  );
}

export function AppGallery() {
  const tiltRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const tx = t[lang].gallery;
  const { primaryColor } = useTheme();

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-6, 6]), { stiffness: 60, damping: 20 });
  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [4, -4]), { stiffness: 60, damping: 20 });

  const next = useCallback(() => setCurrent((p) => (p + 1) % N), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + N) % N), []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, paused]);

  function handleMouseMove(e: React.MouseEvent) {
    if (!tiltRef.current) return;
    const rect = tiltRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section className="bg-canvas py-24 overflow-hidden relative" id="platform">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(var(--color-primary-rgb),0.25) 30%, rgba(var(--color-primary-rgb),0.5) 50%, rgba(var(--color-primary-rgb),0.25) 70%, transparent)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.span
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }}
          transition={{ duration: 0.3, ease: ease.out }}
          className="text-[12px] font-semibold tracking-widest uppercase block mb-4"
          style={{ color: "rgba(var(--color-primary-rgb),0.6)" }}
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

        {/* Brand customizer — club search + color picker */}
        <BrandCustomizer />

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }}
          transition={{ duration: dur.slow, delay: 0.2, ease: ease.out }}
          className="flex flex-col items-center"
        >
          {/* Phone strip */}
          <motion.div
            ref={tiltRef}
            style={{ rotateY, rotateX, perspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => { handleMouseLeave(); setPaused(false); }}
          >
            {/* Overflow clip wrapper */}
            <div style={{ width: SLOT_W * 2 + PHONE_W, overflow: "hidden", position: "relative" }}>
              {/* Inner strip — all phones absolutely positioned */}
              <div style={{ position: "relative", height: PHONE_H + 72 }}>
                {SCREENSHOT_SRCS.map((src, i) => {
                  const d = wrappedDist(i, current);
                  const isActive = d === 0;
                  const isSide = Math.abs(d) === 1;
                  const hidden = Math.abs(d) >= 2;

                  return (
                    <motion.div
                      key={i}
                      animate={{
                        x: d * SLOT_W,
                        scale: isActive ? 1 : isSide ? 0.8 : 0.65,
                        opacity: hidden ? 0 : 1,
                        zIndex: isActive ? 10 : isSide ? 5 : 1,
                      }}
                      transition={{
                        duration: hidden ? 0 : 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{
                        position: "absolute",
                        left: "50%",
                        marginLeft: -(PHONE_W / 2),
                        top: 0,
                        filter: isActive ? "none" : "grayscale(1) brightness(0.38)",
                        cursor: isSide ? "pointer" : isActive ? "grab" : "default",
                        transformOrigin: "center top",
                      }}
                      onClick={() => isSide && setCurrent(i)}
                    >
                      <IPhoneFrame
                        src={src}
                        label={tx.screens[i % tx.screens.length]?.label ?? `Screen ${i + 1}`}
                        badge={tx.screens[i % tx.screens.length]?.badge ?? ""}
                        isActive={isActive}
                        primaryColor={primaryColor}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{ background: "rgba(var(--color-primary-rgb),0.06)", border: "1px solid rgba(var(--color-primary-rgb),0.14)" }}
              aria-label="Previous"
            >
              <ChevronLeft size={16} style={{ color: "rgba(var(--color-primary-rgb),0.7)" }} />
            </button>

            <div className="flex gap-2">
              {SCREENSHOT_SRCS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? 20 : 7,
                    height: 7,
                    background: i === current ? "var(--color-primary)" : "rgba(255,255,255,0.2)",
                  }}
                  aria-label={`Go to screen ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{ background: "rgba(var(--color-primary-rgb),0.06)", border: "1px solid rgba(var(--color-primary-rgb),0.14)" }}
              aria-label="Next"
            >
              <ChevronRight size={16} style={{ color: "rgba(var(--color-primary-rgb),0.7)" }} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
