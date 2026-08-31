"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiEdit3, FiSave } from "react-icons/fi";
import { SiteHeader, ACTION_PILL } from "@/widgets/site-header";
import { ConfirmDialog } from "@/shared/ui";
import { useResumeSession } from "./ResumeSessionProvider";

/**
 * FIX: `<SiteHeader>` used to be rendered separately inside BOTH `app/page.tsx`
 * and `app/edit/page.tsx`. The shared session data (auth/doc) was already
 * fixed to persist across navigation, but the header ITSELF still didn't —
 * navigating unmounted whichever page you left, header included, then mounted
 * the other page's own fresh `<SiteHeader>`. A `fixed` floating pill being
 * torn down and rebuilt on every navigation is what actually read as
 * "flinging" — not a data problem, a mount-identity problem.
 *
 * Rendered once here, in `RootLayout`, above `{children}` — a layout doesn't
 * remount on navigation between sibling pages, only the page content below it
 * swaps, so this component (and the header inside it) now truly persists.
 *
 * Decides its own `action` slot via `usePathname()` instead of each page
 * building one and handing it down — there's no page left to hand it down
 * FROM, the header isn't inside either page anymore. Sign-out's
 * unsaved-changes guard moves here too, for the same reason: `doc.dirty` is
 * shared session state, checkable regardless of which page triggered sign-out.
 */
export function AppHeader() {
  const pathname = usePathname();
  const { auth, doc } = useResumeSession();
  const [pendingSignOut, setPendingSignOut] = useState(false);

  function requestSignOut() {
    if (doc.dirty) setPendingSignOut(true);
    else auth.signOut();
  }

  function confirmSignOut() {
    setPendingSignOut(false);
    auth.signOut();
  }

  const action =
    pathname === "/edit" ? (
      <button
        type="button"
        onClick={doc.save}
        disabled={!doc.dirty || doc.saving}
        aria-label={
          doc.saving
            ? "Saving changes"
            : doc.dirty
              ? "Save changes"
              : "No changes to save"
        }
        title={doc.dirty ? "Save changes" : "No changes to save"}
        className={`${ACTION_PILL} relative bg-primary text-light hover:opacity-90`}
      >
        <FiSave aria-hidden="true" className="h-4 w-4" />
        <span className="hidden sm:inline">
          {doc.saving ? "Saving…" : "Save"}
        </span>
        {doc.dirty && (
          <span
            aria-hidden="true"
            className="absolute -right-[1px] -top-[1px] h-[11px] w-[11px] rounded-full bg-errorText ring-2 ring-light"
          />
        )}
      </button>
    ) : (
      <Link
        href="/edit"
        className={`${ACTION_PILL} bg-primary text-light hover:opacity-90`}
      >
        <FiEdit3 aria-hidden="true" className="h-4 w-4" />
        <span className="hidden sm:inline">Edit</span>
      </Link>
    );

  return (
    <>
      <SiteHeader
        name={doc.data.name}
        authed={auth.authed}
        checkingAuth={auth.checking}
        onSignIn={auth.signIn}
        signingIn={auth.signingIn}
        signInError={auth.error}
        onSignOut={requestSignOut}
        action={action}
      />

      <ConfirmDialog
        open={pendingSignOut}
        title="Sign out with unsaved changes?"
        description="Your unsaved edits are only in this browser. Signing out discards them."
        confirmLabel="Discard and sign out"
        cancelLabel="Keep editing"
        destructive
        onConfirm={confirmSignOut}
        onCancel={() => setPendingSignOut(false)}
      />
    </>
  );
}

export default AppHeader;
