// "use client";

// import { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";
// import StoryLightbox from "@/components/StoryLightbox";
// import { theme, withAlpha } from "@/lib/theme";

// type TechStory = {
//   label: string;
//   body: string;
//   video: string;
//   poster: string;
// };

// const TECH_STORIES: TechStory[] = [
//   {
//     label: "Our Vision",
//     body: "To make intelligence as natural as conversation, seamlessly extending across people, devices, spaces, and everyday experiences.",
//     video: "/our-story-preview.mp4",
//     poster: "/our-story-poster.jpg",
//   },
//   {
//     label: "Environmental Noise Cancellation",
//     body: "Two microphones, one clear voice — even in wind and traffic.",
//     video: "/our-story-preview.mp4",
//     poster: "/our-story-poster.jpg",
//   },
//   {
//     label: "Far-Field Speech Enhancement",
//     body: "Capturing clear speech from across a room or a drive-thru lane.",
//     video: "/our-story-preview.mp4",
//     poster: "/our-story-poster.jpg",
//   },
//   {
//     label: "Keyword Spotting",
//     body: "Always-on wake-word detection that barely sips power.",
//     video: "/our-story-preview.mp4",
//     poster: "/our-story-poster.jpg",
//   },
// ];

// function TechStoryCard({ story, index }: { story: TechStory; index: number }) {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [visible, setVisible] = useState(false);
//   const [open, setOpen] = useState(false);
//   const flip = index % 2 === 1;

//   useEffect(() => {
//     const v = videoRef.current;
//     if (!v) return;
//     const io = new IntersectionObserver(([entry]) => {
//       setVisible(entry.isIntersecting);
//       if (entry.isIntersecting) v.play().catch(() => {});
//       else v.pause();
//     });
//     io.observe(v);
//     return () => io.disconnect();
//   }, []);

//   return (
//     <>
//       <motion.div
//         initial={{ opacity: 0, y: 60 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, amount: 0.4 }}
//         transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
//         className="grid items-center gap-8 py-14 md:grid-cols-2 md:gap-14"
//       >
//         <div className={flip ? "md:order-2" : "md:order-1"}>
//           <h3 className="mt-3 text-2xl font-medium tracking-tight lg:text-3xl" style={{ color: theme.secondary }}>
//             {story.label}
//           </h3>
//           <p className="mt-3 max-w-md text-base leading-relaxed" style={{ color: theme.textMuted }}>
//             {story.body}
//           </p>
//         </div>

//         <button
//           type="button"
//           aria-label={`Watch: ${story.label}`}
//           onClick={() => setOpen(true)}
//           className={`group relative flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-black ${
//             flip ? "md:order-1" : "md:order-2"
//           }`}
//         >
//           <video
//             ref={videoRef}
//             src={story.video}
//             poster={story.poster}
//             muted
//             loop
//             playsInline
//             preload={visible ? "auto" : "none"}
//             className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
//           />
//           <span className="absolute z-10 inline-flex items-center gap-1.5 rounded-full border border-transparent bg-white/20 py-2.5 pl-2.5 pr-3.5 text-sm font-medium leading-none text-white backdrop-blur-xl transition-colors group-hover:bg-white group-hover:text-black">
//             <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20 p-1 backdrop-blur-xl transition-colors group-hover:bg-black">
//               <svg viewBox="0 0 12 12" className="ml-0.5 h-3 w-3 fill-white" aria-hidden="true">
//                 <path d="M2 1.5v9l8-4.5z" />
//               </svg>
//             </span>
//             Watch
//           </span>
//         </button>
//       </motion.div>

//       <StoryLightbox open={open} onClose={() => setOpen(false)} src={story.video} poster={story.poster} />
//     </>
//   );
// }

// // New Large Video Component
// function GlimpseVideoBlock() {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [visible, setVisible] = useState(false);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const v = videoRef.current;
//     if (!v) return;
//     const io = new IntersectionObserver(([entry]) => {
//       setVisible(entry.isIntersecting);
//       if (entry.isIntersecting) v.play().catch(() => {});
//       else v.pause();
//     });
//     io.observe(v);
//     return () => io.disconnect();
//   }, []);

