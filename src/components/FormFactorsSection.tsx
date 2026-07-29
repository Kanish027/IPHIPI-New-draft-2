"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { theme, withAlpha } from "@/lib/theme";

/** How long each form factor stays selected before advancing, in ms. */
const CYCLE_MS = 4000;

function Icon({ children, className = "h-6 w-6" }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const PATHS: Record<string, ReactNode> = {
  tws: (
    <>
      <path d="M9 4a4 4 0 0 1 4 4v3a3 3 0 0 1-3 3 2 2 0 0 0-2 2v3" />
      <circle cx="7" cy="18" r="2.5" />
    </>
  ),
  ows: (
    <>
      <path d="M8 3.5c-2.5 1.5-4 4-4 7.5 0 3 1.5 5 3 6" />
      <circle cx="17" cy="12.5" r="3" />
      <path d="M14 12.5c0-3.5-2-6.5-3-9" />
    </>
  ),
  glasses: (
    <>
      <circle cx="6" cy="14" r="3.2" />
      <circle cx="18" cy="14" r="3.2" />
      <path d="M9.2 13h5.6" />
      <path d="M2.8 13.5 5 9c.4-.8 1-1 1.6-1" />
      <path d="M21.2 13.5 19 9c-.4-.8-1-1-1.6-1" />
    </>
  ),
  ring: (
    <>
      <circle cx="12" cy="14" r="6" />
      <path d="M9.5 8.5 11 3h2l1.5 5.5" />
    </>
  ),
  pendant: (
    <>
      <path d="M8 3.5C5.5 5 4 7.5 4 10.5" />
      <path d="M16 3.5c2.5 1.5 4 4 4 7" />
      <circle cx="12" cy="16" r="4.5" />
    </>
  ),
  watch: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2.5" />
      <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
      <path d="M9 17v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3" />
    </>
  ),
};

const FORM_FACTORS = [
  {
    key: "tws",
    label: "TWS",
    kicker: "True Wireless Earbuds",
    body: "Dual-mic environmental noise cancellation and always-on wake word inside the tightest power and memory envelope in consumer audio.",
    specs: ["Dual-mic ENC", "Always-on KWS"],
  },
  {
    key: "ows",
    label: "OWS",
    kicker: "Open Wireless Stereo",
    body: "Open-ear designs leak the world in by definition. Our speech enhancement holds voice clarity even with no passive seal.",
    specs: ["Open-ear tuned", "Wind suppression"],
  },
  {
    key: "glasses",
    label: "Smart Glasses",
    kicker: "Audio-Enabled Eyewear",
    body: "Mics sit far from the mouth on a temple arm. Far-field enhancement recovers clean speech from that distance and geometry.",
    specs: ["Far-field capture", "Temple-arm array"],
  },
  {
    key: "ring",
    label: "Smart Ring",
    kicker: "Compact Wearable AI",
    body: "The smallest form factor we support. The full adaptive audio stack fits on-chip with room left for the host application.",
    specs: ["500KB footprint", "Single-mic ENC"],
  },
  {
    key: "pendant",
    label: "Smart Pendant",
    kicker: "Always-On Companion",
    body: "Built for continuous listening. Low-power keyword spotting keeps the device responsive without draining a small battery.",
    specs: ["5mW always-on", "Custom wake words"],
  },
  {
    key: "watch",
    label: "Smart Watch",
    kicker: "Wrist-Worn Intelligence",
    body: "Voice at arm's length, in motion, outdoors. Noise and wind suppression keep commands reliable away from the ear.",
    specs: ["Motion-robust", "16ms latency"],
  },
];

