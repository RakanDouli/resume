"use client";

import { useCallback, useEffect, useState } from "react";
import type { Locale, ResumeData } from "@/entities/resume";

/**
 * The resume document being viewed and (optionally) edited on `/`.
 *
 * PORTED(fe-structure) verbatim out of the old `app/edit/page.tsx`, which held
 * ~180 lines of this inline. Extracted so `app/page.tsx` is composition + JSX
 * rather than a second file that mixes a state machine with a layout.
 *
 * It lives in `app/_lib` for the same reason as `useResumeAuth`: it knows the
 * `/api/resume` endpoint (so not `shared/lib`), it is not a shape of the resume
 * (so not `entities/`), and it has exactly one consumer — the page that owns
 * both the header and the editor.
 *
 * THE ONE BEHAVIOURAL CHANGE vs /edit: `/` is public, and GET /api/resume is
 * 401 for anonymous visitors. So the signed-out page renders `fallback` — the
 * statically imported locale JSON, which is what `/` has always shown — and
 * only swaps in a server fetch once `authed` flips. `data` is therefore never
 * null while a fallback exists, which is what lets the resume stay on screen
 * the whole time instead of blanking when you sign in.
 */
export type SaveState = "idle" | "saved" | "error";

export interface UseResumeDocOptions {
  /** The language currently displayed. Owned by the page (LanguageContext). */
  lang: Locale;
  /** From `useResumeAuth`. Flipping this to true triggers a fresh server load. */
  authed: boolean;
  /** From `useResumeAuth`. Sent as `x-edit-password` on save. */
  password: string;
  /** Statically imported locale JSON, shown to signed-out visitors. */
  fallback: Record<Locale, ResumeData>;
  /**
   * `setLanguage` from LanguageContext. The hook does not own `lang` — the app
   * does, because `<html lang>` depends on it — but the hook owns the
   * unsaved-changes guard in front of it, so the setter has to come in here.
   */
  setLang: (l: Locale) => void;
}

export interface ResumeDoc {
  /** What both the theme view and the editor render. Never null. */
  data: ResumeData;
  /** True while the authed server copy is loading. The fallback stays on screen meanwhile. */
  loading: boolean;
  loadError: string | null;
  dirty: boolean;
  saving: boolean;
  saveState: SaveState;
  saveError: string;
  /** Non-null while a language switch is waiting on the discard confirmation. */
  pendingLang: Locale | null;
  /** Wire this to `ResumeEditor.onChange`. */
  change: (next: ResumeData) => void;
  save: () => Promise<void>;
  reload: () => void;
  /**
   * Wire the header's language toggle to THIS, not to LanguageContext's
   * `setLanguage` — switching language reloads from disk and would silently
   * eat unsaved edits.
   */
  requestLang: (l: Locale) => void;
  confirmLangSwitch: () => void;
  cancelLangSwitch: () => void;
}

export function useResumeDoc({
  lang,
  authed,
  password,
  fallback,
  setLang,
}: UseResumeDocOptions): ResumeDoc {
  const [serverData, setServerData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [saveError, setSaveError] = useState("");
  const [pendingLang, setPendingLang] = useState<Locale | null>(null);

  const data = serverData ?? fallback[lang];

  const loadData = useCallback(async (l: Locale) => {
    setLoading(true);
    setLoadError(null);
    setSaveState("idle");
    try {
      const res = await fetch(`/api/resume?lang=${l}`);
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      setServerData((await res.json()) as ResumeData);
      setDirty(false);
    } catch (err) {
      // Deliberately NOT clearing serverData: on a failed reload the visitor
      // keeps seeing the resume (fallback or last good copy) instead of a
      // blank page, and the banner explains why it may be stale.
      setLoadError(
        err instanceof Error ? err.message : "Could not reach the server."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Signed out => static JSON. Signed in => authoritative copy from disk.
  useEffect(() => {
    if (authed) {
      loadData(lang);
    } else {
      setServerData(null);
      setDirty(false);
      setLoadError(null);
    }
  }, [authed, lang, loadData]);

  // Success is transient, failure is not — an error the user never read is a
  // silent failure.
  useEffect(() => {
    if (saveState !== "saved") return;
    const id = setTimeout(() => setSaveState("idle"), 3000);
    return () => clearTimeout(id);
  }, [saveState]);

  // Edits only live in memory until Save, so a reload would throw them away.
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const change = useCallback((next: ResumeData) => {
    setServerData(next);
    setDirty(true);
    setSaveState("idle");
  }, []);

  const save = useCallback(async () => {
    if (!serverData || saving) return;
    setSaving(true);
    setSaveState("idle");
    setSaveError("");
    try {
      const res = await fetch(`/api/resume?lang=${lang}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-edit-password": password,
        },
        body: JSON.stringify(serverData),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      setDirty(false);
      setSaveState("saved");
    } catch (err) {
      setSaveState("error");
      setSaveError(
        err instanceof Error ? err.message : "Could not reach the server."
      );
    } finally {
      setSaving(false);
    }
  }, [serverData, saving, lang, password]);

  const reload = useCallback(() => {
    void loadData(lang);
  }, [loadData, lang]);

  // Switching language reloads from disk, so guard unsaved edits.
  const requestLang = useCallback(
    (l: Locale) => {
      if (l === lang) return;
      if (dirty) setPendingLang(l);
      else setLang(l);
    },
    [lang, dirty, setLang]
  );

  const confirmLangSwitch = useCallback(() => {
    if (pendingLang) setLang(pendingLang);
    setPendingLang(null);
  }, [pendingLang, setLang]);

  const cancelLangSwitch = useCallback(() => setPendingLang(null), []);

  return {
    data,
    loading,
    loadError,
    dirty,
    saving,
    saveState,
    saveError,
    pendingLang,
    change,
    save,
    reload,
    requestLang,
    confirmLangSwitch,
    cancelLangSwitch,
  };
}
