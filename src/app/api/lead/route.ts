import { createRateLimiter, clientIpFrom } from "@/lib/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_FIELD_LENGTH = 200;

// A real visitor submits the demo form once; 5/min per IP stops floods
// into the webhook pipeline without ever touching a legitimate user.
const limiter = createRateLimiter({ limit: 5, windowMs: 60_000 });

interface LeadPayload {
  name: string;
  club: string;
  email: string;
}

function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, MAX_FIELD_LENGTH);
}

function validate(body: Record<string, unknown>): LeadPayload | null {
  const name = sanitize(body.name);
  const club = sanitize(body.club);
  const email = sanitize(body.email);

  if (!name || !club || !email) return null;
  if (!EMAIL_RE.test(email)) return null;

  return { name, club, email };
}

export async function POST(request: Request) {
  const rate = limiter.check(clientIpFrom(request.headers));
  if (!rate.allowed) {
    return Response.json(
      { ok: false, error: "Too many requests. Please try again in a minute." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds) } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field
  if (sanitize(body.company_website)) {
    return Response.json({ ok: true });
  }

  const lead = validate(body);
  if (!lead) {
    return Response.json(
      { ok: false, error: "Please fill in all fields with a valid email." },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (!webhookUrl) {
    // Webhook not configured yet — accept the lead so the UX works,
    // and log it server-side so nothing is silently lost.
    console.warn("[lead] LEAD_WEBHOOK_URL not set. Lead received:", lead);
    return Response.json({ ok: true, forwarded: false });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: lead.name,
        organization: lead.club,
        email: lead.email,
        source: "sportech.com.sa",
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      // Never fail a prospect because of internal plumbing: log the lead so
      // it isn't lost (e.g. n8n workflow deactivated) and accept the submit.
      console.error("[lead] Webhook responded with status", res.status, "— lead:", lead);
      return Response.json({ ok: true, forwarded: false });
    }

    return Response.json({ ok: true, forwarded: true });
  } catch (error: unknown) {
    console.error("[lead] Webhook delivery failed:", error, "— lead:", lead);
    return Response.json({ ok: true, forwarded: false });
  }
}
