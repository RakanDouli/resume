import type { NextRequest } from "next/server";

/**
 * Single source of truth for edit authorisation.
 *
 * DECISION(fe-structure): `isAuthorized` used to be a private function inside
 * `route.ts`, and `COOKIE_NAME` was imported *out of* `verify/route.ts`.
 * Exporting non-HTTP symbols from a route module is fragile, and with a third
 * route arriving (`photo/route.ts`) the real risk was a second, slightly
 * different copy of the check — which is exactly how an auth gate gets
 * weakened. One implementation, three importers.
 *
 * Underscore-prefixed and not named `route.ts`, so the App Router ignores it.
 *
 * The logic below is byte-identical to the original. Do not relax it: both the
 * header and the cookie are checked against `RESUME_EDIT_PASSWORD`, and an
 * unset env var denies everyone.
 */
export const COOKIE_NAME = "resume_edit_auth";

export function isAuthorized(req: NextRequest): boolean {
  const expected = process.env.RESUME_EDIT_PASSWORD;
  if (!expected) return false;
  const password = req.headers.get("x-edit-password");
  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  return password === expected || cookie === expected;
}
