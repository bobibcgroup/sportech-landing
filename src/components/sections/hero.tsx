"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ease, dur } from "@/lib/animation";
import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/translations";

export function Hero() {
  // Outer section is 200vh — gives scroll room for the cinematic lock effect
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Content fades out during first half of the 200vh scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.45], [0, -80]);
  // Video stays put, slow parallax drift upward
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const { lang } = useLanguage();
  const tx = t[lang].hero;

  const headlineEN = "YOUR CLUB'S REVENUE. FINALLY UNLOCKED.";
  const headlineText = lang === "en" ? headlineEN : tx.headline.join(" ");
  const words = headlineText.split(" ");

  return (
    // 200vh section — the sticky inner div locks the visual while page scrolls through
    <section ref={sectionRef} className="relative" style={{ height: "200vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-canvas">

        {/* Video — single layer, no overlapping image */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: videoY }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: 0.6,
              animation: "kenburns 16s ease-in-out infinite alternate",
            }}
          >
            <source src="/cinematic/hero-bg.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Vignette */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.88) 100%)",
          }}
        />

        {/* Lens flare */}
        <div
          className="absolute z-[2] w-full pointer-events-none"
          style={{
            top: "38%",
            height: 2,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(250,255,105,0.10) 35%, rgba(250,255,105,0.18) 50%, rgba(250,255,105,0.10) 65%, transparent 100%)",
            animation: "flare-pulse 6s ease-in-out infinite",
            transformOrigin: "center",
          }}
        />

        {/* Content — fades and rises as user scrolls */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <motion.span
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, duration: dur.fast, ease: ease.out }}
            className="text-[12px] font-semibold tracking-widest uppercase mb-8 block"
            style={{ color: "rgba(250,255,105,0.6)" }}
          >
            {tx.badge}
          </motion.span>

          <h1
            className="font-bold leading-[0.92] mb-8"
            style={{ fontSize: "clamp(44px, 6.5vw, 80px)", letterSpacing: "-3px" }}
          >
            {words.map((word, i) => {
              const isYellow = lang === "en" ? i >= words.length - 2 : i === words.length - 1;
              return (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.22em]"
                  style={{ color: isYellow ? "#faff69" : "#ffffff" }}
                  initial={{ opacity: 0, y: -28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2 + i * 0.1, duration: 0.55, ease: ease.out }}
                >
                  {word}
                </motion.span>
              );
            })}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.9, duration: dur.slow }}
            className="text-body-text text-base max-w-[480px] leading-relaxed mb-10"
          >
            {tx.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.3, duration: dur.normal, ease: ease.out }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-1 bg-primary text-on-primary text-sm font-semibold rounded-lg px-6 h-12 hover:bg-primary-active transition-colors duration-200"
            >
              {tx.cta1}
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-1 border border-hairline text-on-dark text-sm font-semibold rounded-lg px-6 h-12 hover:border-hairline-strong transition-colors duration-200"
            >
              {tx.cta2}
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          style={{ opacity: indicatorOpacity }}
        >
          <div
            className="text-muted text-xl"
            style={{ animation: "bounce-y 2s ease-in-out infinite" }}
          >
            ↓
          </div>
        </motion.div>
      </div>
    </section>
  );
}
