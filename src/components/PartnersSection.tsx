"use client";

import { theme, withAlpha } from "@/lib/theme";

const ACTIVE_THEME = {
  sectionBg: theme.surfaceDeepBlue,
  accent: theme.accent,
  accentMuted: withAlpha(theme.accent, 0.4),
  textHeading: theme.textHeading,
  textBody: theme.textBody,
};

const PARTNERS = [
  {
    name: "Mivi",
    tag: "Audio",
    body: "Delivered advanced dual-microphone ENC and keyword detection technology to enable clear, natural voice interactions.",
    wave: [40, 65, 30, 80, 55, 90, 45, 70, 35, 85, 50, 95, 40, 60, 75, 30, 88, 45, 65, 55, 80, 35, 70, 50],
  },
  {
    name: "HME",
    tag: "Hearing",
    body: "Delivered a far-field voice solution for hands-free communication systems, enabling accurate voice capture in noisy environments.",
    wave: [55, 35, 75, 45, 90, 60, 30, 85, 50, 70, 40, 95, 55, 30, 80, 60, 45, 75, 35, 90, 50, 65, 40, 85],
  },
  {
    name: "LAVA",
    tag: "Mobile",
    body: "Delivered single-mic noise suppression technology for Lava feature phones, enhancing voice clarity during everyday calls.",
    wave: [30, 90, 45, 60, 80, 35, 70, 50, 95, 40, 65, 55, 85, 30, 75, 45, 90, 60, 35, 80, 50, 70, 40, 65],
  },
];

export default function PartnersSection() {
  return (
    <section 
      className="px-4 py-28 transition-colors duration-500 lg:px-6" 
      style={{ backgroundColor: ACTIVE_THEME.sectionBg }}
    >
      <style>{`
        @keyframes iphipiWave {
          0%, 100% { transform: scaleY(0.45); }
          50% { transform: scaleY(1); }
        }
        
        /* Dynamic Theme Hover States */
        .theme-partner-card {
          border-color: rgba(255, 255, 255, 0.1);
          background-color: rgba(255, 255, 255, 0.03);
        }
        .theme-partner-card:hover {
          border-color: rgba(255, 255, 255, 0.2);
          background-color: rgba(255, 255, 255, 0.06);
        }
        
        .theme-hover-wave {
          background-color: rgba(255, 255, 255, 0.25);
        }
        .theme-partner-card:hover .theme-hover-wave {
          background-color: ${ACTIVE_THEME.accent};
        }
        
        .theme-hover-tag {
          color: ${ACTIVE_THEME.textBody};
          border-color: rgba(255, 255, 255, 0.15);
        }
        .theme-partner-card:hover .theme-hover-tag {
          color: ${ACTIVE_THEME.accent};
          border-color: ${ACTIVE_THEME.accentMuted};
        }
      `}</style>
      
      <div className="mx-auto max-w-6xl">
        <p
          className="text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-500"
          style={{ color: ACTIVE_THEME.accent }}
        >
          Our Partners
        </p>
        <h2
          className="mt-3 text-headline font-semibold tracking-tight transition-colors duration-500"
          style={{ color: ACTIVE_THEME.textHeading }}
        >
          Trusted by Industry Leaders
        </h2>
        <p 
          className="mt-4 max-w-2xl transition-colors duration-500" 
          style={{ color: ACTIVE_THEME.textBody }}
        >
          IPHIPI partners with leading OEMs and consumer electronics brands —
          bringing agentic AI to millions of users worldwide.
        </p>
        
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="theme-partner-card group relative overflow-hidden rounded-[28px] border p-8 transition-colors duration-300"
            >
              {/* Signature element: ambient waveform, reacts on hover */}
              <div className="mb-10 flex h-16 items-end gap-[3px]">
                {partner.wave.map((h, i) => (
                  <span
                    key={i}
                    className="theme-hover-wave w-1 origin-bottom rounded-full transition-colors duration-300"
                    style={{
                      height: `${h}%`,
                      animation: "iphipiWave 1.8s ease-in-out infinite",
                      animationDelay: `${i * 0.06}s`,
                    }}
                  />
                ))}
              </div>
              <span
                className="theme-hover-tag inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide transition-colors duration-300"
              >
                {partner.tag}
              </span>
              {/* Wordmark placeholder — swap for partner logo assets */}
              <p
                className="mt-5 text-3xl font-semibold tracking-tight transition-colors duration-500"
                style={{ color: ACTIVE_THEME.textHeading }}
              >
                {partner.name}
              </p>
              <p 
                className="mt-3 text-sm leading-relaxed transition-colors duration-500" 
                style={{ color: ACTIVE_THEME.textBody }}
              >
                {partner.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}