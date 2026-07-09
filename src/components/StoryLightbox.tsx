"use client";

import { useEffect, useRef, useState } from "react";

/* Fullscreen "Our story" overlay with a custom video player.
   Shared by the navbar menu and the mission section. */

export default function StoryLightbox({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] animate-fade-in bg-black/80 backdrop-blur-xl">
      <div className="flex h-14 items-center justify-between px-5">
        <span className="w-8" />
        <span className="text-base font-medium text-white">Our story</span>
        <button
          type="button"
          aria-label="Close video"
          onClick={onClose}
          className="relative h-8 w-8 cursor-pointer text-white transition-opacity hover:opacity-70"
        >
          <span className="absolute left-1/2 top-1/2 h-[2px] w-[20px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-current" />
          <span className="absolute left-1/2 top-1/2 h-[2px] w-[20px] -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-current" />
        </button>
      </div>
      <div
        className="flex h-[calc(100%-3.5rem)] items-center justify-center px-6 pb-14"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <StoryPlayer />
      </div>
    </div>
  );
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = String(Math.floor(seconds % 60)).padStart(2, "0");
  return `${m}:${s}`;
}

function StoryPlayer() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Try with sound first (allowed after the user's click); fall back to muted.
    v.play().catch(() => {
      v.muted = true;
      setMuted(true);
      v.play().catch(() => setPlaying(false));
    });

    // Don't keep playing (with sound) in a hidden tab.
    const onVisibility = () => {
      if (document.hidden) videoRef.current?.pause();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else wrapRef.current?.requestFullscreen?.();
  };

  return (
    <div
      ref={wrapRef}
      className="relative aspect-video w-[min(85vw,133vh,1180px)] overflow-hidden rounded-lg bg-black shadow-2xl"
    >
      <video
        ref={videoRef}
        src="/our-story.mp4"
        poster="/our-story-poster.jpg"
        loop
        playsInline
        muted={muted}
        onClick={togglePlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        className="h-full w-full cursor-pointer object-cover"
      />

      {/* Center play / pause */}
      <button
        type="button"
        aria-label={playing ? "Pause" : "Play"}
        onClick={togglePlay}
        className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:scale-105 hover:bg-black/50"
      >
        {playing ? (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
            <rect x="7" y="5" width="3.5" height="14" rx="1" />
            <rect x="13.5" y="5" width="3.5" height="14" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-6 w-6" aria-hidden="true">
            <path d="M7 4.5v15l13-7.5z" />
          </svg>
        )}
      </button>

      {/* Bottom controls */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent px-6 pb-4 pt-10 text-white">
        <div
          role="slider"
          aria-label="Seek"
          aria-valuemin={0}
          aria-valuemax={Math.floor(duration)}
          aria-valuenow={Math.floor(time)}
          onClick={seek}
          className="group/seek relative mb-3 h-3 cursor-pointer"
        >
          <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-white/30" />
          <div
            className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-white"
            style={{ width: duration ? `${(time / duration) * 100}%` : "0%" }}
          />
          <div
            className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 transition-opacity group-hover/seek:opacity-100"
            style={{ left: duration ? `${(time / duration) * 100}%` : "0%" }}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="font-geometric text-sm tabular-nums">
            {formatTime(time)} / {formatTime(duration)}
          </span>
          <div className="flex items-center gap-5">
            <button
              type="button"
              aria-label={muted ? "Unmute" : "Mute"}
              onClick={() => {
                const v = videoRef.current;
                if (!v) return;
                v.muted = !v.muted;
                setMuted(v.muted);
              }}
              className="cursor-pointer transition-opacity hover:opacity-70"
            >
              {muted ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                  <path d="M11 5 6 9H2v6h4l5 4z" fill="currentColor" stroke="none" />
                  <line x1="16" y1="9" x2="22" y2="15" />
                  <line x1="22" y1="9" x2="16" y2="15" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                  <path d="M11 5 6 9H2v6h4l5 4z" fill="currentColor" stroke="none" />
                  <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                  <path d="M18.5 5.5a9 9 0 0 1 0 13" />
                </svg>
              )}
            </button>
            <button
              type="button"
              aria-label="Fullscreen"
              onClick={toggleFullscreen}
              className="cursor-pointer transition-opacity hover:opacity-70"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                <path d="M15 3h6v6" />
                <path d="M9 21H3v-6" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
