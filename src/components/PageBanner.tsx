"use client";

import type { ReactNode } from "react";
import { theme, withAlpha } from "@/lib/theme";

/* A simple, normal page banner — light premium gradient, centered text, no
   scroll/pin effects. Used on subpages (the homepage keeps its video hero). */

export default function PageBanner({
  eyebrow,
  title,
  tagline,
  titleClassName = "text-[clamp(var(--text-headline),5vw,var(--text-display))]",
  gradient,
  children,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  tagline: string;
  titleClassName?: string;
  gradient?: string; // If passed, overrides the default dynamic theme gradient
  children?: ReactNode;
  // When true, the banner sizes to its content instead of forcing a full
  // viewport-height frame — for pages where this banner isn't the very
  // first thing on the page (e.g. R&D, which opens with a Vision Statement
  // above it), a full 100vh hero here would just be empty space.
  compact?: boolean;
}) {

  // Plain warm-white gradient — no gold tint, so every subpage hero reads
  // as the same warm-white background instead of a muted-gold shade.
  const defaultBackground = `linear-gradient(160deg, ${theme.cardWarm} 0%, ${theme.pageBg} 60%)`;

  return (
    <section
      className={`relative flex items-center overflow-hidden px-4 transition-all duration-500 lg:px-6 ${
        compact ? "py-16" : "min-h-[100vh] pb-24 pt-32"
      } ${gradient ? gradient : ""}`}
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

        {/* Long taglines read as a dense wall of centered text in one <p>.
            Splitting on sentence boundaries into separate paragraphs (with
            gaps between them) keeps short taglines unchanged but gives long
            ones real visual rhythm. */}
        <div className="mx-auto mt-6 max-w-xl space-y-3">
          {tagline
            .split(/(?<=[.!?])\s+(?=[A-Z])/)
            .filter(Boolean)
            .map((sentence, i) => (
              <p
                key={i}
                className="text-lg leading-relaxed transition-colors duration-500"
                style={{ color: theme.textMuted }}
              >
                {sentence}
              </p>
            ))}
        </div>

        {children && <div className="mt-9">{children}</div>}
      </div>
    </section>
  );
}