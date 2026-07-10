"use client";

import type { ReactNode } from "react";
import { theme, withAlpha } from "@/lib/theme";

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
  const defaultBackground = `radial-gradient(circle at 25% 15%, ${withAlpha(theme.accent, 0.14)}, transparent 55%), linear-gradient(160deg, ${theme.cardWarm} 0%, ${theme.pageBg} 60%)`;

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
            borderColor: withAlpha(theme.accent, 0.3),
            backgroundColor: withAlpha(theme.accent, 0.1),
            color: theme.primary,
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full transition-colors duration-500"
            style={{ backgroundColor: theme.accent }}
          />
          {eyebrow}
        </span>

        <h1
          className={`mt-7 font-semibold leading-[1.04] tracking-tight transition-colors duration-500 ${titleClassName}`}
          style={{ color: theme.secondary }}
        >
          {title}
        </h1>

        <p
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed transition-colors duration-500"
          style={{ color: theme.textMuted }}
        >
          {tagline}
        </p>

        {children && <div className="mt-9">{children}</div>}
      </div>
    </section>
  );
}