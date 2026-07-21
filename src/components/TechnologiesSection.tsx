// "use client";

// import { useRef } from "react";
// import { motion } from "framer-motion";
// import { theme, withAlpha } from "@/lib/theme";
// import PartnersSection from "./PartnersSection";

// const ACTIVE_THEME = {
//   primary: theme.primary,
//   secondary: theme.secondary,
//   accent: theme.accent,
//   bodyText: theme.bodyText,
//   pageBg: theme.pageBg,
// };

// type Tech = {
//   label: string;
//   image: string;
// };

// const TECHS: Tech[] = [
//   { label: "Single Mic Solution", image: "/samples/Single Mic.png" },
//   { label: "Dual Mic Enhancement", image: "samples/Dual Mic.png" },
//   { label: "Always-On Voice Control", image: "/samples/Voice Control.png" },
//   { label: "Far-Field Speech Enhancement", image: "/samples/Far Field.png" },
//   { label: "On-Device Intelligence", image: "/samples/On Device.png" },
// ];

// // --- One photo tile — flat, quiet presentation like Subtle: no border, no
// // shadow, no hover lift. Just the photo with a small flat caption tag. ---

// function TechTile({
//   tech,
//   className = "",
// }: {
//   tech: Tech;
//   className?: string;
// }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.25 }}
//       transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//       className={className}
//     >
//       <div className="relative h-full w-full overflow-hidden rounded-lg bg-zinc-100">
//         {/* eslint-disable-next-line @next/next/no-img-element */}
//         <img
//           src={tech.image}
//           alt=""
//           aria-hidden="true"
//           className="absolute inset-0 h-full w-full object-cover"
//         />

//         {/* Minimal top-left caption tag — Subtle-style: flat, no border, no blur */}
//         <div
//           className="absolute left-3 top-3 rounded px-2 py-1"
//           style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
//         >
//           <span className="whitespace-nowrap text-[10px] font-medium tracking-[0.02em] text-white/90">
//             {tech.label}
//           </span>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// // --- Section ------------------------------------------------------------

// export default function TechnologiesSection() {
//   const containerRef = useRef<HTMLElement>(null);

//   return (
//     <section
//       ref={containerRef}
//       id="technologies"
//       className="relative overflow-hidden py-28 transition-colors duration-500 md:pt-36 lg:pt-48"
//       style={{ backgroundColor: ACTIVE_THEME.pageBg }}
//     >
//       <div
//         className="pointer-events-none absolute inset-0"
//         style={{
//           backgroundImage: `radial-gradient(circle at top, ${ACTIVE_THEME.primary}14, transparent 35%), radial-gradient(circle at bottom, ${ACTIVE_THEME.accent}0D, transparent 42%)`,
//         }}
//       />

//       <div className="relative mx-auto max-w-[1400px] px-6 md:px-12">
//         <div
//           className="border-b pb-16 lg:pb-24"
//           style={{ borderColor: withAlpha(ACTIVE_THEME.secondary, 0.1) }}
//         >
//           <div className="mb-4 flex items-center gap-2">
//             <span
//               className="text-xs font-semibold uppercase tracking-[0.28em]"
//               style={{ color: ACTIVE_THEME.secondary }}
//             >
//               IPHIPI Technologies
//             </span>
//           </div>
//           <h2
//             className="max-w-xl text-headline font-medium tracking-tight leading-[1.2] lg:text-display"
//             style={{ color: ACTIVE_THEME.secondary }}
//           >
//             Adaptive Audio Intelligence.
//           </h2>

//           <p
//             className="mt-6 max-w-md text-lg leading-relaxed lg:text-xl"
//             style={{ color: ACTIVE_THEME.bodyText }}
//           >
//             Proprietary environmental noise suppression and speech enhancement —
//             engineered for every wearable category.
//           </p>
//         </div>

