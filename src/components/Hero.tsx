"use client";

import ScrollHero from "@/components/ScrollHero";

export default function Hero() {
  return (
    <ScrollHero
      eyebrow="Agentic AI Audio Platform"
      taglineTop="The world's first Audio Agentic AI Platform"
      taglineSub="enabling next-generation intelligent hearables and wearables with seamless assistive experiences"
      title="Audio Intelligence. With You. Around You."
      titleClassName="max-w-[19ch] text-[clamp(var(--text-headline),6.5vw,var(--text-hero))] leading-[1.02]"
      videoSrc="videos/agentic-2.mp4"
      poster="/our-story-poster.jpg"
    />
  );
}
