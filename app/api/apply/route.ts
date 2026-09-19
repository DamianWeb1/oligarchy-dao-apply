import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { ok: false, message: "Membership applications are closed." },
    { status: 403 },
  );
}
