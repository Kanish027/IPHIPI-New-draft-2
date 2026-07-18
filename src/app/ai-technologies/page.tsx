import type { Metadata } from "next";
import Image from "next/image";
import AiTechHero from "@/components/AiTechHero";
import MicTechShowcase from "@/components/MicTechShowcase";
import TechDeepDive from "@/components/TechDeepDive";
import FormFactorsShowcase from "@/components/FormFactorsShowcase";
import { theme, withAlpha } from "@/lib/theme";

export const metadata: Metadata = {
  title: "AI Technologies — IPHIPI",
  description:
    "Proprietary environmental noise suppression and speech enhancement — engineered for every wearable category.",
};

const ACTIVE_THEME = {
  primary: theme.primary,
  secondary: theme.secondary,
  accent: theme.accent,
  accentBorderMuted: withAlpha(theme.accent, 0.4),
  accentBgMuted: withAlpha(theme.accent, 0.1),
  pageBg: theme.pageBg,
  cardHoverBg: theme.cardHover,
};

const STAGES = [
  {
    title: "Audio Capture",
    desc: "High-performance mic input",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-4 w-4" aria-hidden="true">
        <rect x="9" y="2" width="6" height="12" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0M12 18v4" />
      </svg>
    ),
  },
  {
    title: "Pre-Processing",
    desc: "Noise profiling, echo management, VAD",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-4 w-4" aria-hidden="true">
        <path d="M4 8h10M18 8h2M4 16h2M10 16h10" />
        <circle cx="16" cy="8" r="2" />
        <circle cx="8" cy="16" r="2" />
      </svg>
    ),
  },
  {
    title: "AI Noise Suppression",
    desc: "Proprietary AI models remove background noise",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
        <rect x="7" y="7" width="10" height="10" rx="2" />
        <path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" />
      </svg>
    ),
  },
  {
    title: "Speech Enhancement",
    desc: "Enhances clarity, preserves natural voice",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-4 w-4" aria-hidden="true">
        <path d="M3 12h2l2-5 3 10 3-14 3 12 2-6 1 3h2" />
      </svg>
    ),
  },
  {
    title: "Dynamic Optimization",
    desc: "Automatic gain control, equalization, adaptation",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-4 w-4" aria-hidden="true">
        <path d="M4 17a8 8 0 1 1 16 0" />
        <path d="M12 17l4-5" />
        <circle cx="12" cy="17" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Output Generation",
    desc: "Crystal-clear audio output",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
        <path d="M4 9v6h4l5 4V5L8 9H4Z" />
        <path d="M16.5 9a4.5 4.5 0 0 1 0 6M19 6.5a8 8 0 0 1 0 11" />
      </svg>
    ),
  },
];

const SEPARATION_INPUTS = ["Speaker voice", "Background noise", "Surrounding voices"];

