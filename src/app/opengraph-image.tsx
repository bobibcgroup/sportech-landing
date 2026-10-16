import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Sportech — The Fan Revenue Engine for Sports Clubs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/wordmark-white.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#05070c",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 64,
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Volt glow */}
        <div
          style={{
            position: "absolute",
            bottom: -300,
            left: 280,
            width: 640,
            height: 640,
            borderRadius: "50%",
            background: "rgba(232,248,64,0.14)",
            filter: "blur(120px)",
            display: "flex",
          }}
        />
        {/* Official wordmark, big */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={657} height={100} alt="" />
        {/* One bold line, nothing small */}
        <div
          style={{
            display: "flex",
            gap: 22,
            fontSize: 66,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: -2,
          }}
        >
          <span>TURN FANS INTO</span>
          <span style={{ color: "#e8f840" }}>REVENUE.</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
