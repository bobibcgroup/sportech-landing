import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { SportsScope } from "@/components/sections/sports-scope";

export default function Home() {
  return (
    <main className="bg-canvas min-h-screen">
      <Nav />
      <Hero />
      <SportsScope />
    </main>
  );
}
