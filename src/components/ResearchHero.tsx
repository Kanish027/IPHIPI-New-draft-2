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
      title="Engineering Intelligent Interactions"
      tagline=" Our engineering begins with the fundamentals of intelligent interaction. We have
            developed core audio AI technologies—including Environmental Noise Cancellation (ENC),
            Wake Word Detection, and Far-Field Speech Enhancement—that form the foundation for
            natural, reliable voice experiences. Building on this foundation, our ongoing research
            extends into multimodal intelligence, agentic systems, and connected ecosystems that
            will shape the next generation of human–AI interaction."
    >
      {/* <div className="flex flex-wrap justify-center gap-2">
        {AREA_LINKS.map((area) => (
          <a
            key={area.label}
            href={area.href}
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-cyan-500 hover:text-cyan-700"
          >
            {area.label} Intelligence
          </a>
        ))}
      </div> */}
    </PageBanner>
  );
}
