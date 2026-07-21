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
    <main
      className="flex-1 pb-28 transition-colors duration-500"
      style={{ backgroundColor: theme.pageBg }}
    >
      <TechSubpageHero
        eyebrow="The Intelligence Anchor"
        title="Always-on voice control. Ultra-low power."
        tagline="Voice-enabled devices must remain ready to detect wake words and short commands, but continuously running full speech-recognition or AI-agent pipelines consumes unnecessary power.

IPHIPI’s low-power, always-on keyword spotting runs directly on-device, recognizing predefined commands to trigger device functions or activate higher-level voice assistants and agentic AI systems."
        current="Keyword Spotting"
      />
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <KeywordSpottingSolution />
      </div>
    </main>
  );
}
