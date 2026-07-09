import type { Metadata } from "next";
import Image from "next/image";
import EventsHero from "@/components/EventsHero";

export const metadata: Metadata = {
  title: "Events — IPHIPI",
  description: "Where to meet the IPHIPI team — upcoming and past events.",
};

// --- BRAND COLOR PALETTE OPTIONS ---
const THEMES = {
  option1: {
    id: "cognitive-partner",
    primary: "#1E3A8A", // Deep Cognitive Blue
    secondary: "#27272A", // Sleek Matte Charcoal
    accent: "#0FF0FC", // Electric Cyan / Intelligent Teal
    accentBgMuted: "rgba(15, 240, 252, 0.1)",
    pageBg: "#FFFFFF", // Crisp Tech White
    cardBg: "#FAF6EE", // Warm off-white
  },
  option2: {
    id: "seamless-intelligence",
    primary: "#2E1065", // Deep Midnight Violet
    secondary: "#3F3F46", // Ash Gray
    accent: "#6EE7B7", // Luminescent Mint / Neo-Green
    accentBgMuted: "rgba(110, 231, 183, 0.15)",
    pageBg: "#FAFAFA", // Pure Alabaster
    cardBg: "#F3F4F6", // Ash Gray light tint
  },
};

// Toggle this variable to switch between brand palettes globally across this component
const ACTIVE_THEME = THEMES.option2;
// -----------------------------------

/* Event details are placeholders — edit dates, booths, and blurbs here as
   they get confirmed. */

const UPCOMING = [
  {
    name: "CES 2027",
    date: "January 2027",
    location: "Las Vegas, NV",
    status: "Booth details coming soon",
    body: "We'll be back at CES with the next generation of the agentic audio platform — live demos across hearables, wearables, and smart glasses.",
  },
];

const PAST = [
  {
    name: "CES 2026",
    date: "January 2026",
    location: "Las Vegas, NV",
    image: "/samples/events-banner.jpg",
    body: "We showcased adaptive audio intelligence live on the show floor — real-time single- and dual-mic noise suppression demos, far-field voice capture, and branded wake words running fully on-device with partner hardware.",
  },
];

export default function EventsPage() {
  return (
    <main
      className="flex-1 pb-28 transition-colors duration-500"
      style={{
        backgroundColor: ACTIVE_THEME.pageBg,
        color: ACTIVE_THEME.secondary,
      }}
    >
      {/* Injecting CSS Variables for Dynamic Hover States */}
      <style>{`
        .theme-btn-dark {
          background-color: ${ACTIVE_THEME.secondary};
        }
        .theme-btn-dark:hover {
          background-color: ${ACTIVE_THEME.primary};
        }
        
        .theme-btn-light {
          color: ${ACTIVE_THEME.secondary};
        }
        .theme-btn-light:hover {
          color: ${ACTIVE_THEME.primary};
          background-color: ${ACTIVE_THEME.cardBg};
        }
      `}</style>

      <EventsHero />

      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        {/* Upcoming */}
        <section className="mt-28">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: ACTIVE_THEME.secondary }}
          >
            Upcoming
          </p>
          <h2 className="mt-3 text-subhead font-semibold tracking-tight">
            Where you can find us next
          </h2>

          <div className="mt-10 space-y-5">
            {UPCOMING.map((event) => (
              <div
                key={event.name}
                className="grid gap-6 rounded-xl border border-zinc-200 p-6 sm:p-8 md:grid-cols-[1fr_2fr_auto] md:items-center"
              >
                <div>
                  <p className="text-2xl font-semibold tracking-tight">{event.name}</p>
                  <p className="mt-1 text-sm text-zinc-500">
                    {event.date} · {event.location}
                  </p>
                  <p
                    className="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium"
                    style={{
                      backgroundColor: ACTIVE_THEME.accentBgMuted,
                      color: ACTIVE_THEME.primary,
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 animate-[blinking_0.75s_ease-in-out_infinite] rounded-full"
                      style={{ backgroundColor: ACTIVE_THEME.accent }}
                    />
                    {event.status}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-zinc-500">{event.body}</p>
                <a
                  href="mailto:hello@iphipi.com?subject=Meeting request — CES 2027"
                  className="theme-btn-dark justify-self-start rounded-full px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 md:justify-self-end"
                >
                  Request a meeting
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Past */}
        <section className="mt-28">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: ACTIVE_THEME.secondary }}
          >
            Past events
          </p>
          <h2 className="mt-3 text-subhead font-semibold tracking-tight">
            Where we&apos;ve been
          </h2>

          <div className="mt-10 space-y-5">
            {PAST.map((event) => (
              <div
                key={event.name}
                className="grid overflow-hidden rounded-xl border border-zinc-200 md:grid-cols-2"
              >
                {/* Sample image — swap for real booth/show-floor photos */}
                <div className="relative min-h-56">
                  <Image
                    src={event.image}
                    alt={event.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-10">
                  <p className="text-2xl font-semibold tracking-tight">{event.name}</p>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: ACTIVE_THEME.secondary }}
                  >
                    {event.date} · {event.location}
                  </p>
                  <p className="mt-4 leading-relaxed text-zinc-500">{event.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Private demo CTA */}
        <section
          className="mt-28 rounded-xl p-8 text-white transition-colors duration-500 sm:p-12"
          style={{ backgroundColor: ACTIVE_THEME.secondary }}
        >
          <h2 className="max-w-xl text-subhead font-semibold tracking-tight">
            Can&apos;t make it to a show?
          </h2>
          <p className="mt-3 max-w-xl text-zinc-400">
            We run private demos year-round — hear the difference adaptive
            audio intelligence makes on your own hardware.
          </p>
          <a
            href="mailto:hello@iphipi.com?subject=Private demo request"
            className="theme-btn-light mt-8 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-medium transition-colors duration-300"
          >
            Request a private demo
          </a>
        </section>
      </div>
    </main>
  );
}