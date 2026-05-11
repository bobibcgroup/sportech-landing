"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ease, dur, REVEAL_MARGIN } from "@/lib/animation";

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "center center"] });
  const glowScale = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(Math.min(8, Math.max(-8, e.clientX - centerX)));
    mouseY.set(Math.min(8, Math.max(-8, e.clientY - centerY)));
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section ref={sectionRef} className="bg-canvas py-40 relative overflow-hidden" id="contact">
      {/* Expanding gold glow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "120vw",
          height: "120vw",
          maxWidth: 1200,
          maxHeight: 1200,
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(250,255,105,0.10) 0%, rgba(212,160,23,0.04) 40%, transparent 70%)",
          scale: glowScale,
          opacity: glowOpacity,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-bold leading-[0.95] mb-6"
          style={{
            fontSize: "clamp(40px, 7vw, 80px)",
            letterSpacing: "-3.5px",
            color: "#ffffff",
          }}
        >
          YOUR CLUB.{" "}
          <span style={{ color: "#faff69" }}>YOUR REVENUE.</span>{" "}
          YOUR MOVE.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }}
          transition={{ duration: dur.normal, delay: 0.7, ease: ease.out }}
          className="text-body-text text-base leading-relaxed max-w-lg mx-auto mb-10"
        >
          We&apos;re bringing a select number of clubs on first. Free platform, zero risk, full feature set. Your revenue share across eight streams from day one.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }}
          transition={{ duration: dur.normal, delay: 0.9, ease: ease.out }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {/* Magnetic primary CTA */}
          <motion.a
            ref={buttonRef}
            href="mailto:contact@sportech.com.sa"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className="inline-flex items-center justify-center bg-primary text-on-primary text-base font-bold rounded-xl px-10 h-14 hover:bg-[#ffff80] transition-colors duration-200 whitespace-nowrap"
          >
            Book a Demo →
          </motion.a>

          {/* Secondary outline CTA */}
          <a
            href="mailto:contact@sportech.com.sa"
            className="inline-flex items-center justify-center border text-sm font-semibold rounded-xl px-8 h-14 transition-colors duration-200 whitespace-nowrap"
            style={{
              borderColor: "rgba(250,255,105,0.4)",
              color: "#faff69",
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(250,255,105,0.8)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(250,255,105,0.4)")}
          >
            Download Deck
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }}
          transition={{ duration: dur.fast, delay: 1.2 }}
          className="text-muted text-xs tracking-wider uppercase mt-8"
        >
          No cost. No catch. contact@sportech.com.sa
        </motion.p>
      </div>
    </section>
  );
}
