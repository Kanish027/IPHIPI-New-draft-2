"use client";

import type { ReactNode } from "react";

// --- BRAND COLOR PALETTE OPTIONS ---
const THEMES = {
  option1: {
    id: "cognitive-partner",
    primary: "#1E3A8A", // Deep Cognitive Blue
    secondary: "#27272A", // Sleek Matte Charcoal
    accent: "#0FF0FC", // Electric Cyan / Intelligent Teal
    accentRgb: "15, 240, 252", // For rgba manipulation
    textMuted: "#71717A", // zinc-500
    pageBg: "#FFFFFF",
    gradientStart: "#FAF6EE", // Warm off-white
  },
  option2: {
    id: "seamless-intelligence",
    primary: "#2E1065", // Deep Midnight Violet
    secondary: "#3F3F46", // Ash Gray
    accent: "#6EE7B7", // Luminescent Mint / Neo-Green
    accentRgb: "110, 231, 183", // For rgba manipulation
    textMuted: "#71717A", // zinc-500
    pageBg: "#FAFAFA", // Pure Alabaster
    gradientStart: "#F3F4F6", // Ash Gray light tint
  },
};

// Toggle this variable to switch between brand palettes globally across this component
const ACTIVE_THEME = THEMES.option2;
// -----------------------------------

/* A simple, normal page banner — light premium gradient, centered text, no
   scroll/pin effects. Used on subpages (the homepage keeps its video hero). */

export default function PageBanner({
  eyebrow,
  title,
  tagline,
  titleClassName = "text-[clamp(2.5rem,5vw,4.5rem)]",
  gradient,
  children,
}: {
  eyebrow: string;
  title: string;
  tagline: string;
  titleClassName?: string;
  gradient?: string; // If passed, overrides the default dynamic theme gradient
  children?: ReactNode;
}) {
  
  // Construct the default background using dynamic theme variables instead of hardcoded tailwind classes
  const defaultBackground = `radial-gradient(circle at 25% 15%, rgba(${ACTIVE_THEME.accentRgb}, 0.14), transparent 55%), linear-gradient(160deg, ${ACTIVE_THEME.gradientStart} 0%, ${ACTIVE_THEME.pageBg} 60%)`;

  return (
    <section
      className={`relative flex min-h-[100vh] items-center overflow-hidden px-4 pb-20 pt-32 transition-all duration-500 lg:px-6 ${gradient ? gradient : ""}`}
      style={!gradient ? { background: defaultBackground } : undefined}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        {/* Eyebrow pill */}
        <span 
          className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-500"
          style={{
            borderColor: `rgba(${ACTIVE_THEME.accentRgb}, 0.3)`,
            backgroundColor: `rgba(${ACTIVE_THEME.accentRgb}, 0.1)`,
            color: ACTIVE_THEME.primary, 
          }}
        >
          <span 
            className="h-1.5 w-1.5 rounded-full transition-colors duration-500" 
            style={{ backgroundColor: ACTIVE_THEME.accent }}
          />
          {eyebrow}
        </span>

        <h1
          className={`mt-7 font-semibold leading-[1.04] tracking-tight transition-colors duration-500 ${titleClassName}`}
          style={{ color: ACTIVE_THEME.secondary }}
        >
          {title}
        </h1>

        <p 
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed transition-colors duration-500"
          style={{ color: ACTIVE_THEME.textMuted }}
        >
          {tagline}
        </p>

        {children && <div className="mt-9">{children}</div>}
      </div>
    </section>
  );
}