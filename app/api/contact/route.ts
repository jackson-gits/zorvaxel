import { NextResponse } from "next/server";
import { Resend } from "resend";
import { enquirySchema } from "@/lib/contact-schema";
import { createRateLimiter } from "@/lib/rate-limit";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16 * 1024;

const contactRateLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  maxRequests: 5,
});

function isValidIp(ip: string): boolean {
  const trimmed = ip.trim();
  const ipv4Regex =
    /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;
  if (ipv4Regex.test(trimmed)) return true;
  const ipv6Regex = /^[0-9a-fA-F:]+$/;
  return trimmed.includes(":") && ipv6Regex.test(trimmed);
}

function isPrivateOrLoopbackIp(ip: string): boolean {
  const trimmed = ip.trim().toLowerCase();
  if (trimmed === "127.0.0.1" || trimmed === "::1" || trimmed === "localhost") {
    return true;
  }
  if (
    trimmed.startsWith("10.") ||
    trimmed.startsWith("192.168.") ||
    trimmed.startsWith("169.254.")
  ) {
    return true;
  }
  const match172 = trimmed.match(/^172\.(\d+)\./);
  if (match172) {
    const octet = Number(match172[1]);
    if (octet >= 16 && octet <= 31) return true;
  }
  if (trimmed.startsWith("fc") || trimmed.startsWith("fd") || trimmed.startsWith("fe80:")) {
    return true;
  }
  return false;
}

export function getClientIp(request: Request): string {
  // 1. Direct trusted headers from CDNs / reverse proxies that overwrite or set client IP at the edge
  const cfConnectingIp = request.headers.get("cf-connecting-ip")?.trim();
  if (cfConnectingIp && isValidIp(cfConnectingIp)) return cfConnectingIp;

  const trueClientIp = request.headers.get("true-client-ip")?.trim();
  if (trueClientIp && isValidIp(trueClientIp)) return trueClientIp;

  const vercelForwardedFor = request.headers.get("x-vercel-forwarded-for")?.trim();
  if (vercelForwardedFor) {
    const firstVercel = vercelForwardedFor.split(",")[0]?.trim();
    if (firstVercel && isValidIp(firstVercel)) return firstVercel;
  }

  const xRealIp = request.headers.get("x-real-ip")?.trim();
  if (xRealIp && isValidIp(xRealIp)) return xRealIp;

  // 2. Standard X-Forwarded-For header
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const parts = forwardedFor
      .split(",")
      .map((part) => part.trim())
      .filter((part) => isValidIp(part));

    if (parts.length > 0) {
      const mode = process.env.RATE_LIMIT_IP_MODE?.toLowerCase();
      if (mode === "last") {
        return parts.at(-1)!;
      }
      if (mode === "first") {
        return parts[0];
      }

      // Default strategy: In standard proxy chains (<client>, <proxy1>, <proxy2>),
      // filter out internal loopback/private infrastructure IPs and return the first valid public IP.
      const publicIps = parts.filter((ip) => !isPrivateOrLoopbackIp(ip));
      if (publicIps.length > 0) {
        return publicIps[0];
      }
      return parts[0];
    }
  }

  return "unknown";
}

async function readJsonWithLimit<T = unknown>(
  request: Request,
  maxBytes: number,
): Promise<{ ok: true; data: T } | { ok: false; status: 400 | 413 }> {
  const contentLength = request.headers.get("content-length");
  if (contentLength) {
    const parsedLength = Number(contentLength);
    if (!Number.isFinite(parsedLength) || parsedLength < 0) {
      return { ok: false, status: 400 };
    }
    if (parsedLength > maxBytes) {
      return { ok: false, status: 413 };
    }
  }

  if (!request.body) {
    return { ok: true, data: {} as T };
  }

  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let receivedBytes = 0;
  const chunks: string[] = [];

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        receivedBytes += value.byteLength;
        if (receivedBytes > maxBytes) {
          // Immediately cancel the stream to stop consuming memory and network
          await reader.cancel();
          return { ok: false, status: 413 };
        }
        chunks.push(decoder.decode(value, { stream: true }));
      }
    }
    chunks.push(decoder.decode());
  } catch {
    return { ok: false, status: 400 };
  }

  const rawBody = chunks.join("").trim();
  if (!rawBody) {
    return { ok: true, data: {} as T };
  }

  try {
    const data = JSON.parse(rawBody);
    return { ok: true, data };
  } catch {
    return { ok: false, status: 400 };
  }
}

export async function POST(request: Request) {
  const bodyResult = await readJsonWithLimit(request, MAX_BODY_BYTES);
  if (!bodyResult.ok) {
    return NextResponse.json(
      { message: SITE.contactPage.noScriptError },
      { status: bodyResult.status },
    );
  }
  const body = bodyResult.data;

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

  // Rate limiting:
  // 1. Rate limit by client IP
  const ip = getClientIp(request);
  const ipLimit = await contactRateLimiter.check(`ip:${ip}`);
  if (ipLimit.limited) {
    return NextResponse.json(
      { message: SITE.contactPage.rateLimitError },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.max(1, Math.ceil((ipLimit.resetAt - Date.now()) / 1000))),
        },
      },
    );
  }

  // 2. Rate limit by normalized submission email to protect against distributed/spoofed IP flooding
  const emailKey = `email:${parsed.data.email.trim().toLowerCase()}`;
  const emailLimit = await contactRateLimiter.check(emailKey);
  if (emailLimit.limited) {
    return NextResponse.json(
      { message: SITE.contactPage.rateLimitError },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.max(1, Math.ceil((emailLimit.resetAt - Date.now()) / 1000))),
        },
      },
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
