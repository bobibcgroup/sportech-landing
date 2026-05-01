"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/translations";

// Flat-top hexagon points
function hexPts(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (i * Math.PI) / 3;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
}

// ─── SVG sport illustrations ───────────────────────────────────────────────

function FootballBg() {
  const cx = 200, cy = 160;
  const spokes = Array.from({ length: 6 }, (_, i) => {
    const a = (i * Math.PI) / 3;
    return {
      x: (cx + 140 * Math.cos(a)).toFixed(1),
      y: (cy + 140 * Math.sin(a)).toFixed(1),
    };
  });
  return (
    <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      {/* Pitch lines */}
      <circle cx={cx} cy={cy} r={72} fill="none" stroke="white" strokeWidth="0.7" strokeOpacity="0.06" />
      <line x1="0" y1={cy} x2="400" y2={cy} stroke="white" strokeWidth="0.6" strokeOpacity="0.05" />
      <path d="M 130 320 A 80 80 0 0 1 270 320" fill="none" stroke="white" strokeWidth="0.6" strokeOpacity="0.05" />
      {/* Outer hex */}
      <polygon points={hexPts(cx, cy, 140)}
        fill="rgba(250,255,105,0.025)" stroke="#faff69" strokeWidth="1.6" strokeOpacity="0.45" />
      {/* Mid hex */}
      <polygon points={hexPts(cx, cy, 88)}
        fill="rgba(250,255,105,0.03)" stroke="#faff69" strokeWidth="1" strokeOpacity="0.32" />
      {/* Inner hex */}
      <polygon points={hexPts(cx, cy, 44)}
        fill="rgba(250,255,105,0.06)" stroke="#faff69" strokeWidth="1" strokeOpacity="0.52" />
      {/* Center dot */}
      <circle cx={cx} cy={cy} r={10}
        fill="rgba(250,255,105,0.16)" stroke="#faff69" strokeWidth="1" strokeOpacity="0.75" />
      {/* Spokes */}
      {spokes.map(({ x, y }, i) => (
        <line key={i} x1={cx} y1={cy} x2={x} y2={y}
          stroke="#faff69" strokeWidth="0.5" strokeOpacity="0.18" />
      ))}
      <text x="20" y="36" fill="#faff69" fontSize="9" fontFamily="monospace" letterSpacing="2" opacity="0.5">12 LEAGUES</text>
    </svg>
  );
}

function BasketballBg() {
  return (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      {/* Three-point arc */}
      <path d="M 10,148 Q 100,8 190,148" fill="none" stroke="#faff69" strokeWidth="1.2" strokeOpacity="0.5" />
      {/* Key/paint */}
      <rect x="62" y="100" width="76" height="48" fill="rgba(250,255,105,0.03)" stroke="#faff69" strokeWidth="0.7" strokeOpacity="0.3" />
      {/* Free-throw circle */}
      <circle cx="100" cy="100" r="28" fill="none" stroke="#faff69" strokeWidth="0.7" strokeOpacity="0.35" />
      {/* Ball */}
      <circle cx="152" cy="50" r="24" fill="rgba(250,255,105,0.08)" stroke="#faff69" strokeWidth="1.2" strokeOpacity="0.65" />
      {/* Ball seams */}
      <path d="M 128,50 Q 152,43 176,50" fill="none" stroke="#faff69" strokeWidth="0.9" strokeOpacity="0.5" />
      <path d="M 136,30 Q 150,50 138,70" fill="none" stroke="#faff69" strokeWidth="0.8" strokeOpacity="0.4" />
      <path d="M 168,30 Q 154,50 166,70" fill="none" stroke="#faff69" strokeWidth="0.8" strokeOpacity="0.4" />
    </svg>
  );
}

