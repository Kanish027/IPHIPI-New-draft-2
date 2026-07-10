/**
 * IPHIPI brand theme — the single source of truth for every color used
 * across the site. Change a value here and it updates everywhere the
 * theme is imported; no component should ever define its own copy.
 *
 * To test a different palette, just edit the hex values below.
 */

export const theme = {
  id: "cognitive-partner",

  // Core brand colors
  primary: "#1E3A8A", // Deep Cognitive Blue
  secondary: "#27272A", // Sleek Matte Charcoal
  accent: "#0FF0FC", // Electric Cyan / Intelligent Teal

  // Page & card surfaces
  pageBg: "#FFFFFF", // Crisp Tech White
  cardWarm: "#FAF6EE", // Warm off-white card / gradient surface
  cardHover: "#F4F4F5", // Soft gray hover surface
  surfaceDark: "#1C1C1E", // Deep charcoal section background
  surfaceCard: "#2A2A2D", // Card base sitting on a dark section
  surfaceDeepBlue: "#152A63", // Partners band background (deep-primary variant)

  // Text
  bodyText: "#6E6659", // Muted body copy on light backgrounds
  textMuted: "#71717A",
  textLight: "#FFFFFF", // Light text on video/dark backgrounds
  textHeading: "#F5F7FA", // Headings on dark backgrounds
  textBody: "#A0A4AC", // Body copy on dark backgrounds
  textInactive: "#6B6E76",

  // Borders / inactive states
  borderInactive: "#E4E4E7",
  railInactive: "#D4D4D8",
  railTextInactive: "#A1A1AA",

  // Gradient fallbacks (hero banners with no video/image)
  gradDark1: "#0d0d14",
  gradDark2: "#0a0a0f",
} as const;

export type ThemeColor = keyof typeof theme;

/** "#rrggbb" -> "r, g, b" — feeds withAlpha() below. */
function hexToRgbTriplet(hex: string): string {
  const clean = hex.replace("#", "");
  const int = parseInt(clean, 16);
  return `${(int >> 16) & 255}, ${(int >> 8) & 255}, ${int & 255}`;
}

/**
 * Tint any theme color with an alpha value, e.g. withAlpha(theme.accent, 0.1).
 * Always derives from the live hex above, so alpha-tinted borders/glows/badges
 * never drift out of sync when a color changes — never hardcode rgba() with
 * manually-computed r/g/b elsewhere.
 */
export function withAlpha(hex: string, alpha: number): string {
  return `rgba(${hexToRgbTriplet(hex)}, ${alpha})`;
}
