"use client";

import { useState, type FormEvent } from "react";
import { Button, Field } from "@/shared/ui";

export interface SignInPopoverProps {
  /** `ResumeAuth.signIn`. Resolves false on a bad password — the panel stays open. */
  onSignIn: (password: string) => Promise<boolean>;
  /** Request in flight: the field and the button both lock. */
  signingIn: boolean;
  /** `ResumeAuth.error`. Only shown after a submit from THIS panel. */
  signInError: string;
  /** Called on success, on Cancel, and by the parent for Escape / click-outside. */
  onClose: () => void;
}

/**
 * The password prompt, anchored under the header's own "Sign in" button.
 *
 * REPLACES(fe-structure) the deleted full-screen `PasswordGate`. `/` is public:
 * a gate that covers the resume to ask the owner for a password is hostile to
 * the 99% of visitors who are just reading it. Signing in is a side quest, so
 * it gets a popover, not the page.
 *
 * Internal to this slice, deliberately NOT in the barrel — a popover positioned
 * against this header's button has no second consumer.
 *
 * The password lives here rather than in `SiteHeader` so that closing the panel
 * unmounts it and the plaintext is gone. Escape, click-outside and focus return
 * are owned by `SiteHeader`, which owns the `open` flag and the trigger ref.
 */
export function SignInPopover({
  onSignIn,
  signingIn,
  signInError,
  onClose,
}: SignInPopoverProps) {
  const [password, setPassword] = useState("");
  // The hook's `error` survives the popover being closed and reopened. Gating on
  // a local "we have actually tried" flag stops a stale "Incorrect password."
  // greeting the user the next time they open it.
  const [attempted, setAttempted] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (signingIn || !password) return;
    setAttempted(true);
    const ok = await onSignIn(password);
    if (ok) {
      setPassword("");
      onClose();
    }
  }

  const error = attempted && !signingIn ? signInError : "";

  return (
    <div
      role="dialog"
      aria-label="Sign in to edit"
      className="absolute right-0 top-[calc(100%+10px)] z-50 w-[min(280px,calc(100vw-32px))] rounded-xl border border-lightgray bg-light p-md shadow-lg"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-sm">
        <p className="text-clamp-sm font-semibold text-dark">Sign in to edit</p>
        <Field
          label="Edit password"
          type="password"
          value={password}
          onChange={setPassword}
          error={error}
          required
          autoFocus
          autoComplete="current-password"
        />
        <div className="mt-xs flex items-center justify-end gap-xs">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={signingIn || password.length === 0}
          >
            {signingIn ? "Signing in…" : "Sign in"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignInPopover;
