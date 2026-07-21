// // "use client";

// // import { useState, type FormEvent } from "react";
// // import { theme, withAlpha } from "@/lib/theme";

// // type Status = "idle" | "submitting" | "success" | "error";

// // const INTEREST_AREAS = [
// //   {
// //     value: "consumer-audio",
// //     label: "Consumer Audio",
// //     hint: "TWS, OWS, Smart Pendant, Smart Ring, Smart Watch",
// //   },
// //   {
// //     value: "commercial-iot",
// //     label: "Commercial & IoT",
// //     hint: "Drive-thrus, Kiosks, Smart Home",
// //   },
// //   {
// //     value: "chipset-odm",
// //     label: "Chipset/ODM Partnership",
// //     hint: "Hardware-level integration",
// //   },
// // ];

// // const TECHNOLOGIES = [
// //   "Single Mic Speech Enhancement",
// //   "Dual Mic Speech Enhancement",
// //   "Keyword Spotting / Wake Word",
// //   "Far-Field Speech Enhancement",
// // ];

// // const PRODUCT_CATEGORIES = ["TWS", "OWS", "Smart Glasses", "Other Wearables"];

// // function toggleValue(list: string[], value: string) {
// //   return list.includes(value)
// //     ? list.filter((v) => v !== value)
// //     : [...list, value];
// // }

// // const CheckIcon = (
// //   <svg
// //     viewBox="0 0 24 24"
// //     fill="none"
// //     stroke="currentColor"
// //     strokeWidth="3"
// //     strokeLinecap="round"
// //     strokeLinejoin="round"
// //     className="h-3 w-3"
// //     aria-hidden="true"
// //   >
// //     <path d="M20 6 9 17l-5-5" />
// //   </svg>
// // );

// // function Chip({
// //   label,
// //   checked,
// //   onChange,
// // }: {
// //   label: string;
// //   checked: boolean;
// //   onChange: () => void;
// // }) {
// //   return (
// //     <label
// //       className="flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-3 text-sm transition-all duration-200"
// //       style={{
// //         borderColor: checked ? theme.accent : "rgb(228 228 231)",
// //         backgroundColor: checked ? withAlpha(theme.accent, 0.08) : "#fff",
// //         color: checked ? theme.primary : "rgb(63 63 70)",
// //       }}
// //     >
// //       <input
// //         type="checkbox"
// //         checked={checked}
// //         onChange={onChange}
// //         className="sr-only"
// //       />
// //       <span
// //         className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-md border transition-colors duration-200"
// //         style={{
// //           width: 18,
// //           height: 18,
// //           borderColor: checked ? theme.accent : "rgb(212 212 216)",
// //           backgroundColor: checked ? theme.accent : "transparent",
// //           color: "#fff",
// //         }}
// //       >
// //         {checked && CheckIcon}
// //       </span>
// //       <span className="font-medium">{label}</span>
// //     </label>
// //   );
// // }

// // export function ContactForm() {
// //   const [status, setStatus] = useState<Status>("idle");
// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [interestArea, setInterestArea] = useState<string | null>(null);
// //   const [technologies, setTechnologies] = useState<string[]>([]);
// //   const [productCategories, setProductCategories] = useState<string[]>([]);

// //   async function handleSubmit(e: FormEvent<HTMLFormElement>) {
// //     e.preventDefault();
// //     setStatus("submitting");
// //     setErrorMessage("");

// //     const form = e.currentTarget;
// //     const data = {
// //       interestArea,
// //       companyName: (form.elements.namedItem("companyName") as HTMLInputElement)
// //         .value,
// //       companyEmail: (
// //         form.elements.namedItem("companyEmail") as HTMLInputElement
// //       ).value,
// //       name: (form.elements.namedItem("name") as HTMLInputElement).value,
// //       technologies,
// //       productCategories,
// //     };

// //     try {
// //       const res = await fetch("/api/contact", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(data),
// //       });

// //       if (!res.ok) {
// //         const body = await res.json().catch(() => null);
// //         throw new Error(
// //           body?.error || "Something went wrong. Please try again.",
// //         );
// //       }

// //       setStatus("success");
// //       form.reset();
// //       setTechnologies([]);
// //       setProductCategories([]);
// //     } catch (err) {
// //       setStatus("error");
// //       setErrorMessage(
// //         err instanceof Error
// //           ? err.message
// //           : "Something went wrong. Please try again.",
// //       );
// //     }
// //   }

