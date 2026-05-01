"use client";

import Image from "next/image";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const SPORTS = [
  {
    name: "Football",
    sub: "The world's game",
    image: "https://images.unsplash.com/photo-1574629810-1700158b5be4?w=900&q=80&auto=format&fit=crop",
    span: "col-span-2 row-span-2",
    large: true,
  },
  {
    name: "Basketball",
    sub: "NBA & leagues",
    image: "https://images.unsplash.com/photo-1546519638405-a4dbe0c5f0c4?w=600&q=80&auto=format&fit=crop",
    span: "col-span-1",
    large: false,
  },
  {
    name: "Motorsport",
    sub: "F1 & racing",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80&auto=format&fit=crop",
    span: "col-span-1",
    large: false,
  },
  {
    name: "Tennis",
    sub: "ATP / WTA",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&q=80&auto=format&fit=crop",
    span: "col-span-1",
    large: false,
  },
  {
    name: "Cricket",
    sub: "IPL & T20",
    image: "https://images.unsplash.com/photo-1540747913346-19212a4b1dc7?w=600&q=80&auto=format&fit=crop",
    span: "col-span-1",
    large: false,
  },
  {
    name: "Rugby",
    sub: "Union & League",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80&auto=format&fit=crop",
    span: "col-span-1",
    large: false,
  },
  {
    name: "Combat Sports",
    sub: "UFC & MMA",
    image: "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=600&q=80&auto=format&fit=crop",
    span: "col-span-1",
    large: false,
  },
  {
    name: "Volleyball",
    sub: "Beach & indoor",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80&auto=format&fit=crop",
    span: "col-span-1",
    large: false,
  },
];

interface SportCardProps {
  name: string;
  sub: string;
  image: string;
  span: string;
  large: boolean;
  index: number;
}

function SportCard({ name, sub, image, span, large, index }: SportCardProps) {
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);
  const glow = useMotionTemplate`radial-gradient(${large ? "260px" : "180px"} circle at ${mouseX}px ${mouseY}px, rgba(250,255,105,0.12), transparent 70%)`;

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
      onMouseLeave={() => { mouseX.set(-999); mouseY.set(-999); }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden rounded-xl border border-hairline ${span} ${large ? "min-h-[320px]" : "min-h-[160px]"} cursor-default`}
    >
      {/* Image */}
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        unoptimized
      />

      {/* Base dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      {/* Mouse glow overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: glow }}
      />

      {/* Corner brackets */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-primary" />
        <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-primary" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-primary" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-primary" />
      </div>

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className={`text-white font-bold leading-tight ${large ? "text-2xl" : "text-base"}`}>{name}</p>
        <p className="text-white/60 text-[13px] mt-0.5">{sub}</p>
      </div>
    </motion.div>
  );
}

export function SportsScope() {
  return (
    <section id="sports" className="bg-canvas py-24">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <span className="text-primary text-[12px] font-semibold tracking-widest uppercase">
            Built for every sport
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2
            className="text-on-dark font-bold mt-4 max-w-2xl"
            style={{ fontSize: "clamp(26px, 3.5vw, 40px)", lineHeight: 1.15 }}
          >
            Football, basketball, tennis, cricket — if you have fans, you have revenue waiting.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-body-text mt-4 max-w-xl">
            Sportech works for any sport, any club, any league. The infrastructure is the same. Only the badge changes.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 md:auto-rows-[minmax(160px,auto)] gap-3">
          {SPORTS.map((sport, i) => (
            <SportCard key={sport.name} {...sport} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