export default function FormFactorsSection() {
  const [active, setActive] = useState(0);
  const count = FORM_FACTORS.length;
  const item = FORM_FACTORS[active];

  // Advances on its own, forever. Deliberately NOT paused on hover: this
  // section spans the full page width, so any cursor resting over it would
  // silently freeze the loop and read as a broken carousel.
  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % count);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [count]);

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: theme.pageBg }}>
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: theme.accent }}
          >
            Form Factors
          </p>
          <h2
            className="mt-4 text-subhead font-semibold tracking-tight sm:text-headline"
            style={{ color: theme.primary }}
          >
            One stack. Every wearable.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed" style={{ color: theme.bodyText }}>
            IPHIPI's audio AI is silicon- and form-factor agnostic — the same
            adaptive stack ships across the full range of hearables and wearables.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
          {/* Showcase panel — the currently selected form factor, in detail */}
          <div
            className="relative overflow-hidden rounded-[28px] p-8 sm:p-10"
            style={{ backgroundColor: theme.primary }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 85% 0%, ${withAlpha(theme.accent, 0.18)}, transparent 55%)`,
              }}
            />

            <div key={item.key} className="relative animate-fade-in">
              <div className="flex items-center justify-between">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border"
                  style={{
                    backgroundColor: withAlpha(theme.accent, 0.14),
                    borderColor: withAlpha(theme.accent, 0.3),
                    color: theme.accent,
                  }}
                >
                  <Icon className="h-7 w-7">{PATHS[item.key]}</Icon>
                </span>
                <span
                  className="text-xs font-semibold tabular-nums tracking-[0.18em]"
                  style={{ color: withAlpha(theme.accent, 0.75) }}
                >
                  {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                </span>
              </div>

              <p
                className="mt-8 text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: theme.accent }}
              >
                {item.kicker}
              </p>
              <h3
                className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl"
                style={{ color: theme.textHeading }}
              >
                {item.label}
              </h3>
              <p
                className="mt-4 max-w-md leading-relaxed"
                style={{ color: theme.textBody }}
              >
                {item.body}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {item.specs.map((spec) => (
                  <span
                    key={spec}
                    className="rounded-full border px-3 py-1.5 text-xs font-medium"
                    style={{
                      borderColor: withAlpha(theme.accent, 0.28),
                      backgroundColor: withAlpha(theme.accent, 0.08),
                      color: theme.accent,
                    }}
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Cycle progress — restarts on every selection change */}
            <div
              className="relative mt-9 h-px w-full overflow-hidden"
              style={{ backgroundColor: withAlpha(theme.textLight, 0.14) }}
            >
              <span
                key={item.key}
                className="absolute inset-y-0 left-0 block"
                style={{
                  backgroundColor: theme.accent,
                  width: "100%",
                  transformOrigin: "left",
                  animation: `iphipiFormFactorProgress ${CYCLE_MS}ms linear forwards`,
                }}
              />
            </div>
          </div>

          {/* Selector rail */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {FORM_FACTORS.map((f, index) => {
              const isActive = index === active;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-current={isActive}
                  className="group flex flex-col items-start gap-3 rounded-2xl border p-4 text-left transition-colors duration-300 sm:p-5"
                  style={{
                    backgroundColor: isActive ? theme.cardWarm : theme.pageBg,
                    borderColor: isActive ? withAlpha(theme.accent, 0.55) : theme.borderInactive,
                  }}
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300"
                    style={{
                      backgroundColor: isActive
                        ? withAlpha(theme.accent, 0.16)
                        : withAlpha(theme.secondary, 0.06),
                      color: isActive ? theme.accent : theme.textMuted,
                    }}
                  >
                    <Icon className="h-5 w-5">{PATHS[f.key]}</Icon>
                  </span>
                  <span>
                    <span
                      className="block text-sm font-semibold tracking-tight transition-colors duration-300"
                      style={{ color: isActive ? theme.primary : theme.secondary }}
                    >
                      {f.label}
                    </span>
                    <span
                      className="mt-0.5 block text-xs leading-snug"
                      style={{ color: theme.textMuted }}
                    >
                      {f.kicker}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes iphipiFormFactorProgress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}
