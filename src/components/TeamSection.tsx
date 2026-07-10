"use client";

import { useState } from "react";
import { theme, withAlpha } from "@/lib/theme";

const ACTIVE_THEME = {
  primary: theme.primary,
  secondary: theme.secondary,
  accent: theme.accent,
  bodyText: theme.bodyText,
  cardBg: theme.cardWarm,
};

type Member = {
  name: string;
  title: string;
  initials: string;
  visible: string;
  rest?: string[];
  featured?: boolean;
};

const LEADERSHIP: Member[] = [
  {
    name: "Pankaj Joshi",
    title: "Founder & CEO",
    initials: "PJ",
    featured: true,
    visible:
      "Pankaj Joshi, the founder and director of IPHIPI Technologies, has over two decades of extensive experience in technology innovation, product management, and strategic leadership. His expertise is centered on AI wearables, audio AI, and the development of B2B tech solutions. With a robust track record, Pankaj has previously held senior roles at companies including Meeami Technologies, Contify, InsideView, and HelloSoft.",
    rest: [
      "A seasoned leader in the space, Pankaj has successfully launched AI-powered hearables, built high-impact B2B SaaS products, and expanded global market footprints. His work focuses on cutting-edge technologies — specifically DSPs, Edge AI, and low-power AI chips — with a clear mission to make advanced AI accessible in everyday devices.",
      "Pankaj holds a B.Tech from IIT Kharagpur, an MSEE from the University of Hawaii, and an MBA from INSEAD. Combining a strong engineering foundation, which includes a patent in transceiver design, with deep business acumen, he consistently leads teams to create scalable, high-impact technological solutions across industries.",
    ],
  },
  {
    name: "Ashrith Deshpande",
    title: "Chief Technology Officer",
    initials: "AD",
    featured: true,
    visible:
      "As CTO of IPHIPI Technologies, Ashrith Deshpande leads the charge in translating our vision into reality, heading all engineering efforts with a focus on market-driven product innovation. A core DSP expert and seasoned architect, he structures our engineering roadmap to align seamlessly with IPHIPI's strategic goals, ensuring technical excellence and rigorous timeline management.",
    rest: [
      "Ashrith brings a distinguished background in acoustics, DSP, and embedded systems, built through a career at industry giants like Apple and Logitech. Over nearly 15 years at Apple, he progressed from an Audio Systems Engineer to a Senior Manager of Audio Systems Engineering, where he mastered the art of leading and scaling teams to take complex ideas from concept to final product.",
      "Driven by a passion for exploring what audio can achieve, Ashrith is dedicated to enhancing human-machine interaction and pioneering new ways for audio to interface with the world. By blending deep technical roots with leadership experience, he ensures that IPHIPI remains at the forefront of audio technology, consistently delivering scalable and impactful solutions.",
    ],
  },
];

const ENGINEERING: Member[] = [
  {
    name: "Kuldeep Daram",
    title: "Co-Founder & Head of Data Science",
    initials: "KD",
    visible:
      "Kuldeep Daram is Co-Founder and Head of Data Science at IPHIPI, where he leads end-to-end AI ownership spanning data science, machine learning, embedded systems, and agentic AI. He translates advanced AI research into production-grade audio solutions — covering data strategy, model design, optimization, and embedded deployment. Kuldeep specializes in porting and optimizing AI models across industry-standard embedded platforms to deliver customer-facing features. He is now advancing agentic AI for real-world communication in noisy environments, driving the next generation of intelligent, autonomous audio experiences across modern consumer electronics.",
    rest: [
      "Beyond this, Kuldeep owns AI product strategy, engineering hiring, and technical team leadership at IPHIPI. His work bridges deep research and real-world constraints — balancing accuracy, latency, power, and memory to ensure reliable performance under extreme acoustic conditions and on resource-constrained hardware.",
      "His technical depth spans deep noise suppression, speaker recognition, deepfake detection, sensor fusion, and edge AI, with hands-on expertise in embedded DSP and neural accelerator platforms. He is currently leading a next-generation audio AI stack centered on agentic, on-device intelligence across earbuds, smart glasses, and other form factors.",
      "Combining a strong research foundation with a pragmatic, deployment-first mindset, Kuldeep is focused on making advanced audio intelligence a standard feature — not a premium exception — in everyday consumer electronics.",
    ],
  },
  {
    name: "Sasank Kottapalli",
    title: "Co-Founder & Lead AI Architect",
    initials: "SK",
    visible:
      "Sasank Kottapalli is the Co-founder and Lead AI Architect at IPHIPI Technologies, where he leads the development of advanced edge-AI and audio intelligence solutions for wearables and embedded devices. His expertise spans speech enhancement, keyword spotting, environmental noise cancellation, model compression, and deployment on low-power processors.",
    rest: [
      "Previously, as AI Technical Head at Meeami Technologies, he led the development of production-grade audio AI solutions deployed at scale. He holds a master's degree in computer science from the University of Central Florida, with a specialization in Machine Learning and Artificial Intelligence.",
    ],
  },
  {
    name: "Naveen Kumar Gindi",
    title: "Edge AI Engineer",
    initials: "NG",
    visible:
      "Naveen Kumar Gindi is an Edge AI Engineer at IPHIPI Technologies with a strong background in deep learning, AI research, and neural-network architectures. He specializes in deploying and optimizing AI models for embedded and low-power chipsets through quantization, hardware-aware optimization, and efficient C implementations.",
    rest: [
      "With hands-on expertise in embedded DSPs and neural accelerator platforms, Naveen works across model development, chipset integration, and real-time performance optimization. He also contributes to AI model-conversion toolchains, collaborating with leading AI teams to support advanced operators, enable complex mathematical workloads on NPUs, and expand platform capabilities.",
      "His work bridges AI research and production deployment, with a strong focus on audio intelligence. He holds a Bachelor of Science in Data Science and Applications from the Indian Institute of Technology Madras.",
    ],
  },
];

