"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "resumeEditPassword";

/**
 * The edit session for `/`.
 *
 * DECISION(fe-structure): this is a hook in `app/_lib`, instantiated EXACTLY
 * ONCE in `app/page.tsx`, and its pieces are passed down as props.
 *
 * Why not `shared/lib`: that barrel is contractually domain-free ("no resume
 * knowledge"), and this knows the `/api/resume/verify` endpoint by name.
 * Why not `entities/resume`: an auth session is not a shape of the resume.
 * Why not a React context: the header, the editor and the save call are all
 * children of one page that already composes them — a provider would add a
 * layer to avoid three props. If the header ever moves into a layout above the
 * page, promote this to a context then, not before.
 * Why not two independent `useResumeAuth()` calls (header + page): each call
 * makes its own `useState`, so the header would sign in and the page would
 * never hear about it. ONE OWNER. This is the trap; do not fall into it.
 *
 * Auth mechanics are unchanged from the old /edit route: POST the password to
 * /api/resume/verify (which sets an httpOnly cookie), keep the plaintext in
 * sessionStorage so a reload re-authenticates silently, and keep it in memory
 * because PUT/POST still send it as `x-edit-password`.
 */
export interface ResumeAuth {
  /** True once the password has been accepted by the server. */
  authed: boolean;
  /** True during the silent session re-auth on first mount. Render the header, but not the signed-in controls, until this is false. */
  checking: boolean;
  /** Needed by the save and photo-upload calls as the `x-edit-password` header. */
  password: string;
  /** True while a sign-in request is in flight. */
  signingIn: boolean;
  /** Set after a rejected password, cleared on the next attempt. */
  error: string;
  /** Resolves true on success. Persists the password and flips `authed`. */
  signIn: (password: string) => Promise<boolean>;
  /**
   * Clears the session on BOTH sides: memory + sessionStorage here, and the
   * httpOnly cookie via `DELETE /api/resume/verify`.
   *
   * GAP CLOSED(ui-ux): this used to clear the client only, so for up to 8h
   * after "Sign out" this browser could still GET/PUT the API directly — the
   * UI was signed out, the server was not. The DELETE branch was added to
   * verify/route.ts for exactly this.
   *
   * Returns void, not a promise: the local state flips synchronously so the UI
   * is signed out immediately, and the cookie request is fire-and-forget. If it
   * fails the user is no worse off than before this call existed.
   */
  signOut: () => void;
}

async function verify(pw: string): Promise<boolean> {
  try {
    const res = await fetch("/api/resume/verify", {
      method: "POST",
      headers: { "x-edit-password": pw },
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function useResumeAuth(): ResumeAuth {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState("");

  // Silent re-auth from a password saved earlier this session.
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setChecking(false);
      return;
    }
    let alive = true;
    verify(saved).then((ok) => {
      if (!alive) return;
      if (ok) {
        setPassword(saved);
        setAuthed(true);
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
      setChecking(false);
    });
    return () => {
      alive = false;
    };
  }, []);

  const signIn = useCallback(async (pw: string) => {
    setError("");
    setSigningIn(true);
    const ok = await verify(pw);
    setSigningIn(false);
    if (ok) {
      sessionStorage.setItem(STORAGE_KEY, pw);
      setPassword(pw);
      setAuthed(true);
    } else {
      setError("Incorrect password.");
    }
    return ok;
  }, []);

  const signOut = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setPassword("");
    setAuthed(false);
    setError("");
    // Expire the httpOnly cookie server-side. Not awaited: the UI must not sit
    // in a half-signed-out state waiting on a network round trip, and a failure
    // here leaves exactly the old behaviour rather than a broken one.
    void fetch("/api/resume/verify", { method: "DELETE" }).catch(() => {});
  }, []);

  return { authed, checking, password, signingIn, error, signIn, signOut };
}
