"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import React from "react";
import { theme, withAlpha } from "@/lib/theme";

const ACTIVE_THEME = {
  sectionBg: theme.surfaceDark,
  cardBg: theme.surfaceCard,
  primary: theme.primary,
  accent: theme.accent,
  accentMuted: withAlpha(theme.accent, 0.1),
  textHeading: theme.textHeading,
  textBody: theme.textBody,
  textInactive: theme.textInactive,
};

const PILLARS = [
  {
    id: "work-intelligence",
    title: "Work Intelligence",
    heading: "Stay focused. Let intelligence handle the rest.",
    body: "Professionals constantly switch between listening, taking notes, scheduling follow-ups, and presenting ideas. IPHIPI Intelligence quietly manages these routine tasks, allowing users to stay fully engaged in the conversation.",
    images: [
      "/samples/work intelligence.png",
      "https://picsum.photos/seed/work-intelligence-b/700/900",
      "https://picsum.photos/seed/work-intelligence-c/700/900",
    ],
    stats: [
      { value: "Metric", label: "Less context-switching" },
      { value: "Metric", label: "Always-on assistant" },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
  },
  {
    id: "living-intelligence",
    title: "Living Intelligence",
    heading: "Live Safely. Stay Connected.",
    body: "You can't always keep an eye on every corner of your home or every loved one's wellbeing. IPHIPI Intelligence keeps you aware of your home and the people who matter most.",
    images: [
      "samples/Living Intelligence.png",
      "https://picsum.photos/seed/living-intelligence-a/700/900",
      "https://picsum.photos/seed/living-intelligence-c/700/900",
    ],
    stats: [
      { value: "Metric", label: "Routines automated" },
      { value: "Metric", label: "On-device privacy" },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
      </svg>
    ),
  },
  {
    id: "personal-intelligence",
    title: "Personal Intelligence",
    heading: "Train Smarter. Stay Focused.",
    body: "During workouts, it's easy to lose track of reps, rest, hydration, and what's next. IPHIPI keeps your workout on track with real-time guidance, motivation, and intelligent coaching.",
    images: [
      "samples/Personal Intelligence.png",
      "https://picsum.photos/seed/personal-intelligence-b/700/900",
      "https://picsum.photos/seed/personal-intelligence-c/700/900",
    ],
    stats: [
      { value: "Metric", label: "Faster health insights" },
      { value: "Metric", label: "Personalized check-ins" },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
        <path d="M12 21s-7.5-4.7-9.5-9A5.5 5.5 0 0 1 12 6.5 5.5 5.5 0 0 1 21.5 12c-2 4.3-9.5 9-9.5 9z" />
      </svg>
    ),
  },
  {
    id: "spatial-intelligence",
    title: "Spatial Intelligence",
    heading: "Understand the World Around You.",
    body: "Exploring unfamiliar places often means switching between maps, translation apps, and searching for the stories behind every place. IPHIPI Intelligence sees what you see, listens to you, and brings navigation, translation, art, history, and architecture into one natural conversation.",
    images: [
      "/samples/On Device.png",
      "https://picsum.photos/seed/spatial-intelligence-b/700/900",
      "https://picsum.photos/seed/spatial-intelligence-c/700/900",
    ],
    stats: [
      { value: "Metric", label: "Real-time scene analysis" },
      { value: "Metric", label: "Spatial awareness" },
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
    </svg>
  );
}

function EdgeNavButton({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "left" ? "Previous pillar" : "Next pillar"}
      className="absolute top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/15 text-white transition-all hover:-translate-y-[calc(50%+2px)] lg:flex"
      style={{
        left: direction === "left" ? "-1.5rem" : undefined,
        right: direction === "right" ? "-1.5rem" : undefined,
        backgroundColor: withAlpha(theme.textLight, 0.06),
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = ACTIVE_THEME.accentMuted)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = withAlpha(theme.textLight, 0.06))}
    >
      <ArrowIcon direction={direction} />
    </button>
  );
}

function PhotoFan({ images, title, photoIndex }: { images: string[]; title: string; photoIndex: number }) {
  const count = images.length;
  // Rotate which image sits front/center vs. the two back slots, based on
  // photoIndex — this cycles photos WITHIN the current pillar, independent
  // of which pillar is active.
  const front = images[photoIndex % count];
  const backLeft = images[(photoIndex + 1) % count];
  const backRight = images[(photoIndex + 2) % count];

  return (
    <div className="relative mx-auto h-[420px] w-full max-w-sm">
      {/* Back-left photo */}
      <div className="absolute left-[2%] top-[10%] h-[260px] w-[190px] -rotate-[9deg] overflow-hidden rounded-2xl border-4 border-white/90 shadow-2xl">
        <img src={backLeft} alt="" aria-hidden="true" draggable={false} className="h-full w-full select-none object-cover" />
      </div>
      {/* Back-right photo */}
      <div className="absolute right-[2%] top-[10%] h-[260px] w-[190px] rotate-[9deg] overflow-hidden rounded-2xl border-4 border-white/90 shadow-2xl">
        <img src={backRight} alt="" aria-hidden="true" draggable={false} className="h-full w-full select-none object-cover" />
      </div>
      {/* Center active photo */}
      <div
        key={front}
        className="absolute inset-x-[16%] top-0 h-[360px] animate-fade-in overflow-hidden rounded-2xl border-4 shadow-2xl"
        style={{ borderColor: theme.textLight }}
      >
        <img src={front} alt="" aria-hidden="true" draggable={false} className="h-full w-full select-none object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />

        <div
          className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border"
          style={{ backgroundColor: withAlpha(ACTIVE_THEME.accent, 0.9), borderColor: withAlpha(theme.textLight, 0.4) }}
        >
          <svg viewBox="0 0 24 24" fill={ACTIVE_THEME.sectionBg} className="ml-0.5 h-3.5 w-3.5">
            <path d="M7 4.5v15l13-7.5z" />
          </svg>
        </div>

        <p className="absolute bottom-4 left-4 right-4 text-sm font-semibold uppercase tracking-wide text-white">
          {title}
        </p>
      </div>
    </div>
  );
}

