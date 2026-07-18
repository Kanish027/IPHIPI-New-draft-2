"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const INTEREST_AREAS = [
  { value: "consumer-audio", label: "Consumer Audio", hint: "TWS, OWS, Pendants" },
  { value: "commercial-iot", label: "Commercial & IoT", hint: "Drive-thrus, Kiosks, Smart Home" },
  { value: "chipset-odm", label: "Chipset/ODM Partnership", hint: "Hardware-level integration" },
];

const TECHNOLOGIES = [
  "Single Mic Speech Enhancement",
  "Dual Mic Speech Enhancement",
  "Keyword Spotting / Wake Word",
  "Far-Field Speech Enhancement",
];

const PRODUCT_CATEGORIES = ["TWS", "OWS", "Smart Glasses", "Other Wearables"];

function toggleValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [interestArea, setInterestArea] = useState<string | null>(null);
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [productCategories, setProductCategories] = useState<string[]>([]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = {
      interestArea,
      companyName: (form.elements.namedItem("companyName") as HTMLInputElement).value,
      companyEmail: (form.elements.namedItem("companyEmail") as HTMLInputElement).value,
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
        throw new Error(body?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
      setTechnologies([]);
      setProductCategories([]);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl bg-zinc-50 p-8">
        <p className="text-lg font-medium">Thank You</p>
        <p className="mt-2 text-sm text-zinc-500">
          Your request has been received. Our engineering team will connect with you to
          explore the right IPHIPI audio intelligence solution for your product.
        </p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">
          Powered by IPHIPI Intelligence
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setInterestArea(null);
          }}
          className="mt-6 text-sm font-medium underline-offset-4 hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <p className="text-sm font-medium text-zinc-700">
          I am interested in integrating IPHIPI into
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {INTEREST_AREAS.map((area) => (
            <button
              key={area.value}
              type="button"
              onClick={() => setInterestArea(area.value)}
              className={`rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                interestArea === area.value
                  ? "border-zinc-950 bg-zinc-950 text-white"
                  : "border-zinc-200 hover:border-zinc-400"
              }`}
            >
              <span className="block font-medium">{area.label}</span>
              <span
                className={`mt-0.5 block text-xs ${
                  interestArea === area.value ? "text-zinc-300" : "text-zinc-400"
                }`}
              >
                {area.hint}
              </span>
            </button>
          ))}
        </div>
      </div>

      {interestArea && (
        <>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="companyName" className="text-sm font-medium text-zinc-700">
                Your Company Name
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                required
                className="mt-2 w-full rounded-lg border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-950"
                placeholder="e.g. Mivi, boAt, OnePlus"
              />
            </div>
            <div>
              <label htmlFor="companyEmail" className="text-sm font-medium text-zinc-700">
                Company Mail ID
              </label>
              <input
                id="companyEmail"
                name="companyEmail"
                type="email"
                required
                className="mt-2 w-full rounded-lg border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-950"
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
              className="mt-2 w-full rounded-lg border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-950"
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-zinc-700">Select Technology Requirement</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {TECHNOLOGIES.map((tech) => (
                <label
                  key={tech}
                  className="flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-700"
                >
                  <input
                    type="checkbox"
                    checked={technologies.includes(tech)}
                    onChange={() => setTechnologies((prev) => toggleValue(prev, tech))}
                    className="h-4 w-4 rounded border-zinc-300"
                  />
                  {tech}
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-zinc-700">Expected Product Category</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {PRODUCT_CATEGORIES.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-700"
                >
                  <input
                    type="checkbox"
                    checked={productCategories.includes(cat)}
                    onChange={() => setProductCategories((prev) => toggleValue(prev, cat))}
                    className="h-4 w-4 rounded border-zinc-300"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {status === "error" && <p className="text-sm text-red-600">{errorMessage}</p>}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="rounded-lg bg-zinc-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-50"
          >
            {status === "submitting" ? "Sending..." : "Request Demo"}
          </button>
        </>
      )}
    </form>
  );
}
