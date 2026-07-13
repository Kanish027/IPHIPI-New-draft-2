import PageBanner from "@/components/PageBanner";

const SECTION_LINKS = [
  { label: "Upcoming", href: "#upcoming" },
  { label: "Past Events", href: "#past" },
];

export default function EventsHero() {
  return (
    <PageBanner
      eyebrow="Events"
      title="Meet us where it matters"
      tagline="Experience agentic audio intelligence first-hand."
    >
      <div className="flex flex-wrap justify-center gap-2">
        {SECTION_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-cyan-500 hover:text-cyan-700"
          >
            {link.label}
          </a>
        ))}
      </div>
    </PageBanner>
  );
}
