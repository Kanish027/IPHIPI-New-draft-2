"use client";

import { useCallback, useEffect, useState } from "react";
import React from "react";

// --- BRAND COLOR PALETTE OPTIONS ---
const THEMES = {
  option1: {
    id: "cognitive-partner",
    sectionBg: "#1C1C1E", // Deep Charcoal
    cardBg: "#2A2A2D", // Charcoal Card Base
    primaryGlow: "#1E3A8A", // Deep Cognitive Blue
    accent: "#0FF0FC", // Electric Cyan / Intelligent Teal
    accentMuted: "rgba(15, 240, 252, 0.1)",
    textHeading: "#F5F7FA", // Tech White
    textBody: "#A0A4AC", // Soft Gray
    textInactive: "#6B6E76", // Muted text for inactive cards
  },
  option2: {
    id: "seamless-intelligence",
    sectionBg: "#18181B", // Very Dark Ash Gray (zinc-900)
    cardBg: "#27272A", // Dark Ash Gray (zinc-800)
    primaryGlow: "#2E1065", // Deep Midnight Violet
    accent: "#6EE7B7", // Luminescent Mint / Neo-Green
    accentMuted: "rgba(110, 231, 183, 0.1)",
    textHeading: "#FAFAFA", // Pure Alabaster
    textBody: "#D4D4D8", // Light Ash Gray
    textInactive: "#71717A", // Muted text for inactive cards
  },
};

// Toggle this variable to switch between brand palettes globally across this component
const ACTIVE_THEME = THEMES.option2;
// -----------------------------------

