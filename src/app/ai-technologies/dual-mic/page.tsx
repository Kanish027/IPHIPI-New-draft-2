import type { Metadata } from "next";
import TechSubpageHero from "@/components/TechSubpageHero";
import { TwoMicSolution } from "@/components/TechDeepDive";
import { theme } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Dual Mic Speech Enhancement — IPHIPI",
  description:
    "Clear voice through dual-microphone intelligence — IPHIPI's two-microphone ENC combines the talk and feedback microphones for complementary speech capture.",
};

export default function DualMicPage() {
  return (
    <main className="flex-1 pb-28 transition-colors duration-500" style={{ backgroundColor: theme.pageBg }}>
      <TechSubpageHero
        eyebrow="Dual Mic Speech Enhancement"
        title="Clear Voice Through Dual-Microphone Intelligence"
        tagline="Harsh noise conditions require more than a single view of the acoustic environment. IPHIPI's two-microphone ENC combines signals from the talk and feedback microphones for complementary speech capture."
        current="Dual Mic"
      />
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <TwoMicSolution />
      </div>
    </main>
  );
}
