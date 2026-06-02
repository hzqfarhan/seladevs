import type { Metadata } from "next";
import { ShowcaseHero } from "@/components/sections/showcase/ShowcaseHero";
import { ShowcaseExplorer } from "@/components/sections/showcase/ShowcaseExplorer";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "showcase",
  description: "twelve projects. one forge. every entry built by a SelaDevs member.",
};

export default function ShowcasePage() {
  return (
    <>
      <Header />
      <main>
        <ShowcaseHero />
        <ShowcaseExplorer />
      </main>
      <Footer />
    </>
  );
}
