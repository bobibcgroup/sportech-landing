"use client";

interface ProgressiveBlurProps {
  direction?: "left" | "right";
  className?: string;
  blurLayers?: number;
  blurIntensity?: number;
}

export function ProgressiveBlur({
  direction = "left",
  className = "",
  blurLayers = 6,
  blurIntensity = 4,
}: ProgressiveBlurProps) {
  const isLeft = direction === "left";

  return (
    <div className={`pointer-events-none absolute top-0 bottom-0 z-10 w-32 ${className}`}>
      {Array.from({ length: blurLayers }).map((_, i) => {
        const blur = (i + 1) * blurIntensity;
        const start = (i / blurLayers) * 100;
        const end = ((i + 1) / blurLayers) * 100;
        const gradient = isLeft
          ? `linear-gradient(to right, rgb(10,10,10) ${start}%, transparent ${end}%)`
          : `linear-gradient(to left, rgb(10,10,10) ${start}%, transparent ${end}%)`;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: gradient,
              WebkitMaskImage: gradient,
            }}
          />
        );
      })}
    </div>
  );
}
