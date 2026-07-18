import type { Metadata } from "next";
import ResearchHero from "@/components/ResearchHero";
import TeamSection from "@/components/TeamSection";
import React from "react";
import { theme, withAlpha } from "@/lib/theme";

export const metadata: Metadata = {
  title: "R&D — IPHIPI",
  description:
    "The research behind the agentic AI experience — productive, living, personal, and spatial intelligence.",
};

const ACTIVE_THEME = {
  primary: theme.primary,
  secondary: theme.secondary,
  accent: theme.accent,
  accentBgMuted: withAlpha(theme.accent, 0.08),
  pageBg: theme.pageBg,
  cardBg: theme.cardWarm,
};

/* The Signal: used for audio/spatial signal indicators
   (DOA radar, navigation/vision/audio icons). Dynamically maps to the Accent color. */
const SIGNAL = ACTIVE_THEME.accent;

/* ------------------------------------------------------------------ */
/*  Shared bits                                                       */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
      {children}
    </p>
  );
}

function AgenticEdge({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl border border-zinc-200/70 p-5 transition-colors duration-500"
      style={{ backgroundColor: ACTIVE_THEME.cardBg }}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.15em]" style={{color: ACTIVE_THEME.secondary}}>
        Agentic Edge
      </p>
      <p className="mt-2 text-sm leading-relaxed text-zinc-700">{children}</p>
    </div>
  );
}