//         {/* Subtle-style single-column masonry feed: one large tile, a 2-up
//             row, then a closing large tile — clean photography with only a
//             minimal top-left tag on each, no on-image or below-image copy. */}
//         <div className="mx-auto mt-16 flex max-w-4xl flex-col gap-3 lg:mt-24">
//           {/* Hero: narrower and right-aligned, so the wider row below breaks
//               out to the left while sharing the same right edge — like Subtle. */}
//           <TechTile
//             tech={TECHS[0]}
//             className="aspect-[4/5] w-full sm:ml-auto sm:w-2/3"
//           />

//           {/* Row 1: wide tile left, small tile right — the small tile sticks
//               to the top of the viewport as the taller tile scrolls past. */}
//           <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-3">
//             <TechTile tech={TECHS[1]} className="aspect-[3/2] sm:col-span-2" />
//             <TechTile
//               tech={TECHS[2]}
//               className="aspect-square sm:col-span-1 sm:sticky sm:top-28 sm:self-start"
//             />
//           </div>

//           {/* Row 2: proportions flipped — small tile left (sticky), large right. */}
//           {/* <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-3">
//             <TechTile tech={TECHS[4]} className="aspect-square sm:col-span-1 sm:sticky sm:top-28 sm:self-start" />
//             <TechTile tech={TECHS[3]} className="aspect-[4/3] sm:col-span-2" />
//           </div> */}
//           <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-3">
//             <div className="hidden sm:block aspect-square" />

//             <TechTile tech={TECHS[3]} className="aspect-[4/3] sm:col-span-2" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { theme, withAlpha } from "@/lib/theme";
import PartnersSection from "./PartnersSection";

const ACTIVE_THEME = {
  primary: theme.primary,
  secondary: theme.secondary,
  accent: theme.accent,
  bodyText: theme.bodyText,
  pageBg: theme.pageBg,
};

type Tech = {
  label: string;
  image: string;
  heading?: string;
  body?: string;
};

const TECHS: Tech[] = [
  {
    label: "Single Mic Solution",
    image: "/samples/Single Mic.png",
    heading: "Clear Through Noise",
    body: "Experience uninterrupted conversations, even in noisy environments.",
  },
  {
    label: "Dual Mic Enhancement",
    image: "/samples/Dual Mic.png",
    heading: "Clear Through Conversations",
    body: "Clear conversations, even in noisy, conversation-heavy environments.",
  },
  {
    label: "Always-On Voice Control",
    image: "/samples/Voice Control.png",
    heading: "Hands-Free Control",
    body: "Control your device hands-free with IPHIPI's Keyword Spotting, so you stay focused while your phone stays untouched.",
  },
  {
    label: "Far-Field Speech Enhancement",
    image: "/samples/Far Field.png",
    heading: "Hears You From Afar",
    body: "Whether you're speaking to a smart speaker at home or a self-service kiosk, you shouldn't have to move closer or repeat your commands. IPHIPI's Far-Field Speech Enhancement enables brands to capture clear speech from a distance.",
  },
];

