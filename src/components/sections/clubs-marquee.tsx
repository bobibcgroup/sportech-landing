"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { CLUBS_ROW1, CLUBS_ROW2, type Club } from "@/data/clubs";

function ClubLogo({ club }: { club: Club }) {
  return (
    <div className="flex items-center justify-center mx-6 w-16 h-16 shrink-0 group">
      <Image
        src={club.logo}
        alt={club.name}
        width={48}
        height={48}
        className="object-contain opacity-40 grayscale brightness-0 invert group-hover:opacity-90 group-hover:brightness-200 transition-all duration-300"
        unoptimized
      />
    </div>
  );
}

export function ClubsMarquee() {
  return (
    <section className="bg-canvas py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <ScrollReveal>
          <span className="text-primary text-[12px] font-semibold tracking-widest uppercase">
            Built for Clubs Like Yours
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2
            className="text-on-dark font-bold mt-4 max-w-2xl"
            style={{ fontSize: "clamp(26px, 3.5vw, 40px)", lineHeight: 1.15 }}
          >
            Join a global movement of clubs unlocking fan revenue.
          </h2>
        </ScrollReveal>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <InfiniteSlider speed={35}>
            {CLUBS_ROW1.map((club) => (
              <ClubLogo key={club.name} club={club} />
            ))}
          </InfiniteSlider>
          <ProgressiveBlur direction="left" />
          <ProgressiveBlur direction="right" className="right-0 left-auto" />
        </div>

        <div className="relative">
          <InfiniteSlider speed={28} reverse>
            {CLUBS_ROW2.map((club) => (
              <ClubLogo key={club.name} club={club} />
            ))}
          </InfiniteSlider>
          <ProgressiveBlur direction="left" />
          <ProgressiveBlur direction="right" className="right-0 left-auto" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        <ScrollReveal delay={0.15}>
          <p className="text-body-text text-sm text-center">
            From Saudi Pro League to European giants — one platform, every market.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
