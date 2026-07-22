// import type { Metadata } from "next";
// import Image from "next/image";
// import EventsHero from "@/components/EventsHero";
// import { theme, withAlpha } from "@/lib/theme";

// export const metadata: Metadata = {
//   title: "Events — IPHIPI",
//   description: "Where to meet the IPHIPI team — upcoming and past events.",
// };

// const ACTIVE_THEME = {
//   primary: theme.primary,
//   secondary: theme.secondary,
//   accent: theme.accent,
//   accentBgMuted: withAlpha(theme.accent, 0.1),
//   pageBg: theme.pageBg,
// };

// /* Event details are placeholders — edit dates, booths, and blurbs here as
//    they get confirmed. */

// const UPCOMING = [
//   {
//     name: "CES 2027",
//     date: "January 2027",
//     location: "Las Vegas, NV",
//     status: "Booth details coming soon",
//     body: "We'll be back at CES with the next generation of the agentic audio platform — live demos across hearables, wearables, and smart glasses.",
//   },
// ];

// type PastEvent = {
//   name: string;
//   date: string;
//   location: string;
//   image: string;
//   body: string;
//   /* Optional: either a local/hosted video file (mp4/webm) or a YouTube/Vimeo
//      embed URL. When set, it renders instead of `image` in the media slot. */
//   video?: string;
//   videoEmbed?: string;
//   /* Optional: a small gallery of event-footage clips (e.g. show-floor demo,
//      booth walkthrough). Takes priority over the single video/image slot
//      above when present. Swap `src`/`poster` for the real footage once it's
//      been edited down — these are placeholders. */
//   videos?: { label: string; src: string; poster: string }[];
// };

// const PAST: PastEvent[] = [
//   {
//     name: "CES 2026",
//     date: "January 2026",
//     location: "Las Vegas, NV",
//     image: "/samples/events-banner.jpg",
//     body: "IPHIPI showcased adaptive audio intelligence live on the show floor — real-time single-mic noise suppression demos on glasses, running fully on-device with partner hardware.",
//     // Placeholder clips — replace with the actual CES 2026 footage once it's edited.
//     videos: [
//       {
//         label: "Show floor demo",
//         src: "/hero.mp4",
//         poster: "/our-story-poster.jpg",
//       },
//     ],
//   },

//   {
//     name: "Hongkong 2025",
//     date: "January 2025",
//     location: "Las Vegas, NV",
//     image: "/samples/events-banner.jpg",
//     body: "IPHIPI showcased adaptive audio intelligence live on the show floor — real-time single-mic noise suppression demos on glasses, running fully on-device with partner hardware.",
//     // Placeholder clips — replace with the actual CES 2026 footage once it's edited.
//     videos: [
//       {
//         label: "Show floor demo",
//         src: "/hero.mp4",
//         poster: "/our-story-poster.jpg",
//       },
//     ],
//   },
// ];

// export default function EventsPage() {
//   return (
//     <main
//       className="flex-1 pb-28 transition-colors duration-500"
//       style={{
//         backgroundColor: ACTIVE_THEME.pageBg,
//         color: ACTIVE_THEME.secondary,
//       }}
//     >
//       {/* Injecting CSS Variables for Dynamic Hover States */}
//       <style>{`
//         .theme-btn-dark {
//           background-color: ${ACTIVE_THEME.secondary};
//         }
//         .theme-btn-dark:hover {
//           background-color: ${ACTIVE_THEME.primary};
//         }
//       `}</style>

//       <EventsHero />

//       <div className="mx-auto max-w-6xl px-4 lg:px-6">
//         {/* Past */}
//         <section id="past" className="mt-28">
//           <p
//             className="text-xs font-semibold uppercase tracking-[0.2em]"
//             style={{ color: ACTIVE_THEME.secondary }}
//           >
//             Past events
//           </p>
//           <h2 className="mt-3 text-subhead font-semibold tracking-tight">
//             Where we&apos;ve been
//           </h2>

