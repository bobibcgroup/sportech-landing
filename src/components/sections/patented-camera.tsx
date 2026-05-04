"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ease, dur, REVEAL_MARGIN } from "@/lib/animation";

export function PatentedCamera() {
  return (
    <section className="bg-canvas py-24 relative overflow-hidden" id="camera">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 50%, rgba(240,244,248,0.025) 100%)"
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.fast }}
          className="flex justify-center mb-8"
        >
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full border"
            style={{ color: "#faff69", borderColor: "rgba(250,255,105,0.3)", background: "rgba(250,255,105,0.08)" }}>
            PATENTED
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: 0.6, ease: ease.overshoot }}
          className="text-on-dark font-bold text-center mb-16"
          style={{ fontSize: "clamp(32px, 5.5vw, 64px)", lineHeight: 1.0, letterSpacing: "-3px" }}
        >
          SEE THE GAME<br /><span style={{ color: "#faff69" }}>FROM INSIDE IT.</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.slow, ease: ease.out }}
            className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3", background: "#0d0d0d" }}
          >
            <Image src="/cinematic/player-camera-hardware.jpg" alt="Jersey-mounted player camera" fill className="object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%)" }} />
            <div className="absolute bottom-4 left-4">
              <p className="text-primary text-[11px] font-bold tracking-widest uppercase">Player Camera Hardware</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.slow, delay: 0.2, ease: ease.out }}
            className="relative rounded-2xl overflow-hidden group"
            style={{ aspectRatio: "4/3", background: "#0d0d0d", border: "1px solid rgba(250,255,105,0.12)" }}
          >
            <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
              <source src="/cinematic/player-pov.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.07) 0px, rgba(0,0,0,0.07) 1px, transparent 1px, transparent 3px)" }} />
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-emerald" style={{ animation: "dot-pulse 1.5s ease-in-out infinite" }} />
              <span className="text-accent-emerald text-[11px] font-bold uppercase tracking-wider">Live Feed</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.normal, delay: 0.5, ease: ease.out }}
          className="text-center mt-12 max-w-2xl mx-auto"
        >
          <p className="text-body-text leading-relaxed">
            A tiny camera mounted on the jersey. Fans pick their player and watch the match from inside the pitch … live, no delay. PSG doesn&apos;t have this. Barcelona doesn&apos;t. It&apos;s ours. It&apos;s patented.
          </p>
          <p className="text-body-text leading-relaxed mt-3">
            Fans pay to access it. Clubs earn{" "}
            <span className="font-bold" style={{ color: "#faff69" }}>50%</span> of everything they pay.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
