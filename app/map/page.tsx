import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { MapHero } from "@/components/sections/map/MapHero";
import { RegionStats } from "@/components/sections/map/RegionStats";
import { StateGrid } from "@/components/sections/map/StateGrid";
import { MalaysiaMapClient } from "@/components/sections/map/MalaysiaMapClient";

export const metadata: Metadata = {
  title: "community map",
  description: "1,751 builders. 13 states. one forge.",
};

export default function MapPage() {
  return (
    <>
      <Header />
      <main>
        <MapHero />
        <section className="px-6 md:px-10">
          <div className="mx-auto max-w-[1440px]">
            <MalaysiaMapClient />
          </div>
        </section>
        <RegionStats />
        <StateGrid />
      </main>
      <Footer />
    </>
  );
}