//           <div className="mt-10 space-y-5">
//             {PAST.map((event) =>
//               event.videos ? (
//                 // Event footage gallery — text intro on top, clips in a row below.
//                 <div
//                   key={event.name}
//                   className="overflow-hidden rounded-xl border p-6 sm:p-8"
//                   style={{ borderColor: theme.borderInactive }}
//                 >
//                   <p className="text-subhead font-semibold tracking-tight">
//                     {event.name}
//                   </p>
//                   <p
//                     className="mt-1 text-sm"
//                     style={{ color: ACTIVE_THEME.secondary }}
//                   >
//                     {event.date} · {event.location}
//                   </p>
//                   <p
//                     className="mt-4 max-w-2xl leading-relaxed"
//                     style={{ color: theme.textMuted }}
//                   >
//                     {event.body}
//                   </p>

//                   <div className="mt-6 grid gap-4 sm:grid-cols-2">
//                     {event.videos.map((clip) => (
//                       <div key={clip.label}>
//                         <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
//                           <video
//                             src={clip.src}
//                             poster={clip.poster}
//                             controls
//                             playsInline
//                             className="absolute inset-0 h-full w-full object-cover"
//                           />
//                         </div>
//                         <p
//                           className="mt-2 text-xs font-medium"
//                           style={{ color: theme.textMuted }}
//                         >
//                           {clip.label}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ) : (
//                 <div
//                   key={event.name}
//                   className="grid overflow-hidden rounded-xl border md:grid-cols-2"
//                   style={{ borderColor: theme.borderInactive }}
//                 >
//                   {/* Media slot — embedded video takes priority, then a hosted
//                       video file, falling back to the sample/show-floor photo */}
//                   <div className="relative min-h-56">
//                     {event.videoEmbed ? (
//                       <iframe
//                         src={event.videoEmbed}
//                         title={event.name}
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                         allowFullScreen
//                         className="absolute inset-0 h-full w-full"
//                       />
//                     ) : event.video ? (
//                       <video
//                         src={event.video}
//                         controls
//                         playsInline
//                         poster={event.image}
//                         className="absolute inset-0 h-full w-full object-cover"
//                       />
//                     ) : (
//                       <Image
//                         src={event.image}
//                         alt={event.name}
//                         fill
//                         className="object-cover"
//                       />
//                     )}
//                   </div>
//                   <div className="flex flex-col justify-center p-6 sm:p-10">
//                     <p className="text-subhead font-semibold tracking-tight">
//                       {event.name}
//                     </p>
//                     <p
//                       className="mt-1 text-sm"
//                       style={{ color: ACTIVE_THEME.secondary }}
//                     >
//                       {event.date} · {event.location}
//                     </p>
//                     <p
//                       className="mt-4 leading-relaxed"
//                       style={{ color: theme.textMuted }}
//                     >
//                       {event.body}
//                     </p>
//                   </div>
//                 </div>
//               ),
//             )}
//           </div>
//         </section>

//         {/* Upcoming */}
//         <section id="upcoming" className="mt-28">
//           <p
//             className="text-xs font-semibold uppercase tracking-[0.2em]"
//             style={{ color: ACTIVE_THEME.secondary }}
//           >
//             Upcoming
//           </p>
//           <h2 className="mt-3 text-subhead font-semibold tracking-tight">
//             Where you can find us next
//           </h2>

