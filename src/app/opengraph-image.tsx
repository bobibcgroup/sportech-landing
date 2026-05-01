import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sportech — The Fan Engagement Infrastructure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "72px 80px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Background orb top-right */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "rgba(250,255,105,0.08)",
            filter: "blur(80px)",
          }}
        />
        {/* Subtle grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(250,255,105,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(250,255,105,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top badge */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 80,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          {/* Logo mark */}
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "#faff69",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 22,
              color: "#0a0a0a",
            }}
          >
            S
          </div>
          <span
            style={{
              color: "#faff69",
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: "-0.5px",
            }}
          >
            SPORTECH
          </span>
        </div>

        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            marginBottom: 20,
          }}
        >
          <span
            style={{
              color: "rgba(250,255,105,0.7)",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Fan Engagement Platform
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.1,
            letterSpacing: "-2px",
            marginBottom: 28,
            maxWidth: 760,
          }}
        >
          Your club.{" "}
          <span style={{ color: "#faff69" }}>Your revenue.</span>
          {" "}Built in days.
        </div>

        {/* Sub */}
        <div
          style={{
            fontSize: 20,
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.5,
            maxWidth: 640,
            marginBottom: 48,
          }}
        >
          Patented player camera · Live predictions · Fan voting · AR match view.
          Zero cost. 50% of every dollar your fans spend.
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: 12 }}>
          {["Zero Platform Cost", "50% Revenue Share", "Launch in Days"].map((pill) => (
            <div
              key={pill}
              style={{
                background: "rgba(250,255,105,0.08)",
                border: "1px solid rgba(250,255,105,0.2)",
                borderRadius: 8,
                padding: "8px 18px",
                color: "#faff69",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              {pill}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
