import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase/server";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  role?: unknown;
  message?: unknown;
  company?: unknown;
  client_timezone?: unknown;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { success: false, error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const role = typeof body.role === "string" ? body.role.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const company = String(body.company ?? "").trim();
  const clientTimezone =
    typeof body.client_timezone === "string" ? body.client_timezone.trim() : "";

  if (company) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  if (!email) {
    return NextResponse.json(
      { success: false, error: "Email is required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { success: false, error: "Enter a valid email address." },
      { status: 400 }
    );
  }

  const country = request.headers.get("x-vercel-ip-country") ?? "";
  const region = request.headers.get("x-vercel-ip-region") ?? "";
  const city = request.headers.get("x-vercel-ip-city") ?? "";
  const forwardedFor = request.headers.get("x-forwarded-for") ?? "";
  const ipAddress = forwardedFor.split(",")[0]?.trim() ?? "";
  const userAgent = request.headers.get("user-agent") ?? "";
  const referrer = request.headers.get("referer") ?? "";

  const url = new URL(request.url);
  const utmSource = url.searchParams.get("utm_source") ?? "";
  const utmMedium = url.searchParams.get("utm_medium") ?? "";
  const utmCampaign = url.searchParams.get("utm_campaign") ?? "";
  const utmTerm = url.searchParams.get("utm_term") ?? "";
  const utmContent = url.searchParams.get("utm_content") ?? "";

  if (ipAddress) {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();

    const { count, error: rateError } = await supabaseAdmin
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("ip_address", ipAddress)
      .gte("created_at", tenMinutesAgo);

    if (rateError) {
      console.error("Rate limit check failed:", rateError);
      return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
    }

    if ((count ?? 0) >= 5) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }
  }

  const { error } = await supabaseAdmin
    .schema("public")
    .from("leads")
    .insert({
      name,
      email,
      role,
      message,
      country,
      region,
      city,
      ip_address: ipAddress,
      user_agent: userAgent,
      referrer,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_term: utmTerm,
      utm_content: utmContent,
      client_timezone: clientTimezone,
    });

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