const PILLARS = [
  {
    title: "Work Intelligence",
    body: "An always-on work companion. Manages conversations, notifications, and workflows — reducing cognitive load.",
    image: "https://picsum.photos/seed/work-intelligence/800/1000",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
  },
  {
    title: "Living Intelligence",
    body: "Transforms living spaces into intelligent environments. Anticipates needs, simplifies routines, automates homes.",
    image: "https://picsum.photos/seed/living-intelligence/800/1000",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
      </svg>
    ),
  },
  {
    title: "Personal Intelligence",
    body: "Beyond health tracking. Understands physical, emotional, and environmental context for healthier decisions.",
    image: "https://picsum.photos/seed/personal-intelligence/800/1000",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M12 21s-7.5-4.7-9.5-9A5.5 5.5 0 0 1 12 6.5 5.5 5.5 0 0 1 21.5 12c-2 4.3-9.5 9-9.5 9z" />
      </svg>
    ),
  },
  {
    title: "Spatial Intelligence",
    body: "Vision that sees and understands. Analyzes scenes in real time, giving AI the context edge in the visual era.",
    image: "https://picsum.photos/seed/spatial-intelligence/800/1000",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

const CARD_WIDTH = 300;
const CARD_GAP = 28;
const STEP = CARD_WIDTH + CARD_GAP;

function PillarCard({
  title,
  body,
  icon,
  image,
  index,
  distance,
  onClick,
}: {
  title: string;
  body: string;
  icon: React.ReactNode;
  image: string;
  index: number;
  distance: number;
  onClick: () => void;
}) {
  const isActive = distance === 0;
  const absDistance = Math.abs(distance);

  const scale = isActive ? 1 : absDistance === 1 ? 0.84 : 0.72;
  const opacity = isActive ? 1 : absDistance === 1 ? 0.55 : 0.25;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Show ${title}`}
      aria-current={isActive}
      style={{
        left: "50%",
        width: CARD_WIDTH,
        transform: `translate(calc(-50% + ${distance * STEP}px), -50%) scale(${scale})`,
        opacity,
        zIndex: 20 - absDistance,
        backgroundColor: ACTIVE_THEME.cardBg,
        boxShadow: isActive
          ? `0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px -20px ${ACTIVE_THEME.primaryGlow}80`
          : undefined,
      }}
      className="group absolute top-1/2 h-[420px] shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-white/10 text-left shadow-2xl transition-[transform,opacity,box-shadow,background-color] duration-500 ease-out focus-visible:outline-none focus-visible:ring-2"
      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px ${ACTIVE_THEME.accent}`)}
      onBlur={(e) =>
        (e.currentTarget.style.boxShadow = isActive
          ? `0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px -20px ${ACTIVE_THEME.primaryGlow}80`
          : "none")
      }
    >
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out ${
          isActive ? "group-hover:scale-105" : ""
        }`}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

      <div className="relative flex h-full flex-col justify-end p-6">
        <div className="flex items-start justify-between gap-4">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              color: ACTIVE_THEME.textHeading,
            }}
          >
            {icon}
          </div>
          <span
            className="text-xs font-semibold uppercase tracking-[0.22em]"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            0{index + 1}
          </span>
        </div>

        <h3
          className="mt-6 text-lg font-semibold tracking-tight transition-colors duration-300"
          style={{ color: ACTIVE_THEME.textHeading }}
          onMouseEnter={(e) => {
            if (isActive) e.currentTarget.style.color = ACTIVE_THEME.accent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = ACTIVE_THEME.textHeading;
          }}
        >
          {title}
        </h3>
        <p
          className="mt-3 text-sm leading-7 transition-colors duration-300"
          style={{
            color: isActive ? ACTIVE_THEME.textBody : ACTIVE_THEME.textInactive,
          }}
        >
          {body}
        </p>
      </div>
    </button>
  );
}

export default function PillarsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const count = PILLARS.length;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % count) + count) % count);
    },
    [count]
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

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
      {/* Ambient glow matching the active theme primary color */}
      <div className="pointer-events-none absolute inset-0">
        {/* <div
          className="absolute left-[-8rem] top-[-8rem] h-80 w-80 rounded-full blur-3xl transition-colors duration-500"
          style={{ backgroundColor: `${ACTIVE_THEME.primaryGlow}22` }}
        />
        <div
          className="absolute right-[-10rem] top-32 h-96 w-96 rounded-full blur-3xl transition-colors duration-500"
          style={{ backgroundColor: `${ACTIVE_THEME.primaryGlow}1A` }}
        />
        <div
          className="absolute bottom-[-10rem] left-1/3 h-80 w-80 rounded-full blur-3xl transition-colors duration-500"
          style={{ backgroundColor: `${ACTIVE_THEME.primaryGlow}14` }}
        /> */}
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div className="max-w-3xl">
            <p
              className="inline-flex items-center gap-3 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] backdrop-blur-sm transition-colors duration-500"
              style={{
                backgroundColor: ACTIVE_THEME.accentMuted,
                color: ACTIVE_THEME.accent,
              }}
            >
              <span
                className="h-2 w-2 rounded-full transition-colors duration-500"
                style={{ backgroundColor: ACTIVE_THEME.accent }}
              />
              Agentic AI Experience
            </p>

            <h2
              className="mt-6 text-headline font-semibold tracking-tight transition-colors duration-500"
              style={{ color: ACTIVE_THEME.textHeading }}
            >
              Intelligence Everywhere You Go
            </h2>

            <p
              className="mt-5 max-w-2xl transition-colors duration-500 sm:text-lg sm:leading-8"
              style={{ color: ACTIVE_THEME.textBody }}
            >
              Reduces cognitive load. Lets you focus on what matters. Proactive
              support across work, home, health, and the world around you.
            </p>
          </div>

          <div className="hidden shrink-0 items-center gap-3 sm:flex">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous pillar"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = ACTIVE_THEME.accentMuted)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)")
              }
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next pillar"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-all hover:-translate-y-0.5"
              style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = ACTIVE_THEME.accentMuted)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)")
              }
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative mt-16 h-[440px] w-full overflow-hidden">
          {PILLARS.map((pillar, index) => {
            let distance = index - activeIndex;
            if (distance > count / 2) distance -= count;
            if (distance < -count / 2) distance += count;

            return (
              <PillarCard
                key={pillar.title}
                title={pillar.title}
                body={pillar.body}
                icon={pillar.icon}
                image={pillar.image}
                index={index}
                distance={distance}
                onClick={() => goTo(index)}
              />
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 sm:hidden">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous pillar"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-300"
            style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = ACTIVE_THEME.accentMuted)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)")
            }
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            {PILLARS.map((pillar, index) => (
              <button
                key={pillar.title}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Go to ${pillar.title}`}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: index === activeIndex ? "1.5rem" : "0.375rem",
                  backgroundColor:
                    index === activeIndex
                      ? ACTIVE_THEME.accent
                      : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next pillar"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-300"
            style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = ACTIVE_THEME.accentMuted)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)")
            }
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="mt-6 hidden items-center justify-center gap-2 sm:flex">
          {PILLARS.map((pillar, index) => (
            <button
              key={pillar.title}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to ${pillar.title}`}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: index === activeIndex ? "1.5rem" : "0.375rem",
                backgroundColor:
                  index === activeIndex
                    ? ACTIVE_THEME.accent
                    : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}