// --- One photo tile — flat, quiet presentation like Subtle: no border, no
// shadow, no hover lift. Just the photo with a small flat caption tag,
// and optional text overlays at the bottom. ---
function TechTile({
  tech,
  className = "",
  aspectClass,
  size = "large",
  sticky = false,
}: {
  tech: Tech;
  className?: string;
  aspectClass: string;
  size?: "large" | "small";
  sticky?: boolean;
}) {
  const card = (
    <div className="group flex h-full w-full flex-col overflow-hidden rounded-lg border" style={{ borderColor: theme.borderInactive }}>
      {/* Caption block sits entirely above the photo — nothing is ever
          overlaid on top of the image itself. */}
      <div className={size === "small" ? "p-4 md:p-5" : "p-6 md:p-8"}>
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: theme.accent }}
        >
          {tech.label}
        </p>
        {tech.heading && (
          <h3
            className={`mt-1.5 font-medium tracking-tight ${
              size === "small" ? "text-lg md:text-xl" : "text-2xl md:text-3xl"
            }`}
            style={{ color: theme.secondary }}
          >
            {tech.heading}
          </h3>
        )}
        {tech.body && (
          <p
            className={`mt-1.5 max-w-md leading-relaxed ${
              size === "small" ? "text-xs md:text-sm line-clamp-2" : "text-sm md:text-base"
            }`}
            style={{ color: theme.textMuted }}
          >
            {tech.body}
          </p>
        )}
      </div>

      <div className={`relative w-full flex-1 ${aspectClass}`} style={{ backgroundColor: theme.primary }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tech.image}
          alt={tech.label}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
    </div>
  );

  // A transform-based entrance animation (the y offset) leaves an inline
  // `transform` on this wrapper even at rest, and a transformed ancestor
  // breaks `position: sticky` in the browser. So sticky tiles fade in on
  // opacity only — the `y` motion value is entirely omitted, not just set
  // to 0, so Framer Motion never writes a transform here at all.
  return (
    <motion.div
      initial={sticky ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={sticky ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {/* When sticky, the outer box stretches to fill the (taller) grid row,
          giving the inner card room to travel before it sticks and releases
          at the row's edges — a plain aspect box has no such room to move. */}
      {sticky ? (
        <div className="h-full">
          <div className="sticky top-0">{card}</div>
        </div>
      ) : (
        card
      )}
    </motion.div>
  );
}

// --- Section ------------------------------------------------------------
export default function TechnologiesSection() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={containerRef}
      id="technologies"
      // No overflow-hidden here: it would become the nearest "scrolling
      // ancestor" for position:sticky descendants (the small tiles below)
      // and break their stick/release behavior. Each tile already clips
      // its own hover-zoom internally, so nothing needs section-level clipping.
      className="relative py-28 transition-colors duration-500 md:pt-36 lg:pt-48"
      style={{ backgroundColor: ACTIVE_THEME.pageBg }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at top, ${ACTIVE_THEME.primary}14, transparent 35%), radial-gradient(circle at bottom, ${ACTIVE_THEME.accent}0D, transparent 42%)`,
        }}
      />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12">
        <div
          className="border-b pb-16 lg:pb-24"
          style={{ borderColor: withAlpha(ACTIVE_THEME.secondary, 0.1) }}
        >
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <div className="mb-4 flex items-center gap-2">
              <span
                className="text-xs font-semibold uppercase tracking-[0.28em]"
                style={{ color: ACTIVE_THEME.secondary }}
              >
                IPHIPI Technologies
              </span>
            </div>
            <h2
              className="text-headline font-medium tracking-tight leading-[1.2] lg:text-display"
              style={{ color: ACTIVE_THEME.secondary }}
            >
              Adaptive Audio Intelligence.
            </h2>
            <p
              className="mt-6 text-lg leading-relaxed lg:text-xl"
              style={{ color: ACTIVE_THEME.bodyText }}
            >
              Proprietary environmental noise suppression and speech enhancement —
              engineered for every wearable category.
            </p>
          </div>
        </div>

        {/* Pinned-hero layout: one large image stays fixed on the left while
            the other three scroll past beside it on the right — the sticky
            element IS the anchor this time, not a small accent tile. */}
        <div className="mt-16 grid grid-cols-1 gap-6 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <TechTile tech={TECHS[0]} className="h-full" aspectClass="aspect-[3/4]" size="large" sticky />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-7">
            <TechTile tech={TECHS[1]} aspectClass="aspect-[16/9]" size="large" />
            <TechTile tech={TECHS[2]} aspectClass="aspect-[16/9]" size="large" />
            <TechTile tech={TECHS[3]} aspectClass="aspect-[16/9]" size="large" />
          </div>
        </div>
      </div>
    </section>
  );
}