function ExpandableBio({ visible, rest }: { visible: string; rest?: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <p className="leading-relaxed text-zinc-600">{visible}</p>

      {rest && rest.length > 0 && (
        <>
          <div
            className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
              open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="space-y-3">
                {rest.map((p, i) => (
                  <p key={i} className="leading-relaxed text-zinc-600">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
            style={{ color: ACTIVE_THEME.primary }}
          >
            {open ? "Show less" : "Read more"}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

function Avatar({ initials, size = "md" }: { initials: string; size?: "md" | "lg" }) {
  const dims = size === "lg" ? "h-16 w-16 text-xl" : "h-12 w-12 text-base";
  return (
    <div
      className={`flex ${dims} shrink-0 items-center justify-center rounded-full font-semibold text-white`}
      style={{
        background: `linear-gradient(135deg, ${ACTIVE_THEME.primary}, ${ACTIVE_THEME.secondary})`,
        boxShadow: `0 0 0 3px ${withAlpha(ACTIVE_THEME.accent, 0.2)}`,
      }}
    >
      {initials}
    </div>
  );
}

function LeaderCard({ member }: { member: Member }) {
  return (
    <div className="rounded-2xl border border-zinc-200/70 p-6 transition-colors duration-500 sm:p-8" style={{ backgroundColor: ACTIVE_THEME.cardBg }}>
      <div className="flex items-center gap-4">
        <Avatar initials={member.initials} size="lg" />
        <div>
          <p className="text-lg font-semibold tracking-tight" style={{ color: ACTIVE_THEME.secondary }}>
            {member.name}
          </p>
          <p className="text-sm font-medium" style={{ color: ACTIVE_THEME.primary }}>
            {member.title}
          </p>
        </div>
      </div>
      <div className="mt-5">
        <ExpandableBio visible={member.visible} rest={member.rest} />
      </div>
    </div>
  );
}

function EngineerCard({ member }: { member: Member }) {
  return (
    <div className="rounded-2xl border border-zinc-200 p-6 transition-colors duration-500">
      <div className="flex items-center gap-3">
        <Avatar initials={member.initials} />
        <div>
          <p className="font-semibold tracking-tight" style={{ color: ACTIVE_THEME.secondary }}>
            {member.name}
          </p>
          <p className="text-xs font-medium uppercase tracking-wide" style={{ color: ACTIVE_THEME.primary }}>
            {member.title}
          </p>
        </div>
      </div>
      <div className="mt-4 text-sm">
        <ExpandableBio visible={member.visible} rest={member.rest} />
      </div>
    </div>
  );
}

export default function TeamSection() {
  return (
    <section id="team" className="mt-28 scroll-mt-24">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Our Leading Team</p>
      <h2 className="mt-3 max-w-2xl text-subhead font-semibold tracking-tight" style={{ color: ACTIVE_THEME.secondary }}>
        The People Behind the Platform
      </h2>
      <p className="mt-4 max-w-2xl leading-relaxed text-zinc-500">
        Two decades of audio, DSP, and edge-AI expertise from Apple, Logitech,
        and the wearables industry — brought together to build agentic audio
        intelligence.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {LEADERSHIP.map((member) => (
          <LeaderCard key={member.name} member={member} />
        ))}
      </div>

      <p className="mt-14 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Engineering Team</p>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {ENGINEERING.map((member) => (
          <EngineerCard key={member.name} member={member} />
        ))}
      </div>
    </section>
  );
}
