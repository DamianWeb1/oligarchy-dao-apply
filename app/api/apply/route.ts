import { NextResponse } from "next/server";
type Payload = { name?: string; email?: string; xUsername?: string; discordUsername?: string; contribution?: string; reason?: string; followedX?: boolean; likedPost?: boolean; repostedPost?: boolean; website?: string };
const clean = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  try {
    const alreadyApplied = request.headers.get("cookie")?.split(";").some((cookie) => cookie.trim() === "oligarchydao_applied=1");
    if (alreadyApplied) return NextResponse.json({ ok: false, message: "An application has already been submitted from this browser." }, { status: 409 });
    const body = await request.json() as Payload;
    if (body.website) return NextResponse.json({ ok: true });
    const entry = { id: crypto.randomUUID(), name: clean(body.name, 100), email: clean(body.email, 180).toLowerCase(), xUsername: clean(body.xUsername, 60).replace(/^@/, "").toLowerCase(), discordUsername: clean(body.discordUsername, 80).toLowerCase(), contribution: clean(body.contribution, 400), reason: clean(body.reason, 800), followedX: body.followedX === true, likedPost: body.likedPost === true, repostedPost: body.repostedPost === true, createdAt: new Date().toISOString() };
    if (!entry.name || !entry.email.includes("@") || !entry.xUsername || !entry.discordUsername || !entry.contribution || entry.reason.length < 20 || !entry.followedX || !entry.likedPost || !entry.repostedPost) return NextResponse.json({ ok: false, message: "Complete every field and confirm all three tasks." }, { status: 400 });
    if (entry.contribution.length > 100 || entry.reason.length > 100) return NextResponse.json({ ok: false, message: "Keep both written answers to 100 characters or fewer." }, { status: 400 });
    const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (!sheetsUrl) return NextResponse.json({ ok: false, message: "Applications are temporarily unavailable." }, { status: 503 });
    const sync = await fetch(sheetsUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(entry),
      cache: "no-store",
    });
    if (!sync.ok) throw new Error(`Google Sheets returned ${sync.status}`);
    const response = NextResponse.json({ ok: true, id: entry.id });
    response.cookies.set("oligarchydao_applied", "1", { httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 365, path: "/" });
    return response;
  } catch (error) { console.error("application submission failed", error); return NextResponse.json({ ok: false, message: "We could not save your application. Please try again." }, { status: 500 }); }
}
