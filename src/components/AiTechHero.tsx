import PageBanner from "@/components/PageBanner";

const SECTION_LINKS = [
  { label: "Mic Technology", href: "#mic-tech" },
  { label: "Audio Processor", href: "#audio-processor" },
  { label: "Form Factors", href: "#form-factors" },
];

export default function AiTechHero() {
  return (
    <PageBanner
      eyebrow="AI Technologies"
      title="Audio Intelligence Across Every Form Factor"
      tagline="Engineered for every wearable category."
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
