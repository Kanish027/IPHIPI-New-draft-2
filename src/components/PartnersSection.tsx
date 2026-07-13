"use client";

import type { ReactNode } from "react";
import { theme, withAlpha } from "@/lib/theme";

type Partner = {
  name: string;
  /** Real logo mark, if available — falls back to a monogram lockup when absent. */
  icon?: ReactNode;
};

const PARTNERS: Partner[] = [
  {
    name: "Mivi",
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/8/80/Mivi_Logo.png"
        alt="Mivi"
        className="h-10 w-auto object-contain"
      />
    ),
  },
  {
    name: "HME",
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="https://cdn.prod.website-files.com/675dfc250340dfa91033c999/67ba9837cccac9623952df8c_HME%20Primary%20Logo.svg"
        alt="HME"
        className="h-10 w-auto object-contain"
      />
    ),
  },
  {
    name: "LAVA",
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/63/Lava_International.svg"
        alt="LAVA"
        className="h-10 w-auto object-contain"
      />
    ),
  },
  {
    name: "Baseus",
    icon: (
      <span className="flex items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSPc19cjZfF_VNmvPRido9RAnYszpV9g3OhTjVj4fWrEzsfsKjXhKgsuk&s=10"
          alt=""
          aria-hidden="true"
          className="h-9 w-9 shrink-0 object-contain"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://brandlogos.net/wp-content/uploads/2023/10/baseus-logo_brandlogos.net_3wbfi.png"
          alt="Baseus"
          className="h-9 w-auto object-contain"
        />
      </span>
    ),
  },
  {
    name: "Trefan",
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXMdbJSi1Vfem_VH3m908TuRaNBvjxMlF8mWIQE6jrj8yyo9CGEwJCAms&s=10"
        alt="Trefan"
        className="h-16 w-auto object-contain"
      />
    ),
  },
  {
    name: "iStar Tech",
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="https://logovtor.com/wp-content/uploads/2020/06/istar-technology-co-ltd-logo-vector.png"
        alt="iStar Tech"
        className="h-20 w-auto object-contain"
      />
    ),
  },
  {
    name: "Transsion",
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/4/48/Transsion_Logo.svg"
        alt="Transsion"
        className="h-10 w-auto object-contain"
      />
    ),
  },
  {
    name: "Jio",
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Reliance_Jio_Logo_%28October_2015%29.svg/1280px-Reliance_Jio_Logo_%28October_2015%29.svg.png"
        alt="Jio"
        className="h-10 w-auto object-contain"
      />
    ),
  },
];

/**
 * PartnersSection — real logo marks where available (see `icon` on each
 * PARTNERS entry); falls back to a monogram + wordmark lockup for partners
 * whose logo files haven't been supplied yet. Swap in more `icon` SVGs as
 * they become available.
 */
export default function PartnersSection() {
  return (
    <section className="py-16 sm:py-20" style={{ backgroundColor: theme.pageBg }}>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Header — line passes through the text, like a labeled divider */}
        <div className="relative flex items-center justify-center">
          <span
            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
            style={{ backgroundColor: withAlpha(theme.secondary, 0.1) }}
          />
          <h2
            className="relative px-4 text-base"
            style={{ color: theme.textMuted, backgroundColor: theme.pageBg }}
          >
            Trusted by industry leaders
          </h2>
        </div>

        {/* Logo grid — real marks where supplied, monogram lockup otherwise */}
        <div className="mx-auto mt-10 pt-14 grid max-w-4xl grid-cols-2 place-items-center gap-x-10 gap-y-10 sm:grid-cols-4 lg:gap-x-12">
          {PARTNERS.map((partner, i) => {
            const monogramColor = i % 2 === 0 ? theme.primary : theme.secondary;
            return (
              <span key={partner.name} className="theme-partner-lockup group flex items-center gap-2.5">
                {partner.icon ? (
                  <span className="flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    {partner.icon}
                  </span>
                ) : (
                  <>
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundColor: monogramColor }}
                    >
                      {partner.name.charAt(0)}
                    </span>
                    <span
                      className="theme-partner-label select-none whitespace-nowrap text-xl font-bold tracking-tight transition-colors duration-300"
                      style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif", color: theme.railTextInactive }}
                    >
                      {partner.name}
                    </span>
                  </>
                )}
              </span>
            );
          })}
        </div>

        <style>{`
          .theme-partner-lockup:hover .theme-partner-label {
            color: ${theme.secondary};
          }
        `}</style>
      </div>
    </section>
  );
}
