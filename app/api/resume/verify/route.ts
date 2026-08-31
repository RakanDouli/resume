import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "../_auth";

export async function POST(req: NextRequest) {
  const password = req.headers.get("x-edit-password");
  const expected = process.env.RESUME_EDIT_PASSWORD;
  const ok = Boolean(expected) && password === expected;

  const res = NextResponse.json({ ok }, { status: ok ? 200 : 401 });

  if (ok) {
    // Server-side proof of auth: without this, GET /api/resume was reachable
    // by anyone, password or not — the client only *hid* the edit UI.
    res.cookies.set(COOKIE_NAME, expected as string, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });
  }

  return res;
}

/**
 * Sign out: expire the httpOnly cookie POST set.
 *
 * ADDED(ui-ux), closing the gap `useResumeAuth.signOut` documented — clearing
 * sessionStorage only signed the UI out, while this browser stayed authorised
 * against GET/PUT /api/resume for the remaining 8 hours of the cookie.
 *
 * Deliberately requires no authorisation: it can only expire the caller's own
 * cookie, it grants nothing, and demanding the password to log out would leave
 * a user who has forgotten it stuck in an authorised session. Every attribute
 * below mirrors the `set` above — a cookie is only overwritten when name, path
 * and domain all match.
 */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}