// //   if (status === "success") {
// //     return (
// //       <div
// //         className="rounded-2xl p-8 text-center"
// //         style={{ backgroundColor: withAlpha(theme.accent, 0.06) }}
// //       >
// //         <div
// //           className="mx-auto flex h-12 w-12 items-center justify-center rounded-full"
// //           style={{ backgroundColor: theme.accent, color: "#fff" }}
// //         >
// //           <svg
// //             viewBox="0 0 24 24"
// //             fill="none"
// //             stroke="currentColor"
// //             strokeWidth="2.5"
// //             strokeLinecap="round"
// //             strokeLinejoin="round"
// //             className="h-6 w-6"
// //             aria-hidden="true"
// //           >
// //             <path d="M20 6 9 17l-5-5" />
// //           </svg>
// //         </div>
// //         <p
// //           className="mt-4 text-lg font-semibold"
// //           style={{ color: theme.primary }}
// //         >
// //           Thank You
// //         </p>
// //         <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500">
// //           Your request has been received. Our engineering team will connect with
// //           you to explore the right IPHIPI audio intelligence solution for your
// //           product.
// //         </p>
// //         <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">
// //           Powered by IPHIPI Intelligence
// //         </p>
// //         <button
// //           onClick={() => {
// //             setStatus("idle");
// //             setInterestArea(null);
// //           }}
// //           className="mt-6 text-sm font-medium underline-offset-4 hover:underline"
// //           style={{ color: theme.primary }}
// //         >
// //           Send another request
// //         </button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <form onSubmit={handleSubmit} className="space-y-8">
// //       <div>
// //         <p className="text-sm font-medium text-zinc-700">
// //           I am interested in integrating IPHIPI into
// //         </p>
// //         <div className="mt-3 grid gap-3 sm:grid-cols-3">
// //           {INTEREST_AREAS.map((area) => {
// //             const selected = interestArea === area.value;
// //             return (
// //               <button
// //                 key={area.value}
// //                 type="button"
// //                 onClick={() => setInterestArea(area.value)}
// //                 className="rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200"
// //                 style={{
// //                   borderColor: selected ? theme.accent : "rgb(228 228 231)",
// //                   backgroundColor: selected ? theme.primary : "#fff",
// //                   boxShadow: selected ? `0 0 0 1px ${theme.accent}` : "none",
// //                 }}
// //               >
// //                 <span
// //                   className="block font-semibold"
// //                   style={{ color: selected ? "#fff" : theme.primary }}
// //                 >
// //                   {area.label}
// //                 </span>
// //                 <span
// //                   className="mt-0.5 block text-xs"
// //                   style={{
// //                     color: selected
// //                       ? withAlpha("#ffffff", 0.65)
// //                       : "rgb(161 161 170)",
// //                   }}
// //                 >
// //                   {area.hint}
// //                 </span>
// //               </button>
// //             );
// //           })}
// //         </div>
// //       </div>

// //       {interestArea && (
// //         <>
// //           <div>
// //             <p className="text-sm font-medium text-zinc-700">
// //               Expected Product Category
// //             </p>
// //             <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
// //               {PRODUCT_CATEGORIES.map((cat) => (
// //                 <Chip
// //                   key={cat}
// //                   label={cat}
// //                   checked={productCategories.includes(cat)}
// //                   onChange={() =>
// //                     setProductCategories((prev) => toggleValue(prev, cat))
// //                   }
// //                 />
// //               ))}
// //             </div>
// //           </div>

// //           <div>
// //             <p className="text-sm font-medium text-zinc-700">
// //               Select Technology Requirement
// //             </p>
// //             <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
// //               {TECHNOLOGIES.map((tech) => (
// //                 <Chip
// //                   key={tech}
// //                   label={tech}
// //                   checked={technologies.includes(tech)}
// //                   onChange={() =>
// //                     setTechnologies((prev) => toggleValue(prev, tech))
// //                   }
// //                 />
// //               ))}
// //             </div>
// //           </div>

