import type { ReactNode } from "react";

/**
 * CONTRACT(fe-structure -> ui-ux) for `widgets/site-header/SiteHeader.tsx`.
 *
 * The header is a WIDGET, not an `app/` component: it is a large composed page
 * region (sign-in controls + the owner mark), which is exactly what the widget
 * layer is for.
 *
 * ROUTE SPLIT: `/` (view) and `/edit` (editing) are now separate pages — the
 * header no longer owns editing/saving state, because editing chrome leaking
 * into the plain view (or vice versa) was exactly the bug that motivated the
 * split. Each page decides what belongs in its own `action` slot: `/` puts a
 * link to `/edit` there, `/edit` puts its own Save button. The header itself
 * only ever renders Sign in / Sign out plus whatever `action` it's handed —
 * it has no opinion on what that content is.
 *
 * REMOVED(earlier page reorg): the header used to also carry the language
 * toggle and theme switcher; both moved out to `app/page.tsx` /
 * `app/edit/page.tsx`, composed from `@/entities/resume` directly.
 *
 * It is fully CONTROLLED and owns no cross-cutting state. That is what keeps
 * FSD intact: it never imports `widgets/resume-view` or `widgets/resume-editor`
 * (sibling widgets), it imports only `@/shared/ui`, and each page — the only
 * layer allowed to touch all three — wires it together.
 *
 * The one piece of state it MAY own locally is whether the sign-in popover is
 * open, plus the password string being typed into it. Both die with the
 * popover, neither is read by anyone else, and the project rule is: fewer than
 * 3 values + no async fetch + one consumer => `useState`, not a shared store.
 */
export interface SiteHeaderProps {
  /**
   * ADDED(ui-ux, deviation from the original contract): `data.name` from the
   * live resume, used only to derive the initials in the header's owner mark.
   * The brief requires that mark to come from the resume rather than a
   * hardcoded string, and the header is controlled — so it has to be a prop.
   * The whole `ResumeData` is deliberately NOT passed: the header needs one
   * string and nothing else, and a wider prop would invite it to grow a second
   * opinion about how the resume renders.
   */
  name: string;

  /** From `useResumeAuth`. */
  authed: boolean;
  /** True during silent session re-auth — render the header, but hold the auth controls. */
  checkingAuth: boolean;
  /** Resolves false on a bad password; the popover shows `signInError` and stays open. */
  onSignIn: (password: string) => Promise<boolean>;
  signingIn: boolean;
  signInError: string;
  onSignOut: () => void;

  /**
   * Route-specific action, rendered between Sign-in-state and the Sign-out
   * button, ONLY while `authed`. `/` passes an "Edit →" link; `/edit` passes
   * its own Save button (with its own dirty/saving state, which the header
   * has no need to know about directly).
   */
  action?: ReactNode;
}
