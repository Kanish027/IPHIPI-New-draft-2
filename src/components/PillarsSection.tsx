"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";
import { theme, withAlpha } from "@/lib/theme";

const ACTIVE_THEME = {
  sectionBg: theme.surfaceDark,
  cardBg: theme.surfaceCard,
  primaryGlow: theme.primary,
  accent: theme.accent,
  accentMuted: withAlpha(theme.accent, 0.1),
  textHeading: theme.textHeading,
  textBody: theme.textBody,
  textInactive: theme.textInactive,
};

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

const CARD_WIDTH = 320;
const CARD_HEIGHT = 460;
const CARD_GAP = 32;
const STEP = CARD_WIDTH + CARD_GAP;
const DRAG_THRESHOLD = 60;

function PillarCard({
  title,
  body,
  icon,
  image,
  index,
  distance,
  dragX,
  dragging,
  onClick,
}: {
  title: string;
  body: string;
  icon: React.ReactNode;
  image: string;
  index: number;
  distance: number;
  dragX: number;
  dragging: boolean;
  onClick: () => void;
}) {
  const isActive = distance === 0;
  const absDistance = Math.abs(distance);

  const scale = isActive ? 1 : absDistance === 1 ? 0.84 : 0.72;
  const opacity = isActive ? 1 : absDistance === 1 ? 0.55 : 0.22;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Show ${title}`}
      aria-current={isActive}
      style={{
        left: "50%",
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        transform: `translate(calc(-50% + ${distance * STEP + dragX}px), -50%) scale(${scale})`,
        opacity,
        zIndex: 20 - absDistance,
        backgroundColor: ACTIVE_THEME.cardBg,
        boxShadow: isActive
          ? `0 0 0 1px rgba(255,255,255,0.08), 0 24px 70px -20px ${ACTIVE_THEME.primaryGlow}90`
          : undefined,
      }}
      className={`group absolute top-1/2 shrink-0 cursor-pointer overflow-hidden rounded-[28px] border border-white/10 text-left shadow-2xl duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 ${
        dragging ? "transition-[opacity,box-shadow,background-color]" : "transition-[opacity,box-shadow,background-color,transform]"
      }`}
      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px ${ACTIVE_THEME.accent}`)}
      onBlur={(e) =>
        (e.currentTarget.style.boxShadow = isActive
          ? `0 0 0 1px rgba(255,255,255,0.08), 0 24px 70px -20px ${ACTIVE_THEME.primaryGlow}90`
          : "none")
      }
    >
      <img
        src={image}
        alt=""
        aria-hidden="true"
        draggable={false}
        className={`absolute inset-0 h-full w-full select-none object-cover transition-transform duration-500 ease-out ${
          isActive ? "group-hover:scale-105" : ""
        }`}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

      <div className="relative flex h-full flex-col justify-end p-7">
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
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const count = PILLARS.length;

  const dragRef = useRef({ startX: 0, active: false, moved: false });

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % count) + count) % count);
    },
    [count]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setActiveIndex((i) => ((i - 1) % count + count) % count);
      if (e.key === "ArrowRight") setActiveIndex((i) => (i + 1) % count);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [count]);

  // Mouse/touch drag-to-navigate — plain window-level listeners (rather than
  // pointer capture) so the drag keeps tracking even if the cursor leaves the
  // stack mid-drag. The whole stack follows the cursor 1:1, then commits to
  // the next/previous pillar (or snaps back) once released past the threshold.
  useEffect(() => {
    const onMove = (clientX: number) => {
      if (!dragRef.current.active) return;
      const delta = clientX - dragRef.current.startX;
      if (Math.abs(delta) > 4) dragRef.current.moved = true;
      setDragX(delta);
    };
    const onEnd = (clientX: number) => {
      if (!dragRef.current.active) return;
      const delta = clientX - dragRef.current.startX;
      dragRef.current.active = false;
      setIsDragging(false);
      setDragX(0);
      if (delta > DRAG_THRESHOLD) setActiveIndex((i) => ((i - 1) % count + count) % count);
      else if (delta < -DRAG_THRESHOLD) setActiveIndex((i) => (i + 1) % count);
      // Clear the "moved" flag next tick so the card's own click handler
      // (fired right after mouseup) can still see it before it resets.
      requestAnimationFrame(() => {
        dragRef.current.moved = false;
      });
    };

    const onMouseMove = (e: MouseEvent) => onMove(e.clientX);
    const onMouseUp = (e: MouseEvent) => onEnd(e.clientX);
    const onTouchMove = (e: TouchEvent) => onMove(e.touches[0].clientX);
    const onTouchEnd = (e: TouchEvent) => onEnd(e.changedTouches[0].clientX);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [count]);

  const startDrag = (clientX: number) => {
    dragRef.current = { startX: clientX, active: true, moved: false };
    setIsDragging(true);
  };

  const handleCardClick = (index: number) => {
    if (dragRef.current.moved) return; // a drag just happened — ignore the click
    goTo(index);
  };

  return (
    <section
      className="relative overflow-hidden px-4 py-28 transition-colors duration-500 lg:px-6"
      style={{ backgroundColor: ACTIVE_THEME.sectionBg }}
    >
      <div className="relative mx-auto max-w-6xl">
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

        {/* Draggable card stack — click/tap and drag left or right */}
        <div
          onMouseDown={(e) => startDrag(e.clientX)}
          onTouchStart={(e) => startDrag(e.touches[0].clientX)}
          className={`relative mt-16 h-[500px] w-full select-none overflow-hidden ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
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
                dragX={dragX}
                dragging={isDragging}
                onClick={() => handleCardClick(index)}
              />
            );
          })}

          {/* Edge vignettes hinting at off-screen cards */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40"
            style={{ background: `linear-gradient(to right, ${ACTIVE_THEME.sectionBg}, transparent)` }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40"
            style={{ background: `linear-gradient(to left, ${ACTIVE_THEME.sectionBg}, transparent)` }}
          />
        </div>

        {/* Position indicator only — dragging the stack above is the primary
            way to navigate; these dots just show (and can jump to) where you are. */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {PILLARS.map((pillar, index) => (
            <button
              key={pillar.title}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to ${pillar.title}`}
              className="h-1.5 w-10 overflow-hidden rounded-full transition-colors duration-300"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
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