function Waveform({
  bars,
  className = "",
  color,
}: {
  bars: number[];
  className?: string;
  color: string;
}) {
  return (
    <div className={`flex items-end gap-[3px] ${className}`}>
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-1 origin-bottom rounded-full"
          style={{
            height: `${h}%`,
            backgroundColor: color,
            animation: "iphipiWave 1.8s ease-in-out infinite",
            animationDelay: `${i * 0.06}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function AiTechnologiesPage() {
  return (
    <main
      className="flex-1 pb-28 transition-colors duration-500"
      style={{ backgroundColor: ACTIVE_THEME.pageBg, color: ACTIVE_THEME.secondary }}
    >
      {/* Injecting CSS Variables for Tailwind hover states and Animations */}
      <style>{`
        @keyframes iphipiWave {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
      `}</style>

      <AiTechHero />

      {/* Mic technology enhancements — sticky-scroll showcase */}
      <MicTechShowcase />

      {/* Technical deep dive — benchmarks and sub-use-cases per technology */}
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <TechDeepDive />
      </div>

      {/* NDP 115 — audio processing flow (full-bleed, like the Partners band) */}
      <section
        id="audio-processor"
        className="mt-28 px-4 py-28 text-white transition-colors duration-500 lg:px-6"
        style={{ backgroundColor: ACTIVE_THEME.secondary }}
      >
        <div className="mx-auto max-w-7xl">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: ACTIVE_THEME.accent }}
          >
            AI Audio Processor
          </p>
          <h2 className="mt-3 text-headline font-semibold tracking-tight">
            Audio Processing Flow
          </h2>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Our AI chip seamlessly processes audio from raw input
            to crystal-clear output.
          </p>

          {/* Architecture diagram: input → six stages → output */}
          <div className="mt-12 flex flex-col gap-2 xl:flex-row xl:items-stretch">
            {/* Raw input endpoint */}
            <div className="flex flex-col items-center justify-center gap-2.5 rounded-[14px] border border-white/10 bg-white/[0.03] px-4 py-5 xl:w-28 xl:shrink-0">
              <Waveform
                bars={[55, 25, 70, 40, 85, 30, 60]}
                className="h-8"
                color={theme.textMuted}
              />
              <p className="text-center text-[10px] font-semibold uppercase leading-tight tracking-[0.15em] text-zinc-400">
                Raw audio input
              </p>
            </div>

            <div className="flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 rotate-90 text-zinc-600 xl:rotate-0" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </div>

            {STAGES.map((stage, i) => (
              <div key={stage.title} className="flex flex-1 flex-col gap-2 xl:flex-row xl:items-stretch">
                <div className="flex-1 rounded-[14px] border border-white/15 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span style={{ color: ACTIVE_THEME.accent }}>{stage.icon}</span>
                    <span
                      className="font-geometric text-[10px]"
                      style={{ color: ACTIVE_THEME.accent }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-medium leading-tight">{stage.title}</p>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-400">
                    {stage.desc}
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 rotate-90 text-zinc-600 xl:rotate-0" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </div>
              </div>
            ))}

            {/* Enhanced output endpoint */}
            <div
              className="flex flex-col items-center justify-center gap-2.5 rounded-[14px] border px-4 py-5 xl:w-28 xl:shrink-0"
              style={{
                borderColor: ACTIVE_THEME.accentBorderMuted,
                backgroundColor: ACTIVE_THEME.accentBgMuted,
              }}
            >
              <Waveform
                bars={[45, 60, 50, 65, 52, 62, 48]}
                className="h-8"
                color={ACTIVE_THEME.accent}
              />
              <p
                className="text-center text-[10px] font-semibold uppercase leading-tight tracking-[0.15em]"
                style={{ color: ACTIVE_THEME.accent }}
              >
                Enhanced audio output
              </p>
            </div>
          </div>

          {/* Dashed bus down to the acceleration block (desktop) */}
          <div className="hidden xl:block">
            <div className="relative mt-3 h-7" style={{ marginInline: "10.5rem" }}>
              <div
                className="absolute inset-x-0 top-0 border-t border-dashed"
                style={{ borderColor: ACTIVE_THEME.accentBorderMuted }}
              />
              <div
                className="absolute left-0 top-0 h-3 border-l border-dashed"
                style={{ transform: "translateY(-100%)", borderColor: ACTIVE_THEME.accentBorderMuted }}
              />
              <div
                className="absolute right-0 top-0 h-3 border-r border-dashed"
                style={{ transform: "translateY(-100%)", borderColor: ACTIVE_THEME.accentBorderMuted }}
              />
              <div
                className="absolute left-1/2 top-0 h-full border-l border-dashed"
                style={{ borderColor: ACTIVE_THEME.accentBorderMuted }}
              />
            </div>
          </div>

          {/* On-chip acceleration */}
          <div
            className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-[16px] border border-dashed px-6 py-4 xl:mt-0"
            style={{
              borderColor: ACTIVE_THEME.accentBorderMuted,
              backgroundColor: ACTIVE_THEME.accentBgMuted,
            }}
          >
            <p className="flex items-center gap-2.5 text-sm font-semibold">
              <span style={{ color: ACTIVE_THEME.accent }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                  <rect x="7" y="7" width="10" height="10" rx="2" />
                  <path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" />
                </svg>
              </span>
              On-Chip AI Acceleration
            </p>
            <p className="text-sm text-zinc-400">
              Ultra-low latency · Low power · Real-time processing
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        {/* Form factors */}
        <section id="form-factors" className="mt-28 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-subhead font-semibold tracking-tight">
              Supported Wearable Form Factors
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-zinc-500">
              One noise-suppression engine, tuned per device. From in-ear
              earbuds to ambient pendants, the same AI core adapts its
              beamforming and gain profile to each form factor&apos;s mic
              geometry — no separate tuning pass required per SKU.
            </p>
            <button
              type="button"
              className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: ACTIVE_THEME.secondary }}
            >
              Book a Demo
            </button>
          </div>
          <FormFactorsShowcase />
        </section>
      </div>
    </main>
  );
}