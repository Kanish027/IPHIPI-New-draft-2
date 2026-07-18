"use client";

import { theme, withAlpha } from "@/lib/theme";

const ACTIVE_THEME = {
  primary: theme.primary,
  secondary: theme.secondary,
  accent: theme.accent,
  bodyText: theme.bodyText,
  cardBg: theme.cardWarm,
};

function SectionHeading({ eyebrow, title, tagline }: { eyebrow: string; title: string; tagline: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: ACTIVE_THEME.accent }}>
        {eyebrow}
      </p>
      <h3 className="mt-3 text-subhead font-semibold tracking-tight" style={{ color: ACTIVE_THEME.secondary }}>
        {title}
      </h3>
      <p className="mt-3 leading-relaxed text-zinc-500">{tagline}</p>
    </div>
  );
}

function MiniWave({ bars, color, className = "" }: { bars: number[]; color: string; className?: string }) {
  return (
    <div className={`flex items-end gap-[3px] ${className}`}>
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-1 origin-bottom rounded-full"
          style={{
            height: `${h}%`,
            backgroundColor: color,
            animation: "iphipiWave 1.7s ease-in-out infinite",
            animationDelay: `${i * 0.06}s`,
          }}
        />
      ))}
    </div>
  );
}

const NOISY_BARS = [30, 50, 35, 65, 40, 75, 45, 55, 35, 60];

// --- 1. One Mic Solution -------------------------------------------------

const NOISE_SOURCES = ["Toddler Noise", "TV & Streaming", "Cutlery & Kitchen", "Office Chatter", "Coffee Machine"];

