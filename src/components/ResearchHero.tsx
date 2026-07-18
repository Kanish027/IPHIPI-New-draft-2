import PageBanner from "@/components/PageBanner";

const AREA_LINKS = [
  { label: "Work", href: "#work-intelligence" },
  { label: "Living", href: "#living-intelligence" },
  { label: "Personal", href: "#personal-intelligence" },
  { label: "Spatial", href: "#spatial-intelligence" },
];

export default function ResearchHero() {
  return (
    <PageBanner
      eyebrow="R&D at IPHIPI"
      title="The technology behind the experience"
      tagline="Four research areas power the agentic AI platform."
    >
      <div className="flex flex-wrap justify-center gap-2">
        {AREA_LINKS.map((area) => (
          <a
            key={area.label}
            href={area.href}
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-cyan-500 hover:text-cyan-700"
          >
            {area.label} Intelligence
          </a>
        ))}
      </div>
    </PageBanner>
  );
}
