"use client";

import { useEffect, useRef, useState } from "react";
import StoryLightbox from "@/components/StoryLightbox";
import { theme, withAlpha } from "@/lib/theme";

const STATEMENT =
  "Built for modern products, IPHIPI works 24/7 to make every voice interaction effortless. Hand off wake words, commands and conversations, so you can focus on what really matters.";

const WORDS = STATEMENT.split(" ");

type TechStory = {
  label: string;
  body: string;
  video: string;
  poster: string;
};

// NOTE: all four currently point at the same placeholder clip — swap in each
// technology's real walkthrough video/poster as they become available.
const TECH_STORIES: TechStory[] = [
  {
    label: "Single Mic Solution",
    body: "How one microphone separates a voice from everything around it.",
    video: "/our-story-preview.mp4",
    poster: "/our-story-poster.jpg",
  },
  {
    label: "Dual Mic Enhancement",
    body: "Two microphones, one clear voice — even in wind and traffic.",
    video: "/our-story-preview.mp4",
    poster: "/our-story-poster.jpg",
  },
  {
    label: "Far-Field Speech Enhancement",
    body: "Capturing clear speech from across a room or a drive-thru lane.",
    video: "/our-story-preview.mp4",
    poster: "/our-story-poster.jpg",
  },
  {
    label: "Keyword Spotting",
    body: "Always-on wake-word detection that barely sips power.",
    video: "/our-story-preview.mp4",
    poster: "/our-story-poster.jpg",
  },
];

function TechStoryCard({ story }: { story: TechStory }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div
        className="flex flex-col overflow-hidden rounded-xl border bg-white"
        style={{ borderColor: theme.borderInactive }}
      >
        <button
          type="button"
          aria-label={`Watch: ${story.label}`}
          onClick={() => setOpen(true)}
          className="group relative flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden bg-black"
        >
          <video
            ref={videoRef}
            src={story.video}
            poster={story.poster}
            muted
            loop
            playsInline
            preload={visible ? "auto" : "none"}
            className="absolute inset-0 h-full w-full object-cover opacity-90"
          />
          <span className="absolute z-10 inline-flex items-center gap-1.5 rounded-full border border-transparent bg-white/20 py-2 pl-2 pr-3 text-xs font-medium leading-none text-white backdrop-blur-xl transition-colors group-hover:bg-white group-hover:text-black">
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white/20 p-1 backdrop-blur-xl transition-colors group-hover:bg-black">
              <svg viewBox="0 0 12 12" className="ml-0.5 h-2.5 w-2.5 fill-white" aria-hidden="true">
                <path d="M2 1.5v9l8-4.5z" />
              </svg>
            </span>
            Watch
          </span>
        </button>

        <div className="flex flex-1 flex-col p-5">
          <p
            className="text-xs font-semibold uppercase tracking-[0.14em]"
            style={{ color: theme.accent }}
          >
            {story.label}
          </p>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: theme.textMuted }}>
            {story.body}
          </p>
        </div>
      </div>

      <StoryLightbox open={open} onClose={() => setOpen(false)} src={story.video} poster={story.poster} />
    </>
  );
}

export default function TechStoriesSection() {
  const statementRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

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

  return (
    <section className="px-4 py-32 lg:px-6">
      {/* Scroll-revealed statement — sizes match sunday.ai's heading-2:
          1.75rem base, 2.625rem ≥64rem, 3rem ≥105rem */}
      <p
        ref={statementRef}
        className="mx-auto max-w-4xl text-[1.75rem] font-normal leading-[1.15] tracking-[-0.025em] lg:text-[2.625rem] min-[105rem]:text-[3rem]"
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

      <div className="mb-3 mt-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: withAlpha(theme.secondary, 0.5) }}>
          Explore the technology
        </p>
      </div>

      {/* One card per technology, in a clean 2×2 grid instead of four
          stacked duplicates of the same card. */}
      <div className="grid gap-6 sm:grid-cols-2">
        {TECH_STORIES.map((story) => (
          <TechStoryCard key={story.label} story={story} />
        ))}
      </div>
    </section>
  );
}