export default function PillarsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  // 1 = navigated forward (slide in from the right), -1 = navigated back
  // (slide in from the left) — drives the directional entrance animation.
  const [direction, setDirection] = useState<1 | -1>(1);
  // Which of the pillar's 3 photos is currently front/center — resets to 0
  // whenever the pillar itself changes.
  const [photoIndex, setPhotoIndex] = useState(0);
  const count = PILLARS.length;
  const pillar = PILLARS[activeIndex];

  const goTo = useCallback(
    (index: number, dir: 1 | -1 = 1) => {
      setDirection(dir);
      setPhotoIndex(0);
      setActiveIndex(((index % count) + count) % count);
    },
    [count]
  );
  const goPrev = useCallback(() => goTo(activeIndex - 1, -1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1, 1), [activeIndex, goTo]);

  const cyclePhoto = (dir: 1 | -1) => {
    setPhotoIndex((i) => ((i + dir) % 3 + 3) % 3);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goPrev, goNext]);

  return (
    <section
      className="relative overflow-hidden px-4 py-28 transition-colors duration-500 lg:px-6"
      style={{ backgroundColor: ACTIVE_THEME.sectionBg }}
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p
            className="inline-flex items-center gap-3 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] backdrop-blur-sm transition-colors duration-500"
            style={{ backgroundColor: ACTIVE_THEME.accentMuted, color: ACTIVE_THEME.accent }}
          >
            <span className="h-2 w-2 rounded-full transition-colors duration-500" style={{ backgroundColor: ACTIVE_THEME.accent }} />
            Agentic AI Experience
          </p>

          <h2 className="mt-6 text-headline font-semibold tracking-tight transition-colors duration-500" style={{ color: ACTIVE_THEME.textHeading }}>
            Go about your Life. Anywhere. With Ease.
          </h2>

          <p className="mt-5 max-w-2xl transition-colors duration-500 sm:text-lg sm:leading-8" style={{ color: ACTIVE_THEME.textBody }}>
            From busy mornings to important meetings to travel, your devices
            stay ready to listen. They understand your world, so you can focus
            on living in it.
          </p>
        </div>

        {/* Case-study style carousel: content left, fanned photos right */}
        <div className="relative mt-16">
          <EdgeNavButton direction="left" onClick={goPrev} />
          <EdgeNavButton direction="right" onClick={goNext} />

          <div
            key={pillar.id}
            className={`grid gap-10 rounded-[32px] border border-white/10 p-6 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-4 ${
              direction === 1 ? "animate-[iphipiSlideFromRight_0.5s_ease-out]" : "animate-[iphipiSlideFromLeft_0.5s_ease-out]"
            }`}
          >
            {/* Left: content */}
            <div>
              <div
                className="flex h-11 w-11 items-center justify-center rounded-2xl border"
                style={{ backgroundColor: ACTIVE_THEME.accentMuted, borderColor: withAlpha(ACTIVE_THEME.accent, 0.3), color: ACTIVE_THEME.accent }}
              >
                {pillar.icon}
              </div>

              <p
                className="mt-6 text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: ACTIVE_THEME.accent }}
              >
                {pillar.title}
              </p>
              <h3 className="mt-3 text-subhead font-semibold leading-tight tracking-tight sm:text-headline" style={{ color: ACTIVE_THEME.textHeading }}>
                {pillar.heading}
              </h3>
              <p className="mt-4 max-w-md leading-relaxed" style={{ color: ACTIVE_THEME.textBody }}>
                {pillar.body}
              </p>

              <Link
                href={`/research#${pillar.id}`}
                className="mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: ACTIVE_THEME.textHeading, color: ACTIVE_THEME.sectionBg }}
              >
                Explore the research
                <ArrowIcon direction="right" />
              </Link>
            </div>

            {/* Right: fanned photo stack — its own prev/next cycles the 3
                photos of THIS pillar, separate from the pillar navigation */}
            <div>
              <PhotoFan images={pillar.images} title={pillar.title} photoIndex={photoIndex} />
              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => cyclePhoto(-1)}
                  aria-label="Previous photo"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors"
                  style={{ backgroundColor: withAlpha(theme.textLight, 0.06) }}
                >
                  <ArrowIcon direction="left" />
                </button>
                <button
                  type="button"
                  onClick={() => cyclePhoto(1)}
                  aria-label="Next photo"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors"
                  style={{ backgroundColor: withAlpha(theme.textLight, 0.06) }}
                >
                  <ArrowIcon direction="right" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Position dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {PILLARS.map((p, index) => (
            <button
              key={p.id}
              type="button"
              onClick={() => goTo(index, index >= activeIndex ? 1 : -1)}
              aria-label={`Go to ${p.title}`}
              className="h-1.5 w-10 overflow-hidden rounded-full transition-colors duration-300"
              style={{ backgroundColor: withAlpha(theme.textLight, 0.15) }}
            >
              <span
                className="block h-full rounded-full transition-transform duration-500 ease-out"
                style={{
                  backgroundColor: ACTIVE_THEME.accent,
                  transform: index === activeIndex ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