//           <div className="mt-10 space-y-5">
//             {UPCOMING.map((event) => (
//               <div
//                 key={event.name}
//                 className="grid gap-6 rounded-xl border p-6 sm:p-8 md:grid-cols-[1fr_2fr_auto] md:items-center"
//                 style={{ borderColor: theme.borderInactive }}
//               >
//                 <div>
//                   <p className="text-subhead font-semibold tracking-tight">
//                     {event.name}
//                   </p>
//                   <p
//                     className="mt-1 text-sm"
//                     style={{ color: theme.textMuted }}
//                   >
//                     {event.date} · {event.location}
//                   </p>
//                   <p
//                     className="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium"
//                     style={{
//                       backgroundColor: ACTIVE_THEME.accentBgMuted,
//                       color: ACTIVE_THEME.primary,
//                     }}
//                   >
//                     <span
//                       className="h-1.5 w-1.5 animate-[blinking_0.75s_ease-in-out_infinite] rounded-full"
//                       style={{ backgroundColor: ACTIVE_THEME.accent }}
//                     />
//                     {event.status}
//                   </p>
//                 </div>
//                 <p
//                   className="text-sm leading-relaxed"
//                   style={{ color: theme.textMuted }}
//                 >
//                   {event.body}
//                 </p>
//                 <a
//                   href="mailto:hello@iphipi.com?subject=Meeting request — CES 2027"
//                   className="theme-btn-dark justify-self-start rounded-full px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 md:justify-self-end"
//                 >
//                   Request a meeting
//                 </a>
//               </div>
//             ))}

//             {/* Placeholder — more dates to be announced */}
//             <div
//               className="rounded-xl border border-dashed p-6 text-center sm:p-8"
//               style={{ borderColor: theme.borderInactive }}
//             >
//               <p
//                 className="text-sm font-medium"
//                 style={{ color: theme.textMuted }}
//               >
//                 More dates to be announced — check back soon.
//               </p>
//             </div>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }



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

type PastEvent = {
  name: string;
  date: string;
  location: string;
  image: string;
  body: string;
  /* Optional: either a local/hosted video file (mp4/webm) or a YouTube/Vimeo
     embed URL. When set, it renders instead of `image` in the media slot. */
  video?: string;
  videoEmbed?: string;
  /* Optional: a small gallery of event-footage clips (e.g. show-floor demo,
     booth walkthrough). Takes priority over the single video/image slot
     above when present. Swap `src`/`poster` for the real footage once it's
     been edited down — these are placeholders. */
  videos?: { label: string; src: string; poster: string }[];
};

