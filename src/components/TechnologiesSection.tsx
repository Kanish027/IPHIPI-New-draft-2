"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// --- BRAND COLOR PALETTE OPTIONS ---
const THEMES = {
  option1: {
    id: "cognitive-partner",
    primary: "#1E3A8A", // Deep Cognitive Blue
    secondary: "#27272A", // Sleek Matte Charcoal
    accent: "#0FF0FC", // Electric Cyan / Intelligent Teal
    accentRgb: "15, 240, 252", // For rgba manipulation in tags
    bodyText: "#6E6659", // Muted body copy on light background
    pageBg: "#FFFFFF",
  },
  option2: {
    id: "seamless-intelligence",
    primary: "#2E1065", // Deep Midnight Violet
    secondary: "#3F3F46", // Ash Gray
    accent: "#6EE7B7", // Luminescent Mint / Neo-Green
    accentRgb: "110, 231, 183", // For rgba manipulation in tags
    bodyText: "#71717A", // Ash Gray muted
    pageBg: "#FAFAFA",
  },
};

// Toggle this variable to switch between brand palettes globally across this component
const ACTIVE_THEME = THEMES.option2;
// -----------------------------------

const TECHS = [
  {
    id: "single-mic",
    tag: "Single Mic",
    image: "/tech/single-mic.png",
    video: "",
  },
  {
    id: "dual-mic",
    tag: "Dual Mic",
    image: "/tech/dual-mic.png",
    video: "",
  },
  {
    id: "kws",
    tag: "Keyword Spotting",
    image: "/tech/kws.png",
    video: "",
  },
  {
    id: "far-field",
    tag: "Far-Field",
    image: "/tech/far-field.png",
    video: "",
  },
];

function MediaBlock({
  tech,
  className = "",
}: {
  tech: (typeof TECHS)[0];
  className?: string;
}) {
  return (
    <div
      className={`group relative w-full overflow-hidden rounded-[28px] border border-white/10 bg-black shadow-[0_24px_70px_rgba(0,0,0,0.18)] ring-1 ring-black/5 ${className}`}
    >
      <div className="absolute inset-0 h-full w-full bg-black">
        {tech.video ? (
          <video
            src={tech.video}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
          />
        ) : (
          <Image
            src={tech.image}
            alt={tech.tag}
            fill
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_40%)]" />
      </div>

      <div className="absolute left-4 top-4 z-20 md:left-5 md:top-5">
        <div
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-white shadow-[0_10px_30px_rgba(0,0,0,0.22)] backdrop-blur-2xl backdrop-saturate-150 transition-colors duration-500 md:px-4 md:py-2"
          style={{
            borderColor: `rgba(${ACTIVE_THEME.accentRgb}, 0.25)`, // equivalent to ~40 hex
            backgroundColor: `rgba(${ACTIVE_THEME.accentRgb}, 0.08)`, // equivalent to ~14 hex
          }}
        >
          <div
            className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full ring-1 transition-colors duration-500"
            style={{
              backgroundColor: `rgba(${ACTIVE_THEME.accentRgb}, 0.15)`, // equivalent to ~26 hex
              // @ts-expect-error -- ring color via CSS var
              "--tw-ring-color": `rgba(${ACTIVE_THEME.accentRgb}, 0.25)`,
            }}
          >
            <div
              className="h-1.5 w-1.5 animate-pulse rounded-full transition-colors duration-500"
              style={{ backgroundColor: ACTIVE_THEME.accent }}
            />
          </div>
          <span className="text-[11px] font-semibold tracking-[0.18em] text-white/95 md:text-[12px]">
            {tech.tag}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TechnologiesSection() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    mass: 0.5,
  });

  const yRightColumn = useTransform(smoothProgress, [0, 1], [0, 140]);
  const yLeftTop = useTransform(smoothProgress, [0, 1], [0, -70]);
  const yLeftBottom = useTransform(smoothProgress, [0, 1], [0, -120]);

  return (
    <section
      ref={containerRef}
      id="technologies"
      className="relative overflow-hidden py-28 transition-colors duration-500 md:py-36 lg:py-48"
      style={{ backgroundColor: ACTIVE_THEME.pageBg }}
    >
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          // Using hex opacity suffixes: 14 = ~8%, 0D = ~5%
          backgroundImage: `radial-gradient(circle at top, ${ACTIVE_THEME.primary}14, transparent 35%), radial-gradient(circle at bottom, ${ACTIVE_THEME.accent}0D, transparent 42%)`,
        }}
      />
      <div className="relative mx-auto max-w-[1500px] px-6 md:px-12">
        <div className="grid grid-cols-1 gap-8 border-b border-[#1A1814]/10 pb-16 md:grid-cols-12 lg:pb-24">
          <div className="col-span-6 md:col-span-7">
            <div className="mb-4 flex items-center gap-2">
              <span
                className="text-xs font-semibold uppercase tracking-[0.28em] transition-colors duration-500"
                style={{ color: ACTIVE_THEME.secondary }}
              >
                IPHIPI Technologies
              </span>
            </div>
            <h2
              className="max-w-xl text-4xl font-medium tracking-tight transition-colors duration-500 md:text-5xl lg:text-6xl"
              style={{ color: ACTIVE_THEME.secondary }}
            >
              Adaptive Audio Intelligence.
            </h2>
          </div>

          <div className="flex flex-col justify-end md:col-span-5 md:col-start-8 lg:col-span-5 lg:col-start-8">
            <p
              className="max-w-md text-lg leading-relaxed transition-colors duration-500 lg:text-xl"
              style={{ color: ACTIVE_THEME.bodyText }}
            >
              Four core technologies — engineered for every wearable category.
              Scroll to explore the architecture.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-12 lg:mt-32 lg:gap-24">
          <motion.div style={{ y: yLeftTop }} className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-12 lg:col-span-10 lg:col-start-2">
              <MediaBlock tech={TECHS[0]} className="aspect-[4/3] md:aspect-[16/9]" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12 md:gap-4 lg:gap-3">
            <motion.div
              style={{ y: yLeftBottom }}
              className="flex flex-col gap-12 md:col-span-6 lg:col-span-5 lg:col-start-1 lg:gap-16"
            >
              <MediaBlock tech={TECHS[1]} className="aspect-[4/5]" />
              <MediaBlock tech={TECHS[2]} className="aspect-[3/4]" />
            </motion.div>

            <motion.div
              style={{ y: yRightColumn }}
              className="flex flex-col md:col-span-6 md:col-start-7 md:mt-24 lg:col-span-6 lg:col-start-7 lg:mt-48"
            >
              <MediaBlock tech={TECHS[3]} className="aspect-[4/5] md:aspect-[3/4]" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}