import BenchmarksSection from "@/components/BenchmarksSection";
import FormFactorsSection from "@/components/FormFactorsSection";
import Hero from "@/components/Hero";
import MissionSection from "@/components/MissionSection";
import PartnersSection from "@/components/PartnersSection";
import PillarsSection from "@/components/PillarsSection";
import TechnologiesSection from "@/components/TechnologiesSection";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white text-zinc-950">
      <Hero />
      {/* <MissionSection /> */}
      <TechnologiesSection />
      <PillarsSection />
      <FormFactorsSection />
      <PartnersSection />
      <BenchmarksSection />
    </div>
  );
}