function MotorsportBg() {
  return (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      {/* Track outer */}
      <path d="M 22,130 L 22,78 Q 22,18 82,18 L 118,18 Q 178,18 178,78 L 178,100 Q 178,142 138,142 L 62,142 Q 22,142 22,130 Z"
        fill="rgba(250,255,105,0.025)" stroke="#faff69" strokeWidth="1.3" strokeOpacity="0.5" />
      {/* Track inner (infield) */}
      <path d="M 52,115 L 52,78 Q 52,48 82,48 L 118,48 Q 148,48 148,78 L 148,105 Q 148,115 138,115 L 62,115 Q 52,115 52,115 Z"
        fill="rgba(0,0,0,0.45)" stroke="#faff69" strokeWidth="0.7" strokeOpacity="0.28" />
      {/* Finish line */}
      <rect x="20" y="78" width="5" height="10" fill="#faff69" opacity="0.65" />
      <rect x="20" y="78" width="2.5" height="5" fill="#0a0a0a" opacity="0.7" />
      <rect x="22.5" y="83" width="2.5" height="5" fill="#0a0a0a" opacity="0.7" />
      {/* Car */}
      <rect x="94" y="20" width="12" height="7" rx="2" fill="#faff69" opacity="0.85" />
      {/* Speed lines */}
      <line x1="64" y1="21" x2="88" y2="21" stroke="#faff69" strokeWidth="0.8" strokeOpacity="0.4" strokeDasharray="4,3" />
      <line x1="68" y1="25" x2="88" y2="25" stroke="#faff69" strokeWidth="0.5" strokeOpacity="0.22" strokeDasharray="3,3" />
    </svg>
  );
}

function TennisBg() {
  return (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      {/* Court outline */}
      <rect x="18" y="16" width="164" height="128" fill="rgba(250,255,105,0.02)" stroke="#faff69" strokeWidth="1.2" strokeOpacity="0.45" rx="1" />
      {/* Singles lines */}
      <rect x="36" y="16" width="128" height="128" fill="none" stroke="#faff69" strokeWidth="0.6" strokeOpacity="0.28" />
      {/* Net */}
      <line x1="18" y1="80" x2="182" y2="80" stroke="#faff69" strokeWidth="1.6" strokeOpacity="0.6" />
      <line x1="18" y1="68" x2="18" y2="92" stroke="#faff69" strokeWidth="1.2" strokeOpacity="0.5" />
      <line x1="182" y1="68" x2="182" y2="92" stroke="#faff69" strokeWidth="1.2" strokeOpacity="0.5" />
      {/* Center service line */}
      <line x1="100" y1="16" x2="100" y2="80" stroke="#faff69" strokeWidth="0.6" strokeOpacity="0.28" />
      {/* Service line */}
      <line x1="36" y1="48" x2="164" y2="48" stroke="#faff69" strokeWidth="0.6" strokeOpacity="0.25" />
      {/* Ball + trail */}
      <line x1="124" y1="40" x2="145" y2="33" stroke="#faff69" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="2,2" />
      <circle cx="149" cy="32" r="8" fill="rgba(250,255,105,0.14)" stroke="#faff69" strokeWidth="1" strokeOpacity="0.7" />
    </svg>
  );
}

function CricketBg() {
  return (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      {/* Pitch */}
      <rect x="88" y="22" width="24" height="115" fill="rgba(250,255,105,0.04)" />
      {/* Crease lines */}
      <line x1="72" y1="38" x2="128" y2="38" stroke="#faff69" strokeWidth="0.8" strokeOpacity="0.4" />
      <line x1="72" y1="128" x2="128" y2="128" stroke="#faff69" strokeWidth="0.8" strokeOpacity="0.4" />
      {/* Stumps */}
      <line x1="92" y1="38" x2="92" y2="128" stroke="#faff69" strokeWidth="2.5" strokeOpacity="0.72" />
      <line x1="100" y1="38" x2="100" y2="128" stroke="#faff69" strokeWidth="2.5" strokeOpacity="0.72" />
      <line x1="108" y1="38" x2="108" y2="128" stroke="#faff69" strokeWidth="2.5" strokeOpacity="0.72" />
      {/* Bails */}
      <line x1="89" y1="38" x2="96" y2="36" stroke="#faff69" strokeWidth="1.8" strokeOpacity="0.85" />
      <line x1="104" y1="36" x2="111" y2="38" stroke="#faff69" strokeWidth="1.8" strokeOpacity="0.85" />
      {/* Ball */}
      <circle cx="152" cy="84" r="20" fill="rgba(250,255,105,0.08)" stroke="#faff69" strokeWidth="1.2" strokeOpacity="0.65" />
      <path d="M 152,64 Q 164,84 152,104" fill="none" stroke="#faff69" strokeWidth="0.9" strokeOpacity="0.5" />
    </svg>
  );
}