//   return (
//     <div className="mt-24 border-t pt-24" style={{ borderColor: theme.borderInactive }}>
//       <div className="mb-12 flex flex-col items-center text-center">
//         <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: theme.accent }}>
//           A Glimpse Into Tomorrow
//         </p>
//         <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-[48px]" style={{ color: theme.secondary }}>
//           The Future of Agentic Experiences
//         </h2>
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, amount: 0.2 }}
//         transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//       >
//         <button
//           type="button"
//           aria-label="Watch: The Future of Agentic Experiences"
//           onClick={() => setOpen(true)}
//           className="group relative flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-black shadow-2xl"
//         >
//           <video
//             ref={videoRef}
//             src="/our-story-preview.mp4"
//             poster="/our-story-poster.jpg"
//             muted
//             loop
//             playsInline
//             preload={visible ? "auto" : "none"}
//             className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
//           />
//           <span className="absolute z-10 inline-flex items-center gap-2 rounded-full border border-transparent bg-white/20 py-3 pl-3 pr-5 text-base font-medium leading-none text-white backdrop-blur-xl transition-colors group-hover:bg-white group-hover:text-black">
//             <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 p-1 backdrop-blur-xl transition-colors group-hover:bg-black">
//               <svg viewBox="0 0 12 12" className="ml-0.5 h-3.5 w-3.5 fill-white" aria-hidden="true">
//                 <path d="M2 1.5v9l8-4.5z" />
//               </svg>
//             </span>
//             Watch Preview
//           </span>
//         </button>
//       </motion.div>

//       <StoryLightbox open={open} onClose={() => setOpen(false)} src="/our-story-preview.mp4" poster="/our-story-poster.jpg" />
//     </div>
//   );
// }

// export default function TechStoriesSection() {
//   return (
//     <section className="px-4 py-20 lg:px-6">
//       <div className="mx-auto max-w-5xl">
        
//         {/* <div className="mx-auto mb-16 flex max-w-4xl flex-col items-center text-center">
//           <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5">
//             <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: theme.accent }}>
//               Explore the Technology
//             </p>
//           </div>

//           <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-[56px]" style={{ color: theme.secondary }}>
//             Engineering Intelligent Interactions
//           </h2>
          
//           <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-500">
//             Our engineering begins with the fundamentals of intelligent interaction. We have
//             developed core audio AI technologies—including Environmental Noise Cancellation (ENC),
//             Wake Word Detection, and Far-Field Speech Enhancement—that form the foundation for
//             natural, reliable voice experiences. Building on this foundation, our ongoing research
//             extends into multimodal intelligence, agentic systems, and connected ecosystems that
//             will shape the next generation of human–AI interaction.
//           </p>
//         </div> */}

//         <div className="mt-12">
//           {TECH_STORIES.map((story, i) => (
//             <div key={story.label} style={{ borderColor: theme.borderInactive }} className={i > 0 ? "border-t" : ""}>
//               <TechStoryCard story={story} index={i} />
//             </div>
//           ))}
//         </div>

//         {/* The new section added below the story cards */}
//         <GlimpseVideoBlock />
        
//       </div>
//     </section>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import StoryLightbox from "@/components/StoryLightbox";
import { theme, withAlpha } from "@/lib/theme";

type TechStory = {
  label: string;
  body: string;
  video: string;
  poster: string;
};

const TECH_STORIES: TechStory[] = [
  {
    label: "Environmental Noise Cancellation",
    body: "Two microphones, one clear voice — even in wind and traffic.",
    video: "/our-story-preview.mp4",
    poster: "/our-story-poster.jpg",
  },
  {
    label: "Far-Field Speech Enhancement",
    body: "Capturing clear speech from across a room or a drive-thru lane.",
    video: "/our-story-preview.mp4",
    poster: "/our-story-poster.jpg",
  },
  {
    label: "Keyword Spotting",
    body: "Always-on wake-word detection that barely sips power.",
    video: "/our-story-preview.mp4",
    poster: "/our-story-poster.jpg",
  },
];

