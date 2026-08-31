"use client";

import { useContext, useState } from "react";
import { FiPrinter } from "react-icons/fi";
import { ThemeLayout } from "@/widgets/resume-view";
import { Button } from "@/shared/ui";
import { LanguageSwitch, ThemeSwitch } from "@/entities/resume";
import type { ThemeName } from "@/entities/resume";
import { LanguageContext } from "@/app/RootLayout";
import { useResumeSession } from "./_lib";

/** Clears the fixed header (rendered by `AppHeader` in `RootLayout`, not here). */
const HEADER_OFFSET = "pt-[72px] sm:pt-[84px]";

/**
 * `/` — the PUBLIC view. Always the plain resume, full stop.
 *
 * ROUTE SPLIT: editing used to live on this same page behind an `editing`
 * boolean, and a real bug came out of it — the zoom toolbar and gray canvas
 * backdrop (both edit-only chrome) leaked into the signed-out/view render
 * because a condition was missed. `/edit` is now a genuinely separate page
 * (see app/edit/page.tsx) specifically so that class of bug can't happen:
 * this file has no editing state to get out of sync in the first place, and
 * never imports ResumeEditor or ZoomStage at all.
 *
 * No `<SiteHeader>` here — it, and the session hooks behind it, live in
 * `RootLayout`/`AppHeader` now, above every page, so neither remounts on
 * navigation. See AppHeader's comment for why that mattered.
 *
 * Reads `auth`/`doc` from `useResumeSession()` — not to edit, but because
 * the signed-in owner should see their latest SAVED copy here too (the one
 * behavioural link between the two pages), not the stale statically-bundled
 * JSON. `doc.change`/`doc.save` are simply never called from this file.
 *
 * Language switching here can never lose unsaved edits (there's nothing to
 * edit on this page), so it goes straight to `setLanguage` — no dirty-guard,
 * no confirm dialog. That machinery lives in `/edit`, where it's needed.
 */
export default function Home() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("LanguageContext not found!");
  }

  const { language, setLanguage } = context;
  const [theme, setTheme] = useState<ThemeName>("Basic");
  const { auth, doc } = useResumeSession();

  return (
    <main
      className={`container mx-auto flex flex-col gap-md px-xs sm:px-sm pb-2xl print:p-0 print:max-w-none ${HEADER_OFFSET} print:pt-0`}
    >
      {/* Only the owner ever sees this — a visitor has no saved copy to
          load and nothing here means anything to them. `print:hidden`
          because these are transient status messages, not part of the
          resume — they should never end up ON a printed page even if a
          print happens to fire while one is showing. */}
      {auth.authed && doc.loading && (
        <p
          role="status"
          className="print:hidden rounded-lg border border-lightgray bg-light shadow-sm px-md py-sm text-clamp-xs text-gray-600"
        >
          Loading your saved copy… the published version is showing until it
          arrives.
        </p>
      )}

      {auth.authed && doc.loadError && (
        <div
          role="alert"
          className="print:hidden flex flex-wrap items-center justify-between gap-sm rounded-lg bg-errorBg px-md py-sm text-clamp-sm text-errorText"
        >
          <span>
            Could not load your saved copy ({doc.loadError}). You are looking
            at the published version, which may be out of date.
          </span>
          <Button size="sm" onClick={doc.reload}>
            Try again
          </Button>
        </div>
      )}

      {/* Language + theme, together, under the nav, plus Print — all
          `print:hidden` as one row, since none of the three mean anything on
          a printed page: PDF export IS printing this exact page (see
          window.print() below), not a separate feature to expose there. */}
      <div className="print:hidden flex flex-wrap items-center justify-between gap-sm">
        <div className="flex flex-wrap items-center gap-sm">
          <LanguageSwitch language={language} onChange={setLanguage} />
          <ThemeSwitch theme={theme} onChange={setTheme} />
        </div>
        <Button onClick={() => window.print()}>
          <FiPrinter aria-hidden="true" className="h-4 w-4" />
          Print / Save as PDF
        </Button>
      </div>

      <ThemeLayout data={doc.data} language={language} theme={theme} />
    </main>
  );
}