const PAST: PastEvent[] = [
  {
    name: "CES 2026",
    date: "January 2026",
    location: "Las Vegas, NV",
    image: "/samples/events-banner.jpg",
    body: "We showcased adaptive audio intelligence live on the show floor — real-time single- and dual-mic noise suppression demos, far-field voice capture, and branded wake words running fully on-device with partner hardware.",
    // Placeholder clips — replace with the actual CES 2026 footage once it's edited.
    videos: [
      {
        label: "Show floor demo",
        src: "/hero.mp4",
        poster: "/our-story-poster.jpg",
      },
    ],
  },

  {
    name: "Hongkong 2025",
    date: "January 2025",
    location: "Las Vegas, NV",
    image: "/samples/events-banner.jpg",
    body: "IPHIPI showcased adaptive audio intelligence live on the show floor — real-time single-mic noise suppression demos on glasses, running fully on-device with partner hardware.",
    // Placeholder clips — replace with the actual CES 2026 footage once it's edited.
    videos: [
      {
        label: "Show floor demo",
        src: "/hero.mp4",
        poster: "/our-story-poster.jpg",
      },
    ],
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
        {/* Past */}
        <section id="past" className="mt-28">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: ACTIVE_THEME.secondary }}
          >
            Past events
          </p>
          <h2 className="mt-3 text-subhead font-semibold tracking-tight">
            Where we&apos;ve been
          </h2>

          {/* One outer box for all past events — each event is a row inside
              it (a "sub box" pair: text + video), divided by internal
              borders, instead of separate cards with gaps between them. */}
          <div
            className="mt-10 overflow-hidden rounded-xl border"
            style={{ borderColor: theme.borderInactive }}
          >
            {PAST.map((event, i) =>
              event.videos ? (
                // --- GALLERY MODE (Multiple Videos) ---
                <div
                  key={event.name}
                  className={`grid lg:grid-cols-2 ${i > 0 ? "border-t" : ""}`}
                  style={{ borderColor: theme.borderInactive }}
                >
                  {/* Left Column: Text */}
                  <div className="flex flex-col justify-center p-6 sm:p-10 lg:order-1 order-2">
                    <h3 className="text-2xl font-semibold tracking-tight">
                      {event.name}
                    </h3>
                    <p
                      className="mt-1 text-sm font-medium"
                      style={{ color: ACTIVE_THEME.secondary }}
                    >
                      {event.date} · {event.location}
                    </p>
                    <p
                      className="mt-4 leading-relaxed"
                      style={{ color: theme.textMuted }}
                    >
                      {event.body}
                    </p>
                  </div>

                  {/* Right Column: Videos — centered in the column instead of
                      pinned to the top, so a shorter video block doesn't
                      leave an awkward empty gap below it. */}
                  <div
                    className="flex flex-col justify-center gap-5 border-b p-6 sm:p-10 lg:order-2 lg:border-b-0 lg:border-l order-1"
                    style={{ borderColor: theme.borderInactive, backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                  >
                    {event.videos.map((clip) => (
                      <div key={clip.label}>
                        <div
                          className="relative aspect-video w-full overflow-hidden rounded-lg border bg-black shadow-sm"
                          style={{ borderColor: theme.borderInactive }}
                        >
                          <video
                            src={clip.src}
                            poster={clip.poster}
                            controls
                            playsInline
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </div>
                        <p
                          className="mt-2 text-xs font-medium"
                          style={{ color: theme.textMuted }}
                        >
                          {clip.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // --- SINGLE MEDIA MODE (1 Image/Video) ---
                <div
                  key={event.name}
                  className={`grid lg:grid-cols-2 ${i > 0 ? "border-t" : ""}`}
                  style={{ borderColor: theme.borderInactive }}
                >
                  {/* Left Column: Text */}
                  <div className="flex flex-col justify-center p-6 sm:p-10 lg:order-1 order-2">
                    <h3 className="text-2xl font-semibold tracking-tight">
                      {event.name}
                    </h3>
                    <p
                      className="mt-1 text-sm font-medium"
                      style={{ color: ACTIVE_THEME.secondary }}
                    >
                      {event.date} · {event.location}
                    </p>
                    <p
                      className="mt-4 leading-relaxed"
                      style={{ color: theme.textMuted }}
                    >
                      {event.body}
                    </p>
                  </div>

                  {/* Right Column: Media slot */}
                  <div 
                    className="relative min-h-[300px] w-full border-b lg:order-2 lg:min-h-full lg:border-b-0 lg:border-l order-1"
                    style={{ borderColor: theme.borderInactive }}
                  >
                    {event.videoEmbed ? (
                      <iframe
                        src={event.videoEmbed}
                        title={event.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full"
                      />
                    ) : event.video ? (
                      <video
                        src={event.video}
                        controls
                        playsInline
                        poster={event.image}
                        className="absolute inset-0 h-full w-full object-cover bg-black"
                      />
                    ) : (
                      <Image
                        src={event.image}
                        alt={event.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>
              ),
            )}
          </div>
        </section>

        {/* Upcoming */}
        <section id="upcoming" className="mt-28">
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: ACTIVE_THEME.secondary }}
          >
            Upcoming
          </p>
          <h2 className="mt-3 text-subhead font-semibold tracking-tight">
            Where you can find us next
          </h2>

          <div className="mt-10  space-y-5">
            {UPCOMING.map((event) => (
              <div
                key={event.name}
                className="grid gap-6 rounded-xl border p-6 sm:p-8 md:grid-cols-[1fr_2fr_auto] md:items-center"
                style={{ borderColor: theme.borderInactive }}
              >
                <div>
                  <p className="text-subhead font-semibold tracking-tight">
                    {event.name}
                  </p>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: theme.textMuted }}
                  >
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
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: theme.textMuted }}
                >
                  {event.body}
                </p>
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
              <p
                className="text-sm font-medium"
                style={{ color: theme.textMuted }}
              >
                More dates to be announced — check back soon.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}