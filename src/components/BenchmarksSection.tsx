"use client";

import { useEffect, useRef, useState } from "react";
import { theme, withAlpha } from "@/lib/theme";

const ACTIVE_THEME = {
  primary: theme.primary,
  secondary: theme.secondary,
  accent: theme.accent,
  bodyText: theme.bodyText,
  pageBg: theme.pageBg,
  railInactive: theme.railInactive,
  railTextInactive: theme.railTextInactive,
};

const STATS = [
  {
    label: "Noise Types Suppressed",
    value: "100",
    suffix: "+",
    desc: "From cutlery and crowds to wind and traffic — learned, not hard-coded.",
  },
  {
    label: "Hours of Training Data",
    value: "2,000",
    suffix: "+",
    desc: "Real-world audio across homes, streets, offices, and vehicles.",
  },
  {
    label: "End-to-End Latency",
    value: "16",
    suffix: "ms",
    desc: "Faster than the blink of an eye — imperceptible in conversation.",
  },
  {
    label: "Power Consumption",
    value: "5",
    suffix: "mW",
    desc: "Always-on intelligence that doesn't touch your battery life.",
  },
  {
    label: "On-Chip Memory",
    value: "500",
    suffix: "KB",
    desc: "The entire model runs on-device. Nothing leaves the earbud.",
  },
  {
    label: "Silicon Footprint",
    value: "4",
    suffix: "mm²",
    desc: "The whole adaptive audio stack, smaller than a grain of rice.",
  },
];

const WAVE_BARS = [
  30, 55, 40, 75, 35, 85, 50, 65, 30, 80, 45, 70, 38, 60, 32, 78, 48, 88, 42,
  62, 28, 72, 52, 66, 36, 82, 44, 58, 34, 76, 46, 68, 40, 84, 50, 60,
];

export default function BenchmarksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [inView, setInView] = useState(false);

  // Only auto-shift while the section is actually on screen — the section
  // sits far down the page, so a timer that runs from page load would burn
  // through several stats before the visitor ever scrolls to it. Polled on
  // an interval rather than scroll/IntersectionObserver events so it can't
  // miss a resize or a scroll that happens without firing those events.
  useEffect(() => {
    const check = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const visible = rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25;
      setInView(visible);
    };
    check();
    const id = window.setInterval(check, 400);
    return () => window.clearInterval(id);
  }, []);

  // Auto-shifting stat stage — fast cadence for a dynamic, high-energy feel
  // instead of requiring the visitor to scroll through each stat manually.
  useEffect(() => {
    if (isPaused || !inView) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % STATS.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, [isPaused, inView]);

  const jumpTo = (i: number) => setActive(i);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 transition-colors duration-500"
      style={{ backgroundColor: ACTIVE_THEME.pageBg }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <style>{`
        .rail-item-inactive:hover .rail-number {
          color: ${withAlpha(ACTIVE_THEME.accent, 0.7)} !important;
        }
        .rail-item-inactive:hover .rail-line {
          width: 1.75rem !important;
          background-color: ${withAlpha(ACTIVE_THEME.accent, 0.5)} !important;
        }
      `}</style>
      <div
        className="flex flex-col overflow-hidden transition-colors duration-500"
        style={{ color: ACTIVE_THEME.secondary }}
      >
        {/* Header */}
        <div className="mx-auto w-full max-w-6xl px-4 text-center lg:px-6">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-500"
            style={{ color: ACTIVE_THEME.accent }}
          >
            Benchmark Analysis
          </p>
          <h2
            className="mx-auto mt-3 max-w-2xl text-subhead font-semibold tracking-tight transition-colors duration-500"
            style={{ color: ACTIVE_THEME.secondary }}
          >
            Raising the Bar on Audio Performance
          </h2>
        </div>

        {/* Stat stage */}
        <div className="relative mx-auto mt-16 h-[320px] w-full max-w-6xl px-4 sm:h-[280px] lg:px-6">
          {STATS.map((stat, i) => {
            const state = i === active ? "active" : i < active ? "past" : "next";
            return (
              <div
                key={stat.label}
                className="absolute inset-x-4 top-1/2 transition-all duration-300 ease-out lg:inset-x-6"
                style={{
                  opacity: state === "active" ? 1 : 0,
                  transform: `translateY(calc(-50% + ${
                    state === "active" ? 0 : state === "past" ? -60 : 60
                  }px))`,
                  pointerEvents: state === "active" ? "auto" : "none",
                }}
              >
                <p className="flex items-baseline gap-4">
                  <span
                    className="font-geometric text-sm transition-colors duration-500"
                    style={{ color: ACTIVE_THEME.accent }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-sm font-semibold uppercase tracking-[0.2em] transition-colors duration-500"
                    style={{ color: ACTIVE_THEME.bodyText }}
                  >
                    {stat.label}
                  </span>
                </p>
                <p
                  className="mt-2 font-geometric text-[clamp(var(--text-display),17vw,var(--text-giant))] font-semibold leading-[0.95] tracking-tighter tabular-nums transition-colors duration-500"
                  style={{ color: ACTIVE_THEME.primary }}
                >
                  {stat.value}
                  <span
                    className="ml-2 align-top text-[0.35em] font-semibold transition-colors duration-500"
                    style={{ color: ACTIVE_THEME.accent }}
                  >
                    {stat.suffix}
                  </span>
                </p>
                <p
                  className="mt-4 max-w-md text-base leading-relaxed transition-colors duration-500"
                  style={{ color: ACTIVE_THEME.bodyText }}
                >
                  {stat.desc}
                </p>
              </div>
            );
          })}

          {/* Progress rail */}
          <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-4 sm:flex lg:right-6">
            {STATS.map((stat, i) => (
              <button
                key={stat.label}
                onClick={() => jumpTo(i)}
                aria-label={stat.label}
                className={`group flex cursor-pointer items-center gap-3 ${
                  i === active ? "" : "rail-item-inactive"
                }`}
              >
                <span
                  className="rail-number font-geometric text-[10px] transition-colors duration-300"
                  style={{
                    color: i === active ? ACTIVE_THEME.accent : ACTIVE_THEME.railTextInactive,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="rail-line h-px transition-all duration-300"
                  style={{
                    width: i === active ? "2.5rem" : "1.25rem",
                    backgroundColor: i === active ? ACTIVE_THEME.accent : ACTIVE_THEME.railInactive,
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Live waveform floor */}
        <div className="mx-auto flex w-full max-w-6xl items-end justify-between gap-[3px] px-4 pb-10 lg:px-6">
          {WAVE_BARS.map((h, i) => (
            <span
              key={i}
              className="w-1 origin-bottom rounded-full transition-colors duration-500"
              style={{
                height: `${h * 0.5}px`,
                backgroundColor: ACTIVE_THEME.accent,
                opacity: 0.4,
                animation: "iphipiWave 1.8s ease-in-out infinite",
                animationDelay: `${i * 0.08}s`,
              }}
            />
          ))}
        </div>

        {/* Footnote */}
        <p
          className="mx-auto w-full max-w-6xl px-4 pb-6 text-xs transition-colors duration-500"
          style={{ color: ACTIVE_THEME.bodyText, opacity: 0.7 }}
        >
          Optimized for indoor &amp; outdoor reverb — built for always-on edge AI.
        </p>
      </div>
    </section>
  );
}