"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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

function IPhoneFrame({ src, label, badge, delay, scale = 1 }: {
  src: string; label: string; badge: string; delay: number; scale?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: REVEAL_MARGIN }}
      transition={{ duration: 0.7, delay, ease: ease.out }}
      className="flex flex-col items-center gap-4"
      style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}
    >
      <div className="relative" style={{ width: 195, height: 400 }}>
        <div
          className="absolute inset-0 rounded-[38px]"
          style={{
            background: "linear-gradient(160deg, #2e2e2e 0%, #181818 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 32px 72px rgba(0,0,0,0.72), 0 0 0 0.5px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        />
        {/* Side buttons */}
        <div className="absolute" style={{ left: -3, top: 78, width: 3, height: 26, borderRadius: "2px 0 0 2px", background: "#252525" }} />
        <div className="absolute" style={{ left: -3, top: 114, width: 3, height: 44, borderRadius: "2px 0 0 2px", background: "#252525" }} />
        <div className="absolute" style={{ left: -3, top: 166, width: 3, height: 44, borderRadius: "2px 0 0 2px", background: "#252525" }} />
        <div className="absolute" style={{ right: -3, top: 118, width: 3, height: 64, borderRadius: "0 2px 2px 0", background: "#252525" }} />
        {/* Screen */}
        <div className="absolute overflow-hidden bg-black" style={{ inset: 7, borderRadius: 32 }}>
          <Image src={src} alt={label} fill style={{ objectFit: "cover", objectPosition: "top" }} unoptimized />
        </div>
        {/* Dynamic Island */}
        <div className="absolute z-20"
          style={{ top: 17, left: "50%", transform: "translateX(-50%)", width: 86, height: 25, borderRadius: 14, background: "#0a0a0a" }}
        />
      </div>
      <div className="text-center">
        <span className="text-primary text-[10px] font-bold tracking-widest uppercase">{badge}</span>
        <p className="text-white/60 text-[13px] font-medium mt-0.5">{label}</p>
      </div>
    </motion.div>
  );
}

export function AppGallery() {
  const clusterRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const tx = t[lang].gallery;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-6, 6]), { stiffness: 60, damping: 20 });
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [4, -4]), { stiffness: 60, damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!clusterRef.current) return;
    const rect = clusterRef.current.getBoundingClientRect();
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
        style={{ background: "linear-gradient(90deg, transparent, rgba(250,255,105,0.25) 30%, rgba(250,255,105,0.5) 50%, rgba(250,255,105,0.25) 70%, transparent)" }}
      />
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: 0.08 }}
      >
        <source src="/cinematic/app-ui-demo.mp4" type="video/mp4" />
      </video>
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

        <motion.div
          ref={clusterRef}
          style={{ rotateY, rotateX, perspective: 1200 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="grid grid-cols-2 lg:grid-cols-5 gap-3 items-start justify-items-center cursor-grab active:cursor-grabbing"
        >
          {tx.screens.map((screen, i) => (
            <IPhoneFrame
              key={i}
              src={SCREENSHOT_SRCS[i]}
              label={screen.label}
              badge={screen.badge}
              delay={i * 0.1}
              scale={i === 1 || i === 2 || i === 3 ? 1 : 0.88}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
