import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { EventsHero } from "@/components/sections/events/EventsHero";
import { EventsExplorer } from "@/components/sections/events/EventsExplorer";

export const metadata: Metadata = {
  title: "events",
  description: "showcases, hacknights, townhalls. free, always.",
};

export default function EventsPage() {
  return (
    <>
      <Header />
      <main>
        <EventsHero />
        <EventsExplorer />
      </main>
      <Footer />
    </>
  );
}