// //           <div className="grid gap-6 sm:grid-cols-2">
// //             <div>
// //               <label
// //                 htmlFor="companyName"
// //                 className="text-sm font-medium text-zinc-700"
// //               >
// //                 Your Company Name
// //               </label>
// //               <input
// //                 id="companyName"
// //                 name="companyName"
// //                 type="text"
// //                 required
// //                 className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none transition-colors focus:border-current"
// //                 style={{ color: theme.primary }}
// //                 placeholder="e.g. Mivi, boAt, OnePlus"
// //               />
// //             </div>
// //             <div>
// //               <label
// //                 htmlFor="companyEmail"
// //                 className="text-sm font-medium text-zinc-700"
// //               >
// //                 Company Mail ID
// //               </label>
// //               <input
// //                 id="companyEmail"
// //                 name="companyEmail"
// //                 type="email"
// //                 required
// //                 className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none transition-colors focus:border-current"
// //                 style={{ color: theme.primary }}
// //                 placeholder="jane@company.com"
// //               />
// //             </div>
// //           </div>

// //           <div>
// //             <label htmlFor="name" className="text-sm font-medium text-zinc-700">
// //               Name
// //             </label>
// //             <input
// //               id="name"
// //               name="name"
// //               type="text"
// //               required
// //               className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none transition-colors focus:border-current"
// //               style={{ color: theme.primary }}
// //               placeholder="Jane Doe"
// //             />
// //           </div>

// //           {status === "error" && (
// //             <p className="text-sm text-red-600">{errorMessage}</p>
// //           )}

// //           <button
// //             type="submit"
// //             disabled={status === "submitting"}
// //             className="rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
// //             style={{ backgroundColor: theme.primary }}
// //           >
// //             {status === "submitting" ? "Sending..." : "Request Demo"}
// //           </button>
// //         </>
// //       )}
// //     </form>
// //   );
// // }



// "use client";

// import { useState, type FormEvent } from "react";
// import { theme, withAlpha } from "@/lib/theme";

// type Status = "idle" | "submitting" | "success" | "error";

// const INTEREST_AREAS = [
//   {
//     value: "consumer-audio",
//     label: "Consumer Audio",
//     hint: "TWS, OWS, Smart Pendant, Smart Ring, Smart Watch",
//   },
//   {
//     value: "commercial-iot",
//     label: "Commercial & IoT",
//     hint: "Drive-thrus, Kiosks, Smart Home",
//   },
//   {
//     value: "chipset-odm",
//     label: "Chipset/ODM Partnership",
//     hint: "Hardware-level integration",
//   },
// ];

// const CATEGORY_MAP: Record<string, string[]> = {
//   "consumer-audio": ["TWS", "OWS", "Smart Glasses", "Other Wearables"],
//   "commercial-iot": [
//     "Smart Speakers",
//     "Drive-thrus",
//     "Self Service Kiosk",
//     "Commercial Headset",
//     "Smart Home Appliances",
//   ],
//   "chipset-odm": ["Technology Development", "Collaborations"],
// };

// const TECH_MAP: Record<string, string[]> = {
//   "consumer-audio": [
//     "Single Mic Speech Enhancement",
//     "Dual Mic Speech Enhancement",
//     "Keyword Spotting / Wake Word",
//     "Far-Field Speech Enhancement",
//   ],
//   "commercial-iot": ["Wake Word", "Far-Field", "Wake Word + Far-Field"],
//   "chipset-odm": [], // Empty array will hide the technology section
// };

// function toggleValue(list: string[], value: string) {
//   return list.includes(value)
//     ? list.filter((v) => v !== value)
//     : [...list, value];
// }

// const CheckIcon = (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="3"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className="h-3 w-3"
//     aria-hidden="true"
//   >
//     <path d="M20 6 9 17l-5-5" />
//   </svg>
// );

// function Chip({
//   label,
//   checked,
//   onChange,
// }: {
//   label: string;
//   checked: boolean;
//   onChange: () => void;
// }) {
//   return (
//     <label
//       className="flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-3 text-sm transition-all duration-200"
//       style={{
//         borderColor: checked ? theme.accent : "rgb(228 228 231)",
//         backgroundColor: checked ? withAlpha(theme.accent, 0.08) : "#fff",
//         color: checked ? theme.primary : "rgb(63 63 70)",
//       }}
//     >
//       <input
//         type="checkbox"
//         checked={checked}
//         onChange={onChange}
//         className="sr-only"
//       />
//       <span
//         className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-md border transition-colors duration-200"
//         style={{
//           width: 18,
//           height: 18,
//           borderColor: checked ? theme.accent : "rgb(212 212 216)",
//           backgroundColor: checked ? theme.accent : "transparent",
//           color: "#fff",
//         }}
//       >
//         {checked && CheckIcon}
//       </span>
//       <span className="font-medium">{label}</span>
//     </label>
//   );
// }

