"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { theme, withAlpha } from "@/lib/theme";

type FormFactor = {
  name: string;
  desc: string;
  detail: string;
  icon: ReactNode;
};

const FORM_FACTORS: FormFactor[] = [
  {
    name: "TWS Earbuds",
    desc: "In-ear, dual-mic ready",
    detail: "Dual-mic beamforming isolates speech from wind and crowd noise, without adding latency.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full" aria-hidden="true">
        <circle cx="9" cy="8" r="4" />
        <path d="M9 12v6a2 2 0 0 0 4 0" />
        <path d="M17 5a4 4 0 0 1 0 6M19.5 3a7 7 0 0 1 0 10" />
      </svg>
    ),
  },
  {
    name: "OWS / Open Ear",
    desc: "Open-ear comfort",
    detail: "Stays aware of the room while our noise engine keeps the wearer's own voice crystal clear.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full" aria-hidden="true">
        <path d="M8 20c-3-2-5-5-5-8a7 7 0 0 1 14 0" />
        <path d="M17 12v4a4 4 0 0 1-4 4" />
        <circle cx="17" cy="9" r="1.5" />
      </svg>
    ),
  },
  {
    name: "Smart Glasses",
    desc: "Multimodal + spatial",
    detail: "Spatial pickup tracks head orientation, keeping voice capture locked on as the wearer looks around.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full" aria-hidden="true">
        <circle cx="7" cy="14" r="3.5" />
        <circle cx="17" cy="14" r="3.5" />
        <path d="M10.5 14a2 2 0 0 1 3 0M3.5 13 2 8M20.5 13 22 8" />
      </svg>
    ),
  },
  {
    name: "Smart Ring",
    desc: "Ultra-low power",
    detail: "A sub-5mW keyword-spotting core runs always-on, waking the full pipeline only when it matters.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full" aria-hidden="true">
        <circle cx="12" cy="14" r="7" />
        <circle cx="12" cy="14" r="3.5" />
        <path d="m10 4 2-2 2 2" />
      </svg>
    ),
  },
  {
    name: "Smart Watch",
    desc: "On-wrist voice",
    detail: "Full noise suppression tuned for the shorter mic-to-mouth distance on a wrist.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full" aria-hidden="true">
        <rect x="7" y="7" width="10" height="10" rx="3" />
        <path d="M9 7V3h6v4M9 17v4h6v-4M12 10v2.5l1.5 1" />
      </svg>
    ),
  },
  {
    name: "Pendant",
    desc: "Ambient wearable",
    detail: "Always-listening ambient capture, filtered in real time so only intentional speech gets through.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full" aria-hidden="true">
        <path d="M4 3c2 4 5 6 8 6s6-2 8-6" />
        <path d="M12 9v3" />
        <circle cx="12" cy="16" r="4" />
      </svg>
    ),
  },
];

const AUTO_ADVANCE_MS = 3500;

/**
 * Self-contained "device panel" — big icon tile, pill selector row, and a
 * plain detail card with the description text.
 */
export default function FormFactorsShowcase() {
  const [active, setActive] = useState(0);
  const factor = FORM_FACTORS[active];

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % FORM_FACTORS.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [active]);

  return (
    <div
      className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl border p-5"
      style={{ backgroundColor: theme.surfaceDark, borderColor: withAlpha(theme.textLight, 0.06) }}
    >
      {/* Top row: big icon tile + name/desc */}
      <div className="flex items-center gap-4">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl p-4 text-white shadow-lg"
          style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.primary})` }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={factor.name}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.25 }}
              className="flex h-full w-full items-center justify-center"
            >
              {factor.icon}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-white">{factor.name}</p>
          <p className="mt-0.5 truncate text-sm text-white/50">{factor.desc}</p>
        </div>
      </div>

      {/* Selector row — pill of icon buttons, one active */}
      <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl bg-black/20 p-2 sm:grid-cols-6">
        {FORM_FACTORS.map((f, i) => {
          const isActive = i === active;
          return (
            <button
              key={f.name}
              type="button"
              onClick={() => setActive(i)}
              className="flex flex-col items-center gap-2 rounded-xl px-2 py-3 transition-colors duration-200"
              style={{ backgroundColor: isActive ? withAlpha(theme.accent, 0.16) : "transparent" }}
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full p-2.5 transition-all duration-300"
                style={{
                  backgroundColor: isActive ? theme.accent : withAlpha(theme.textLight, 0.06),
                  color: isActive ? theme.surfaceDark : withAlpha(theme.textLight, 0.6),
                }}
              >
                {f.icon}
              </span>
              <span
                className="text-center text-[11px] font-medium leading-tight"
                style={{ color: isActive ? theme.textLight : withAlpha(theme.textLight, 0.45) }}
              >
                {f.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail card */}
      <div className="mt-4 flex min-h-[100px] items-center rounded-xl border border-white/5 bg-white/[0.03] p-6">
        <AnimatePresence mode="wait">
          <motion.p
            key={factor.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="text-sm leading-relaxed text-white/70 sm:text-base"
          >
            {factor.detail}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