function TechStoryCard({ story, index }: { story: TechStory; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const flip = index % 2 === 1;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = 1.3;
    const io = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="grid items-center gap-8 py-14 md:grid-cols-2 md:gap-14"
      >
        <div className={flip ? "md:order-2" : "md:order-1"}>
          <h3 className="mt-3 text-2xl font-medium tracking-tight lg:text-3xl" style={{ color: theme.secondary }}>
            {story.label}
          </h3>
          <p className="mt-3 max-w-md text-base leading-relaxed" style={{ color: theme.textMuted }}>
            {story.body}
          </p>
        </div>

        <button
          type="button"
          aria-label={`Watch: ${story.label}`}
          onClick={() => setOpen(true)}
          className={`group relative flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-black ${
            flip ? "md:order-1" : "md:order-2"
          }`}
        >
          <video
            ref={videoRef}
            src={story.video}
            poster={story.poster}
            muted
            loop
            playsInline
            preload={visible ? "auto" : "none"}
            onLoadedMetadata={(e) => {
              e.currentTarget.playbackRate = 1.3;
            }}
            className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <span className="absolute z-10 inline-flex items-center gap-1.5 rounded-full border border-transparent bg-white/20 py-2.5 pl-2.5 pr-3.5 text-sm font-medium leading-none text-white backdrop-blur-xl transition-colors group-hover:bg-white group-hover:text-black">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20 p-1 backdrop-blur-xl transition-colors group-hover:bg-black">
              <svg viewBox="0 0 12 12" className="ml-0.5 h-3 w-3 fill-white" aria-hidden="true">
                <path d="M2 1.5v9l8-4.5z" />
              </svg>
            </span>
            Watch
          </span>
        </button>
      </motion.div>

      <StoryLightbox open={open} onClose={() => setOpen(false)} src={story.video} poster={story.poster} />
    </>
  );
}

// Reduced size Glimpse block
function GlimpseVideoBlock() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = 1.3;
    const io = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div className="mt-16 border-t pt-16" style={{ borderColor: theme.borderInactive }}>
      <div className="mb-10 flex flex-col items-center text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: theme.accent }}>
          A Glimpse Into Tomorrow
        </p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-[40px]" style={{ color: theme.secondary }}>
          The Future of Agentic Experiences
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-3xl"
      >
        <button
          type="button"
          aria-label="Watch: The Future of Agentic Experiences"
          onClick={() => setOpen(true)}
          className="group relative flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-black shadow-xl"
        >
          <video
            ref={videoRef}
            src="/our-story-preview.mp4"
            poster="/our-story-poster.jpg"
            muted
            loop
            playsInline
            preload={visible ? "auto" : "none"}
            onLoadedMetadata={(e) => {
              e.currentTarget.playbackRate = 1.3;
            }}
            className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
          />
          <span className="absolute z-10 inline-flex items-center gap-2 rounded-full border border-transparent bg-white/20 py-2.5 pl-3 pr-4 text-sm font-medium leading-none text-white backdrop-blur-xl transition-colors group-hover:bg-white group-hover:text-black">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 p-1 backdrop-blur-xl transition-colors group-hover:bg-black">
              <svg viewBox="0 0 12 12" className="ml-0.5 h-3 w-3 fill-white" aria-hidden="true">
                <path d="M2 1.5v9l8-4.5z" />
              </svg>
            </span>
            Watch Preview
          </span>
        </button>
      </motion.div>

      <StoryLightbox open={open} onClose={() => setOpen(false)} src="/our-story-preview.mp4" poster="/our-story-poster.jpg" />
    </div>
  );
}

export default function TechStoriesSection() {
  return (
    <section className="px-4 py-10 lg:px-6">
      <div className="mx-auto max-w-5xl">
{/*         
        <div className="mx-auto mb-16 flex max-w-4xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: theme.accent }}>
              Explore the Technology
            </p>
          </div>

          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-[56px]" style={{ color: theme.secondary }}>
            Engineering Intelligent Interactions
          </h2>
          
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-500">
            Our engineering begins with the fundamentals of intelligent interaction. We have
            developed core audio AI technologies—including Environmental Noise Cancellation (ENC),
            Wake Word Detection, and Far-Field Speech Enhancement—that form the foundation for
            natural, reliable voice experiences. Building on this foundation, our ongoing research
            extends into multimodal intelligence, agentic systems, and connected ecosystems that
            will shape the next generation of human–AI interaction.
          </p>
        </div> */}

        <div className="mt-12">
          {TECH_STORIES.map((story, i) => (
            <div key={story.label} style={{ borderColor: theme.borderInactive }} className={i > 0 ? "border-t" : ""}>
              <TechStoryCard story={story} index={i} />
            </div>
          ))}
        </div>

        <GlimpseVideoBlock />
        
      </div>
    </section>
  );
}