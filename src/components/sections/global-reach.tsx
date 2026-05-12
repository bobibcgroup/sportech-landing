"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ease, dur, REVEAL_MARGIN } from "@/lib/animation";

const CITIES = [
  { id: "riyadh", x: 330, y: 195, label: "Riyadh", isOrigin: true },
  { id: "london", x: 230, y: 118, label: "London", fact: "Premier League — Football" },
  { id: "mumbai", x: 400, y: 200, label: "Mumbai", fact: "IPL & Cricket — 1.4B fans" },
  { id: "tokyo", x: 500, y: 148, label: "Tokyo", fact: "B.League Basketball" },
  { id: "jakarta", x: 468, y: 225, label: "Jakarta", fact: "Cricket & Football" },
  { id: "beijing", x: 468, y: 145, label: "Beijing", fact: "CBA Basketball" },
  { id: "saopaulo", x: 218, y: 268, label: "São Paulo", fact: "Football — 200M fans" },
  { id: "newyork", x: 148, y: 155, label: "New York", fact: "NBA & Basketball" },
];

function arc(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  const my = Math.min(y1, y2) - Math.abs(x2 - x1) * 0.35;
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
}

export function GlobalReach() {
  const svgRef = useRef<SVGSVGElement>(null);
  const triggered = useInView(svgRef, { once: true, margin: REVEAL_MARGIN });
  const origin = CITIES[0];

  return (
    <section className="bg-canvas py-24" id="reach">
      <div className="max-w-7xl mx-auto px-6">
        <motion.span
          initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: 0.3, ease: ease.out }}
          className="text-[12px] font-semibold tracking-widest uppercase block mb-4"
          style={{ color: "rgba(var(--color-primary-rgb),0.6)" }}
        >
          Global Reach
        </motion.span>

        <div className="flex flex-col lg:flex-row lg:items-start gap-12">
          <div className="lg:w-80 shrink-0">
            <motion.h2
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.slow, delay: 0.1, ease: ease.out }}
              className="text-on-dark font-bold mb-6"
              style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: 1.05, letterSpacing: "-2.5px" }}
            >
              IN CONVERSATIONS ACROSS
              <span style={{ color: "var(--color-primary)" }}> 3 LEAGUES.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.normal, delay: 0.25 }}
              className="text-body-text text-sm leading-relaxed mb-6"
            >
              Football clubs in Asia. Basketball leagues in East Asia. Cricket boards across South Asia. One platform for all of them.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: REVEAL_MARGIN }} transition={{ duration: dur.normal, delay: 0.3 }}
              className="space-y-4"
            >
              {[
                { stat: "100+", label: "Countries with our target audience" },
                { stat: "10+", label: "Clubs in active conversations" },
                { stat: "3", label: "Sports: Football, Basketball & Cricket" },
              ].map(({ stat, label }) => (
                <div key={stat} className="border-l-2 pl-4" style={{ borderColor: "rgba(var(--color-primary-rgb),0.4)" }}>
                  <p className="font-bold text-2xl" style={{ color: "var(--color-primary)", letterSpacing: "-1px" }}>{stat}</p>
                  <p className="text-body-text text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* SVG Map */}
          <div className="flex-1 relative">
            <svg
              ref={svgRef}
              viewBox="0 0 600 340"
              className="w-full"
              style={{ maxHeight: 360 }}
            >
              {/* Radar rings */}
              {[60, 120, 190, 270].map((r, i) => (
                <circle key={r} cx={origin.x} cy={origin.y} r={r}
                  fill="none" stroke="rgba(var(--color-primary-rgb),0.05)" strokeWidth="1"
                  strokeDasharray={i % 2 === 0 ? "4 6" : "none"} />
              ))}
              {/* Compass lines */}
              {[0, 45, 90, 135].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                return (
                  <line key={deg}
                    x1={origin.x - 280 * Math.cos(rad)} y1={origin.y - 280 * Math.sin(rad)}
                    x2={origin.x + 280 * Math.cos(rad)} y2={origin.y + 280 * Math.sin(rad)}
                    stroke="rgba(var(--color-primary-rgb),0.04)" strokeWidth="1" />
                );
              })}

              {/* Arcs from Riyadh */}
              {CITIES.slice(1).map((city, i) => (
                <motion.path
                  key={city.id}
                  d={arc(origin.x, origin.y, city.x, city.y)}
                  fill="none"
                  stroke="rgba(var(--color-primary-rgb),0.35)"
                  strokeWidth="1"
                  pathLength="1"
                  initial={{ pathLength: 0 }}
                  animate={triggered ? { pathLength: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 + i * 0.15, ease: ease.out }}
                />
              ))}

              {/* City dots */}
              {CITIES.map((city, i) => (
                <motion.g key={city.id}
                  initial={{ opacity: 0, scale: 0 }} animate={triggered ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: city.isOrigin ? 0.4 : 1.1 + i * 0.1 }}
                >
                  {city.isOrigin && (
                    <>
                      <circle cx={city.x} cy={city.y} r={18} fill="rgba(var(--color-primary-rgb),0.06)" style={{ animation: "pulse-ring 2s ease-out infinite" }} />
                      <circle cx={city.x} cy={city.y} r={12} fill="rgba(var(--color-primary-rgb),0.1)" />
                    </>
                  )}
                  <circle cx={city.x} cy={city.y} r={city.isOrigin ? 4 : 3}
                    fill={city.isOrigin ? "var(--color-primary)" : "rgba(var(--color-primary-rgb),0.7)"}
                    style={!city.isOrigin ? { animation: "dot-pulse 2s ease-in-out infinite" } : {}} />
                  <text x={city.x + (city.x > origin.x ? 8 : -8)} y={city.y + 4}
                    fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="Inter, sans-serif"
                    textAnchor={city.x > origin.x ? "start" : "end"}>
                    {city.label}
                  </text>
                </motion.g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
