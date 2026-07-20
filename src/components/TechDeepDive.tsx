"use client";

import type { ReactNode } from "react";
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

// A standalone technical-explanation block — icon + eyebrow + heading + body,
// framed as its own card so back-to-back sections read as distinct panels
// rather than an undifferentiated wall of text.
function InfoCard({
  icon,
  eyebrow,
  title,
  tagline,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  tagline: string;
}) {
  return (
    <div
      className="rounded-2xl border p-6 sm:p-8"
      style={{ borderColor: withAlpha(ACTIVE_THEME.accent, 0.15), backgroundColor: ACTIVE_THEME.cardBg }}
    >
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ backgroundColor: withAlpha(ACTIVE_THEME.accent, 0.12), color: ACTIVE_THEME.accent }}
      >
        {icon}
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: ACTIVE_THEME.accent }}>
        {eyebrow}
      </p>
      <h3 className="mt-2 text-lg font-semibold tracking-tight sm:text-xl" style={{ color: ACTIVE_THEME.secondary }}>
        {title}
      </h3>
      <p className="mt-3 max-w-2xl leading-relaxed text-zinc-500">{tagline}</p>
    </div>
  );
}

const DspIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
    <path d="M3 12h3l2-6 4 12 2-9 2 5h5" />
  </svg>
);

const ShieldIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const FusionIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="12" r="3" />
    <path d="M9 12h6" />
  </svg>
);

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
        eyebrow="Single Mic Speech Enhancement"
        title="Built for the Noises of Everyday Life"
        tagline="Conversations compete with unpredictable background noise—from TVs and kitchen sounds to cafés, traffic, construction noises. IPHIPI's AI-powered Single Mic Speech Enhancement delivers exceptional voice clarity through edge-optimized, real-time audio processing."
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

      {/* Benchmarks — matches the doc's four exact bullets */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { stat: "01", label: "Trained Across 100+ Real-World Noise Profiles" },
          { stat: "02", label: "Optimized for dynamic acoustic environments" },
          { stat: "03", label: "Real-Time Dereverberation" },
          { stat: "04", label: "Environment-Adaptive Processing" },
        ].map((b) => (
          <div key={b.label} className="rounded-2xl border border-zinc-200 p-5">
            <p className="font-geometric text-xs font-semibold" style={{ color: ACTIVE_THEME.accent }}>
              {b.stat}
            </p>
            <p className="mt-1.5 text-sm font-medium leading-snug text-zinc-700">{b.label}</p>
          </div>
        ))}
      </div>

      {/* Technical explanations — DSP + AI noise suppression, side by side as cards */}
      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <InfoCard
          icon={DspIcon}
          eyebrow="DSP-Driven Voice Enhancement"
          title="Natural speech, even in extreme noise"
          tagline="Effective voice enhancement requires more than suppressing background noise. IPHIPI's single-microphone ENC combines AI noise suppression with DSP-based post-processing to refine the enhanced signal and preserve the natural characteristics of the speaker's voice — clearer, more intelligible speech without sounding heavily processed."
        />
        <InfoCard
          icon={ShieldIcon}
          eyebrow="AI-Based Noise Suppression That Defines Clarity"
          title="Adaptive Noise Suppression for Real-World Chaos"
          tagline="Engineered to maintain clear speech in the most challenging acoustic environments — overlapping café chatter, heavy traffic, construction activity. The AI-based separation engine continuously adapts in real time, isolating the speaker's voice so the conversation sounds as though it's in a quiet room, even when it's not."
        />
      </div>
    </div>
  );
}

// --- 2. Two Mic Solution --------------------------------------------------

