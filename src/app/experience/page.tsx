import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import { theme } from "@/lib/theme";

export const metadata: Metadata = {
  title: "The Agentic AI Audio Experience — IPHIPI",
  description:
    "See the Agentic AI audio platform in action across Work, Living, Personal, and Spatial Intelligence.",
};

const ACTIVE_THEME = {
  secondary: theme.secondary,
  accent: theme.accent,
  cardBg: theme.cardWarm,
};

// Placeholder footage — real per-scenario video capture is still being
// produced, so every pillar reuses the same clip for now (matches the
// placeholder convention already used on the Events page).
const SCENARIOS = [
  {
    id: "work-intelligence",
    title: "Work Intelligence",
    heading: "Stay focused. Let intelligence handle the rest.",
    body: "Meetings create more than conversations—they create tasks. IPHIPI Work Intelligence manages notes, translations, reminders, follow-ups, and presentations, so professionals stay focused on the conversation during every meeting.",
    video: "/hero.mp4",
  },
  {
    id: "living-intelligence",
    title: "Living Intelligence",
    heading: "Live Safely. Stay Connected.",
    body: "You can't always keep an eye on every corner of your home or every loved one's wellbeing. IPHIPI Intelligence keeps you aware of your home and the people who matter most.",
    video: "/hero.mp4",
  },
  {
    id: "personal-intelligence",
    title: "Wellness Intelligence",
    heading: "Train Smarter. Stay Focused.",
    body: "During workouts, it's easy to lose track of reps, rest, hydration, and what's next. IPHIPI keeps your workout on track with real-time guidance, motivation, and intelligent coaching.",
    video: "/hero.mp4",
  },
  {
    id: "spatial-intelligence",
    title: "Spatial Intelligence",
    heading: "Understand the World Around You.",
    body: "Exploring unfamiliar places often means switching between maps, translation apps, and searching for the stories behind every place. IPHIPI Intelligence sees what you see, listens to you, and brings navigation, translation, art, history, and architecture into one natural conversation.",
    video: "/hero.mp4",
  },
];

export default function ExperiencePage() {
  return (
    <main className="flex-1 overflow-x-hidden pb-28" style={{ backgroundColor: theme.pageBg }}>
      <PageBanner
        eyebrow="Agentic AI Experience"
        title="Go about your life. Anywhere. With ease."
        tagline="They understand your world. So you can focus on living it. Explore the full Agentic AI audio platform experience across Work, Living, Wellness, and Spatial Intelligence."
      />

      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="flex flex-col gap-10">
          {SCENARIOS.map((s, i) => (
            <div
              key={s.id}
              id={s.id}
              className="scroll-mt-28 overflow-hidden rounded-3xl border shadow-sm"
              style={{ borderColor: theme.borderInactive, backgroundColor: ACTIVE_THEME.cardBg }}
            >
              <div className="grid lg:grid-cols-2">
                <div
                  className={`relative aspect-video w-full lg:aspect-auto ${
                    i % 2 === 1 ? "lg:order-2" : ""
                  }`}
                  style={{ backgroundColor: theme.primary }}
                >
                  <video
                    src={s.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className={`flex flex-col justify-center p-8 sm:p-10 lg:p-14 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <p
                    className="text-xs font-semibold uppercase tracking-[0.2em]"
                    style={{ color: ACTIVE_THEME.accent }}
                  >
                    {s.title}
                  </p>
                  <h2
                    className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl"
                    style={{ color: ACTIVE_THEME.secondary }}
                  >
                    {s.heading}
                  </h2>
                  <p className="mt-4 leading-relaxed text-zinc-500">{s.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