// export function ContactForm() {
//   const [status, setStatus] = useState<Status>("idle");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [interestArea, setInterestArea] = useState<string | null>(null);
//   const [technologies, setTechnologies] = useState<string[]>([]);
//   const [productCategories, setProductCategories] = useState<string[]>([]);

//   async function handleSubmit(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setStatus("submitting");
//     setErrorMessage("");

//     const form = e.currentTarget;
//     const data = {
//       interestArea,
//       companyName: (form.elements.namedItem("companyName") as HTMLInputElement)
//         .value,
//       companyEmail: (
//         form.elements.namedItem("companyEmail") as HTMLInputElement
//       ).value,
//       name: (form.elements.namedItem("name") as HTMLInputElement).value,
//       technologies,
//       productCategories,
//     };

//     try {
//       const res = await fetch("/api/contact", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       if (!res.ok) {
//         const body = await res.json().catch(() => null);
//         throw new Error(
//           body?.error || "Something went wrong. Please try again."
//         );
//       }

//       setStatus("success");
//       form.reset();
//       setTechnologies([]);
//       setProductCategories([]);
//     } catch (err) {
//       setStatus("error");
//       setErrorMessage(
//         err instanceof Error
//           ? err.message
//           : "Something went wrong. Please try again."
//       );
//     }
//   }

//   if (status === "success") {
//     return (
//       <div
//         className="rounded-2xl p-8 text-center"
//         style={{ backgroundColor: withAlpha(theme.accent, 0.06) }}
//       >
//         <div
//           className="mx-auto flex h-12 w-12 items-center justify-center rounded-full"
//           style={{ backgroundColor: theme.accent, color: "#fff" }}
//         >
//           <svg
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="h-6 w-6"
//             aria-hidden="true"
//           >
//             <path d="M20 6 9 17l-5-5" />
//           </svg>
//         </div>
//         <p
//           className="mt-4 text-lg font-semibold"
//           style={{ color: theme.primary }}
//         >
//           Thank You
//         </p>
//         <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500">
//           Your request has been received. Our engineering team will connect with
//           you to explore the right IPHIPI audio intelligence solution for your
//           product.
//         </p>
//         <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">
//           Powered by IPHIPI Intelligence
//         </p>
//         <button
//           onClick={() => {
//             setStatus("idle");
//             setInterestArea(null);
//           }}
//           className="mt-6 text-sm font-medium underline-offset-4 hover:underline"
//           style={{ color: theme.primary }}
//         >
//           Send another request
//         </button>
//       </div>
//     );
//   }

//   const currentCategories = interestArea ? CATEGORY_MAP[interestArea] : [];
//   const currentTechs = interestArea ? TECH_MAP[interestArea] : [];

