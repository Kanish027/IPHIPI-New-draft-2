# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ Next.js version warning

This project pins **Next.js 16.2.10**, which is newer than most training data and has breaking API/convention changes vs. older Next.js versions. Before writing App Router, routing, or data-fetching code, check `node_modules/next/dist/docs/` for the current API rather than relying on memorized patterns. Heed any deprecation notices you encounter.

## Commands

```bash
npm run dev      # start the dev server (Turbopack) on localhost:3000
npm run build    # production build
npm run start    # run the production build
npm run lint     # ESLint (eslint-config-next, flat config)
```

There is no test suite in this repo.

## Architecture

This is the IPHIPI marketing site: Next.js App Router + React 19 + TypeScript + Tailwind CSS v4, deployed as a single public-facing brand/marketing site (homepage + AI Technologies, R&D, Events, Contact pages). Path alias `@/*` → `./src/*`.

### Centralized theme — the most important pattern in this codebase

**All brand colors live in exactly one place: `src/lib/theme.ts`.** It exports:
- `theme` — a flat object of hex values (`primary`, `secondary`, `accent`, surface/text/border variants, gradient fallbacks). This is the single source of truth; changing a value here changes it everywhere.
- `withAlpha(hex, alpha)` — converts a theme hex into an `rgba()` string. Always use this instead of hand-computing or hardcoding an `rgba(r, g, b, a)` string, so alpha-tinted borders/glows/badges never drift out of sync with the base color.

Individual components do **not** import `theme` fields directly by name everywhere; the established convention is a local `const ACTIVE_THEME = { ... }` object at the top of the file that maps semantic, component-specific names to `theme.*` values (and `withAlpha(...)` calls for tinted variants), e.g.:

```ts
import { theme, withAlpha } from "@/lib/theme";

const ACTIVE_THEME = {
  sectionBg: theme.surfaceDark,
  accent: theme.accent,
  accentMuted: withAlpha(theme.accent, 0.1),
  textHeading: theme.textHeading,
};
```

This keeps each component's usages short (`ACTIVE_THEME.accent`) while still tracing back to the one real source of truth. When adding a new component, follow this pattern rather than inlining hex values or introducing a second theme object elsewhere.

### Tailwind v4 — CSS-first, no config file

There is no `tailwind.config.js`. All Tailwind customization lives in `src/app/globals.css` inside an `@theme { ... }` block (Tailwind v4 convention — `--text-headline` etc. auto-generate matching utility classes like `text-headline`). Notable custom tokens defined there:
- A custom type scale: `--text-body`, `--text-subhead`, `--text-headline`, `--text-display`.
- `--radius-4xl`, `--shadow-soft`, `--breakpoint-3xl`.
- A class-based `dark` variant (`@custom-variant dark`) — not currently driven by any UI toggle.
- Shared `@keyframes` used by inline `animation` styles across components: `iphipiWave` (audio waveform bars), `iphipiRing` (sonar/signal rings), `iphipiPulseGlow`, `iphipiCycleTile`, `iphipiSpeak`, `iphipiPlayhead`, `blinking`, `iphipiMarqueeLeft`/`iphipiMarqueeRight` (opposite-direction scrolling rows), plus `fade-in`/`slide-up`.

Fonts: a single family (IBM Plex Sans) is loaded via `next/font` in `src/app/layout.tsx` as CSS var `--font-phi`. `globals.css` aliases `--font-sans`, `--font-humanist`, and `--font-geometric` all to `--font-phi` — these three names exist so any component referencing them resolves consistently; there is only one actual typeface in use.

### Dynamic hover states via inline `<style>` blocks

Because Tailwind classes are static and many hover colors need to reference the runtime `ACTIVE_THEME`/`theme` values, several components inject a `<style>{...}</style>` tag with template-literal CSS (custom class names like `.theme-footer-link:hover`, `.partner-card:hover`) rather than using Tailwind's `hover:` utilities directly. This is the established way to theme a `:hover` state dynamically in this codebase — follow it instead of trying to force dynamic values into Tailwind arbitrary-value classes.

### Page structure

App Router pages under `src/app/`: `/` (home), `/ai-technologies`, `/research`, `/events`, `/contact`. Each page is a thin composition of section components from `src/components/` (e.g. home = `Hero` → `PillarsSection` → `TechnologiesSection` → `PartnersSection` → `BenchmarksSection`). `Navbar` and `Footer` wrap every page from `layout.tsx`.

`ScrollHero`/`PageBanner` are the two shared hero patterns: `ScrollHero` (used only on the homepage via `Hero.tsx`) is a scroll-driven video banner that pins and expands; `PageBanner` is the plain static banner used by `AiTechHero`, `ResearchHero`, `EventsHero` on subpages.

### Contact form

`src/app/contact/contact-form.tsx` (client component) posts JSON to `src/app/api/contact/route.ts` (a route handler). The route currently only validates input and `console.log`s the submission — it is not wired to an email provider or CRM yet.

### Component-local data patterns

Most section components define their content as local arrays/objects at the top of the file (e.g. `PARTNERS`, `PILLARS`, `TECHS`) rather than fetching from a CMS or external source — this is a static marketing site with content authored directly in component files.
