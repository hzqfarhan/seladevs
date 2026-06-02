import { Preloader } from "@/components/sections/Preloader";
import { Header } from "@/components/sections/Header";
import { NewsletterModal } from "@/components/sections/NewsletterModal";
import { HomeBento } from "@/components/sections/HomeBento";
import { Hero } from "@/components/sections/Hero";
import { EventBanner } from "@/components/sections/EventBanner";
import { StatsBento } from "@/components/sections/StatsBento";
import { LatestJobs } from "@/components/sections/LatestJobs";
import { SDJobsPricing } from "@/components/sections/SDJobsPricing";
import { CommunityMap } from "@/components/sections/CommunityMap";
import { LeaderboardPreview } from "@/components/sections/LeaderboardPreview";
import { GovernanceBento } from "@/components/sections/GovernanceBento";
import { OpportunitiesMarquee } from "@/components/sections/OpportunitiesMarquee";
import { TailoredSolutions } from "@/components/sections/TailoredSolutions";
import { EpicCTA } from "@/components/sections/EpicCTA";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <Preloader />
      <Header />
      <NewsletterModal />

      <main>
        <section className="hidden md:block">
          <HomeBento />
        </section>

        <section className="md:hidden">
          <Hero />
          <EventBanner />
          <StatsBento />
          <LatestJobs />
          <SDJobsPricing />
          <CommunityMap />
          <LeaderboardPreview />
          <GovernanceBento />
          <OpportunitiesMarquee />
          <TailoredSolutions />
          <EpicCTA />
        </section>
      </main>

      <Footer />
    </>
  );
}
