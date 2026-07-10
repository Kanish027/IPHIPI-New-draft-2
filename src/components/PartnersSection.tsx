"use client";

import { theme, withAlpha } from "@/lib/theme";

const ACTIVE_THEME = {
  sectionBg: theme.surfaceDeepBlue,
  primary: theme.primary,
  accent: theme.accent,
  textHeading: theme.textHeading,
  textBody: theme.textBody,
};

const WaveformIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-6 w-6" aria-hidden="true">
    <path d="M3 12h2l2-7 3 14 3-17 3 14 2-7h3" />
  </svg>
);
const EarIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
    <path d="M8 14c-2-1-3-3-3-5a5 5 0 0 1 10 0c0 2 1.5 2.5 1.5 4.5A3.5 3.5 0 0 1 13 17c-1 0-1.5-.5-1.5-1.5" />
    <path d="M6 20a3 3 0 0 0 5 1" />
  </svg>
);
const PhoneIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
    <rect x="7" y="2" width="10" height="20" rx="2" />
    <path d="M11 18h2" />
  </svg>
);
const EarbudsIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
    <circle cx="7" cy="8" r="3.2" />
    <circle cx="17" cy="8" r="3.2" />
    <path d="M7 11.2V16a2 2 0 0 0 4 0M17 11.2V16a2 2 0 0 0-4 0" />
  </svg>
);
const OpenEarIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
    <path d="M8 20c-3-2-5-5-5-8a7 7 0 0 1 14 0" />
    <path d="M17 12v4a4 4 0 0 1-4 4" />
    <circle cx="17" cy="9" r="1.5" />
  </svg>
);
const GlassesIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
    <circle cx="7" cy="14" r="3.5" />
    <circle cx="17" cy="14" r="3.5" />
    <path d="M10.5 14a2 2 0 0 1 3 0M3.5 13 2 8M20.5 13 22 8" />
  </svg>
);
const MicIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-6 w-6" aria-hidden="true">
    <rect x="9" y="2" width="6" height="12" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v4" />
  </svg>
);

const PARTNERS = [
  {
    name: "Mivi",
    tag: "Audio",
    icon: WaveformIcon,
    body: "Delivered advanced dual-microphone ENC and keyword detection technology to enable clear, natural voice interactions.",
  },
  {
    name: "HME",
    tag: "Hearing",
    icon: EarIcon,
    body: "Delivered a far-field voice solution for hands-free communication systems, enabling accurate voice capture in noisy environments.",
  },
  {
    name: "LAVA",
    tag: "Mobile",
    icon: PhoneIcon,
    body: "Delivered single-mic noise suppression technology for Lava feature phones, enhancing voice clarity during everyday calls.",
  },
  {
    name: "Baseus",
    tag: "TWS — Two Mic",
    icon: EarbudsIcon,
    body: "Delivered dual-microphone noise suppression and beamforming technology for true wireless earbuds, keeping calls clear in real-world environments.",
  },
  {
    name: "Trefan",
    tag: "OWS — One Mic",
    icon: OpenEarIcon,
    body: "Delivered single-mic voice enhancement for open-wearable earbuds, preserving ambient awareness while keeping calls distraction-free.",
  },
  {
    name: "iStar Tech",
    tag: "One Mic",
    icon: MicIcon,
    body: "Delivered single-mic noise suppression technology enabling clear voice capture across iStar's audio device lineup.",
  },
  {
    name: "Transsion",
    tag: "Mobile — Single Mic",
    icon: PhoneIcon,
    body: "Delivered single-mic voice enhancement technology across Transsion's mobile device portfolio, improving call clarity for millions of users.",
  },
  {
    name: "Jio",
    tag: "Smart Glasses — 1/2 Mic",
    icon: GlassesIcon,
    body: "Delivered adaptable single- and dual-mic voice technology for JioFrames smart glasses, enabling clear hands-free voice interactions.",
  },
];

export default function PartnersSection() {
  return (
    <section
      className="relative overflow-hidden px-4 py-28 transition-colors duration-500 lg:px-6"
      style={{ backgroundColor: ACTIVE_THEME.sectionBg }}
    >
      {/* Single soft ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(650px circle at 15% 0%, ${withAlpha(ACTIVE_THEME.accent, 0.1)}, transparent 60%)`,
        }}
      />

      <style>{`
        .partner-card {
          border-color: rgba(255,255,255,0.09);
          background: linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
        }
        .partner-card:hover {
          border-color: ${withAlpha(ACTIVE_THEME.accent, 0.45)};
          background: linear-gradient(180deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%);
          box-shadow: 0 24px 60px -28px rgba(0,0,0,0.6);
        }
        .partner-icon {
          color: ${ACTIVE_THEME.accent};
          background-color: ${withAlpha(ACTIVE_THEME.accent, 0.12)};
          border-color: ${withAlpha(ACTIVE_THEME.accent, 0.25)};
        }
        .partner-card:hover .partner-icon {
          background-color: ${withAlpha(ACTIVE_THEME.accent, 0.2)};
        }
        .partner-tag {
          color: ${ACTIVE_THEME.textBody};
          border-color: rgba(255,255,255,0.14);
        }
        .partner-card:hover .partner-tag {
          color: ${ACTIVE_THEME.accent};
          border-color: ${withAlpha(ACTIVE_THEME.accent, 0.4)};
        }
      `}</style>

      <div className="relative mx-auto max-w-6xl">
        {/* Header row */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: ACTIVE_THEME.accent }}
            >
              Our Partners
            </p>
            <h2
              className="mt-3 text-headline font-semibold tracking-tight"
              style={{ color: ACTIVE_THEME.textHeading }}
            >
              Trusted Across Industries
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed" style={{ color: ACTIVE_THEME.textBody }}>
              Powering voice experiences for consumer audio, mobile devices,
              commercial communications, and emerging AI wearables.
            </p>
          </div>

          <div
            className="shrink-0 rounded-2xl border px-5 py-4 text-center"
            style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.03)" }}
          >
            <p className="text-3xl font-semibold tabular-nums" style={{ color: ACTIVE_THEME.textHeading }}>
              8+
            </p>
            <p className="mt-0.5 text-xs uppercase tracking-wide" style={{ color: ACTIVE_THEME.textBody }}>
              Production partners
            </p>
          </div>
        </div>

        {/* Partner cards — horizontal layout, icon left, content right */}
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="partner-card group flex gap-5 rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1"
            >
              <span className="partner-icon flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border transition-colors duration-300">
                {partner.icon}
              </span>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <p
                    className="text-xl font-semibold tracking-tight"
                    style={{ color: ACTIVE_THEME.textHeading }}
                  >
                    {partner.name}
                  </p>
                  <span className="partner-tag rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider transition-colors duration-300">
                    {partner.tag}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: ACTIVE_THEME.textBody }}>
                  {partner.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
