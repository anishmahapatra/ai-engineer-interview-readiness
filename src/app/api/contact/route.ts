import { NextResponse } from "next/server";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  role?: unknown;
  message?: unknown;
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

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const role = typeof body.role === "string" ? body.role.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

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

  console.log("New contact submission", { name, email, role, message });

  return NextResponse.json({ success: true }, { status: 200 });
}
