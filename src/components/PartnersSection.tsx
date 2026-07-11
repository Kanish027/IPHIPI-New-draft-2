"use client";

import type { CSSProperties } from "react";

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
  /** Scroll direction. */
  direction?: "left" | "right";
}

/**
 * PartnersSection — infinite logo marquee with a "trusted by" label.
 */
export default function PartnersSection({
  speed = 32,
  direction = "left",
}: PartnersSectionProps) {
  // Triplicated so the loop point is invisible at any viewport width.
  const marqueeItems = [...PARTNERS, ...PARTNERS, ...PARTNERS];

  const trackStyle = {
    "--marquee-speed": `${speed}s`,
  } as CSSProperties;

  return (
    <section className="relative overflow-hidden">
      {/* ambient background accent */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/50 blur-3xl" />
      </div>

      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-33.3333%); }
          100% { transform: translateX(0); }
        }
        .partners-track {
          animation: ${direction === "right" ? "marquee-right" : "marquee-left"} var(--marquee-speed, 32s) linear infinite;
          will-change: transform;
        }
        .partners-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .partners-track {
            animation: none;
          }
        }
      `}</style>

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 md:px-8">
        <div className="mb-12 flex items-center gap-3">
          <span className="h-px w-8 bg-slate-300" />
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            Trusted across industries
          </p>
          <span className="h-px w-8 bg-slate-300" />
        </div>

        {/* Marquee viewport */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          <div
            className="partners-track flex w-max items-center"
            style={trackStyle}
            aria-hidden="true"
          >
            {marqueeItems.map((partner, index) => (
              <div
                key={`${partner}-${index}`}
                className="group flex h-24 w-[220px] shrink-0 items-center justify-center px-6 sm:w-[260px]"
              >
                <div className="flex h-16 w-full items-center justify-center rounded-xl border border-transparent bg-transparent transition-all duration-300 ease-out group-hover:border-slate-200 group-hover:bg-white group-hover:shadow-[0_8px_24px_-8px_rgba(15,23,42,0.12)]">
                  <span
                    className="select-none whitespace-nowrap text-2xl font-bold tracking-tight text-slate-400 transition-colors duration-300 ease-out group-hover:text-[#1E3A8A] sm:text-3xl"
                    style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
                  >
                    {partner}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Static, screen-reader-only list (marquee content above is duplicated and hidden) */}
        <span className="sr-only">Partners: {PARTNERS.join(", ")}</span>
      </div>
    </section>
  );
}