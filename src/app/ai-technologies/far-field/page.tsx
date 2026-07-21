import type { Metadata } from "next";
import TechSubpageHero from "@/components/TechSubpageHero";
import { FarFieldSolution } from "@/components/TechDeepDive";
import { theme } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Far-Field Speech Enhancement — IPHIPI",
  description:
    "Clear speech capture from a distance — IPHIPI's far-field speech enhancement isolates speech from surrounding noise for drive-thrus, kiosks, and smart home devices.",
};

export default function FarFieldPage() {
  return (
    <main
      className="flex-1 pb-28 transition-colors duration-500"
      style={{ backgroundColor: theme.pageBg }}
    >
      <TechSubpageHero
        eyebrow="Far-Field Speech Enhancement"
        title="Clear Speech Capture From a Distance"
        tagline="Business voice interfaces often capture speakers from a distance in noisy, reverberant environments such as drive-thrus, kiosks, and smart home devices.

        IPHIPI’s far-field speech enhancement isolates distant speech, suppresses environmental noise, and improves clarity delivering cleaner audio for listeners and stronger input for ASR."
        current="Far-Field"
      />
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <FarFieldSolution />
      </div>
    </main>
  );
}
