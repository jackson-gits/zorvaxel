import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/lib/site";
import { enquirySchema } from "@/lib/contact-schema";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const submissions = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(ip: string, now = Date.now()): boolean {
  for (const [key, bucket] of submissions) {
    if (bucket.expiresAt <= now) submissions.delete(key);
  }

  if (submissions.size > 10_000) submissions.clear();
  const current = submissions.get(ip);
  if (!current || current.expiresAt <= now) {
    submissions.set(ip, { count: 1, expiresAt: now + WINDOW_MS });
    return false;
  }
  if (current.count >= MAX_REQUESTS) return true;
  submissions.set(ip, { ...current, count: current.count + 1 });
  return false;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: SITE.contactPage.noScriptError },
      { status: 400 },
    );
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: SITE.contactPage.noScriptError, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // Silently accept bot submissions without sending an email.
  if (parsed.data.website?.trim()) {
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: SITE.contactPage.rateLimitError },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_TO_EMAIL?.trim();
  if (!apiKey || !recipient) {
    return NextResponse.json(
      { message: SITE.contactPage.serviceUnavailable },
      { status: 503 },
    );
  }

  const { name, phone, email, service, quantity, message } = parsed.data;
  const resend = new Resend(apiKey);
  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    `${SITE.name} enquiries <onboarding@resend.dev>`;

  try {
    const { error } = await resend.emails.send({
      from,
      to: [recipient],
      replyTo: email,
      subject: `New serum enquiry: ${name.replace(/[\r\n]+/g, " ").slice(0, 100)}`,
      text: [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Service: ${service}`,
        `Expected quantity: ${quantity}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      return NextResponse.json(
        { message: SITE.contactPage.formError },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      { message: SITE.contactPage.formError },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
