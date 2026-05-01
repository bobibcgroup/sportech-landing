"use client";
import { useRef, useEffect, ReactNode } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import useMeasure from "react-use-measure";

interface InfiniteSliderProps {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}

export function InfiniteSlider({
  children,
  speed = 40,
  reverse = false,
  className = "",
}: InfiniteSliderProps) {
  const [ref, { width }] = useMeasure();
  const x = useMotionValue(0);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    if (!width) return;
    const halfWidth = width / 2;
    const from = reverse ? -halfWidth : 0;
    const to = reverse ? 0 : -halfWidth;
    const duration = halfWidth / speed;

    if (animationRef.current) animationRef.current.stop();

    animationRef.current = animate(x, [from, to], {
      ease: "linear",
      duration,
      repeat: Infinity,
      repeatType: "loop",
    });

    return () => animationRef.current?.stop();
  }, [width, speed, reverse, x]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div ref={ref} style={{ x }} className="flex w-max">
        {children}
        {children}
      </motion.div>
    </div>
  );
}
