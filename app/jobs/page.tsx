import type { Metadata } from "next";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { JobsHero } from "@/components/sections/jobs/JobsHero";
import { JobsStatsStrip } from "@/components/sections/jobs/JobsStatsStrip";
import { JobsExplorer } from "@/components/sections/jobs/JobsExplorer";
import { SDJobsPricing } from "@/components/sections/SDJobsPricing";

export const metadata: Metadata = {
  title: "jobs",
  description: "open roles from companies that respect your craft.",
};

export default function JobsPage() {
  return (
    <>
      <Header />
      <main>
        <JobsHero />
        <JobsStatsStrip />
        <JobsExplorer />
        <SDJobsPricing />
      </main>
      <Footer />
    </>
  );
}
