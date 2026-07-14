"use client";

import { useState, useEffect, useRef } from "react";
import { theme, withAlpha } from "@/lib/theme";

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

function DefaultAvatar({ className }: { className?: string }) {
  return (
    <span className={`flex items-center justify-center overflow-hidden bg-white/5 ${className ?? ""}`}>
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[55%] w-[55%]" style={{ color: theme.textMuted }}>
        <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-9 2.24-9 5v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2c0-2.76-4.58-5-9-5Z" />
      </svg>
    </span>
  );
}

function ChipFrame({ photo, name, size }: { photo?: string; name: string; size: number }) {
  const notch = Math.round(size * 0.16);
  const clip = `polygon(${notch}px 0, calc(100% - ${notch}px) 0, 100% ${notch}px, 100% calc(100% - ${notch}px), calc(100% - ${notch}px) 100%, ${notch}px 100%, 0 calc(100% - ${notch}px), 0 ${notch}px)`;
  return (
    <div
      className="relative flex-shrink-0 overflow-hidden"
      style={{ 
        width: size, 
        height: size, 
        clipPath: clip, 
        border: `2px solid ${theme.accent}`,
        background: theme.surfaceDark,
        boxShadow: `0 0 20px ${withAlpha(theme.accent, 0.2)}`
      }}
    >
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photo} alt={name} className="h-full w-full object-cover" />
      ) : (
        <DefaultAvatar className="h-full w-full" />
      )}
    </div>
  );
}

function LeadershipCard({ member, onOpen }: { member: Member; onOpen: () => void }) {
  const blurb = member.visible.split(". ")[0].trim().replace(/\.$/, "") + ".";

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Read more about ${member.name}`}
      className="group relative flex h-full w-full cursor-pointer flex-col items-start overflow-hidden rounded-xl p-7 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
      style={{
        background: theme.surfaceCard,
        border: `1px solid ${withAlpha(theme.accent, 0.2)}`,
      }}
    >
      <span
        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }}
      />
      <div className="flex items-center gap-4">
        <ChipFrame photo={member.photo} name={member.name} size={64} />
        <div>
          <p className="text-xl font-semibold tracking-tight" style={{ color: theme.textHeading }}>
            {member.name}
          </p>
          <p
            className="mt-1 text-xs font-medium uppercase tracking-[0.14em]"
            style={{ color: theme.accent, fontFamily: "var(--font-mono, monospace)" }}
          >
            {member.title}
          </p>
        </div>
      </div>
      <p className="mt-5 line-clamp-3 text-sm leading-relaxed" style={{ color: theme.textBody }}>
        {blurb}
      </p>
      <span
        className="mt-5 text-xs font-medium uppercase tracking-[0.14em] transition-colors duration-300"
        style={{ color: theme.textMuted }}
      >
        Read full profile →
      </span>
    </button>
  );
}

function EngineerCard({ member, onOpen }: { member: Member; onOpen: () => void }) {
  const blurb = member.visible.split(". ")[0].trim().replace(/\.$/, "") + ".";

  return (
    <div className="relative flex flex-col items-center">
      <span aria-hidden className="h-6 w-[1px]" style={{ background: theme.accent }} />
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Read more about ${member.name}`}
        className="flex h-full w-full cursor-pointer flex-col items-center gap-4 rounded-xl p-6 text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
        style={{
          background: theme.surfaceCard,
          border: `1px solid ${withAlpha(theme.accent, 0.2)}`,
        }}
      >
        <ChipFrame photo={member.photo} name={member.name} size={56} />
        <div>
          <p className="text-base font-semibold tracking-tight" style={{ color: theme.textHeading }}>
            {member.name}
          </p>
          <p
            className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em]"
            style={{ color: theme.accent, fontFamily: "var(--font-mono, monospace)" }}
          >
            {member.title}
          </p>
        </div>
        <p className="line-clamp-2 text-xs leading-relaxed" style={{ color: theme.textBody }}>
          {blurb}
        </p>
      </button>
    </div>
  );
}

