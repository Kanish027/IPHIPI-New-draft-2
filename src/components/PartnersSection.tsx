"use client";

import type { CSSProperties } from "react";
import { theme, withAlpha } from "@/lib/theme";

const PARTNERS = [
  "Mivi",
  "HME",
  "LAVA",
  "Baseus",
  "Trefan",
  "iStar Tech",
  "Transsion",
  "Jio",
];

interface PartnersSectionProps {
  /** Seconds for one full loop of the track. Lower = faster, higher = slower. */
  speed?: number;
  /** Scroll direction for the primary row. */
  direction?: "left" | "right";
  /** Show a second row scrolling the opposite way for extra depth. */
  dualRow?: boolean;
}

/**
 * PartnersSection — infinite logo marquee with a modern "trusted by" aesthetic.
 */
export default function PartnersSection({
  speed = 35,
  direction = "left",
  dualRow = false,
}: PartnersSectionProps) {
  // Triplicated so the loop point is invisible at any viewport width.
  const marqueeItems = [...PARTNERS, ...PARTNERS, ...PARTNERS];
  const reversedItems = [...PARTNERS].reverse();
  const marqueeItemsReversed = [...reversedItems, ...reversedItems, ...reversedItems];

  const trackStyle = {
    "--marquee-speed": `${speed}s`,
  } as CSSProperties;

  const trackStyleSecondary = {
    "--marquee-speed": `${speed * 1.2}s`, // Slightly different speed for parallax effect
  } as CSSProperties;

  const renderRow = (
    items: string[],
    dir: "left" | "right",
    style: CSSProperties,
    keyPrefix: string
  ) => (
    <div
      className="relative w-full overflow-hidden"
      style={{
        // Widened the mask gradient for a smoother fade-in/out effect
        maskImage:
          "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
      }}
    >
      <div
        className={`partners-track partners-track--${dir} flex w-max items-center py-4`}
        style={style}
        aria-hidden="true"
      >
        {items.map((partner, index) => (
          <div key={`${keyPrefix}-${partner}-${index}`} className="flex items-center">
            <div className="group flex h-24 w-[180px] shrink-0 items-center justify-center px-4 sm:w-[220px]">
              <div
                className="theme-partner-card flex h-16 w-full cursor-default items-center justify-center rounded-2xl border bg-white/50 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
                style={{ borderColor: theme.borderInactive }}
              >
                <span
                  className="theme-partner-label select-none whitespace-nowrap text-body font-extrabold tracking-tight transition-colors duration-300 ease-out sm:text-subhead"
                  style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif", color: theme.railTextInactive }}
                >
                  {partner}
                </span>
              </div>
            </div>
            {/* Subtle separator dot */}
            <span className="h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: theme.borderInactive }} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ backgroundColor: theme.cardHover }}
    >
      {/* Ambient background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
          style={{ backgroundColor: withAlpha(theme.primary, 0.1) }}
        />
        <div
          className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 rounded-full blur-[100px]"
          style={{ backgroundColor: withAlpha(theme.accent, 0.1) }}
        />
      </div>

      <style>{`
        .theme-partner-card:hover {
          border-color: ${withAlpha(theme.primary, 0.25)};
        }
        .theme-partner-card:hover .theme-partner-label {
          color: ${theme.primary};
        }
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-33.3333%); }
          100% { transform: translateX(0); }
        }
        .partners-track--left {
          animation: marquee-left var(--marquee-speed, 32s) linear infinite;
          will-change: transform;
        }
        .partners-track--right {
          animation: marquee-right var(--marquee-speed, 32s) linear infinite;
          will-change: transform;
        }
        .partners-track--left:hover,
        .partners-track--right:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .partners-track--left,
          .partners-track--right {
            animation: none;
          }
        }
      `}</style>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 md:px-8">
        
        {/* Modern Pill Badge Header */}
        <div className="mb-14 flex items-center justify-center">
          <div
            className="inline-flex items-center gap-2 rounded-full border bg-white/60 px-4 py-1.5 shadow-sm backdrop-blur-sm"
            style={{ borderColor: withAlpha(theme.secondary, 0.1) }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ backgroundColor: withAlpha(theme.accent, 0.75) }}
              ></span>
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: theme.accent }}></span>
            </span>
            <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: theme.textMuted }}>
              Trusted by industry leaders
            </h2>
          </div>
        </div>

        {/* Marquee viewport(s) */}
        <div className="flex w-full flex-col gap-4">
          {renderRow(marqueeItems, direction, trackStyle, "row1")}
          {dualRow &&
            renderRow(
              marqueeItemsReversed,
              direction === "left" ? "right" : "left",
              trackStyleSecondary,
              "row2"
            )}
        </div>

        {/* Static, screen-reader-only list */}
        <span className="sr-only">Partners: {PARTNERS.join(", ")}</span>
      </div>
    </section>
  );
}