"use client";

export function FilmGrain() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9998]"
      style={{ opacity: 0.035 }}
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <filter id="cine-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#cine-grain)" />
      </svg>
    </div>
  );
}
