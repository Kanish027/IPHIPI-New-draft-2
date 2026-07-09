"use client";

import ScrollHero from "@/components/ScrollHero";

export default function Hero() {
  return (
    <ScrollHero
      taglineTop="The world's first agentic AI platform"
      taglineSub="Turning hearables and wearables into proactive personal assistants"
      title="Audio Intelligence with you. Around you."
      titleClassName="max-w-[19ch] text-[clamp(2.5rem,6.5vw,7.5rem)] leading-[1.02]"
      videoSrc="/hero.mp4"
      poster="/our-story-poster.jpg"
    />
  );
}
