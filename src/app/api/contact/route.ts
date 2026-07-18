import { NextResponse } from "next/server";

/* Receives submissions from the contact form. Currently logs them on the
   server — wire this up to an email provider (e.g. Resend, SES) or a CRM
   before launch. */

const INTEREST_AREAS = ["consumer-audio", "commercial-iot", "chipset-odm"];

export async function POST(request: Request) {
  const data = await request.json().catch(() => null);

  if (
    !data ||
    typeof data.interestArea !== "string" ||
    !INTEREST_AREAS.includes(data.interestArea) ||
    typeof data.companyName !== "string" ||
    !data.companyName.trim() ||
    typeof data.companyEmail !== "string" ||
    !data.companyEmail.includes("@") ||
    typeof data.name !== "string" ||
    !data.name.trim() ||
    !Array.isArray(data.technologies) ||
    data.technologies.length === 0 ||
    !Array.isArray(data.productCategories) ||
    data.productCategories.length === 0
  ) {
    return NextResponse.json(
      {
        error:
          "Please select an interest area, fill in your company details, and pick at least one technology and product category.",
      },
      { status: 400 }
    );
  }

  console.log("[contact] new demo request:", {
    interestArea: data.interestArea,
    companyName: data.companyName,
    companyEmail: data.companyEmail,
    name: data.name,
    technologies: data.technologies,
    productCategories: data.productCategories,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
