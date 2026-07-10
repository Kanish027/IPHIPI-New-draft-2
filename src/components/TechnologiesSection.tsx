"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { theme, withAlpha } from "@/lib/theme";

const ACTIVE_THEME = {
  primary: theme.primary,
  secondary: theme.secondary,
  accent: theme.accent,
  bodyText: theme.bodyText,
  pageBg: theme.pageBg,
};

type Tech = {
  label: string;
  spec: string;
  image: string;
  video?: string;
  /** Tailwind aspect ratio — mixes tall & wide tiles for a masonry rhythm. */
  aspect: string;
};

const TECHS: Tech[] = [
  { label: "Single Mic", spec: "70 dB noise suppression", image: "/tech/single-mic.png", aspect: "aspect-[4/5]" },
  { label: "Dual Mic", spec: "85 dB · multi-speaker", image: "/tech/dual-mic.png", aspect: "aspect-[3/2]" },
  { label: "Keyword Spotting", spec: "5 mW · fully on-device", image: "/tech/kws.png", aspect: "aspect-[3/2]" },
  { label: "Far-Field", spec: "5 m+ capture range", image: "/tech/far-field.png", aspect: "aspect-[4/5]" },
];

// --- One video tile — fixed size, always fully visible ------------------

function TechTile({ tech, index }: { tech: Tech; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        className={`group relative ${tech.aspect} w-full overflow-hidden rounded-[26px] border border-white/10 bg-black shadow-[0_24px_70px_rgba(0,0,0,0.28)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_36px_90px_rgba(0,0,0,0.4)]`}
      >
        {tech.video ? (
          <video
            src={tech.video}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={tech.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}

        {/* Bottom scrim keeps the label readable without hiding the video */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Cursor-tracked spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(460px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.12), transparent 60%)`,
          }}
        />

        {/* Index numeral */}
        <span
          className="pointer-events-none absolute right-5 top-4 select-none font-semibold leading-none text-transparent md:right-6 md:top-5"
          style={{
            fontSize: "clamp(2rem, 3vw, 3rem)",
            WebkitTextStroke: `1.25px ${withAlpha(theme.accent, 0.55)}`,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Keyword + spec */}
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <div
            className="inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-white backdrop-blur-md"
            style={{
              borderColor: withAlpha(theme.accent, 0.3),
              backgroundColor: "rgba(0,0,0,0.35)",
            }}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ backgroundColor: ACTIVE_THEME.accent }} />
            <span className="whitespace-nowrap text-[11px] font-semibold tracking-[0.18em]">{tech.label}</span>
          </div>
          <p className="mt-2.5 text-xs font-medium uppercase tracking-[0.18em] text-white/60">{tech.spec}</p>
        </div>
      </div>
    </motion.div>
  );
}

// --- Section ------------------------------------------------------------

export default function TechnologiesSection() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 25, mass: 0.5 });
  // Right column drifts slightly, deepening the staggered rhythm on scroll.
  const rightY = useTransform(smooth, [0, 1], [40, -40]);

  return (
    <section
      ref={containerRef}
      id="technologies"
      className="relative overflow-hidden py-28 transition-colors duration-500 md:py-36 lg:py-48"
      style={{ backgroundColor: ACTIVE_THEME.pageBg }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at top, ${ACTIVE_THEME.primary}14, transparent 35%), radial-gradient(circle at bottom, ${ACTIVE_THEME.accent}0D, transparent 42%)`,
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid grid-cols-1 gap-8 border-b border-[#1A1814]/10 pb-16 md:grid-cols-12 lg:pb-24">
          <div className="col-span-6 md:col-span-7">
            <div className="mb-4 flex items-center gap-2">
              <span
                className="text-xs font-semibold uppercase tracking-[0.28em]"
                style={{ color: ACTIVE_THEME.secondary }}
              >
                IPHIPI Technologies
              </span>
            </div>
            <h2
              className="max-w-xl text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl"
              style={{ color: ACTIVE_THEME.secondary }}
            >
              Adaptive Audio Intelligence.
            </h2>
          </div>

          <div className="flex flex-col justify-end md:col-span-5 md:col-start-8">
            <p className="max-w-md text-lg leading-relaxed lg:text-xl" style={{ color: ACTIVE_THEME.bodyText }}>
              Four core technologies — engineered for every wearable category.
            </p>
          </div>
        </div>

        {/* Staggered two-column layout: right column sits lower, so the four
            videos read as an offset editorial flow rather than a flat grid.
            Every tile is a fixed size and always fully visible. */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-24 lg:gap-8">
          <div className="flex flex-col gap-6 lg:gap-8">
            <TechTile tech={TECHS[0]} index={0} />
            <TechTile tech={TECHS[2]} index={2} />
          </div>
          <motion.div style={{ y: rightY }} className="flex flex-col gap-6 md:mt-16 lg:gap-8">
            <TechTile tech={TECHS[1]} index={1} />
            <TechTile tech={TECHS[3]} index={3} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
