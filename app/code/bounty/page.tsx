import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { BountyTerminalHero } from "@/components/sections/bounty/BountyTerminalHero";
import { BountyExplorer } from "@/components/sections/bounty/BountyExplorer";
import { BountyPoll } from "@/components/sections/bounty/BountyPoll";
import { PastBounties } from "@/components/sections/bounty/PastBounties";

export const metadata: Metadata = {
  title: "bounty board",
  description: "earn Ringgit for shipping technical excellence.",
};

export default function BountyPage() {
  return (
    <>
      <Header />
      <main>
        <BountyTerminalHero />
        <BountyExplorer />
        <BountyPoll />
        <PastBounties />
      </main>
      <Footer />
    </>
  );
}
