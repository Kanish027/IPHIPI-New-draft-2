"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import StoryLightbox from "@/components/StoryLightbox";

const NAV_LINKS = [
  { label: "AI Technologies", href: "/ai-technologies" },
  { label: "R&D", href: "/research" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const previewRef = useRef<HTMLVideoElement>(null);

  // Hide the navbar while scrolling down; reveal it on the first scroll up.
  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        lastY = y;
        if (Math.abs(delta) < 2) return; // ignore jitter
        setHidden(delta > 0 && y > 80);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Pause the preview when the tab is hidden; resume when it's visible again.
  useEffect(() => {
    const onVisibility = () => {
      const v = previewRef.current;
      if (!v) return;
      if (document.hidden) v.pause();
      else v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setStoryOpen((story) => {
        if (!story) setOpen(false);
        return false;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Dimmed backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <header
        className={`pointer-events-none fixed inset-x-0 top-5 z-50 px-4 transition-transform duration-300 ease-in-out ${
          hidden && !open && !storyOpen ? "-translate-y-[calc(100%+1.25rem)]" : "translate-y-0"
        }`}
      >
        <div
          className="pointer-events-auto relative mx-auto overflow-hidden rounded-xl border border-zinc-200/80 bg-white/85 text-[#27272A] backdrop-blur-2xl transition-[width] duration-500 ease-in-out [--menu-width-closed:100%] [--menu-width-open:100%] sm:[--menu-width-closed:330px] sm:[--menu-width-open:50vw] md:[--menu-width-open:70vw] xl:[--menu-width-open:50vw]"
          style={{
            width: open ? "var(--menu-width-open)" : "var(--menu-width-closed)",
          }}
        >
          {/* Top bar: logo / wordmark / toggle */}
          <div className="flex h-[60px] w-full items-center justify-between">
            <a aria-label="Home" href="/">
              <div
                className="flex h-[60px] w-[60px] items-center justify-center transition-transform duration-500"
                style={{ transform: open ? "rotate(-360deg)" : "rotate(0deg)" }}
              >
                <Image
                  src="/iphipi-primary.png"
                  alt=""
                  width={40}
                  height={40}
                  priority
                  className="p-1.5"
                />
              </div>
            </a>

            <a className="flex h-[60px] items-center p-5" aria-label="Home" href="/">
              <span className="text-sm font-extrabold uppercase leading-none tracking-[0.35em]">
                iphipi
              </span>
            </a>

            <div className="flex items-center">
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="group relative h-[60px] w-[60px] cursor-pointer p-5"
              >
                <div className="absolute inset-0 m-2.5 flex items-center justify-center rounded-lg transition-colors duration-200 group-hover:bg-[#27272A]/5" />
                <span
                  className="absolute left-1/2 top-1/2 h-[2px] w-[20px] rounded-full bg-current transition-transform duration-300"
                  style={{
                    transform: open
                      ? "translateX(-50%) translateY(-50%) rotate(45deg)"
                      : "translateX(-50%) translateY(calc(-50% - 4px))",
                  }}
                />
                <span
                  className="absolute left-1/2 top-1/2 h-[2px] w-[20px] rounded-full bg-current transition-transform duration-300"
                  style={{
                    transform: open
                      ? "translateX(-50%) translateY(-50%) rotate(-45deg)"
                      : "translateX(-50%) translateY(calc(-50% + 4px))",
                  }}
                />
              </button>
            </div>
          </div>

          {/* Expanding panel — max-height transition to the content's natural
              height (no JS measurement, so no leftover gap below the footer) */}
          <div
            className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
              open ? "max-h-[80vh]" : "max-h-0"
            }`}
          >
            <div
              className={`flex w-full flex-col gap-8 p-6 transition-opacity duration-300 ${
                open ? "opacity-100 delay-150" : "opacity-0"
              }`}
            >
              <div className="grid grid-cols-4 items-center">
                <div className="col-span-4 flex flex-col lg:col-span-2">
                  <nav className="col-auto flex flex-col items-start gap-2 pb-8 lg:pb-0">
                    {NAV_LINKS.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="text-2xl font-medium tracking-tight transition-colors duration-200 hover:text-zinc-500"
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Story video card */}
                <div className="col-span-4 lg:col-span-2">
                  <button
                    type="button"
                    aria-label="Watch our story"
                    onClick={() => setStoryOpen(true)}
                    className="group relative flex aspect-video max-h-44 w-full cursor-pointer items-center justify-center overflow-hidden rounded-md bg-black"
                  >
                    {/* Lightweight muted preview; mounted only while the menu is
                        open (and not covered by the story lightbox) so nothing
                        plays or downloads in the background. */}
                    {open && !storyOpen && (
                      <video
                        ref={previewRef}
                        src="/our-story-preview.mp4"
                        poster="/our-story-poster.jpg"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover opacity-80"
                      />
                    )}
                    <span className="absolute z-10 inline-flex items-center gap-1.5 rounded-full border border-transparent bg-white/20 py-2.5 pl-2.5 pr-3.5 text-sm font-medium leading-none text-white backdrop-blur-xl transition-colors group-hover:bg-white group-hover:text-black">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20 p-1 backdrop-blur-xl transition-colors group-hover:bg-black">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3"
                          aria-hidden="true"
                        >
                          <polygon points="6 3 20 12 6 21 6 3" fill="white" />
                        </svg>
                      </span>
                      <span>Our story</span>
                    </span>
                  </button>
                </div>
              </div>

              {/* Footer row */}
              <div className="grid w-full grid-cols-4">
                <div className="hidden lg:col-span-2 lg:block">
                  <p className="text-sm text-neutral-500">The voice intelligence company</p>
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <p className="text-sm text-neutral-500">Launching 2026</p>
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <a
                    className="flex items-center justify-end text-right text-sm text-neutral-500"
                    href="/beta-program"
                  >
                    <span className="pr-1">Beta Application</span>
                    <span className="inline-block h-2 w-2 animate-[blinking_0.75s_ease-in-out_infinite] rounded-full bg-gold-500" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <StoryLightbox open={storyOpen} onClose={() => setStoryOpen(false)} />
    </>
  );
}

