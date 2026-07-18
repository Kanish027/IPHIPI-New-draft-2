"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { theme, withAlpha } from "@/lib/theme";

const ACTIVE_THEME = {
  primary: theme.primary,
  secondary: theme.secondary,
  accent: theme.accent,
  bodyText: theme.bodyText,
  pageBg: theme.pageBg,
  borderInactive: theme.borderInactive,
};

const TECHS = [
  {
    id: "single-mic",
    title: "Single Mic Enhancement",
    spec: "Suppresses up to 70 dB SPL",
    body: "Engineered for interiors — household noise, appliances, and nearby conversations fade away so your voice stays the focus.",
    meter: { label: "Noise suppression", value: "70 dB", percent: 70 },
    chips: ["Home", "Office", "Calls"],
    image: "/tech/single-dual-mic-arch.png",
  },
  {
    id: "dual-mic",
    title: "Dual Mic Enhancement",
    spec: "Suppresses up to 85 dB SPL",
    body: "Built for multi-speaker environments. Isolates the user's voice and handles wind noise — even during high-speed travel.",
    meter: { label: "Noise suppression", value: "85 dB", percent: 85 },
    chips: ["Streets", "Travel", "Crowds"],
    image: "/tech/single-dual-mic-arch.png",
  },
  {
    id: "keyword-spotting",
    title: "Keyword Spotting",
    spec: "Runs entirely on-device",
    body: "Ultra-low-power wake-word and custom command detection — always listening, never draining the battery, with nothing sent to the cloud.",
    meter: { label: "Power draw", value: "5 mW", percent: 12 },
    chips: ["Wake Word", "On-Device", "Always-On"],
    image: "/tech/kws-arch.png",
  },
  {
    id: "far-field",
    title: "Far-Field Enhancement",
    spec: "Long-range voice capture",
    body: "Clear speech from a distance for drive-through and outdoor scenarios — the HME use case — suppressing ambient noise and reverberation.",
    meter: { label: "Capture range", value: "Distant voice", percent: 100 },
    chips: ["Drive-through", "Kiosks", "Meeting rooms"],
    image: "/tech/far-field-arch.png",
  },
];

export default function MicTechShowcase() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Drive the active step from scroll position — whichever step's centre is nearest the viewport centre wins.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const mid = window.innerHeight / 2;
        let best = 0;
        let bestDist = Infinity;
        stepRefs.current.forEach((el, i) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          const dist = Math.abs(r.top + r.height / 2 - mid);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        });
        setActive(best);
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
    <section 
      className="px-4 py-28 transition-colors duration-500 lg:px-6" 
      id="mic-tech"
      style={{ backgroundColor: ACTIVE_THEME.pageBg }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
          Adaptive Processing
        </p>
        <h2 
          className="mt-3 text-headline font-semibold tracking-tight transition-colors duration-500"
          style={{ color: ACTIVE_THEME.secondary }}
        >
          Mic Technology Enhancements
        </h2>
        <p className="mt-3 max-w-2xl text-zinc-500">
          IPHIPI&apos;s advanced audio processing adapts to any environment.
        </p>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — scrolling text steps */}
          <div className="flex flex-col">
            {TECHS.map((tech, i) => (
              <div
                key={tech.title}
                id={tech.id}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="scroll-mt-24 flex min-h-[70vh] flex-col justify-center border-l-2 pl-6 transition-all duration-500 sm:pl-8"
                style={{
                  borderColor: i === active ? ACTIVE_THEME.accent : ACTIVE_THEME.borderInactive,
                  opacity: i === active ? 1 : 0.4,
                }}
              >
                <p 
                  className="font-geometric text-sm font-semibold transition-colors duration-500"
                  style={{ color: ACTIVE_THEME.accent }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 
                  className="mt-3 text-subhead font-semibold tracking-tight transition-colors duration-500"
                  style={{ color: ACTIVE_THEME.secondary }}
                >
                  {tech.title}
                </h3>
                <p 
                  className="mt-1.5 text-sm font-semibold transition-colors duration-500"
                  style={{ color: ACTIVE_THEME.accent }}
                >
                  {tech.spec}
                </p>
                <p 
                  className="mt-4 max-w-md leading-relaxed transition-colors duration-500"
                  style={{ color: ACTIVE_THEME.bodyText }}
                >
                  {tech.body}
                </p>

                {/* Meter */}
                <div className="mt-8 max-w-sm">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500">{tech.meter.label}</span>
                    <span 
                      className="font-geometric font-semibold transition-colors duration-500"
                      style={{ color: ACTIVE_THEME.accent }}
                    >
                      {tech.meter.value}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className="h-full rounded-full transition-[width,background-color] duration-700"
                      style={{ 
                        width: i === active ? `${tech.meter.percent}%` : "0%",
                        backgroundColor: ACTIVE_THEME.accent
                      }}
                    />
                  </div>
                </div>

                {/* Chips */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {tech.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-zinc-200 px-3.5 py-1.5 text-xs text-zinc-600 transition-colors duration-500"
                      style={{ backgroundColor: ACTIVE_THEME.pageBg }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right — pinned crossfading image */}
          <div className="hidden lg:block">
            <div className="sticky top-24 flex h-[calc(100vh-8rem)] items-center">
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[24px]">
                {TECHS.map((tech, i) => (
                  <Image
                    key={tech.title}
                    src={tech.image}
                    alt={tech.title}
                    fill
                    loading="eager"
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className={`object-contain transition-opacity duration-700 ${
                      i === active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}

                {/* Progress dots */}
                <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
                  {TECHS.map((tech, i) => (
                    <span
                      key={tech.title}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: i === active ? "1.5rem" : "0.375rem",
                        backgroundColor: i === active ? ACTIVE_THEME.accent : withAlpha(theme.textLight, 0.4),
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile — image sits inline under the scroll steps container */}
          <div className="lg:hidden">
            <div
              className="relative aspect-[3/2] w-full overflow-hidden rounded-[24px] border border-zinc-200/70"
              style={{ backgroundColor: theme.surfaceDark }}
            >
              {TECHS.map((tech, i) => (
                <Image
                  key={tech.title}
                  src={tech.image}
                  alt={tech.title}
                  fill
                  loading="eager"
                  sizes="100vw"
                  className={`object-contain transition-opacity duration-700 ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}