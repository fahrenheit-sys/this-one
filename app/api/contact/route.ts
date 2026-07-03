import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  reason?: string;
  message: string;
};

function isValidPayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.firstName === "string" &&
    b.firstName.trim().length > 0 &&
    typeof b.lastName === "string" &&
    b.lastName.trim().length > 0 &&
    typeof b.email === "string" &&
    /\S+@\S+\.\S+/.test(b.email) &&
    typeof b.message === "string" &&
    b.message.trim().length > 0
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "Missing or invalid fields." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;

  if (!apiKey || !to) {
    console.error("Contact form submitted but RESEND_API_KEY or CONTACT_EMAIL is not set.", body);
    return NextResponse.json(
      { error: "Contact form is not configured yet. Please try again later." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "WineQ.ai Contact Form <onboarding@resend.dev>",
    to,
    replyTo: body.email,
    subject: `New contact form submission from ${body.firstName} ${body.lastName}`,
    text: [
      `Name: ${body.firstName} ${body.lastName}`,
      `Email: ${body.email}`,
      `Phone: ${body.phone || "-"}`,
      `Company: ${body.company || "-"}`,
      `How can we assist you: ${body.reason || "-"}`,
      "",
      body.message,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
