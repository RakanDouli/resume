"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import type { SiteHeaderProps } from "./types";
import { SignInPopover } from "./SignInPopover";

/**
 * The floating pill header.
 *
 * It FLOATS: `fixed` with an inset on every side, so page background is visible
 * all the way around it and the resume scrolls underneath through the blur.
 * `pointer-events-none` on the fixed strip + `pointer-events-auto` on the pill
 * means the gutters either side of the pill do not swallow clicks meant for the
 * resume behind them.
 *
 * Fully controlled (see ./types.ts). The only state it owns is whether the
 * sign-in popover is open — that dies with the popover and nobody else reads it.
 *
 * WHITE-BAR RESTYLE(fe-theme correction 2). This bar was near-black
 * (`bg-dark/85`) for one pass; the user has since asked for it to be WHITE.
 * The shape and behaviour are untouched — still `rounded-full` at every width,
 * still floating on an inset, still translucent + `backdrop-blur-md` so the
 * resume slides visibly underneath it, still left / middle / right. Only the
 * colour layer changed, and every dark-bar-specific treatment was re-derived:
 *
 *  - the bar is `bg-light/85` and, because `bodyBg` is ALSO pure white now
 *    (correction 1), it has no tonal separation from the page at all. It is
 *    defined exclusively by `ring-1 ring-lightgray` + `shadow-lg`, the same
 *    border-and-shadow treatment that separates the resume card.
 *  - focus rings went back to `ring-primary` with a white offset. The dark bar
 *    needed `ring-light`/`ring-offset-dark`; on white that is a white ring on a
 *    white background, i.e. no focus indicator at all.
 *  - the inactive Classic theme dot lost its `ring-1 ring-inset ring-light`.
 *    That rim existed only because navy #0F172A measured 1.03:1 on near-black.
 *    On white the same navy is 17.85:1 and the rim would read as a defect.
 *  - the segmented groups (EN/NL, Basic/Classic/Modern) are light tracks with a
 *    lifted white active chip; the translucent-white tracks and `text-light/70`
 *    labels of the dark bar would have been invisible here.
 *  - `primary` survives in exactly one place: the Sign in / Edit action pill.
 *    It is deliberately the only saturated fill in the bar, which is why the
 *    active segment is a white chip with a `text-primary` LABEL rather than a
 *    second `bg-primary` fill competing with the real action.
 */

/**
 * Same focus treatment on every control in the bar.
 *
 * CONTRAST(fe-theme): indigo #4F46E5 ring on the white bar is 6.29:1, and the
 * white `ring-offset-light` gap separates it from whatever the control's own
 * fill is (including the `bg-primary` action pill, where the offset is what
 * keeps the ring from merging into the button).
 */
const FOCUS =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-light";

/**
 * Brand-primary action pill. 40px tall so it is a legal touch target.
 *
 * CONTRAST(fe-theme correction 2), for the `bg-primary text-light` pill on the
 * WHITE bar: the white LABEL on indigo #4F46E5 is 6.29:1 (AA at any size, and
 * these render at `text-clamp-xs`, 10-12px). The pill FILL against the white
 * bar is 6.29:1 too — the dark bar only managed 2.77:1 there, so the move to
 * white fixed 1.4.11 for the fill as well as the label. Violet #7C3AED would
 * be 5.70:1 on both; indigo keeps the headroom at 10px type.
 */
export const ACTION_PILL = `inline-flex h-10 items-center justify-center gap-xs rounded-full px-md text-clamp-xs font-semibold whitespace-nowrap transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 ${FOCUS}`;