function TeamModal({ member, onClose }: { member: Member; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl cursor-default rounded-2xl p-6 shadow-2xl sm:grid sm:grid-cols-[160px_1fr] sm:p-8"
        style={{
          background: theme.surfaceDark,
          border: `1px solid ${theme.accent}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/10"
          style={{ color: theme.textMuted }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="flex justify-center sm:block">
          <ChipFrame photo={member.photo} name={member.name} size={128} />
        </div>

        <div className="mt-4 sm:mt-0">
          <p
            className="border-l-2 pl-3 text-lg font-semibold tracking-tight"
            style={{ borderColor: theme.accent, color: theme.textHeading }}
          >
            {member.name}
          </p>
          <p
            className="mt-1 pl-3.5 text-xs font-medium uppercase tracking-[0.14em]"
            style={{ color: theme.accent, fontFamily: "var(--font-mono, monospace)" }}
          >
            {member.title}
          </p>
          <div
            className="mt-4 max-h-64 space-y-3 overflow-y-auto pl-3.5 pr-1 text-sm leading-relaxed"
            style={{ color: theme.textBody }}
          >
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

function NeuralNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Cap DPR — a 3x/4x canvas on high-density phone/laptop screens forces
    // every draw call to push far more pixels than is visually necessary.
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        w = rect.width;
        h = rect.height;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };
    resize();
    window.addEventListener('resize', resize);

    // Dense node/connection graph — the density itself was never the
    // performance problem; the per-frame gradient/shadow work was. With
    // those removed, a denser graph is cheap (a single path + stroke call
    // for every line, regardless of how many there are).
    const nodePositions: Array<{x: number; y: number; phase: number}> = [];
    const numNodes = 110;

    for (let i = 0; i < numNodes; i++) {
      nodePositions.push({
        x: 0.05 + Math.random() * 0.9,
        y: 0.05 + Math.random() * 0.9,
        phase: Math.random() * Math.PI * 2
      });
    }

    const connections: Array<{ from: number; to: number }> = [];
    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        const dx = nodePositions[i].x - nodePositions[j].x;
        const dy = nodePositions[i].y - nodePositions[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 0.28 && Math.random() < 0.45) {
          connections.push({ from: i, to: j });
        }
      }
    }

    // Line color/pulse color computed once — no gradient objects are
    // created inside the animation loop at all, which was the main cost.
    const lineColor = withAlpha(theme.accent, 0.18);
    const pulseColor = theme.accent;
    // Only a subset of connections carry the traveling pulse dot, so the
    // per-frame work doesn't scale with the full edge count.
    const pulseConnections = connections.filter((_, i) => i % 3 === 0);

    // Pre-render the glow as a small bitmap ONCE — every node/pulse then
    // just drawImage()s this sprite (cheap) instead of each constructing
    // its own radial gradient every frame (expensive, and the old cost).
    const glowSize = 48;
    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = glowSize;
    glowCanvas.height = glowSize;
    const glowCtx = glowCanvas.getContext('2d');
    if (glowCtx) {
      const g = glowCtx.createRadialGradient(
        glowSize / 2, glowSize / 2, 0,
        glowSize / 2, glowSize / 2, glowSize / 2
      );
      g.addColorStop(0, withAlpha(theme.accent, 0.55));
      g.addColorStop(1, 'transparent');
      glowCtx.fillStyle = g;
      glowCtx.fillRect(0, 0, glowSize, glowSize);
    }

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      if (!isVisible || w === 0 || h === 0) return;

      timeRef.current += 0.008;
      const time = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      // Connections — single flat stroke color, no per-frame allocation.
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      connections.forEach((conn) => {
        const from = nodePositions[conn.from];
        const to = nodePositions[conn.to];
        ctx.moveTo(from.x * w, from.y * h);
        ctx.lineTo(to.x * w, to.y * h);
      });
      ctx.stroke();

      // Traveling pulses — stamp the pre-rendered glow sprite (cheap
      // drawImage) instead of building a radial gradient per pulse.
      const pulseGlowSize = 14;
      pulseConnections.forEach((conn) => {
        const from = nodePositions[conn.from];
        const to = nodePositions[conn.to];
        const x1 = from.x * w;
        const y1 = from.y * h;
        const x2 = to.x * w;
        const y2 = to.y * h;
        const pulseOffset = (time * 0.4 + conn.from * 0.02) % 1;
        const px = x1 + (x2 - x1) * pulseOffset;
        const py = y1 + (y2 - y1) * pulseOffset;
        ctx.drawImage(glowCanvas, px - pulseGlowSize / 2, py - pulseGlowSize / 2, pulseGlowSize, pulseGlowSize);
      });
      ctx.fillStyle = pulseColor;
      pulseConnections.forEach((conn) => {
        const from = nodePositions[conn.from];
        const to = nodePositions[conn.to];
        const x1 = from.x * w;
        const y1 = from.y * h;
        const x2 = to.x * w;
        const y2 = to.y * h;
        const pulseOffset = (time * 0.4 + conn.from * 0.02) % 1;
        const px = x1 + (x2 - x1) * pulseOffset;
        const py = y1 + (y2 - y1) * pulseOffset;
        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });

      // Nodes — glow sprite (drawImage, cheap) + a flat-fill dot on top.
      // No per-frame gradients or shadowBlur, which were the actual cost.
      const nodeGlowSize = 26;
      nodePositions.forEach((node) => {
        const x = node.x * w;
        const y = node.y * h;
        ctx.drawImage(glowCanvas, x - nodeGlowSize / 2, y - nodeGlowSize / 2, nodeGlowSize, nodeGlowSize);
      });
      ctx.fillStyle = theme.accent;
      nodePositions.forEach((node) => {
        const x = node.x * w;
        const y = node.y * h;
        const radius = 2 + Math.sin(time * 1.5 + node.phase) * 1;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      style={{ opacity: 0.5 }}
    />
  );
}

export default function TeamSection() {
  const [openMember, setOpenMember] = useState<Member | null>(null);

  return (
    <section
      id="team"
      className="relative mt-28 scroll-mt-24 overflow-hidden px-4 py-24 lg:px-6"
      style={{
        background: theme.primary,
        minHeight: "100vh",
      }}
    >
      <NeuralNetworkCanvas />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center">
          <p
            className="text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: theme.accent, fontFamily: "var(--font-mono, monospace)" }}
          >
            Leadership
          </p>
          <h2
            className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            style={{ color: theme.textHeading }}
          >
            The minds behind<br className="hidden sm:block" /> the platform
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed"
            style={{ color: theme.textBody }}
          >
            Two decades of audio, DSP, and edge-AI expertise from Apple, Logitech, and the wearables industry —
            brought together to build agentic audio intelligence.
          </p>
        </div>

        <div className="relative mx-auto mt-12 h-8 w-[1px]" style={{ background: theme.accent }} aria-hidden />

        <div className="mt-2 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          {LEADERSHIP.map((member) => (
            <LeadershipCard key={member.name} member={member} onOpen={() => setOpenMember(member)} />
          ))}
        </div>

        <div className="mt-24">
          <p
            className="text-center text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: theme.textMuted, fontFamily: "var(--font-mono, monospace)" }}
          >
            Engineering Excellence
          </p>
          <h3 className="mt-3 text-center text-2xl font-semibold tracking-tight" style={{ color: theme.textHeading }}>
            Our technical team
          </h3>

          <div className="relative mx-auto mt-10 hidden max-w-3xl sm:block">
            <div className="absolute left-0 right-0 top-0 h-[1px]" style={{ background: withAlpha(theme.accent, 0.3) }} />
          </div>

          <div className="mt-0 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
            {ENGINEERING.map((member) => (
              <EngineerCard key={member.name} member={member} onOpen={() => setOpenMember(member)} />
            ))}
          </div>
        </div>
      </div>

      {openMember && <TeamModal member={openMember} onClose={() => setOpenMember(null)} />}
    </section>
  );
}
