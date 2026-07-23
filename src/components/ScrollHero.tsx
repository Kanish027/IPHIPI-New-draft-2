"use client";

import { useEffect, useRef, useState } from "react";
import { theme, withAlpha } from "@/lib/theme";

const SIDE_MARGIN = 36; // px inset of the video at rest
const TOP_START = 62; // vh — where the video's top edge starts
const RADIUS = 16; // px corner radius at rest

export type HeroVariant = "dark" | "light";

type ScrollHeroProps = {
  /** Small label shown above the tagline, e.g. "Agentic AI Audio Platform" */
  eyebrow?: string;
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
  eyebrow,
  taglineTop,
  taglineSub,
  title,
  titleClassName,
  extra,
  wrapperRef,
}: ScrollHeroProps & { variant: HeroVariant; wrapperRef?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={wrapperRef}
      className="absolute inset-x-0 top-[18vh] flex flex-col items-center gap-10 px-4 text-center transition-colors duration-500"
      style={{
        color: variant === "dark" ? theme.secondary : theme.textLight,
      }}
    >
      <div className="flex flex-col items-center gap-3">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-70">{eyebrow}</p>
        )}
        <div className="text-base font-medium leading-relaxed">
          <p>{taglineTop}</p>
          <p className="opacity-60">{taglineSub}</p>
        </div>
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
  const textRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  // Rest-state top offset for the video, in px — normally TOP_START vh, but
  // widened on short/wide viewports where the heading text (which scales
  // with vw, not vh) would otherwise grow taller than the reserved gap and
  // collide with the video.
  const [restTopPx, setRestTopPx] = useState<number | null>(null);

  // Construct dynamic fallback gradient if one is not explicitly provided
  const activeGradient = gradient || `radial-gradient(circle at 25% 15%, ${withAlpha(theme.accent, 0.22)}, transparent 55%), linear-gradient(160deg, ${theme.gradDark1} 0%, ${theme.gradDark2} 60%)`;

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

  // Keep the video's rest position below the heading, even when the heading
  // grows taller than TOP_START vh (wide-but-short windows, since the
  // heading's font-size scales with vw while TOP_START scales with vh).
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const GAP = 40; // px breathing room between heading and video
    const recompute = () => {
      const minTop = (TOP_START / 100) * window.innerHeight;
      const textBottom = el.getBoundingClientRect().height + el.offsetTop;
      setRestTopPx(Math.max(minTop, textBottom + GAP));
    };
    recompute();
    const ro = new ResizeObserver(recompute);
    ro.observe(el);
    window.addEventListener("resize", recompute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recompute);
    };
  }, []);

  // Pause the muted loop when the hero scrolls out of view or the tab hides.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Slightly faster than real time — ambient background footage reads as
    // more energetic/dynamic than real-time playback. Set directly (rather
    // than relying on the loadedmetadata event) since the browser can start
    // loading the video from server-rendered markup before React attaches
    // its listeners, letting that event fire before we'd ever catch it.
    v.playbackRate = 1.3;
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
  // Before the text has been measured (server render + initial hydration),
  // fall back to a plain vh value — identical on server and client, so no
  // hydration mismatch. Switch to the measured px value only after mount.
  const topValue = restTopPx !== null ? `${restTopPx * remaining}px` : `${TOP_START * remaining}vh`;
  const side = SIDE_MARGIN * remaining;
  const radius = RADIUS * remaining;

  return (
    <section ref={sectionRef} className="relative h-[350vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <HeroText {...props} titleClassName={titleClassName} variant="dark" wrapperRef={textRef} />

        {/* Banner, expanding from an inset band to full-bleed. Video on the
            homepage; a static image on subpages (no videoSrc). */}
        <div
          className="absolute bottom-0 overflow-hidden transition-colors duration-500"
          style={{
            top: topValue,
            left: side,
            right: side,
            borderRadius: radius,
            backgroundColor: theme.secondary,
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
              // Slightly faster than real time — ambient background footage
              // reads as more energetic/dynamic than real-time playback.
              onLoadedMetadata={(e) => {
                e.currentTarget.playbackRate = 1.3;
              }}
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
            clipPath: `inset(${topValue} ${side}px 0 ${side}px round ${radius}px)`,
          }}
        >
          {/* <HeroText {...props} titleClassName={titleClassName} variant="light" /> */}
        </div>
      </div>
    </section>
  );
}