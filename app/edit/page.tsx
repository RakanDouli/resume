"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { ThemeLayout } from "@/widgets/resume-view";
import { ResumeEditor } from "@/widgets/resume-editor";
import { Button, ConfirmDialog, ZoomStage } from "@/shared/ui";
import { LanguageSwitch, ThemeSwitch } from "@/entities/resume";
import type { ThemeName } from "@/entities/resume";
import { LanguageContext } from "@/app/RootLayout";
import { useResumeSession, uploadResumePhoto } from "../_lib";

const HEADER_OFFSET = "pt-[72px] sm:pt-[84px]";

/**
 * `/edit` — the editing surface. Only ever the two-column editor: no `showEditor`
 * branch anywhere in this file, because being on this page already means
 * editing — there is nothing left to condition on. (Compare `/`, which has
 * the opposite property: no editing branch either, because it can never edit.)
 *
 * Unauthenticated (or not yet known — `auth.checking`): redirects to `/`,
 * where sign-in lives. There's no password form duplicated here; `/` is the
 * one place you sign in, and this page simply isn't reachable without that
 * cookie already set.
 *
 * No `<SiteHeader>` here — it, and sign-out's unsaved-changes guard, moved to
 * `AppHeader` in `RootLayout` (persists across navigation, sign-out can be
 * triggered from either page anyway since `doc` is shared). This page keeps
 * only ITS OWN "Back to resume" guard, a separate action `AppHeader` has no
 * reason to know about.
 *
 * Reads `auth`/`doc` from `useResumeSession()`, the SAME instance `/` reads —
 * both hooks live in `RootLayout`, above both pages, so switching between
 * them is a pure navigation: no re-checking the session, no re-fetching the
 * saved copy, every time.
 */
export default function EditPage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("LanguageContext not found!");
  }
  const { language } = context;
  const router = useRouter();

  const [theme, setTheme] = useState<ThemeName>("Basic");
  const [pendingHome, setPendingHome] = useState(false);

  const { auth, doc } = useResumeSession();

  // Not signed in (and we're sure — `checking` is done): this page has no
  // content to show. Sign-in lives on `/`, so that's where an unauthenticated
  // visit belongs, not a dead end or a second copy of the password form.
  useEffect(() => {
    if (!auth.checking && !auth.authed) {
      router.replace("/");
    }
  }, [auth.checking, auth.authed, router]);

  function requestGoHome() {
    if (doc.dirty) setPendingHome(true);
    else router.push("/");
  }

  function confirmGoHome() {
    setPendingHome(false);
    router.push("/");
  }

  // Covers both the brief `checking` window and the moment between
  // `!authed` and the redirect effect actually firing — never flash the
  // editor (or anything else) during either.
  if (auth.checking || !auth.authed) {
    return null;
  }

  return (
    <main
      // Always full width — there's no view-only state on this page to fall
      // back to a narrower centered container for.
      className={`w-full mx-auto flex flex-col gap-md px-xs sm:px-sm pb-2xl ${HEADER_OFFSET}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-sm">
        <button
          type="button"
          onClick={requestGoHome}
          className="inline-flex items-center gap-xs text-clamp-sm font-medium text-gray-600 hover:text-dark"
        >
          <FiArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back to resume
        </button>
        <span
          className="text-clamp-xs text-gray-600"
          role="status"
          aria-live="polite"
        >
          {doc.saving
            ? "Saving…"
            : doc.dirty
              ? "Unsaved changes"
              : "All changes saved"}
        </span>
      </div>

      {doc.loading && (
        <p
          role="status"
          className="rounded-lg border border-lightgray bg-light shadow-sm px-md py-sm text-clamp-xs text-gray-600"
        >
          Loading your saved copy…
        </p>
      )}

      {doc.loadError && (
        <div
          role="alert"
          className="flex flex-wrap items-center justify-between gap-sm rounded-lg bg-errorBg px-md py-sm text-clamp-sm text-errorText"
        >
          <span>Could not load your saved copy ({doc.loadError}).</span>
          <Button size="sm" onClick={doc.reload}>
            Try again
          </Button>
        </div>
      )}

      {doc.saveState === "saved" && (
        <p
          role="status"
          className="rounded-lg bg-successBg px-md py-sm text-clamp-sm font-medium text-successText"
        >
          Saved. Your resume is live.
        </p>
      )}

      {doc.saveState === "error" && (
        <div
          role="alert"
          className="flex flex-wrap items-center justify-between gap-sm rounded-lg bg-errorBg px-md py-sm text-clamp-sm text-errorText"
        >
          <span>
            Could not save ({doc.saveError}). Your changes are still here —
            nothing was lost.
          </span>
          <Button size="sm" onClick={doc.save} disabled={doc.saving}>
            {doc.saving ? "Saving…" : "Try again"}
          </Button>
        </div>
      )}

      {/* Two columns: edit on the LEFT, resume view on the RIGHT. Always
          both — there's no closed state to collapse into on this page. */}
      <div className="flex w-full flex-col items-start gap-lg lg:flex-row">
        <aside
          aria-label="Resume editor"
          className="w-full rounded-xl border border-lightgray bg-bodyBg shadow-md lg:sticky lg:top-[84px] lg:max-h-[calc(100vh-104px)] lg:w-[560px] lg:shrink-0 lg:overflow-y-auto"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between gap-sm rounded-t-xl border-b border-lightgray bg-bodyBg/95 px-md py-sm backdrop-blur">
            <h2 className="text-clamp-lg font-bold text-dark">Edit resume</h2>
            {/* Language lives HERE — it decides which file you're editing,
                not how the view looks. Routed through `doc.requestLang`,
                which guards unsaved edits with the confirm dialog below. */}
            <LanguageSwitch language={language} onChange={doc.requestLang} />
          </div>

          <div className="p-md">
            <ResumeEditor
              data={doc.data}
              onChange={doc.change}
              onUploadPhoto={(file) => uploadResumePhoto(file, auth.password)}
              theme={theme}
            />
          </div>
        </aside>

        <div className="w-full min-w-0 flex-1">
          {/* Theme + zoom share one row: theme left, zoom right. Theme lives
              here — directly over the pane it affects — rather than under
              the nav the way `/` shows it, paired with language. */}
          <ZoomStage
            toolbarStart={<ThemeSwitch theme={theme} onChange={setTheme} />}
          >
            <ThemeLayout data={doc.data} language={language} theme={theme} />
          </ZoomStage>
        </div>
      </div>

      <ConfirmDialog
        open={doc.pendingLang !== null}
        title="Discard unsaved changes?"
        description="Switching language reloads the resume from disk. Your unsaved edits to this version will be lost."
        confirmLabel="Discard and switch"
        cancelLabel="Keep editing"
        destructive
        onConfirm={doc.confirmLangSwitch}
        onCancel={doc.cancelLangSwitch}
      />

      <ConfirmDialog
        open={pendingHome}
        title="Leave with unsaved changes?"
        description="Your unsaved edits are only in this browser. Leaving now discards them."
        confirmLabel="Discard and leave"
        cancelLabel="Keep editing"
        destructive
        onConfirm={confirmGoHome}
        onCancel={() => setPendingHome(false)}
      />
    </main>
  );
}
