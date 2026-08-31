"use client";

import { createContext, useContext, type ReactNode } from "react";
import { LanguageContext } from "@/app/RootLayout";
import type { Locale, ResumeData } from "@/entities/resume";
import { useResumeAuth, type ResumeAuth } from "./useResumeAuth";
import { useResumeDoc, type ResumeDoc } from "./useResumeDoc";
import enData from "@/app/locales/en/common.json";
import nlData from "@/app/locales/nl/common.json";

// JSON imports widen every string literal field (e.g. `photoStyle.Basic.shape`)
// to plain `string`, so TS sees a structural mismatch against `PhotoShape`
// the moment real photo-style data gets saved into these files — which just
// started happening. The cast is safe: the API route that writes them
// serializes an actual `ResumeData`, so the shape on disk IS the type, TS
// just can't infer literal unions through a JSON import.
const RESUME_DATA: Record<Locale, ResumeData> = {
  en: enData as ResumeData,
  nl: nlData as ResumeData,
};

export interface ResumeSession {
  auth: ResumeAuth;
  doc: ResumeDoc;
}

const ResumeSessionContext = createContext<ResumeSession | null>(null);

/**
 * FIX: `/` and `/edit` used to each call `useResumeAuth()` + `useResumeDoc()`
 * directly. That's exactly the trap both hooks' own docstrings warn against —
 * "ONE OWNER", written for a single page with two states, before there were
 * two PAGES. Every navigation between them unmounted one page's instance and
 * mounted the other's fresh, re-running the silent session check and
 * re-fetching the saved copy from scratch every single time — the "keeps
 * loading every page change" symptom.
 *
 * Mounted once in `app/RootLayout.tsx`, above both routes. A layout does not
 * remount on navigation between sibling pages — only the page content below
 * it swaps — so this hook pair now truly runs once per app session, exactly
 * as the "ONE OWNER" rule always intended.
 */
export function ResumeSessionProvider({ children }: { children: ReactNode }) {
  const langCtx = useContext(LanguageContext);
  if (!langCtx) {
    throw new Error("ResumeSessionProvider must be inside LanguageContext");
  }
  const { language, setLanguage } = langCtx;

  const auth = useResumeAuth();
  const doc = useResumeDoc({
    lang: language,
    authed: auth.authed,
    password: auth.password,
    fallback: RESUME_DATA,
    setLang: setLanguage,
  });

  return (
    <ResumeSessionContext.Provider value={{ auth, doc }}>
      {children}
    </ResumeSessionContext.Provider>
  );
}

export function useResumeSession(): ResumeSession {
  const ctx = useContext(ResumeSessionContext);
  if (!ctx) {
    throw new Error("useResumeSession must be used within ResumeSessionProvider");
  }
  return ctx;
}
