"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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

// Each card is its own scroll-triggered reveal — they only animate in once
// they individually enter the viewport, so the reader sees them arrive one
// at a time in sequence while scrolling, not all four at once on load.
function TechStoryCard({ story, index }: { story: TechStory; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const flip = index % 2 === 1;

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
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="grid items-center gap-8 py-14 md:grid-cols-2 md:gap-14"
      >
        <div className={flip ? "md:order-2" : "md:order-1"}>
          <span
            className="font-geometric text-sm font-semibold tabular-nums"
            style={{ color: theme.accent }}
          >
            {String(index + 1).padStart(2, "0")} / {String(TECH_STORIES.length).padStart(2, "0")}
          </span>
          <h3 className="mt-3 text-2xl font-medium tracking-tight lg:text-3xl" style={{ color: theme.secondary }}>
            {story.label}
          </h3>
          <p className="mt-3 max-w-md text-base leading-relaxed" style={{ color: theme.textMuted }}>
            {story.body}
          </p>
        </div>

        <button
          type="button"
          aria-label={`Watch: ${story.label}`}
          onClick={() => setOpen(true)}
          className={`group relative flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-black ${
            flip ? "md:order-1" : "md:order-2"
          }`}
        >
          <video
            ref={videoRef}
            src={story.video}
            poster={story.poster}
            muted
            loop
            playsInline
            preload={visible ? "auto" : "none"}
            className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <span className="absolute z-10 inline-flex items-center gap-1.5 rounded-full border border-transparent bg-white/20 py-2.5 pl-2.5 pr-3.5 text-sm font-medium leading-none text-white backdrop-blur-xl transition-colors group-hover:bg-white group-hover:text-black">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20 p-1 backdrop-blur-xl transition-colors group-hover:bg-black">
              <svg viewBox="0 0 12 12" className="ml-0.5 h-3 w-3 fill-white" aria-hidden="true">
                <path d="M2 1.5v9l8-4.5z" />
              </svg>
            </span>
            Watch
          </span>
        </button>
      </motion.div>

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

      <div className="mx-auto mt-20 max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: withAlpha(theme.secondary, 0.5) }}>
          Explore the technology
        </p>

        {/* One technology at a time, each animating into view as you reach
            it — not a static grid dropped in all at once. */}
        <div>
          {TECH_STORIES.map((story, i) => (
            <div key={story.label} style={{ borderColor: theme.borderInactive }} className={i > 0 ? "border-t" : ""}>
              <TechStoryCard story={story} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
