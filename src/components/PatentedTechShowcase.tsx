"use client";

import { theme, withAlpha } from "@/lib/theme";

/* Patented Technologies Developed — static grid of per-technology clips.
   A client component (not the server-rendered research page) so the video's
   onLoadedMetadata handler is legal — passing an event handler to a
   Client Component prop from a Server Component crashes the page. */

const PATENTED_TECH = [
  { label: "Environmental Noise Cancellation (ENC)", tag: "Patent · Audio AI", video: "/patented-enc.mp4" },
  { label: "Far-Field Speech Enhancement", tag: "Patent · Edge AI", video: "/patented-far-field.mp4" },
  { label: "Keyword Spotting", tag: "Patent · Low-Power AI", video: "/patented-kws.mp4" },
];

export default function PatentedTechShowcase() {
  return (
    <section className="mt-4 px-4 py-16 lg:px-6">
      <div className="mx-auto max-w-7xl text-center">
        <p
          className="text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: theme.accent }}
        >
          Patented Technologies Developed
        </p>
        <h2
          className="mx-auto mt-3 max-w-2xl text-subhead font-semibold tracking-tight"
          style={{ color: theme.secondary }}
        >
          Proprietary innovation, engineered in-house
        </h2>
      </div>

      {/* Static grid — all technologies visible at once, no horizontal
          scrolling/sliding. 2 columns on mobile, all 4 in one row from sm up. */}
      <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        {PATENTED_TECH.map((tech) => (
          <div
            key={tech.label}
            className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-2xl"
            style={{
              backgroundColor: theme.primary,
              border: `1px solid ${withAlpha(theme.accent, 0.25)}`,
            }}
          >
            <video
              src={tech.video}
              autoPlay
              muted
              loop
              playsInline
              onLoadedMetadata={(e) => {
                e.currentTarget.playbackRate = 1.3;
              }}
              className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />

            <div className="absolute bottom-5 left-5 right-5">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.16em]"
                style={{ color: theme.accent }}
              >
                {tech.tag}
              </p>
              <p className="mt-1.5 text-lg font-semibold leading-tight text-white">
                {tech.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
