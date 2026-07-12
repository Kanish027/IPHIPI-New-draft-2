import type { Metadata } from "next";
import Image from "next/image";
import EventsHero from "@/components/EventsHero";
import { theme, withAlpha } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Events — IPHIPI",
  description: "Where to meet the IPHIPI team — upcoming and past events.",
};

const ACTIVE_THEME = {
  primary: theme.primary,
  secondary: theme.secondary,
  accent: theme.accent,
  accentBgMuted: withAlpha(theme.accent, 0.1),
  pageBg: theme.pageBg,
};

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
    body: "IPHIPI showcased adaptive audio intelligence live on the show floor — real-time single-mic noise suppression demos on glasses, running fully on-device with partner hardware.",
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
                className="grid gap-6 rounded-xl border p-6 sm:p-8 md:grid-cols-[1fr_2fr_auto] md:items-center"
                style={{ borderColor: theme.borderInactive }}
              >
                <div>
                  <p className="text-subhead font-semibold tracking-tight">{event.name}</p>
                  <p className="mt-1 text-sm" style={{ color: theme.textMuted }}>
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
                <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>{event.body}</p>
                <a
                  href="mailto:hello@iphipi.com?subject=Meeting request — CES 2027"
                  className="theme-btn-dark justify-self-start rounded-full px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 md:justify-self-end"
                >
                  Request a meeting
                </a>
              </div>
            ))}

            {/* Placeholder — more dates to be announced */}
            <div
              className="rounded-xl border border-dashed p-6 text-center sm:p-8"
              style={{ borderColor: theme.borderInactive }}
            >
              <p className="text-sm font-medium" style={{ color: theme.textMuted }}>
                More dates to be announced — check back soon.
              </p>
            </div>
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
                className="grid overflow-hidden rounded-xl border md:grid-cols-2"
                style={{ borderColor: theme.borderInactive }}
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
                  <p className="text-subhead font-semibold tracking-tight">{event.name}</p>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: ACTIVE_THEME.secondary }}
                  >
                    {event.date} · {event.location}
                  </p>
                  <p className="mt-4 leading-relaxed" style={{ color: theme.textMuted }}>{event.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}