function OneMicSolution() {
  return (
    <div className="mt-10">
      <SectionHeading
        eyebrow="One Mic Solution"
        title="Freedom to Work. Confidence to Be Heard."
        tagline="Background noise is everywhere. Our single-mic AI suppresses it — so you don't have to change your life."
      />

      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6">
        {/* The Problem */}
        <div className="rounded-2xl border border-red-200/60 bg-red-50/40 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-600">The Problem</p>
          <p className="mt-1 text-sm text-zinc-500">You have to adapt. Not everyone else.</p>
          <ul className="mt-4 space-y-2.5">
            {NOISE_SOURCES.map((n) => (
              <li key={n} className="flex items-center gap-2.5 text-sm text-zinc-600">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                {n}
              </li>
            ))}
          </ul>
        </div>

        {/* Center callout */}
        <div
          className="flex flex-col items-center justify-center gap-3 rounded-2xl p-6 text-center"
          style={{ background: `linear-gradient(160deg, ${ACTIVE_THEME.secondary} 0%, ${theme.gradDark2} 100%)` }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">IPHIPI</p>
          <p className="text-sm font-medium text-white/70">One Mic Solution</p>
          <MiniWave bars={NOISY_BARS} color={ACTIVE_THEME.accent} className="h-10" />
          <p className="text-[11px] uppercase tracking-wide" style={{ color: ACTIVE_THEME.accent }}>
            AI Noise Suppression
          </p>
        </div>

        {/* The Solution */}
        <div
          className="rounded-2xl border p-6"
          style={{ borderColor: withAlpha(ACTIVE_THEME.accent, 0.3), backgroundColor: withAlpha(ACTIVE_THEME.accent, 0.06) }}
        >
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: ACTIVE_THEME.primary }}>
            The Solution
          </p>
          <p className="mt-1 text-sm text-zinc-500">You stay where you are. We handle the noise.</p>
          <ul className="mt-4 space-y-2.5">
            {NOISE_SOURCES.map((n) => (
              <li key={n} className="flex items-center gap-2.5 text-sm text-zinc-600">
                <svg viewBox="0 0 24 24" fill="none" stroke={ACTIVE_THEME.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {n} — Suppressed
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {["Clear Voice, Every Call", "Real-Time AI Suppression", "Sit Anywhere", "Professional Confidence", "Single Mic, Powerful Results"].map((b) => (
          <span key={b} className="rounded-full border border-zinc-200 px-3.5 py-1.5 text-xs font-medium text-zinc-600">
            {b}
          </span>
        ))}
      </div>

      {/* Benchmarks */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { stat: "100+", label: "Real-world noise profiles trained" },
          { stat: "Real-Time", label: "Dereverberation" },
          { stat: "Adaptive", label: "Environment-aware processing" },
          { stat: "Natural", label: "DSP-preserved voice tone" },
        ].map((b) => (
          <div key={b.label} className="rounded-2xl border border-zinc-200 p-5">
            <p className="text-2xl font-semibold tracking-tight" style={{ color: ACTIVE_THEME.primary }}>
              {b.stat}
            </p>
            <p className="mt-1 text-xs leading-snug text-zinc-500">{b.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500">
        IPHIPI&apos;s single-mic ENC combines AI noise suppression with DSP post-processing to
        refine the enhanced signal and preserve the natural characteristics of the speaker&apos;s
        voice — clearer, more intelligible speech without sounding heavily processed, even in
        shifting acoustic chaos like café chatter, traffic, and construction.
      </p>
    </div>
  );
}

// --- 2. Two Mic Solution --------------------------------------------------

function TwoMicSolution() {
  return (
    <div className="mt-16">
      <SectionHeading
        eyebrow="Two Mic Solution"
        title="Clear Voice. Anywhere."
        tagline="Dual microphones with real-time beamforming — built for the outside world, not just the office."
      />

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{ background: `linear-gradient(160deg, ${ACTIVE_THEME.secondary} 0%, ${theme.gradDark2} 100%)` }}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-white/60">High-Wind Voice Capture</p>
          <p className="mt-2 text-4xl font-semibold tabular-nums text-white">
            80<span style={{ color: ACTIVE_THEME.accent }} className="ml-1 text-lg">km/h</span>
          </p>
          <p className="mt-1 text-sm text-white/50">Wind speeds up to 80 km/h. Still clear.</p>

          <div className="mt-6 space-y-2.5">
            <div className="flex items-center gap-3">
              <span className="w-10 shrink-0 text-[10px] uppercase tracking-wide text-white/40">Noise</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[85%] rounded-full bg-red-400/70" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-10 shrink-0 text-[10px] uppercase tracking-wide text-white/40">Voice</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[35%] rounded-full" style={{ backgroundColor: ACTIVE_THEME.accent }} />
              </div>
            </div>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-white/50">
            Sensor fusion across talk and feedback mics distinguishes voice from wind
            turbulence — effortless calls for cyclists, motorbike riders, and tuk-tuk travellers.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Built for Real Life</p>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-zinc-600">
            {["Strong Wind", "Traffic & Honks", "Construction Sites", "Metro & Streets", "Cafes", "Offices", "Meetings", "Gig Work"].map((tag) => (
              <div key={tag} className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke={ACTIVE_THEME.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {tag}
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-wide" style={{ color: ACTIVE_THEME.primary }}>
            Interfering-Talker Suppression
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">
            Nearby conversations contain speech that closely resembles the wearer&apos;s own voice
            — one of the hardest noise sources to reject. Our dual-mic fusion engine uses the
            distinct acoustic relationship of the wearer&apos;s voice across the talk and feedback
            mics to preserve the wearer and reject surrounding conversations, in offices, cafés,
            and contact centres.
          </p>
        </div>
      </div>
    </div>
  );
}

// --- 3. Far-Field Voice Solution ------------------------------------------

const NOISY_ENV = [
  { label: "Traffic Noise", db: 75 },
  { label: "Engine Noise", db: 80 },
  { label: "Wind Noise", db: 70 },
  { label: "Road Noise", db: 75 },
  { label: "Other Sounds", db: 60 },
];

const FAR_FIELD_STEPS = [
  "Far-Field Capture",
  "Input",
  "AI Processing",
  "Enhance",
  "Output",
  "Response",
];

function FarFieldSolution() {
  return (
    <div className="mt-16">
      <SectionHeading
        eyebrow="Far-Field Voice Solution"
        title="Order Food from Your Car. Clearly. Even in Highway Noise."
        tagline="Captures voice from up to 2 meters away, then removes highway-grade noise before a single word reaches the system."
      />

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <div className="rounded-2xl border border-zinc-200 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Noisy Environment</p>
          <div className="mt-4 space-y-3">
            {NOISY_ENV.map((n) => (
              <div key={n.label} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-sm text-zinc-600">{n.label}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-100">
                  <div className="h-full rounded-full bg-red-400/70" style={{ width: `${n.db}%` }} />
                </div>
                <span className="w-10 shrink-0 text-right text-xs font-semibold text-zinc-500">{n.db} dB</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="flex flex-col items-center justify-center gap-3 rounded-2xl p-6 text-center sm:p-8"
          style={{ background: `linear-gradient(160deg, ${ACTIVE_THEME.secondary} 0%, ${theme.gradDark2} 100%)` }}
        >
          <p className="text-4xl font-semibold tabular-nums text-white">
            2<span style={{ color: ACTIVE_THEME.accent }} className="ml-1 text-lg">m</span>
          </p>
          <p className="text-xs uppercase tracking-wide text-white/50">Effective capture range</p>
          <MiniWave bars={NOISY_BARS} color={ACTIVE_THEME.accent} className="h-10" />
          <p className="max-w-[220px] text-sm text-white/60">
            &ldquo;Hi, can I get 1 veg burger, 1 fries, and a Coke?&rdquo;
          </p>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">How It Works</p>
        <div className="mt-4 flex flex-col gap-2 lg:flex-row lg:items-stretch">
          {FAR_FIELD_STEPS.map((step, i) => (
            <div key={step} className="flex flex-1 items-stretch gap-2">
              <div className="flex flex-1 flex-col items-center justify-center gap-1.5 rounded-xl border border-zinc-200 px-3 py-4 text-center">
                <span
                  className="text-xs font-semibold tabular-nums"
                  style={{ color: ACTIVE_THEME.accent }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-xs font-medium leading-tight text-zinc-700">{step}</p>
              </div>
              {i < FAR_FIELD_STEPS.length - 1 && (
                <div className="hidden items-center justify-center text-zinc-300 lg:flex">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                    <path d="m9 6 6 6-6 6" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: ACTIVE_THEME.primary }}>
            Drive-Thru Speech Enhancement
          </p>
          <p className="mt-1 text-sm font-medium text-zinc-700">Clearer orders. Faster service. Less listening fatigue.</p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500">
            Isolates the customer&apos;s voice from continuously changing lane noise —
            engines, traffic, wind, fans, music — before it reaches the crew headset,
            reducing listening effort and providing cleaner speech for ASR and
            AI-assisted ordering.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: ACTIVE_THEME.primary }}>
            IoT &amp; Self-Service Systems
          </p>
          <p className="mt-1 text-sm font-medium text-zinc-700">Better speech capture. More reliable machine understanding.</p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500">
            Smart home devices, voice kiosks, and connected appliances capture speech from
            a distance around TVs, kitchen equipment, and crowd chatter — improving clarity
            before it reaches ASR, wake-word, or intent-recognition models, for fewer false
            triggers and faster interactions.
          </p>
        </div>
      </div>
    </div>
  );
}

// --- 4. Keyword Spotting / Wake-Word Solution -----------------------------

function KeywordSpottingSolution() {
  return (
    <div className="mt-16">
      <SectionHeading
        eyebrow="Keyword Spotting"
        title="Always Listening. Instantly Ready."
        tagline="Ultra-low-power wake-word and custom-command detection — running entirely on-device, always ready."
      />

      <div className="mt-8 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
        <div className="flex flex-1 flex-col items-center gap-3 rounded-2xl border border-zinc-200 p-6 text-center">
          <MiniWave bars={NOISY_BARS} color={theme.railTextInactive} className="h-8" />
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Voice Input</p>
        </div>

        <ArrowRight />

        <div
          className="flex flex-1 flex-col items-center gap-2 rounded-2xl p-6 text-center"
          style={{ background: `linear-gradient(160deg, ${ACTIVE_THEME.secondary} 0%, ${theme.gradDark2} 100%)` }}
        >
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{ backgroundColor: withAlpha(ACTIVE_THEME.accent, 0.15) }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke={ACTIVE_THEME.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
              <rect x="7" y="7" width="10" height="10" rx="2" />
              <path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" />
            </svg>
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/90">AI Chip</p>
          <p className="text-[11px] text-white/50">Keyword Spotting &amp; Detection</p>
        </div>

        <ArrowRight />

        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-3 rounded-xl border border-zinc-200 p-4">
            <svg viewBox="0 0 24 24" fill="none" stroke={ACTIVE_THEME.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M9 10h.01M15 10h.01M8 15c1.2 1 2.5 1.5 4 1.5s2.8-.5 4-1.5" />
            </svg>
            <div>
              <p className="text-xs font-semibold text-zinc-700">Custom Commands</p>
              <p className="text-[11px] text-zinc-500">Triggers user-defined actions</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-zinc-200 p-4">
            <svg viewBox="0 0 24 24" fill="none" stroke={ACTIVE_THEME.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0" aria-hidden="true">
              <rect x="9" y="2" width="6" height="12" rx="3" />
              <path d="M5 11a7 7 0 0 0 14 0M12 18v4" />
            </svg>
            <div>
              <p className="text-xs font-semibold text-zinc-700">Wake Word</p>
              <p className="text-[11px] text-zinc-500">Wakes the device, enables the AI agent</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 p-6">
          <p className="text-2xl font-semibold tracking-tight" style={{ color: ACTIVE_THEME.primary }}>
            ~2 mW
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">The Intelligence Anchor</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            An always-on, low-power listening layer that recognizes wake words and commands
            directly on-device — no streaming to the cloud, no full ASR pipeline running.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 p-6">
          <p className="text-sm font-semibold text-zinc-700">Wake the agent only when it&apos;s needed</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            The full agentic AI stack — speech enhancement, ASR, intent recognition — stays
            asleep in a low-power state until KWS detects the wake word, then activates the
            downstream chain instantly.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 p-6">
          <p className="text-sm font-semibold text-zinc-700">Brand-customizable wake words</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            One platform, tailored to every brand. Using a brand&apos;s preferred wake phrase and
            speech data, the KWS model fine-tunes to recognize custom wake words — &ldquo;Hey
            Mivi,&rdquo; &ldquo;Hey Boat&rdquo; — while staying low-power and on-device.
          </p>
        </div>
      </div>
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="flex items-center justify-center py-1 text-zinc-300 lg:rotate-0">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 rotate-90 lg:rotate-0" aria-hidden="true">
        <path d="m9 6 6 6-6 6" />
      </svg>
    </div>
  );
}

export default function TechDeepDive() {
  return (
    <section id="mic-technology" className="mt-28 scroll-mt-24">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Mic &amp; Voice Intelligence</p>
      <h2 className="mt-3 max-w-2xl text-subhead font-semibold tracking-tight" style={{ color: ACTIVE_THEME.secondary }}>
        The Technology Behind Every Enhancement
      </h2>
      <p className="mt-4 max-w-2xl leading-relaxed text-zinc-500">
        From a single microphone to far-field capture across a room, the same
        adaptive AI core powers every configuration.
      </p>

      <OneMicSolution />
      <TwoMicSolution />
      <FarFieldSolution />
      <KeywordSpottingSolution />
    </section>
  );
}
