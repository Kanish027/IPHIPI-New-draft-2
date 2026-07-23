import type { Metadata } from "next";
import TechSubpageHero from "@/components/TechSubpageHero";
import { OneMicSolution } from "@/components/TechDeepDive";
import { theme } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Single Mic Speech Enhancement — IPHIPI",
  description:
    "Built for the noises of everyday life — IPHIPI's AI-powered Single Mic Speech Enhancement delivers exceptional voice clarity through edge-optimized, real-time audio processing.",
};

export default function SingleMicPage() {
  return (
    <main className="flex-1 overflow-x-hidden pb-28 transition-colors duration-500" style={{ backgroundColor: theme.pageBg }}>
      <TechSubpageHero
        eyebrow="Single Mic Speech Enhancement"
        title="Built for the Noises of Everyday Life"
        tagline="Conversations compete with unpredictable background noise—from TVs and kitchen sounds to cafés, traffic, construction noises. IPHIPI's AI-powered Single Mic Speech Enhancement delivers exceptional voice clarity through edge-optimized, real-time audio processing."
        current="Single Mic"
      />
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <OneMicSolution />
      </div>
    </main>
  );
}
