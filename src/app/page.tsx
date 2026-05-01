import dynamic from "next/dynamic";
import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { SportsScope } from "@/components/sections/sports-scope";

const Opportunity = dynamic(() =>
  import("@/components/sections/opportunity").then((m) => ({ default: m.Opportunity }))
);
const HowItWorks = dynamic(() =>
  import("@/components/sections/how-it-works").then((m) => ({ default: m.HowItWorks }))
);
const PlatformFeatures = dynamic(() =>
  import("@/components/sections/platform-features").then((m) => ({ default: m.PlatformFeatures }))
);
const PatentedCamera = dynamic(() =>
  import("@/components/sections/patented-camera").then((m) => ({ default: m.PatentedCamera }))
);
const RevenueStreams = dynamic(() =>
  import("@/components/sections/revenue-streams").then((m) => ({ default: m.RevenueStreams }))
);
const ClubsMarquee = dynamic(() =>
  import("@/components/sections/clubs-marquee").then((m) => ({ default: m.ClubsMarquee }))
);
const GlobalReach = dynamic(() =>
  import("@/components/sections/global-reach").then((m) => ({ default: m.GlobalReach }))
);
const Vision2030 = dynamic(() =>
  import("@/components/sections/vision-2030").then((m) => ({ default: m.Vision2030 }))
);
const FinalCTA = dynamic(() =>
  import("@/components/sections/final-cta").then((m) => ({ default: m.FinalCTA }))
);
const Footer = dynamic(() =>
  import("@/components/sections/footer").then((m) => ({ default: m.Footer }))
);

export default function Home() {
  return (
    <main className="bg-canvas min-h-screen">
      <Nav />
      <Hero />
      <SportsScope />
      <Opportunity />
      <HowItWorks />
      <PlatformFeatures />
      <PatentedCamera />
      <RevenueStreams />
      <ClubsMarquee />
      <GlobalReach />
      <Vision2030 />
      <FinalCTA />
      <Footer />
    </main>
  );
}