function TechChips({ items }: { items: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {items.map((tech) => (
        <span
          key={tech}
          className="rounded-full border border-zinc-200 px-3.5 py-1.5 text-sm transition-colors duration-500"
          style={{ color: ACTIVE_THEME.secondary }}
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Work Intelligence — technology visualization cards (dark)         */
/* ------------------------------------------------------------------ */

function TechCard({
  icon,
  desc,
  children,
  className = "",
}: {
  icon: React.ReactNode;
  desc: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.04] p-5 ${className}`}>
      <div className="flex items-center gap-2 text-zinc-300">{icon}</div>
      <p className="mt-1 text-xs leading-relaxed text-zinc-500">{desc}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Wave({ bars, color }: { bars: number[]; color: string }) {
  return (
    <div className="flex h-10 items-end gap-[3px]">
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-1 origin-bottom rounded-full"
          style={{
            height: `${h}%`,
            backgroundColor: color,
            animation: "iphipiWave 1.6s ease-in-out infinite",
            animationDelay: `${i * 0.08}s`,
          }}
        />
      ))}
    </div>
  );
}

function AvatarRow() {
  const colors = ["#60A5FA", "#F472B6", "#34D399"];
  return (
    <div className="flex gap-3">
      {colors.map((c, i) => (
        <span
          key={i}
          className="flex h-9 w-9 items-center justify-center rounded-full border-2"
          style={{
            borderColor: c,
            animation: "iphipiSpeak 3.6s ease-in-out infinite",
            animationDelay: `${i * 1.2}s`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" className="h-4 w-4">
            <circle cx="12" cy="8" r="3.2" />
            <path d="M5 20c1.2-3.5 4-5 7-5s5.8 1.5 7 5" strokeLinecap="round" />
          </svg>
        </span>
      ))}
    </div>
  );
}

function SceneGrid() {
  const scenes = ["Indoor", "Outdoor", "Crowded", "Office"];
  return (
    <div className="grid grid-cols-4 gap-2">
      {scenes.map((s, i) => (
        <div
          key={s}
          className="rounded-lg border border-white/10 bg-white/[0.03] py-3 text-center text-[10px] text-zinc-400"
          style={{
            animation: "iphipiCycleTile 4.8s ease-in-out infinite",
            animationDelay: `${i * 1.2}s`,
          }}
        >
          {s}
        </div>
      ))}
    </div>
  );
}

function EmotionGrid() {
  const emotions = ["Happy", "Neutral", "Sad", "Angry"];
  return (
    <div className="grid grid-cols-4 gap-2">
      {emotions.map((e, i) => (
        <div key={e} className="flex flex-col items-center gap-1">
          <span
            className="h-6 w-6 rounded-full border border-white/15 bg-white/5"
            style={{
              animation: "iphipiCycleTile 4.8s ease-in-out infinite",
              animationDelay: `${i * 1.2}s`,
            }}
          />
          <span className="text-[10px] text-zinc-500">{e}</span>
        </div>
      ))}
    </div>
  );
}

function DoaRadar() {
  return (
    <div className="relative mx-auto h-28 w-28">
      {/* Rotating radar sweep */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <div
          className="absolute inset-0 animate-[spin_4s_linear_infinite]"
          style={{
            background: `conic-gradient(from 0deg, ${withAlpha(theme.accent, 0.35)}, transparent 75deg)`,
          }}
        />
      </div>
      <div className="absolute inset-0 rounded-full border border-white/10" />
      <div className="absolute inset-3 rounded-full border border-white/10" />
      <div className="absolute inset-6 rounded-full border border-white/10" />
      <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-geometric text-[9px] text-zinc-500">
        Front
      </span>
      <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 font-geometric text-[9px] text-zinc-500">
        180° Back
      </span>
      <span className="absolute left-[-30px] top-1/2 -translate-y-1/2 font-geometric text-[9px] text-zinc-500">
        90° Left
      </span>
      <span className="absolute right-[-34px] top-1/2 -translate-y-1/2 font-geometric text-[9px] text-zinc-500">
        90° Right
      </span>
      <span
        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          backgroundColor: SIGNAL,
          animation: "blinking 1.5s ease-in-out infinite",
        }}
      />
    </div>
  );
}

function DiarizationTimeline() {
  const speakers = [
    { label: "Speaker 1", color: "#60A5FA" },
    { label: "Speaker 2", color: "#F472B6" },
    { label: "Speaker 3", color: "#34D399" },
    { label: "Speaker 4", color: "#FBBF24" },
    { label: "Speaker 5", color: "#A78BFA" },
  ];
  const bars = [30, 55, 40, 70, 35, 60, 80, 45, 65, 30, 50, 75, 40, 60, 35, 55, 70, 45, 30, 65];
  return (
    <div>
      <div className="relative flex h-12 items-end gap-[2px]">
        {bars.map((h, i) => (
          <span
            key={i}
            className="w-1 origin-bottom rounded-full"
            style={{
              height: `${h}%`,
              backgroundColor: speakers[i % speakers.length].color,
              animation: "iphipiWave 1.8s ease-in-out infinite",
              animationDelay: `${i * 0.09}s`,
            }}
          />
        ))}
        {/* Playhead scanning the conversation */}
        <span
          className="absolute inset-y-0 w-px bg-white/50"
          style={{ animation: "iphipiPlayhead 7s linear infinite" }}
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-4">
        {speakers.map((s) => (
          <span key={s.label} className="flex items-center gap-1.5 text-[10px] text-zinc-500">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

const MicIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
    <rect x="9" y="2" width="6" height="12" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v4M9 22h6" strokeLinecap="round" />
  </svg>
);

const EarIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
    <path d="M8 14c-2-1-3-3-3-5a5 5 0 0 1 10 0c0 2 1.5 2.5 1.5 4.5A3.5 3.5 0 0 1 13 17c-1 0-1.5-.5-1.5-1.5" />
  </svg>
);

const PeopleIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
    <circle cx="9" cy="8" r="3" />
    <path d="M2 20c1-3.5 3.5-5 7-5s6 1.5 7 5" />
  </svg>
);

const SceneIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
    <rect x="3" y="4" width="18" height="14" rx="2" />
    <path d="m3 15 5-5 4 4 5-6 4 5" />
  </svg>
);

const FaceIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
    <circle cx="12" cy="12" r="9" />
    <path d="M9 10h.01M15 10h.01M8 15c1.2 1 2.5 1.5 4 1.5s2.8-.5 4-1.5" strokeLinecap="round" />
  </svg>
);

const RadarIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <path d="M12 3v3M21 12h-3M12 21v-3M3 12h3" strokeLinecap="round" />
  </svg>
);

const DiarizationIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
    <path d="M3 12h3l2-6 4 12 2-9 2 5h5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Spatial Intelligence — feature icons                               */
/* ------------------------------------------------------------------ */

const PinIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
    <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const EyeIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const SpeakerIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
    <path d="M4 9v6h4l5 4V5L8 9H4Z" />
    <path d="M16.5 9a4.5 4.5 0 0 1 0 6" strokeLinecap="round" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function ResearchPage() {
  return (
    <main
      className="flex-1 transition-colors duration-500"
      style={{
        backgroundColor: ACTIVE_THEME.pageBg,
        color: ACTIVE_THEME.secondary,
      }}
    >
      {/* Injecting CSS Variables for Dynamic Hover States */}
      <style>{`
        .theme-hover-living-card {
          border-color: ${withAlpha(theme.textLight, 0.1)};
        }
        .theme-hover-living-card:hover {
          border-color: ${ACTIVE_THEME.accent};
          background-color: ${withAlpha(theme.textLight, 0.04)};
        }

        .theme-hover-living-icon {
          background-color: ${withAlpha(theme.textLight, 0.06)};
          color: ${withAlpha(theme.textLight, 0.7)};
        }
        .theme-hover-living-card:hover .theme-hover-living-icon {
          background-color: ${ACTIVE_THEME.accent};
          color: ${ACTIVE_THEME.secondary};
        }
      `}</style>

      <ResearchHero />

      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        {/* ============================= */}
        {/* Work Intelligence              */}
        {/* ============================= */}
        <section id="work-intelligence" className="mt-28 scroll-mt-24">
          <Eyebrow>Work Intelligence</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-subhead font-semibold tracking-tight">
            Your Always-On Executive Assistant
          </h2>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="max-w-xl leading-relaxed text-zinc-500">
                Transitions between meetings, calls, and focused work —
                seamlessly. The platform understands context and proactively
                manages notifications, summarizes conversations, and maintains
                task continuity.
              </p>
              <div className="mt-6 max-w-xl">
                <AgenticEdge>
                  The AI recognizes speakers, tracks unfinished actions, and
                  prioritizes information — like a trusted executive assistant.
                </AgenticEdge>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold">Technologies Used</p>
              <TechChips
                items={[
                  "Speech Enhancement",
                  "Whisper Enhancement",
                  "Speaker Identification",
                  "Scene Identification",
                  "Emotion Understanding",
                  "Direction of Arrival (DOA)",
                  "Speaker Diarization",
                ]}
              />
            </div>
          </div>

          {/* Technology visualization cards — dynamically tracking Secondary theme color */}
          <div
            className="mt-10 rounded-xl p-6 text-white sm:p-8 transition-colors duration-500"
            style={{ backgroundColor: ACTIVE_THEME.secondary }}
          >
            <div className="grid gap-4 md:grid-cols-3">
              <TechCard
                icon={<>{MicIcon}<span className="text-xs font-medium">Speech Enhancement</span></>}
                desc="Reduces background noise and enhances voice clarity."
              >
                <Wave bars={[30, 55, 40, 80, 35, 65, 45, 90, 30, 60, 40, 75]} color="#60A5FA" />
              </TechCard>

              <TechCard
                icon={<>{EarIcon}<span className="text-xs font-medium">Whisper Enhancement</span></>}
                desc="Amplifies soft speech without losing natural tone."
              >
                <Wave bars={[20, 40, 25, 55, 30, 45, 25, 60, 20, 40, 25, 50]} color="#C084FC" />
              </TechCard>

              <TechCard
                icon={<>{PeopleIcon}<span className="text-xs font-medium">Speaker Identification</span></>}
                desc="Recognizes who is speaking in real time."
              >
                <AvatarRow />
              </TechCard>

              <TechCard
                icon={<>{SceneIcon}<span className="text-xs font-medium">Scene Identification</span></>}
                desc="Understands the environment in real time."
              >
                <SceneGrid />
              </TechCard>

              <TechCard
                icon={<>{FaceIcon}<span className="text-xs font-medium">Emotion Understanding</span></>}
                desc="Detects emotions to enable more natural interactions."
              >
                <EmotionGrid />
              </TechCard>

              <TechCard
                icon={<>{RadarIcon}<span className="text-xs font-medium">Direction of Arrival (DOA)</span></>}
                desc="Detects the direction of incoming sound in 3D space."
              >
                <DoaRadar />
              </TechCard>

              <TechCard
                icon={<>{DiarizationIcon}<span className="text-xs font-medium">Speaker Diarization</span></>}
                desc="Distinguishes multiple speakers and tracks conversation flow."
                className="md:col-span-3"
              >
                <DiarizationTimeline />
              </TechCard>
            </div>
          </div>
        </section>
      </div>

      {/* ============================= */}
      {/* Living Intelligence            */}
      {/* ============================= */}
      <section
        id="living-intelligence"
        className="mt-28 scroll-mt-24 px-4 py-24 text-white transition-colors duration-500 lg:px-6"
        style={{ backgroundColor: ACTIVE_THEME.secondary }}
      >
        <div className="mx-auto max-w-6xl">
          <Eyebrow>Living Intelligence</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-subhead font-semibold tracking-tight text-white">
            Your Home, Intelligently Managed
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
            Understands household activities, recognizes family members, and
            filters unnecessary sounds. Provides timely assistance for cooking,
            shopping, reminders, and home automation.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                name: "Ambient VAD",
                desc: "Detects voice activity in ambient environments",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
                    <rect x="9" y="3" width="6" height="11" rx="3" />
                    <path d="M6 11a6 6 0 0 0 12 0M12 17v4" />
                  </svg>
                ),
              },
              {
                name: "Keyword Detection",
                desc: "Wake-word and command recognition on-device",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
                    <circle cx="12" cy="12" r="2.5" />
                  </svg>
                ),
              },
              {
                name: "Scene Identification",
                desc: "Understands what is happening around the user",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="14" rx="2" />
                    <path d="m3 15 5-5 4 4 5-6 4 5" />
                  </svg>
                ),
              },
              {
                name: "Speaker ID",
                desc: "Recognizes individual family members",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
                    <circle cx="9" cy="8" r="3" />
                    <path d="M2 20c1-3.5 3.5-5 7-5s6 1.5 7 5" />
                    <path d="M17 5a4 4 0 0 1 0 6M19.5 3a7 7 0 0 1 0 10" />
                  </svg>
                ),
              },
            ].map((f) => (
              <div
                key={f.name}
                className="theme-hover-living-card group flex items-start gap-4 rounded-xl border p-5 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="theme-hover-living-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300">
                  {f.icon}
                </span>
                <span>
                  <p className="font-medium text-white">{f.name}</p>
                  <p className="mt-1 text-sm text-zinc-400">{f.desc}</p>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        {/* ============================= */}
        {/* Personal Intelligence          */}
        {/* ============================= */}
        <section id="personal-intelligence" className="mt-28 scroll-mt-24">
          <Eyebrow>Personal Intelligence</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-subhead font-semibold tracking-tight">
            Health, Wellness &amp; Accessibility — Reimagined
          </h2>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
            <AgenticEdge>
              Continuously learns from daily routines. Delivers personalized
              support without requiring constant interaction.
            </AgenticEdge>

            <div>
              <p className="max-w-xl leading-relaxed text-zinc-500">
                Combines speech, emotional cues, activity recognition, and
                environmental awareness. Provides health insights, medication
                reminders, hearing assistance, and accessibility support.
              </p>
              <p className="mt-6 text-sm font-semibold">Technologies Used</p>
              <TechChips
                items={["Speech Enhancement", "Emotion Understanding", "Scene Understanding"]}
              />
            </div>
          </div>
        </section>

        {/* ============================= */}
        {/* Spatial Intelligence — contained box */}
        {/* ============================= */}
        <section id="spatial-intelligence" className="relative mt-28 scroll-mt-24 overflow-hidden rounded-xl">
          <div
            className="relative min-h-[70vh] w-full"
            style={{ backgroundColor: ACTIVE_THEME.secondary }}
          >
            <div className="relative z-10 flex h-full min-h-[70vh] flex-col justify-center p-6 sm:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">
                Spatial Intelligence
              </p>
              <h2 className="mt-3 max-w-2xl text-subhead font-semibold tracking-tight text-white">
                Digital Intelligence Meets the Physical World
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-zinc-300">
                Using spatial audio, scene understanding, and multimodal
                perception, the platform helps users navigate, identify
                objects, and access contextual information through smart
                glasses or hearables.
              </p>

              <div className="mt-8 grid max-w-3xl gap-8 sm:grid-cols-3">
                <div>
                  <span style={{ color: SIGNAL }}>{PinIcon}</span>
                  <p className="mt-2 font-semibold text-white">Real-Time Navigation</p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Understands surroundings and predicts relevant needs.
                  </p>
                </div>
                <div>
                  <span style={{ color: SIGNAL }}>{EyeIcon}</span>
                  <p className="mt-2 font-semibold text-white">
                    Object &amp; Scene Recognition
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Identifies objects and describes environments contextually.
                  </p>
                </div>
                <div>
                  <span style={{ color: SIGNAL }}>{SpeakerIcon}</span>
                  <p className="mt-2 font-semibold text-white">Spatial Audio</p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Directional audio cues aligned with the physical environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================= */}
        {/* Roadmap — audio intelligence today, agentic AI tomorrow */}
        {/* ============================= */}
        <section id="roadmap" className="mt-28 scroll-mt-24">
          <Eyebrow>Roadmap</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-subhead font-semibold tracking-tight">
            From Audio Intelligence Today to Proactive AI Tomorrow
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-zinc-500">
            IPHIPI Intelligence begins by transforming conventional TWS into
            intelligent hearables with exceptional voice clarity. It learns to
            understand spoken intent, becomes an always-available AI
            assistant, then expands beyond hearing by gaining vision and new
            sensor inputs — growing increasingly proactive, context-aware, and
            capable of delivering seamless real-world assistance wherever the
            user goes.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                stage: "Today",
                title: "It Begins with Hearing",
                desc: "IPHIPI Intelligence transforms ordinary TWS into intelligent hearables with exceptional voice clarity.",
              },
              {
                stage: "Today",
                title: "It Understands Spoken Intent",
                desc: "Makes work required, natural interactions — it listens, it understands, it responds.",
              },
              {
                stage: "Next",
                title: "It Becomes Your AI Assistant",
                desc: "Always available, always ready — meeting notes, summaries, reminders, and context-aware suggestions.",
              },
              {
                stage: "Next",
                title: "It Expands Beyond Hearing",
                desc: "Gains context beyond hearing — navigation, live translation, notes and summaries, silent pitch-coach timing.",
              },
              {
                stage: "Tomorrow",
                title: "It Grows with New Sensors",
                desc: "More context, more intelligence — health and activity sensors, fall detection, intruder detection.",
              },
              {
                stage: "Tomorrow",
                title: "It Becomes Proactive & Context-Aware",
                desc: "One intelligence, many forms, seamless assistance — always acting, always a moment ahead.",
              },
            ].map((step, i) => (
              <div
                key={step.title}
                className="rounded-xl border border-zinc-200/70 p-5 transition-colors duration-500"
                style={{ backgroundColor: ACTIVE_THEME.cardBg }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-geometric text-xs font-semibold" style={{ color: ACTIVE_THEME.accent }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em]"
                    style={{ backgroundColor: ACTIVE_THEME.accentBgMuted, color: ACTIVE_THEME.primary }}
                  >
                    {step.stage}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold" style={{ color: ACTIVE_THEME.secondary }}>
                  {step.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <TeamSection />
    </main>
  );
}