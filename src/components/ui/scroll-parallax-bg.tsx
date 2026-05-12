"use client";
import { useScroll, useTransform, motion } from "framer-motion";

export function ScrollParallaxBg() {
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 3000], [0, -400]);
  const y2 = useTransform(scrollY, [0, 3000], [0, -200]);
  const y3 = useTransform(scrollY, [0, 3000], [0, -600]);
  const y4 = useTransform(scrollY, [0, 3000], [0, -150]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Top-right yellow orb — fastest */}
      <motion.div
        style={{
          y: y1,
          background: "rgba(var(--color-primary-rgb),0.04)",
          filter: "blur(120px)",
          borderRadius: "50%",
        }}
        className="absolute top-[10vh] right-[-10vw] w-[600px] h-[600px]"
        aria-hidden="true"
      />
      {/* Mid-left blue orb — medium */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[50vh] left-[-15vw] w-[500px] h-[500px] rounded-full"
        aria-hidden="true"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "rgba(59,130,246,0.04)",
            filter: "blur(100px)",
            borderRadius: "50%",
          }}
        />
      </motion.div>
      {/* Bottom-right slow yellow orb */}
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[120vh] right-[5vw] w-[400px] h-[400px] rounded-full"
        aria-hidden="true"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "rgba(var(--color-primary-rgb),0.03)",
            filter: "blur(100px)",
            borderRadius: "50%",
          }}
        />
      </motion.div>
      {/* Center-left emerald orb */}
      <motion.div
        style={{ y: y4 }}
        className="absolute top-[200vh] left-[10vw] w-[300px] h-[300px] rounded-full"
        aria-hidden="true"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "rgba(34,197,94,0.03)",
            filter: "blur(80px)",
            borderRadius: "50%",
          }}
        />
      </motion.div>
    </div>
  );
}
