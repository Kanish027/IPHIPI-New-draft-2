import type { ReactNode } from "react";
import { theme, withAlpha } from "@/lib/theme";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* The full list of device categories IPHIPI's audio stack ships on. Rendered
   in reading order across the grid, so keep the ordering intentional. */
const FORM_FACTORS: { label: string; icon: ReactNode }[] = [
  {
    label: "TWS",
    icon: (
      <>
        <path d="M9 4a4 4 0 0 1 4 4v3a3 3 0 0 1-3 3 2 2 0 0 0-2 2v3" />
        <circle cx="7" cy="18" r="2.5" />
      </>
    ),
  },
  {
    label: "OWS",
    icon: (
      <>
        <path d="M8 3.5c-2.5 1.5-4 4-4 7.5 0 3 1.5 5 3 6" />
        <circle cx="17" cy="12.5" r="3" />
        <path d="M14 12.5c0-3.5-2-6.5-3-9" />
      </>
    ),
  },
  {
    label: "Smart Glasses",
    icon: (
      <>
        <circle cx="6" cy="14" r="3.2" />
        <circle cx="18" cy="14" r="3.2" />
        <path d="M9.2 13h5.6" />
        <path d="M2.8 13.5 5 9c.4-.8 1-1 1.6-1" />
        <path d="M21.2 13.5 19 9c-.4-.8-1-1-1.6-1" />
      </>
    ),
  },
  {
    label: "Smart Ring",
    icon: (
      <>
        <circle cx="12" cy="14" r="6" />
        <path d="M9.5 8.5 11 3h2l1.5 5.5" />
      </>
    ),
  },
  {
    label: "Smart Pendant",
    icon: (
      <>
        <path d="M8 3.5C5.5 5 4 7.5 4 10.5" />
        <path d="M16 3.5c2.5 1.5 4 4 4 7" />
        <circle cx="12" cy="16" r="4.5" />
      </>
    ),
  },
  {
    label: "Smart Home",
    icon: (
      <>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5.5 9.5V21h13V9.5" />
        <path d="M10 21v-5h4v5" />
      </>
    ),
  },
  {
    label: "Kiosks",
    icon: (
      <>
        <rect x="5" y="3" width="14" height="12" rx="2" />
        <path d="M12 15v4" />
        <path d="M8 21h8" />
      </>
    ),
  },
  {
    label: "Drive-Thrus",
    icon: (
      <>
        <path d="M3 16v-3l1.6-4A2 2 0 0 1 6.5 8H13l1.5 5H3z" />
        <circle cx="6" cy="18" r="1.6" />
        <circle cx="12" cy="18" r="1.6" />
        <path d="M18 6v9" />
        <rect x="16.5" y="3" width="3" height="3.5" rx="1" />
      </>
    ),
  },
  {
    label: "Hearing Aid",
    icon: (
      <>
        <path d="M8.5 20c-1.6-1.2-2.2-3-2.2-5.5 0-4 .8-5.5.8-8A3.1 3.1 0 0 1 10.2 3a3.1 3.1 0 0 1 3.1 3.2c0 2-1.4 2.8-1.4 4.6 0 1.4.9 2 .9 3.4a2.6 2.6 0 0 1-2.6 2.6" />
        <path d="M16.5 7.5a5.5 5.5 0 0 1 0 9" />
      </>
    ),
  },
  {
    label: "Walkie Talkies",
    icon: (
      <>
        <rect x="7" y="9" width="10" height="12" rx="2" />
        <path d="M15 9V5.5" />
        <path d="M10 12.5h4" />
        <path d="M11 16h2" />
      </>
    ),
  },
  {
    label: "Smart & Feature Phones",
    icon: (
      <>
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
        <path d="M10.5 5.5h3" />
        <path d="M10.5 18.5h3" />
      </>
    ),
  },
  {
    label: "Headsets",
    icon: (
      <>
        <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
        <rect x="2.5" y="13.5" width="3.5" height="6" rx="1.75" />
        <rect x="18" y="13.5" width="3.5" height="6" rx="1.75" />
        <path d="M19.75 19.5V21a1.5 1.5 0 0 1-1.5 1.5H13" />
      </>
    ),
  },
];

/**
 * FormFactorsSection — the device categories IPHIPI's audio stack ships on, as
 * a single scrolling lane set in an inset navy band. The list renders twice so
 * the -50% translate loops seamlessly; the band's edges are masked so cells
 * fade out instead of clipping hard.
 */
export default function FormFactorsSection() {
  return (
    <section className="py-16 sm:py-20" style={{ backgroundColor: theme.pageBg }}>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p
          className="text-center text-xs font-semibold uppercase tracking-[0.22em]"
          style={{ color: theme.accent }}
        >
          Form Factors We Enable
        </p>

        <div
          className="relative mt-8 overflow-hidden rounded-[28px]"
          style={{
            backgroundColor: theme.primary,
            boxShadow: `0 30px 60px -40px ${withAlpha(theme.primary, 0.9)}`,
          }}
        >
          {/* Depth: gold bloom top-right, deepening toward bottom-left */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(ellipse 60% 80% at 88% 0%, ${withAlpha(theme.accent, 0.16)}, transparent 60%), linear-gradient(160deg, transparent, ${withAlpha(theme.gradDark2, 0.55)})`,
            }}
          />

          <div
            className="relative flex overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            }}
          >
            <div
              className="flex w-max"
              style={{ animation: "iphipiMarqueeLeft 52s linear infinite" }}
            >
              {/* Rendered twice — the second pass is what makes -50% seamless */}
              {[...FORM_FACTORS, ...FORM_FACTORS].map((f, i) => (
                <div
                  key={`${f.label}-${i}`}
                  className="flex w-[168px] shrink-0 flex-col items-center gap-3.5 border-r px-4 py-9 sm:w-[208px]"
                  style={{ borderColor: withAlpha(theme.accent, 0.14) }}
                >
                  <span style={{ color: theme.accent }}>
                    {/* The per-item `icon` is a bare set of <path>/<circle>
                        elements — it only renders once wrapped in the <svg>
                        that Icon provides. */}
                    <Icon>{f.icon}</Icon>
                  </span>
                  <span
                    className="whitespace-nowrap text-center text-[13px] font-medium tracking-wide"
                    style={{ color: theme.textHeading }}
                  >
                    {f.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