function initialsOf(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

export function SiteHeader({
  name,
  authed,
  checkingAuth,
  onSignIn,
  signingIn,
  signInError,
  onSignOut,
  action,
}: SiteHeaderProps) {
  const [signInOpen, setSignInOpen] = useState(false);
  const authAreaRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  // Focus target once sign-in succeeds and the trigger button unmounts. Sign
  // out is the one control guaranteed to exist regardless of what `action`
  // is — the header can't ref into an opaque slot it doesn't own the markup
  // of, so it can't land focus on `action` itself.
  const signOutRef = useRef<HTMLButtonElement>(null);
  /**
   * True while a sign-in the user STARTED from this popover is outstanding.
   * Needed because a successful sign-in unmounts the trigger button — focus
   * would land on `<body>` if we just tried to restore it. It must not fire for
   * the silent session re-auth on page load, which also flips `authed` but
   * where stealing focus would be hostile.
   */
  const signInFromPopover = useRef(false);

  const toggleSignIn = useCallback(() => {
    setSignInOpen((open) => {
      signInFromPopover.current = !open;
      return !open;
    });
  }, []);

  // Closing always returns focus to the button that opened it, so a keyboard
  // user is never dumped back at the top of the document.
  const closeSignIn = useCallback(() => {
    signInFromPopover.current = false;
    setSignInOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!signInOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSignIn();
    };
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (authAreaRef.current?.contains(e.target as Node)) return;
      // Dismissed by clicking elsewhere: focus should follow that click, not be
      // yanked back to the trigger.
      signInFromPopover.current = false;
      setSignInOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [signInOpen, closeSignIn]);

  // Success tears the popover down, and with it the button that was focused.
  // Hand focus to the control that took its place so the keyboard user lands on
  // the obvious next action instead of at the top of the document.
  useEffect(() => {
    if (!authed) return;
    setSignInOpen(false);
    if (signInFromPopover.current) {
      signInFromPopover.current = false;
      signOutRef.current?.focus();
    }
  }, [authed]);

  const initials = initialsOf(name);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-xs pt-sm sm:px-md sm:pt-md print:hidden">
      <div
        className={[
          "pointer-events-auto mx-auto flex w-full max-w-[1000px] items-center gap-xs",
          // rounded-full, always: this is a pill, not a rounded rectangle.
          "rounded-full p-[4px] sm:gap-sm sm:pl-sm sm:pr-[5px]",
          // WHITE, translucent, blurred — the resume shows through it.
          // `bodyBg` is pure white too, so the ring and the shadow are the ONLY
          // things making this read as a floating object rather than a hole in
          // the page. Neither is optional. `shadow-lg` (and not `shadow-md`,
          // which the resume card uses) is deliberate: the bar hovers OVER the
          // page, the card lies ON it.
          "bg-light/85 shadow-lg ring-1 ring-lightgray backdrop-blur-md",
          // Last-resort guard for very narrow phones: wrap onto a second row
          // rather than push controls off the side of the viewport.
          "flex-wrap justify-center",
        ].join(" ")}
      >
        {/* LEFT — owner mark. Derived from the live resume name, never hardcoded.
            Hidden below `sm`: the resume's own <h1> is a few pixels below it, so
            on a phone it is pure redundancy competing for scarce width. */}
        {initials && (
          <span
            aria-hidden="true"
            // Was a translucent-white circle with `text-light` initials, which
            // on a white bar is white on white. Re-derived as the brand tint:
            // `primary-10` fill (#EDECFC over white) with `text-primary`
            // initials at 5.42:1 — legible, and quiet enough that it does not
            // compete with the action pill on the far right.
            className="hidden h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-10 text-clamp-sm font-bold text-primary sm:grid"
          >
            {initials}
          </span>
        )}

        {/* Spacer — no more language/theme in the middle, but the owner mark
            (left) and auth controls (right) still shouldn't crowd together
            on a wide bar. */}
        <div className="flex-1" aria-hidden="true" />

        {/* RIGHT — auth */}
        <div ref={authAreaRef} className="relative flex items-center gap-xs">
          {checkingAuth ? (
            <span
              role="status"
              aria-label="Checking your session"
              className="h-10 w-[88px] animate-pulse rounded-full bg-lightgray"
            />
          ) : !authed ? (
            <>
              <button
                ref={triggerRef}
                type="button"
                onClick={toggleSignIn}
                aria-expanded={signInOpen}
                aria-haspopup="dialog"
                className={`${ACTION_PILL} bg-primary text-light hover:opacity-90`}
              >
                <FiLogIn aria-hidden="true" className="h-4 w-4" />
                Sign in
              </button>
              {signInOpen && (
                <SignInPopover
                  onSignIn={onSignIn}
                  signingIn={signingIn}
                  signInError={signInError}
                  onClose={closeSignIn}
                />
              )}
            </>
          ) : (
            <>
              {/* Route-specific: "Edit →" link on `/`, a Save button on
                  `/edit`. The header renders whatever it's handed and has no
                  opinion on which. */}
              {action}

              <button
                ref={signOutRef}
                type="button"
                onClick={onSignOut}
                aria-label="Sign out"
                title="Sign out"
                // Was `text-light/70` — invisible on white. `text-gray-600` is
                // the project's muted-icon token (7.56:1 on the bar) and
                // matches the editor panel's own close button.
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-gray-600 transition-colors duration-150 hover:bg-lightgray hover:text-dark ${FOCUS}`}
              >
                <FiLogOut aria-hidden="true" className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