function RugbyBg() {
  return (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      {/* Goal posts (background) */}
      <line x1="16" y1="15" x2="16" y2="55" stroke="white" strokeWidth="0.9" strokeOpacity="0.1" />
      <line x1="6" y1="55" x2="26" y2="55" stroke="white" strokeWidth="0.9" strokeOpacity="0.1" />
      <line x1="168" y1="15" x2="168" y2="55" stroke="white" strokeWidth="0.9" strokeOpacity="0.1" />
      <line x1="158" y1="55" x2="178" y2="55" stroke="white" strokeWidth="0.9" strokeOpacity="0.1" />
      {/* Rugby ball */}
      <path d="M 28,80 Q 28,28 100,28 Q 172,28 172,80 Q 172,132 100,132 Q 28,132 28,80 Z"
        fill="rgba(250,255,105,0.06)" stroke="#faff69" strokeWidth="1.5" strokeOpacity="0.55" />
      {/* Center seam */}
      <line x1="28" y1="80" x2="172" y2="80" stroke="#faff69" strokeWidth="0.8" strokeOpacity="0.5" />
      {/* Lacing */}
      <line x1="96" y1="66" x2="104" y2="66" stroke="#faff69" strokeWidth="1.5" strokeOpacity="0.65" />
      <line x1="96" y1="73" x2="104" y2="73" stroke="#faff69" strokeWidth="1.5" strokeOpacity="0.65" />
      <line x1="96" y1="80" x2="104" y2="80" stroke="#faff69" strokeWidth="1.5" strokeOpacity="0.65" />
      <line x1="96" y1="87" x2="104" y2="87" stroke="#faff69" strokeWidth="1.5" strokeOpacity="0.65" />
      <line x1="100" y1="66" x2="100" y2="87" stroke="#faff69" strokeWidth="0.8" strokeOpacity="0.4" />
    </svg>
  );
}

function CombatSportsBg() {
  const cx = 100, cy = 80;
  const outer = Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4 + Math.PI / 8;
    return [cx + 72 * Math.cos(a), cy + 72 * Math.sin(a)] as [number, number];
  });
  const inner = Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4 + Math.PI / 8;
    return [cx + 45 * Math.cos(a), cy + 45 * Math.sin(a)] as [number, number];
  });
  const outerPts = outer.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const innerPts = inner.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  return (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      <polygon points={outerPts} fill="rgba(250,255,105,0.025)" stroke="#faff69" strokeWidth="1.5" strokeOpacity="0.5" />
      <polygon points={innerPts} fill="rgba(250,255,105,0.045)" stroke="#faff69" strokeWidth="0.8" strokeOpacity="0.35" />
      {outer.map(([ox, oy], i) => (
        <line key={i} x1={ox} y1={oy} x2={inner[i][0]} y2={inner[i][1]}
          stroke="#faff69" strokeWidth="0.5" strokeOpacity="0.2" />
      ))}
      <line x1={cx - 15} y1={cy} x2={cx + 15} y2={cy} stroke="#faff69" strokeWidth="0.8" strokeOpacity="0.42" />
      <line x1={cx} y1={cy - 15} x2={cx} y2={cy + 15} stroke="#faff69" strokeWidth="0.8" strokeOpacity="0.42" />
    </svg>
  );
}

