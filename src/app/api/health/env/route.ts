import "server-only";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
  const ok = hasUrl && hasServiceKey;

  return NextResponse.json({
    ok,
    hasUrl,
    hasServiceKey,
    // never return actual values
  }, { status: ok ? 200 : 500 });
}