//   return (
//     <form onSubmit={handleSubmit} className="space-y-8">
//       <div>
//         <p className="text-sm font-medium text-zinc-700">
//           I am interested in integrating IPHIPI into
//         </p>
//         <div className="mt-3 grid gap-3 sm:grid-cols-3">
//           {INTEREST_AREAS.map((area) => {
//             const selected = interestArea === area.value;
//             return (
//               <button
//                 key={area.value}
//                 type="button"
//                 onClick={() => {
//                   setInterestArea(area.value);
//                   // Reset child selections when switching parent categories
//                   setProductCategories([]);
//                   setTechnologies([]);
//                 }}
//                 className="rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200"
//                 style={{
//                   borderColor: selected ? theme.accent : "rgb(228 228 231)",
//                   backgroundColor: selected ? theme.primary : "#fff",
//                   boxShadow: selected ? `0 0 0 1px ${theme.accent}` : "none",
//                 }}
//               >
//                 <span
//                   className="block font-semibold"
//                   style={{ color: selected ? "#fff" : theme.primary }}
//                 >
//                   {area.label}
//                 </span>
//                 <span
//                   className="mt-0.5 block text-xs"
//                   style={{
//                     color: selected
//                       ? withAlpha("#ffffff", 0.65)
//                       : "rgb(161 161 170)",
//                   }}
//                 >
//                   {area.hint}
//                 </span>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {interestArea && (
//         <>
//           {currentCategories.length > 0 && (
//             <div>
//               <p className="text-sm font-medium text-zinc-700">
//                 Expected Product Category
//               </p>
//               <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
//                 {currentCategories.map((cat) => (
//                   <Chip
//                     key={cat}
//                     label={cat}
//                     checked={productCategories.includes(cat)}
//                     onChange={() =>
//                       setProductCategories((prev) => toggleValue(prev, cat))
//                     }
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           {currentTechs.length > 0 && (
//             <div>
//               <p className="text-sm font-medium text-zinc-700">
//                 Select Technology Requirement
//               </p>
//               <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
//                 {currentTechs.map((tech) => (
//                   <Chip
//                     key={tech}
//                     label={tech}
//                     checked={technologies.includes(tech)}
//                     onChange={() =>
//                       setTechnologies((prev) => toggleValue(prev, tech))
//                     }
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="grid gap-6 sm:grid-cols-2">
//             <div>
//               <label
//                 htmlFor="companyName"
//                 className="text-sm font-medium text-zinc-700"
//               >
//                 Your Company Name
//               </label>
//               <input
//                 id="companyName"
//                 name="companyName"
//                 type="text"
//                 required
//                 className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none transition-colors focus:border-current"
//                 style={{ color: theme.primary }}
//                 placeholder="e.g. Mivi, boAt, OnePlus"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="companyEmail"
//                 className="text-sm font-medium text-zinc-700"
//               >
//                 Company Mail ID
//               </label>
//               <input
//                 id="companyEmail"
//                 name="companyEmail"
//                 type="email"
//                 required
//                 className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none transition-colors focus:border-current"
//                 style={{ color: theme.primary }}
//                 placeholder="jane@company.com"
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="name" className="text-sm font-medium text-zinc-700">
//               Name
//             </label>
//             <input
//               id="name"
//               name="name"
//               type="text"
//               required
//               className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none transition-colors focus:border-current"
//               style={{ color: theme.primary }}
//               placeholder="Jane Doe"
//             />
//           </div>

//           {status === "error" && (
//             <p className="text-sm text-red-600">{errorMessage}</p>
//           )}

//           <button
//             type="submit"
//             disabled={status === "submitting"}
//             className="rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
//             style={{ backgroundColor: theme.primary }}
//           >
//             {status === "submitting" ? "Sending..." : "Request Demo"}
//           </button>
//         </>
//       )}
//     </form>
//   );
// }



"use client";

import { useState, type FormEvent } from "react";
import { theme, withAlpha } from "@/lib/theme";

type Status = "idle" | "submitting" | "success" | "error";

const INTEREST_AREAS = [
  {
    value: "consumer-audio",
    label: "Consumer Audio",
    hint: "TWS, OWS, Smart Pendant, Smart Ring, Smart Watch",
  },
  {
    value: "commercial-iot",
    label: "Commercial & IoT",
    hint: "Drive-thrus, Kiosks, Smart Home",
  },
  {
    value: "chipset-odm",
    label: "Chipset/ODM Partnership",
    hint: "Hardware-level integration",
  },
];

const CATEGORY_MAP: Record<string, string[]> = {
  "consumer-audio": ["TWS", "OWS", "Smart Glasses", "Other Wearables"],
  "commercial-iot": [
    "Smart Speakers",
    "Drive-thrus",
    "Self Service Kiosk",
    "Commercial Headset",
    "Smart Home Appliances",
  ],
  "chipset-odm": ["Technology Development", "Collaborations"],
};

const TECH_MAP: Record<string, string[]> = {
  "consumer-audio": [
    "Single Mic Speech Enhancement",
    "Dual Mic Speech Enhancement",
    "Keyword Spotting / Wake Word",
    "Far-Field Speech Enhancement",
  ],
  "commercial-iot": ["Wake Word", "Far-Field", "Wake Word + Far-Field"],
  "chipset-odm": [], // Empty array will hide the technology section
};

function toggleValue(list: string[], value: string) {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

const CheckIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-3 w-3"
    aria-hidden="true"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

function Chip({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className="flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-3 text-sm transition-all duration-200"
      style={{
        borderColor: checked ? theme.accent : "rgb(228 228 231)",
        backgroundColor: checked ? withAlpha(theme.accent, 0.08) : "#fff",
        color: checked ? theme.primary : "rgb(63 63 70)",
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-md border transition-colors duration-200"
        style={{
          width: 18,
          height: 18,
          borderColor: checked ? theme.accent : "rgb(212 212 216)",
          backgroundColor: checked ? theme.accent : "transparent",
          color: "#fff",
        }}
      >
        {checked && CheckIcon}
      </span>
      <span className="font-medium">{label}</span>
    </label>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  // CHANGED: Initialize with "consumer-audio" instead of null
  const [interestArea, setInterestArea] = useState<string | null>("consumer-audio");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [productCategories, setProductCategories] = useState<string[]>([]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = {
      interestArea,
      companyName: (form.elements.namedItem("companyName") as HTMLInputElement)
        .value,
      companyEmail: (
        form.elements.namedItem("companyEmail") as HTMLInputElement
      ).value,
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      technologies,
      productCategories,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(
          body?.error || "Something went wrong. Please try again."
        );
      }

      setStatus("success");
      form.reset();
      setTechnologies([]);
      setProductCategories([]);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-2xl p-8 text-center"
        style={{ backgroundColor: withAlpha(theme.accent, 0.06) }}
      >
        <div
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full"
          style={{ backgroundColor: theme.accent, color: "#fff" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <p
          className="mt-4 text-lg font-semibold"
          style={{ color: theme.primary }}
        >
          Thank You
        </p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500">
          Your request has been received. Our engineering team will connect with
          you to explore the right IPHIPI audio intelligence solution for your
          product.
        </p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">
          Powered by IPHIPI Intelligence
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setInterestArea("consumer-audio"); // Reset back to default
          }}
          className="mt-6 text-sm font-medium underline-offset-4 hover:underline"
          style={{ color: theme.primary }}
        >
          Send another request
        </button>
      </div>
    );
  }

  const currentCategories = interestArea ? CATEGORY_MAP[interestArea] : [];
  const currentTechs = interestArea ? TECH_MAP[interestArea] : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <p className="text-sm font-medium text-zinc-700">
          I am interested in integrating IPHIPI into
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {INTEREST_AREAS.map((area) => {
            const selected = interestArea === area.value;
            return (
              <button
                key={area.value}
                type="button"
                onClick={() => {
                  setInterestArea(area.value);
                  // Reset child selections when switching parent categories
                  setProductCategories([]);
                  setTechnologies([]);
                }}
                className="rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200"
                style={{
                  borderColor: selected ? theme.accent : "rgb(228 228 231)",
                  backgroundColor: selected ? theme.primary : "#fff",
                  boxShadow: selected ? `0 0 0 1px ${theme.accent}` : "none",
                }}
              >
                <span
                  className="block font-semibold"
                  style={{ color: selected ? "#fff" : theme.primary }}
                >
                  {area.label}
                </span>
                <span
                  className="mt-0.5 block text-xs"
                  style={{
                    color: selected
                      ? withAlpha("#ffffff", 0.65)
                      : "rgb(161 161 170)",
                  }}
                >
                  {area.hint}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {interestArea && (
        <>
          {currentCategories.length > 0 && (
            <div>
              <p className="text-sm font-medium text-zinc-700">
                Expected Product Category
              </p>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {currentCategories.map((cat) => (
                  <Chip
                    key={cat}
                    label={cat}
                    checked={productCategories.includes(cat)}
                    onChange={() =>
                      setProductCategories((prev) => toggleValue(prev, cat))
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {currentTechs.length > 0 && (
            <div>
              <p className="text-sm font-medium text-zinc-700">
                Select Technology Requirement
              </p>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {currentTechs.map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    checked={technologies.includes(tech)}
                    onChange={() =>
                      setTechnologies((prev) => toggleValue(prev, tech))
                    }
                  />
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="companyName"
                className="text-sm font-medium text-zinc-700"
              >
                Your Company Name
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                required
                className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none transition-colors focus:border-current"
                style={{ color: theme.primary }}
                placeholder="e.g. Mivi, boAt, OnePlus"
              />
            </div>
            <div>
              <label
                htmlFor="companyEmail"
                className="text-sm font-medium text-zinc-700"
              >
                Company Mail ID
              </label>
              <input
                id="companyEmail"
                name="companyEmail"
                type="email"
                required
                className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none transition-colors focus:border-current"
                style={{ color: theme.primary }}
                placeholder="jane@company.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="name" className="text-sm font-medium text-zinc-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none transition-colors focus:border-current"
              style={{ color: theme.primary }}
              placeholder="Jane Doe"
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
            style={{ backgroundColor: theme.primary }}
          >
            {status === "submitting" ? "Sending..." : "Request Demo"}
          </button>
        </>
      )}
    </form>
  );
}