function VolleyballBg() {
  const meshLines = Array.from({ length: 12 }, (_, i) => 20 + i * 13.4);
  return (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      {/* Net posts */}
      <line x1="18" y1="62" x2="18" y2="118" stroke="#faff69" strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="182" y1="62" x2="182" y2="118" stroke="#faff69" strokeWidth="1.5" strokeOpacity="0.5" />
      {/* Net top cable */}
      <line x1="18" y1="80" x2="182" y2="80" stroke="#faff69" strokeWidth="1.3" strokeOpacity="0.58" />
      {/* Net mesh */}
      {meshLines.map((x, i) => (
        <line key={i} x1={x} y1={80} x2={x} y2={108} stroke="#faff69" strokeWidth="0.4" strokeOpacity="0.2" />
      ))}
      <line x1="18" y1="94" x2="182" y2="94" stroke="#faff69" strokeWidth="0.4" strokeOpacity="0.18" />
      <line x1="18" y1="108" x2="182" y2="108" stroke="#faff69" strokeWidth="0.7" strokeOpacity="0.32" />
      {/* Ball */}
      <circle cx="100" cy="46" r="32" fill="rgba(250,255,105,0.07)" stroke="#faff69" strokeWidth="1.3" strokeOpacity="0.62" />
      {/* Ball seams */}
      <line x1="68" y1="46" x2="132" y2="46" stroke="#faff69" strokeWidth="0.8" strokeOpacity="0.45" />
      <path d="M 100,14 Q 84,46 100,78" fill="none" stroke="#faff69" strokeWidth="0.8" strokeOpacity="0.4" />
      <path d="M 100,14 Q 116,46 100,78" fill="none" stroke="#faff69" strokeWidth="0.8" strokeOpacity="0.4" />
      {/* Trajectory arc */}
      <path d="M 38,76 Q 68,28 100,14" fill="none" stroke="#faff69" strokeWidth="0.7" strokeOpacity="0.25" strokeDasharray="3,4" />
    </svg>
  );
}

// ─── Sport card data ────────────────────────────────────────────────────────

type SportKey = "Football" | "Basketball" | "Motorsport" | "Tennis" | "Cricket" | "Rugby" | "Combat Sports" | "Volleyball";

const SPORTS: { key: SportKey; span: string; large: boolean; Bg: () => React.JSX.Element }[] = [
  { key: "Football", span: "col-span-2 row-span-2", large: true, Bg: FootballBg },
  { key: "Basketball", span: "col-span-1", large: false, Bg: BasketballBg },
  { key: "Motorsport", span: "col-span-1", large: false, Bg: MotorsportBg },
  { key: "Tennis", span: "col-span-1", large: false, Bg: TennisBg },
  { key: "Cricket", span: "col-span-1", large: false, Bg: CricketBg },
  { key: "Rugby", span: "col-span-1", large: false, Bg: RugbyBg },
  { key: "Combat Sports", span: "col-span-1", large: false, Bg: CombatSportsBg },
  { key: "Volleyball", span: "col-span-1", large: false, Bg: VolleyballBg },
];

// ─── Sport card component ───────────────────────────────────────────────────

interface SportCardProps {
  sportKey: SportKey;
  name: string;
  sub: string;
  span: string;
  large: boolean;
  Bg: () => React.JSX.Element;
  index: number;
}

function SportCard({ name, sub, span, large, Bg, index }: SportCardProps) {
  const mouseX = useMotionValue(-999);
  const mouseY = useMotionValue(-999);
  const glow = useMotionTemplate`radial-gradient(${large ? "280px" : "190px"} circle at ${mouseX}px ${mouseY}px, rgba(250,255,105,0.1), transparent 70%)`;

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
      style={{ background: "#0d0d0d" }}
    >
      {/* SVG illustration */}
      <Bg />

      {/* Gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      {/* Mouse glow */}
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
        <p className="text-white/55 text-[13px] mt-0.5">{sub}</p>
      </div>
    </motion.div>
  );
}

// ─── Section ────────────────────────────────────────────────────────────────

export function SportsScope() {
  const { lang } = useLanguage();
  const tx = t[lang].sports;

  return (
    <section id="sports" className="bg-canvas py-24">
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

        <ScrollReveal delay={0.15}>
          <p className="text-body-text mt-4 max-w-xl">{tx.body}</p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 md:auto-rows-[minmax(160px,auto)] gap-3">
          {SPORTS.map((sport, i) => (
            <SportCard
              key={sport.key}
              sportKey={sport.key}
              name={tx.names[sport.key]}
              sub={tx.subs[sport.key]}
              span={sport.span}
              large={sport.large}
              Bg={sport.Bg}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
