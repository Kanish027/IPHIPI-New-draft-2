"use client";

import { useState } from "react";
import { theme } from "@/lib/theme";

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
  photo?: string;
};

const LEADERSHIP: Member[] = [
  {
    name: "Pankaj Joshi",
    title: "Founder & CEO",
    initials: "PJ",
    featured: true,
    photo: "https://www.iphipi.com/pankajCopy.jpeg",
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
    photo:
      "https://media.licdn.com/dms/image/v2/C5603AQGs8tLpkAxwTA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1569210812451?e=2147483647&v=beta&t=CQAzVthqCbKXP3B3oaFZ8_Uv042ckFnjUHDjyk3VO3A",
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
    title: "Data Science & Embedded AI",
    initials: "KD",
    photo:
      "https://media.licdn.com/dms/image/v2/D5603AQHd3Q-3-xq_kg/profile-displayphoto-scale_200_200/B56Zxfx56jH8AY-/0/1771133445358?e=2147483647&v=beta&t=1qCZuyf-QWRQCtVwH3I2F-CJDxt2m4pKGfXJNishHq4",
    visible:
      "Kuldeep Daram is Co-Founder and Head of Data Science at IPHIPI, where he leads end-to-end AI ownership spanning data science, machine learning, embedded systems, and agentic AI. He translates advanced AI research into production-grade audio solutions — covering data strategy, model design, optimization, and embedded deployment.",
    rest: [
      "Beyond this, Kuldeep owns AI product strategy, engineering hiring, and technical team leadership at IPHIPI. His work bridges deep research and real-world constraints — balancing accuracy, latency, power, and memory to ensure reliable performance under extreme acoustic conditions and on resource-constrained hardware.",
      "His technical depth spans deep noise suppression, speaker recognition, deepfake detection, sensor fusion, and edge AI, with hands-on expertise in embedded DSP and neural accelerator platforms. He is currently leading a next-generation audio AI stack centered on agentic, on-device intelligence across earbuds, smart glasses, and other form factors.",
    ],
  },
  {
    name: "Sasank Kottapalli",
    title: "Edge AI & Audio Intelligence",
    initials: "SK",
    photo:
      "https://media.licdn.com/dms/image/v2/C4E03AQEavBnn84vT5g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1553160010288?e=2147483647&v=beta&t=8_v-7687PCoPaJPCG4Tc7z7VZrrGudI-8WBBJB6ipUw",
    visible:
      "Sasank Kottapalli is the Co-founder and Lead AI Architect at IPHIPI Technologies, where he leads the development of advanced edge-AI and audio intelligence solutions for wearables and embedded devices. His expertise spans speech enhancement, keyword spotting, environmental noise cancellation, model compression, and deployment on low-power processors.",
    rest: [
      "Previously, as AI Technical Head at Meeami Technologies, he led the development of production-grade audio AI solutions deployed at scale. He holds a master's degree in computer science from the University of Central Florida, with a specialization in Machine Learning and Artificial Intelligence.",
    ],
  },
  {
    name: "Naveen Kumar Gindi",
    title: "Model Optimization & Deployment",
    initials: "NG",
    photo:
      "https://media.licdn.com/dms/image/v2/D5603AQGp0ufEj1tsPg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1729970301968?e=2147483647&v=beta&t=sgTvWKSmgIvD8B8ycrNMr4UFjbcbOfOQEDOG-NJU9Q0",
    visible:
      "Naveen Kumar Gindi is an Edge AI Engineer at IPHIPI Technologies with a strong background in deep learning, AI research, and neural-network architectures. He specializes in deploying and optimizing AI models for embedded and low-power chipsets through quantization, hardware-aware optimization, and efficient C implementations.",
    rest: [
      "With hands-on expertise in embedded DSPs and neural accelerator platforms, Naveen works across model development, chipset integration, and real-time performance optimization. He also contributes to AI model-conversion toolchains, collaborating with leading AI teams to support advanced operators, enable complex mathematical workloads on NPUs, and expand platform capabilities.",
    ],
  },
];

/** Default avatar — plain gray circle + person silhouette, the same
 *  fallback Instagram shows for accounts with no profile photo. Used
 *  whenever a Member has no real `photo` set. */
