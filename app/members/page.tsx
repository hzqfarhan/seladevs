import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { MembersHero, LeaderboardStrip } from "@/components/sections/members/MembersHero";
import { MembersExplorer } from "@/components/sections/members/MembersExplorer";

export const metadata: Metadata = {
  title: "members",
  description: "1,751 builders across Malaysia and counting.",
};

export default function MembersPage() {
  return (
    <>
      <Header />
      <main>
        <MembersHero />
        <LeaderboardStrip />
        <MembersExplorer />
      </main>
      <Footer />
    </>
  );
}
