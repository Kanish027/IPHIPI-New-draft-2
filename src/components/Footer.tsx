"use client";

import Image from "next/image";
import Link from "next/link";
import { theme } from "@/lib/theme";

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
  { label: "Productive Intelligence", href: "/research#productive-intelligence" },
  { label: "Living Intelligence", href: "/research#living-intelligence" },
  { label: "Personal Intelligence", href: "/research#personal-intelligence" },
  { label: "Spatial Intelligence", href: "/research#spatial-intelligence" },
];

const SOCIALS = [
  { label: "Twitter", href: "https://twitter.com/iphipi" },
  { label: "LinkedIn", href: "https://linkedin.com/company/iphipi" },
  { label: "GitHub", href: "https://github.com/iphipi" },
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
          color: rgba(255, 255, 255, 0.7);
        }
        .theme-footer-link:hover {
          color: ${ACTIVE_THEME.accent};
        }
        
        .theme-footer-social {
          border-color: rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.7);
        }
        .theme-footer-social:hover {
          border-color: ${ACTIVE_THEME.accent};
          color: ${ACTIVE_THEME.accent};
        }
      `}</style>

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
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
                  className="theme-footer-social rounded-full border px-4 py-2 text-sm transition-colors duration-300"
                >
                  {social.label}
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
          <p>The voice intelligence company</p>
        </div>

        {/* Watermark wordmark */}
        <div className="pointer-events-none mt-10 select-none overflow-hidden">
          <p className="text-center text-[clamp(4rem,17vw,17rem)] font-semibold leading-[0.8] tracking-tight text-white/[0.05]">
            IPHIPI
          </p>
        </div>
      </div>
    </footer>
  );
}