function TwoMicSolution() {
  return (
    <div className="mt-16">
      <SectionHeading
        eyebrow="Dual Mic Speech Enhancement"
        title="Clear voice through dual-microphone intelligence"
        tagline="Harsh noise conditions require more than a single view of the acoustic environment. IPHIPI's two-microphone ENC combines signals from the talk microphone and feedback microphone to improve voice capture and provide the AI engine with complementary information about the wearer's speech."
      />

      <div className="mt-8">
        <InfoCard
          icon={FusionIcon}
          eyebrow="Clean, Natural Speech"
          title="Natural Voice Clarity, Powered by Dual-Microphone AI"
          tagline="Through dual-microphone sensor fusion, AI-based speech separation, and DSP post-processing, the system suppresses severe environmental noise without over-processing the speech — preserving natural tone and clarity in heavy traffic, strong wind, café babble, subway environments, and the presence of nearby interfering talkers."
        />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Interfering-Talker Suppression</p>
          <p className="mt-1 text-sm font-medium text-zinc-700">Preserve the wearer. Reject surrounding conversations.</p>
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-zinc-600">
            {["Offices", "Homes", "Cafés", "Contact Centres", "Shared Workspaces"].map((tag) => (
              <div key={tag} className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke={ACTIVE_THEME.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {tag}
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-relaxed text-zinc-500">
            Nearby conversations contain speech that closely resembles the wearer&apos;s own voice
            — one of the most challenging noise sources to suppress. IPHIPI&apos;s dual-microphone
            fusion engine uses the distinct acoustic relationship of the wearer&apos;s voice across
            the talk and feedback microphones to separate it from nearby talkers, allowing the
            primary speaker&apos;s voice to pass through clearly.
          </p>
        </div>

        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{ background: `linear-gradient(160deg, ${ACTIVE_THEME.secondary} 0%, ${theme.gradDark2} 100%)` }}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-white/60">High-Wind Voice Capture</p>
          <p className="mt-1 text-sm font-medium text-white/90">
            Effortless calls for cyclists, motorbike riders, and tuk-tuk travellers
          </p>
          <p className="mt-2 text-4xl font-semibold tabular-nums text-white">
            80<span style={{ color: ACTIVE_THEME.accent }} className="ml-1 text-lg">km/h</span>
          </p>

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
          <p className="mt-5 text-sm leading-relaxed text-white/50">
            Calls made while travelling are often disrupted by strong wind, traffic, and
            continuously changing road noise. IPHIPI&apos;s two-microphone ENC combines signals
            from the talk and feedback microphones using sensor fusion to distinguish the
            wearer&apos;s voice from wind turbulence, maintaining clear, natural speech at wind
            speeds of up to 80 km/h.
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
        eyebrow="Far-Field Speech Enhancement"
        title="Clear speech capture from a distance"
        tagline="Business voice interfaces often operate in acoustically challenging environments where the speaker is not close to the microphone. IPHIPI's far-field speech enhancement isolates speech from surrounding noise and enhances the quality of the desired signal — delivering cleaner input for both human listening and machine understanding (ASR, event prediction)."
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
            Drive-thru communication takes place amid engines, traffic, wind, fans, music,
            and overlapping conversations. IPHIPI&apos;s far-field ENC isolates the customer&apos;s
            voice from continuously changing lane noise before it reaches the crew headset —
            reducing listening effort and fatigue, and providing cleaner speech for ASR and
            AI-assisted ordering systems.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: ACTIVE_THEME.primary }}>
            Far-Field Speech for IoT and Self-Service Systems
          </p>
          <p className="mt-1 text-sm font-medium text-zinc-700">Better speech capture. More reliable machine understanding.</p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500">
            Smart home devices, voice kiosks, and connected appliances must capture speech
            from a distance while operating around televisions, kitchen equipment, crowd
            chatter, and room reverberation. IPHIPI&apos;s far-field noise suppression isolates
            the intended speaker before the signal reaches ASR, wake-word, or
            intent-recognition models — for fewer false triggers and faster interactions.
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
        eyebrow="The Intelligence Anchor"
        title="Always-on voice control with minimal power consumption"
        tagline="Continuously running a complete speech-recognition or AI-agent pipeline consumes significant power and is often unnecessary when the device only needs to detect a wake phrase or a limited set of commands. IPHIPI's keyword-spotting technology provides an always-on, low-power listening layer that recognizes predefined words and commands directly on the device — immediately triggering a device function or activating a higher-level voice assistant and agentic AI system."
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

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Custom Voice Commands</p>
          <p className="mt-1 text-sm font-semibold text-zinc-700">Immediate control without cloud processing</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            Keyword spotting enables commonly used actions to be triggered through short,
            natural voice commands. The model continuously listens only for the configured
            command set, allowing devices to respond quickly without streaming audio to the
            cloud or running a complete ASR pipeline.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Wake-Word Detection for Agentic AI</p>
          <p className="mt-1 text-sm font-semibold text-zinc-700">Wake the agent only when it is needed</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            In agentic AI systems, continuously operating the full voice-processing and
            reasoning pipeline can consume significant power. A lightweight keyword-spotting
            model stays active in the background, listening for a designated wake word while
            the main AI agent stays in a low-power state — activating the downstream chain
            (speech enhancement, ASR, intent recognition, the AI agent) only when needed.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 p-6 sm:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">Brand-Customizable KWS</p>
          <p className="mt-1 text-sm font-semibold text-zinc-700">One platform, tailored to every brand</p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-500">
            IPHIPI&apos;s keyword-spotting technology can be adapted to different products and
            brand identities. Using the brand&apos;s preferred wake phrase and representative
            speech data — &ldquo;Hey Mivi,&rdquo; &ldquo;Hey Boat&rdquo; — the KWS model can be
            fine-tuned to recognize custom wake words and commands while maintaining
            low-power, on-device operation.
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
      <hr className="my-16 border-t" style={{ borderColor: withAlpha(ACTIVE_THEME.secondary, 0.08) }} />
      <TwoMicSolution />
      <hr className="my-16 border-t" style={{ borderColor: withAlpha(ACTIVE_THEME.secondary, 0.08) }} />
      <FarFieldSolution />
      <hr className="my-16 border-t" style={{ borderColor: withAlpha(ACTIVE_THEME.secondary, 0.08) }} />
      <KeywordSpottingSolution />
    </section>
  );
}