function DefaultAvatar({ className }: { className?: string }) {
  return (
    <span className={`flex items-center justify-center overflow-hidden rounded-full bg-zinc-200 ${className ?? ""}`}>
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[70%] w-[70%] text-zinc-400">
        <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-9 2.24-9 5v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2c0-2.76-4.58-5-9-5Z" />
      </svg>
    </span>
  );
}

function TeamCard({ member, onOpen }: { member: Member; onOpen: () => void }) {
  const blurb = member.visible.split(". ")[0].trim().replace(/\.$/, "") + ".";

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Read more about ${member.name}`}
      className="flex h-full w-full flex-col items-start rounded-2xl border bg-white p-7 text-left shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.18)]"
      style={{ borderColor: theme.borderInactive }}
    >
      {member.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={member.photo}
          alt={member.name}
          className="h-16 w-16 rounded-full object-cover"
        />
      ) : (
        <DefaultAvatar className="h-16 w-16" />
      )}
      <p className="mt-5 text-xl font-semibold tracking-tight" style={{ color: ACTIVE_THEME.secondary }}>
        {member.name}
      </p>
      <p className="mt-0.5 text-sm font-medium" style={{ color: ACTIVE_THEME.primary }}>
        {member.title}
      </p>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed" style={{ color: theme.textMuted }}>
        {blurb}
      </p>
      <span className="mt-5 flex items-center gap-2">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300"
          style={{ backgroundColor: theme.cardHover, color: ACTIVE_THEME.secondary }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </span>
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300"
          style={{ backgroundColor: theme.cardHover, color: ACTIVE_THEME.secondary }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.56V9h3.554z" />
          </svg>
        </span>
      </span>
    </button>
  );
}

function TeamModal({ member, onClose }: { member: Member; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative grid w-full max-w-2xl cursor-default gap-6 rounded-2xl bg-white p-6 shadow-2xl sm:grid-cols-[160px_1fr] sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {member.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.photo}
            alt={member.name}
            className="mx-auto h-32 w-32 rounded-full object-cover sm:mx-0"
          />
        ) : (
          <DefaultAvatar className="mx-auto h-32 w-32 sm:mx-0" />
        )}

        <div>
          <p
            className="border-l-2 pl-3 text-lg font-semibold tracking-tight"
            style={{ borderColor: ACTIVE_THEME.primary, color: ACTIVE_THEME.secondary }}
          >
            {member.name}
          </p>
          <p className="mt-1 pl-3.5 text-sm font-medium" style={{ color: ACTIVE_THEME.primary }}>
            {member.title}
          </p>
          <div className="mt-4 max-h-64 space-y-3 overflow-y-auto pl-3.5 pr-1 text-sm leading-relaxed text-zinc-600">
            <p>{member.visible}</p>
            {member.rest?.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeamSection() {
  const [openMember, setOpenMember] = useState<Member | null>(null);

  return (
    <section id="team" className="mt-20 scroll-mt-24">
      {/* Leadership Section */}
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">Our Leading Team</p>
      <h2
        className="mt-3 max-w-2xl text-subhead font-semibold tracking-tight"
        style={{ color: ACTIVE_THEME.secondary }}
      >
        The People Behind the Platform
      </h2>
      <p className="mt-4 max-w-2xl leading-relaxed text-zinc-500">
        Two decades of audio, DSP, and edge-AI expertise from Apple, Logitech, and the wearables industry — brought
        together to build agentic audio intelligence.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        {LEADERSHIP.map((member) => (
          <TeamCard key={member.name} member={member} onOpen={() => setOpenMember(member)} />
        ))}
      </div>

      {/* Engineering Roster */}
      <div className="mt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
          In-House Technical Expertise
        </p>
        <h2 className="mt-3 max-w-2xl text-subhead font-semibold tracking-tight" style={{ color: ACTIVE_THEME.secondary }}>
          Our engineering teams
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
        {ENGINEERING.map((member) => (
          <TeamCard key={member.name} member={member} onOpen={() => setOpenMember(member)} />
        ))}
      </div>

      {openMember && <TeamModal member={openMember} onClose={() => setOpenMember(null)} />}
    </section>
  );
}
