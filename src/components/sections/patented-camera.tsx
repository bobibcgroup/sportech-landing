"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { ease, dur, REVEAL_MARGIN } from "@/lib/animation";

const CAM_IMAGES = [
  "/camimages/cam01.jpeg",
  "/camimages/cam02.jpeg",
  "/camimages/cam03.jpeg",
];

function Lightbox({ index, onClose, onPrev, onNext }: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      {/* Image */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
        style={{ width: "min(92vw, 1100px)", aspectRatio: "4/3" }}
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 rounded-xl overflow-hidden"
          >
            <Image
              src={CAM_IMAGES[index]}
              alt={`Player camera view ${index + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 1100px) 92vw, 1100px"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Prev */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.12)" }}
          aria-label="Previous image"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>

        {/* Next */}
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.12)" }}
          aria-label="Next image"
        >
          <ChevronRight size={20} className="text-white" />
        </button>

        {/* Dot counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {CAM_IMAGES.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === index ? 20 : 6,
                height: 6,
                background: i === index ? "var(--color-primary)" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
        aria-label="Close lightbox"
      >
        <X size={18} className="text-white" />
      </button>

      {/* ESC hint */}
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] tracking-widest uppercase"
        style={{ color: "rgba(255,255,255,0.25)" }}>
        ESC to close · ← → to navigate
      </p>
    </motion.div>
  );
}

function CameraSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % CAM_IMAGES.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + CAM_IMAGES.length) % CAM_IMAGES.length);
  }, []);

  const goTo = useCallback((idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }, [current]);

  useEffect(() => {
    if (paused || lightbox) return;
    const timer = setInterval(next, 3500);
    return () => clearInterval(timer);
  }, [next, paused, lightbox]);

  const variants = {
    enter: (dir: number) => ({ x: dir * 40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -40, opacity: 0 }),
  };

  return (
    <>
      <div
        className="relative rounded-2xl overflow-hidden group"
        style={{ aspectRatio: "4/3", background: "#0d0d0d", cursor: "zoom-in" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onClick={() => setLightbox(true)}
      >
        <AnimatePresence custom={direction} initial={false} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={CAM_IMAGES[current]}
              alt={`Player camera view ${current + 1}`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.75) 100%)" }} />
          </motion.div>
        </AnimatePresence>

        {/* Expand hint — visible on hover */}
        <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.15)" }}>
          <Maximize2 size={14} className="text-white" />
        </div>

        {/* Arrows — stop propagation so they don't open lightbox */}
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.1)" }}
          aria-label="Previous image"
        >
          <ChevronLeft size={16} className="text-white" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.1)" }}
          aria-label="Next image"
        >
          <ChevronRight size={16} className="text-white" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {CAM_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); goTo(i); }}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 16 : 6,
                height: 6,
                background: i === current ? "var(--color-primary)" : "rgba(255,255,255,0.3)",
              }}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>

        {/* Label */}
        <div className="absolute bottom-4 left-4 z-10">
          <p className="text-primary text-[11px] font-bold tracking-widest uppercase">Player Camera Hardware</p>
        </div>
      </div>

      {/* Lightbox portal */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            index={current}
            onClose={() => setLightbox(false)}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </>
  );
}

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
            style={{ color: "var(--color-primary)", borderColor: "rgba(var(--color-primary-rgb),0.3)", background: "rgba(var(--color-primary-rgb),0.08)" }}>
            PATENTED
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: 0.6, ease: ease.overshoot }}
          className="text-on-dark font-bold text-center mb-16"
          style={{ fontSize: "clamp(32px, 5.5vw, 64px)", lineHeight: 1.0, letterSpacing: "-3px" }}
        >
          SEE THE GAME<br /><span style={{ color: "var(--color-primary)" }}>FROM INSIDE IT.</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.slow, ease: ease.out }}
          >
            <CameraSlider />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.slow, delay: 0.2, ease: ease.out }}
            className="relative rounded-2xl overflow-hidden group"
            style={{ aspectRatio: "4/3", background: "#0d0d0d", border: "1px solid rgba(var(--color-primary-rgb),0.12)" }}
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
            A tiny camera mounted on the jersey. Fans pick their player and watch the match from inside the pitch … live, no delay. Patented technology. Extraordinarily rare. Built by us.
          </p>
          <p className="text-body-text leading-relaxed mt-3">
            Fans pay to access it. Clubs earn a{" "}
            <span className="font-bold" style={{ color: "var(--color-primary)" }}>significant share</span> of everything they pay.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
