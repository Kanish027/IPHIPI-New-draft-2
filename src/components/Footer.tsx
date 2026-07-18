"use client";

import Image from "next/image";
import Link from "next/link";
import { theme, withAlpha } from "@/lib/theme";

const ACTIVE_THEME = {
  footerBg: theme.primary,
  accent: theme.accent,
};

const EXPLORE = [
  { label: "Home", href: "/" },
  { label: "AI Technologies", href: "/ai-technologies" },
  { label: "R&D", href: "/research" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

const RESEARCH_AREAS = [
  { label: "Work Intelligence", href: "/research#work-intelligence" },
  { label: "Living Intelligence", href: "/research#living-intelligence" },
  { label: "Personal Intelligence", href: "/research#personal-intelligence" },
  { label: "Spatial Intelligence", href: "/research#spatial-intelligence" },
];

const AI_TECHNOLOGIES = [
  { label: "Single Mic", href: "/ai-technologies#single-mic" },
  { label: "Dual Mic", href: "/ai-technologies#dual-mic" },
  { label: "Keyword Spotting", href: "/ai-technologies#keyword-spotting" },
  { label: "Far-Field", href: "/ai-technologies#far-field" },
];

const SOCIALS = [
  {
    label: "X (Twitter)",
    href: "https://twitter.com/iphipi",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/iphipi",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.56V9h3.554z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/iphipi",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.921.678 1.856 0 1.34-.012 2.421-.012 2.751 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      className="px-4 pb-6 pt-20 text-white transition-colors duration-500 lg:px-6"
      style={{ backgroundColor: ACTIVE_THEME.footerBg }}
    >
      {/* Injecting CSS Variables for Dynamic Hover States */}
      <style>{`
        .theme-footer-link {
          color: ${withAlpha(theme.textLight, 0.7)};
        }
        .theme-footer-link:hover {
          color: ${ACTIVE_THEME.accent};
        }

        .theme-footer-social {
          border-color: ${withAlpha(theme.textLight, 0.15)};
          color: ${withAlpha(theme.textLight, 0.7)};
        }
        .theme-footer-social:hover {
          border-color: ${ACTIVE_THEME.accent};
          color: ${ACTIVE_THEME.accent};
          background-color: ${withAlpha(ACTIVE_THEME.accent, 0.08)};
          transform: translateY(-2px);
        }
      `}</style>

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              {/* brightness-0 invert renders the blue mark as white on dark */}
              <Image
                src="/iphipi-primary.png"
                alt="IPHIPI"
                width={32}
                height={32}
                className="brightness-0 invert"
              />
              <span className="text-sm font-extrabold uppercase tracking-[0.35em]">
                iphipi
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              The world&apos;s first agentic AI platform — turning hearables
              and wearables into proactive personal assistants.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="theme-footer-social flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              {EXPLORE.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="theme-footer-link text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Technologies */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              AI Technologies
            </p>
            <ul className="mt-4 space-y-2.5">
              {AI_TECHNOLOGIES.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="theme-footer-link text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* R&D areas */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              R&amp;D
            </p>
            <ul className="mt-4 space-y-2.5">
              {RESEARCH_AREAS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="theme-footer-link text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Get in touch
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href="mailto:partnerships@iphipi.com"
                  className="theme-footer-link transition-colors duration-300"
                >
                  partnerships@iphipi.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@iphipi.com"
                  className="theme-footer-link transition-colors duration-300"
                >
                  hello@iphipi.com
                </a>
              </li>
            </ul>
            <p className="mt-6 inline-flex items-center gap-2 text-sm text-white/60">
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 transition-colors duration-500"
                  style={{ backgroundColor: ACTIVE_THEME.accent }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full transition-colors duration-500"
                  style={{ backgroundColor: ACTIVE_THEME.accent }}
                />
              </span>
              Launching 2026
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40">
          <p>© 2026 IPHIPI Inc. All rights reserved.</p>
          <p>Intelligent.</p>
        </div>
      </div>
    </footer>
  );
}