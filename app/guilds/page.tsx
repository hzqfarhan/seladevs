import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { GuildsHero } from "@/components/sections/guilds/GuildsHero";
import { FeaturedGuild } from "@/components/sections/guilds/FeaturedGuild";
import { GuildsExplorer } from "@/components/sections/guilds/GuildsExplorer";
import { CreateGuildCTA } from "@/components/sections/guilds/CreateGuildCTA";

export const metadata: Metadata = {
  title: "guilds",
  description: "themed working groups. weekly sprints. real shipping.",
};

export default function GuildsPage() {
  return (
    <>
      <Header />
      <main>
        <GuildsHero />
        <FeaturedGuild />
        <GuildsExplorer />
        <CreateGuildCTA />
      </main>
      <Footer />
    </>
  );
}
