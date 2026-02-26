import "server-only";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;

  return NextResponse.json({
    ok: true,
    hasUrl,
    hasServiceKey,
    // never return actual values
  });
}