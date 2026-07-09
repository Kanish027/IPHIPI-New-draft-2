"use client";

import { useEffect, useRef, useState } from "react";
import StoryLightbox from "@/components/StoryLightbox";

const STATEMENT =
  "Built for modern products, IPHIPI works 24/7 to make every voice interaction effortless. Hand off wake words, commands and conversations, so you can focus on what really matters.";

const WORDS = STATEMENT.split(" ");

export default function MissionSection() {
  const statementRef = useRef<HTMLParagraphElement>(null);
  const cardVideoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [storyOpen, setStoryOpen] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);

  // Word-by-word reveal driven by how far the statement has scrolled
  // through the viewport.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = statementRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        // 0 when the paragraph's top enters the bottom of the screen,
        // 1 when its bottom clears the upper third.
        const start = window.innerHeight * 0.9;
        const end = window.innerHeight * 0.35;
        const p = (start - r.top) / (start - end + r.height);
        setProgress(Math.min(1, Math.max(0, p)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Only run the card's muted preview while it's on screen.
  useEffect(() => {
    const v = cardVideoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(([entry]) => {
      setCardVisible(entry.isIntersecting);
      if (entry.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section className="px-4 py-32 lg:px-6">
      {/* Scroll-revealed statement — sizes match sunday.ai's heading-2:
          1.75rem base, 2.625rem ≥64rem, 3rem ≥105rem */}
      <p
        ref={statementRef}
        className="text-[1.75rem] font-normal leading-[1.15] tracking-[-0.025em] lg:text-[2.625rem] min-[105rem]:text-[3rem]"
      >
        {WORDS.map((word, i) => (
          <span
            key={i}
            className="transition-opacity duration-200"
            style={{ opacity: 0.15 + 0.85 * Math.min(1, Math.max(0, progress * WORDS.length - i)) }}
          >
            {word}{" "}
          </span>
        ))}
      </p>

      {/* Story card */}
      <div className="mx-auto mt-40 grid w-full max-w-[52rem] items-center gap-6 rounded-xl border border-zinc-200 bg-white p-4 md:grid-cols-2">
        <p className="mx-auto max-w-xs text-center text-base font-medium leading-relaxed">
          Voice should give you back what matters most — time. Watch how our
          team came together to work on this mission.
        </p>

        <button
          type="button"
          aria-label="Watch our story"
          onClick={() => setStoryOpen(true)}
          className="group relative flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-black"
        >
          <video
            ref={cardVideoRef}
            src="/our-story-preview.mp4"
            poster="/our-story-poster.jpg"
            muted
            loop
            playsInline
            preload={cardVisible ? "auto" : "none"}
            className="absolute inset-0 h-full w-full object-cover opacity-90"
          />
          <span className="absolute z-10 inline-flex items-center gap-1.5 rounded-full border border-transparent bg-white/20 py-2.5 pl-2.5 pr-3.5 text-sm font-medium leading-none text-white backdrop-blur-xl transition-colors group-hover:bg-white group-hover:text-black">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20 p-1 backdrop-blur-xl transition-colors group-hover:bg-black">
              <svg viewBox="0 0 12 12" className="ml-0.5 h-3 w-3 fill-white" aria-hidden="true">
                <path d="M2 1.5v9l8-4.5z" />
              </svg>
            </span>
            Our story
          </span>
        </button>
      </div>

      <StoryLightbox open={storyOpen} onClose={() => setStoryOpen(false)} />
    </section>
  );
}
