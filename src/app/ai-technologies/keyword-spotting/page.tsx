import type { Metadata } from "next";
import TechSubpageHero from "@/components/TechSubpageHero";
import { KeywordSpottingSolution } from "@/components/TechDeepDive";
import { theme } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Keyword Spotting — IPHIPI",
  description:
    "Always-on voice control with minimal power consumption — IPHIPI's keyword-spotting technology recognizes wake words and commands directly on-device.",
};

export default function KeywordSpottingPage() {
  return (
    <main className="flex-1 pb-28 transition-colors duration-500" style={{ backgroundColor: theme.pageBg }}>
      <TechSubpageHero
        eyebrow="The Intelligence Anchor"
        title="Always-On Voice Control With Minimal Power Consumption"
        tagline="IPHIPI's keyword-spotting technology provides an always-on, low-power listening layer that recognizes predefined words and commands directly on the device."
        current="Keyword Spotting"
      />
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <KeywordSpottingSolution />
      </div>
    </main>
  );
}
