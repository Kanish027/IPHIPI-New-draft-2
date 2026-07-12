import type { Metadata } from "next";
import { ContactForm } from "./contact-form";
import { theme, withAlpha } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Contact — IPHIPI",
  description: "Get in touch with the IPHIPI team.",
};

const ACTIVE_THEME = {
  primary: theme.primary,
  secondary: theme.secondary,
  accent: theme.accent,
  accentBgMuted: withAlpha(theme.accent, 0.08),
  pageBg: theme.pageBg,
  cardBg: theme.cardWarm,
};

const CHANNELS = [
  {
    title: "Partnerships",
    email: "partnerships@iphipi.com",
    description: "Custom integrations, OEM licensing, and branded wake words.",
  },
  {
    title: "General",
    email: "contact@iphipi.com",
    description: "Press, careers, and everything else.",
  },
];

const SOCIALS = [
  { label: "Twitter", href: "https://twitter.com/iphipi" },
  { label: "LinkedIn", href: "https://linkedin.com/company/iphipi" },
  { label: "Youtube", href: "" },
  { label: "Instagram", href: "" },
];

export default function ContactPage() {
  return (
    <main
      className="flex-1 px-4 pb-28 pt-44 transition-colors duration-500 lg:px-6"
      style={{
        backgroundColor: ACTIVE_THEME.pageBg,
        color: ACTIVE_THEME.secondary,
      }}
    >
      {/* Injecting CSS Variables for Tailwind hover states */}
      <style>{`
        .theme-social-link {
          border-color: ${theme.borderInactive};
          color: ${ACTIVE_THEME.secondary};
        }
        .theme-social-link:hover {
          border-color: ${ACTIVE_THEME.accent};
          background-color: ${ACTIVE_THEME.accentBgMuted};
          color: ${ACTIVE_THEME.primary};
        }
      `}</style>

      <div className="mx-auto w-full max-w-6xl">
        {/* Page header */}
        <p
          className="text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: theme.textMuted }}
        >
          Contact
        </p>
        <h1 className="mt-3 max-w-3xl text-headline leading-[1.0] font-semibold tracking-tight sm:text-display">
          Let&apos;s build voice-first products together
        </h1>
        <p className="mt-5 max-w-2xl text-lg" style={{ color: theme.textMuted }}>
          Whether you&apos;re an OEM exploring on-device audio intelligence or a
          brand designing a voice experience — we&apos;d love to hear from you.
        </p>

        {/* Direct channels */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {CHANNELS.map((channel) => (
            <div
              key={channel.title}
              className="rounded-xl border border-zinc-200/70 p-8 transition-colors duration-500"
              style={{ backgroundColor: ACTIVE_THEME.cardBg }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-[0.15em]"
                style={{ color: ACTIVE_THEME.primary }}
              >
                {channel.title}
              </p>
              <a
                href={`mailto:${channel.email}`}
                className="mt-4 inline-block text-lg font-medium underline-offset-4 transition hover:underline"
                style={{ textDecorationColor: ACTIVE_THEME.accent }}
              >
                {channel.email}
              </a>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                {channel.description}
              </p>
            </div>
          ))}
        </div>

        {/* Form + info */}
        <div className="mt-16 grid gap-10 lg:grid-cols-5 lg:gap-12">
          <aside className="lg:col-span-2">
            <h2 className="text-subhead font-semibold tracking-tight">
              Send us a message
            </h2>
            <p className="mt-3 max-w-sm text-zinc-500">
              Tell us a bit about what you&apos;re working on. We typically
              reply within one to two business days.
            </p>

            <div className="mt-10 space-y-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  Headquarters
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                  IPHIPI Inc.
                  <br />
                  Singapore
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  Follow
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SOCIALS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="theme-social-link rounded-full border px-4 py-2 text-sm transition-all duration-300"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-3">
            <div className="rounded-xl border border-zinc-200 p-6 sm:p-8 bg-white">
              <ContactForm />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}