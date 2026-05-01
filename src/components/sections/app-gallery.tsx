"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/translations";

const SCREENSHOT_SRCS = [
  "/appimages/IMG_6873.PNG",
  "/appimages/IMG_6875.PNG",
  "/appimages/IMG_6877.PNG",
  "/appimages/IMG_6878.PNG",
];

interface IPhoneFrameProps {
  src: string;
  label: string;
  badge: string;
  delay: number;
}

function IPhoneFrame({ src, label, badge, delay }: IPhoneFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-4"
    >
      {/* iPhone 15 frame */}
      <div className="relative" style={{ width: 195, height: 400 }}>
        {/* Phone shell */}
        <div
          className="absolute inset-0 rounded-[38px]"
          style={{
            background: "linear-gradient(160deg, #2e2e2e 0%, #181818 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow:
              "0 32px 72px rgba(0,0,0,0.72), 0 0 0 0.5px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        />

        {/* Side buttons — left */}
        <div className="absolute" style={{ left: -3, top: 78, width: 3, height: 26, borderRadius: "2px 0 0 2px", background: "#252525" }} />
        <div className="absolute" style={{ left: -3, top: 114, width: 3, height: 44, borderRadius: "2px 0 0 2px", background: "#252525" }} />
        <div className="absolute" style={{ left: -3, top: 166, width: 3, height: 44, borderRadius: "2px 0 0 2px", background: "#252525" }} />
        {/* Power button — right */}
        <div className="absolute" style={{ right: -3, top: 118, width: 3, height: 64, borderRadius: "0 2px 2px 0", background: "#252525" }} />

        {/* Screen */}
        <div
          className="absolute overflow-hidden bg-black"
          style={{ inset: 7, borderRadius: 32 }}
        >
          <Image
            src={src}
            alt={label}
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
            unoptimized
          />
        </div>

        {/* Dynamic Island */}
        <div
          className="absolute z-20"
          style={{
            top: 17,
            left: "50%",
            transform: "translateX(-50%)",
            width: 86,
            height: 25,
            borderRadius: 14,
            background: "#0a0a0a",
          }}
        />
      </div>

      {/* Caption */}
      <div className="text-center">
        <span className="text-primary text-[10px] font-bold tracking-widest uppercase">{badge}</span>
        <p className="text-white/60 text-[13px] font-medium mt-0.5">{label}</p>
      </div>
    </motion.div>
  );
}

export function AppGallery() {
  const { lang } = useLanguage();
  const tx = t[lang].gallery;

  return (
    <section className="bg-canvas py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <span className="text-primary text-[12px] font-semibold tracking-widest uppercase">
            {tx.badge}
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2
            className="text-on-dark font-bold mt-4 max-w-2xl"
            style={{ fontSize: "clamp(26px, 3.5vw, 40px)", lineHeight: 1.15 }}
          >
            {tx.heading}
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 items-start justify-items-center">
          {tx.screens.map((screen, i) => (
            <IPhoneFrame
              key={i}
              src={SCREENSHOT_SRCS[i]}
              label={screen.label}
              badge={screen.badge}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
