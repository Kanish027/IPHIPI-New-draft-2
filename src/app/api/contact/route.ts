import { NextResponse } from "next/server";

/* Receives submissions from the contact form. Currently logs them on the
   server — wire this up to an email provider (e.g. Resend, SES) or a CRM
   before launch. */

export async function POST(request: Request) {
  const data = await request.json().catch(() => null);

  if (
    !data ||
    typeof data.name !== "string" ||
    !data.name.trim() ||
    typeof data.email !== "string" ||
    !data.email.includes("@") ||
    typeof data.message !== "string" ||
    !data.message.trim()
  ) {
    return NextResponse.json(
      { error: "Please fill in your name, a valid email, and a message." },
      { status: 400 }
    );
  }

  console.log("[contact] new submission:", {
    name: data.name,
    email: data.email,
    company: data.company || "(none)",
    message: data.message,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
