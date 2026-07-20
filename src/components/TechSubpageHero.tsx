import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import { theme } from "@/lib/theme";

const ALL_TECHS = [
  { label: "Single Mic", href: "/ai-technologies/single-mic" },
  { label: "Dual Mic", href: "/ai-technologies/dual-mic" },
  { label: "Far-Field", href: "/ai-technologies/far-field" },
  { label: "Keyword Spotting", href: "/ai-technologies/keyword-spotting" },
];

export default function TechSubpageHero({
  eyebrow,
  title,
  tagline,
  current,
}: {
  eyebrow: string;
  title: string;
  tagline: string;
  current: string;
}) {
  return (
    <PageBanner eyebrow={eyebrow} title={title} tagline={tagline}>
      <div className="flex flex-wrap justify-center gap-2">
        {ALL_TECHS.map((t) => {
          const isCurrent = t.label === current;
          return (
            <Link
              key={t.label}
              href={t.href}
              className="rounded-full border px-4 py-2 text-sm font-medium transition-colors"
              style={{
                borderColor: isCurrent ? theme.secondary : "rgb(212 212 216)",
                backgroundColor: isCurrent ? theme.secondary : "transparent",
                color: isCurrent ? "#fff" : theme.textMuted,
              }}
            >
              {t.label}
            </Link>
          );
        })}
      </div>
    </PageBanner>
  );
}
