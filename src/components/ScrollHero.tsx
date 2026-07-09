"use client";

import { useEffect, useRef, useState } from "react";

// --- BRAND COLOR PALETTE OPTIONS ---
const THEMES = {
  option1: {
    id: "cognitive-partner",
    secondary: "#27272A", // Sleek Matte Charcoal (Dark text on light bg)
    textLight: "#FFFFFF", // Crisp Tech White (Light text on video/dark bg)
    videoBg: "#27272A", // Matte Charcoal fallback for video container
    accentRgb: "15, 240, 252", // Electric Cyan for fallback gradient glow
    gradDark1: "#0d0d14",
    gradDark2: "#0a0a0f",
  },
  option2: {
    id: "seamless-intelligence",
    secondary: "#3F3F46", // Ash Gray (Dark text on light bg)
    textLight: "#FAFAFA", // Pure Alabaster (Light text on video/dark bg)
    videoBg: "#18181B", // Darker Ash Gray fallback for video container
    accentRgb: "110, 231, 183", // Luminescent Mint for fallback gradient glow
    gradDark1: "#18181B",
    gradDark2: "#09090B",
  },
};

// Toggle this variable to switch between brand palettes globally across this component
const ACTIVE_THEME = THEMES.option2;
// -----------------------------------

const SIDE_MARGIN = 36; // px inset of the video at rest
const TOP_START = 62; // vh — where the video's top edge starts
const RADIUS = 16; // px corner radius at rest

export type HeroVariant = "dark" | "light";

type ScrollHeroProps = {
  taglineTop: string;
  taglineSub: string;
  title: string;
  /** Controls headline size/wrapping, e.g. "max-w-[14ch] text-[clamp(...)]" */
  titleClassName?: string;
  /** Provide a video for a playing banner (homepage). Omit for a static one. */
  videoSrc?: string;
  /** Static banner image — used when videoSrc is omitted (subpages). */
  image?: string;
  /** Premium gradient class for the banner when there's no video or image. */
  gradient?: string;
  poster?: string;
  /** Extra content under the headline (e.g. anchor pills), styled per copy. */
  extra?: (variant: HeroVariant) => React.ReactNode;
};

function HeroText({
  variant,
  taglineTop,
  taglineSub,
  title,
  titleClassName,
  extra,
}: ScrollHeroProps & { variant: HeroVariant }) {
  return (
    <div
      className="absolute inset-x-0 top-[18vh] flex flex-col items-center gap-10 px-4 text-center transition-colors duration-500"
      style={{
        color: variant === "dark" ? ACTIVE_THEME.secondary : ACTIVE_THEME.textLight,
      }}
    >
      <div className="text-base font-medium leading-relaxed">
        <p>{taglineTop}</p>
        <p className="opacity-60">{taglineSub}</p>
      </div>
      <h1 className={`font-semibold tracking-tight ${titleClassName}`}>{title}</h1>
      {extra?.(variant)}
    </div>
  );
}

export default function ScrollHero(props: ScrollHeroProps) {
  const {
    videoSrc,
    image,
    gradient,
    poster,
    titleClassName = "max-w-[14ch] text-[clamp(2.5rem,6.5vw,7.5rem)] leading-[1.02]",
  } = props;
  
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  // Construct dynamic fallback gradient if one is not explicitly provided
  const activeGradient = gradient || `radial-gradient(circle at 25% 15%, rgba(${ACTIVE_THEME.accentRgb}, 0.22), transparent 55%), linear-gradient(160deg, ${ACTIVE_THEME.gradDark1} 0%, ${ACTIVE_THEME.gradDark2} 60%)`;

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = -el.getBoundingClientRect().top;
        setProgress(Math.min(1, Math.max(0, scrolled / total)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Pause the muted loop when the hero scrolls out of view or the tab hides.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    const onVisibility = () => {
      if (document.hidden) v.pause();
      else v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // The video finishes expanding at 55% of the pinned scroll, then holds
  // fullscreen for the rest — like the reference site.
  const expand = Math.min(1, progress / 0.55);
  const remaining = 1 - expand;
  const topVh = TOP_START * remaining;
  const side = SIDE_MARGIN * remaining;
  const radius = RADIUS * remaining;

  return (
    <section ref={sectionRef} className="relative h-[350vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <HeroText {...props} titleClassName={titleClassName} variant="dark" />

        {/* Banner, expanding from an inset band to full-bleed. Video on the
            homepage; a static image on subpages (no videoSrc). */}
        <div
          className="absolute bottom-0 overflow-hidden transition-colors duration-500"
          style={{
            top: `${topVh}vh`,
            left: side,
            right: side,
            borderRadius: radius,
            backgroundColor: ACTIVE_THEME.videoBg,
          }}
        >
          {videoSrc ? (
            <video
              ref={videoRef}
              src={videoSrc}
              poster={poster}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          ) : image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full" style={{ background: activeGradient }} />
          )}
        </div>

        {/* White text, visible only where the video is */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            clipPath: `inset(${topVh}vh ${side}px 0 ${side}px round ${radius}px)`,
          }}
        >
          <HeroText {...props} titleClassName={titleClassName} variant="light" />
        </div>
      </div>
    </section>
  );
}