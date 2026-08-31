import { FC } from "react";
import type { ResumeData, Locale, ThemeName } from "@/entities/resume";
import type { ThemeProps } from "./themes/registry";
import Basic from "./themes/Basic";
import Classic from "./themes/Classic";
import Modern from "./themes/Modern";

/**
 * DECISION(ui-ux): static imports, not `import(\`./themes/${name}\`)`.
 *
 * The dynamic version bought nothing here and cost real UX:
 *  - a relative template-literal import makes webpack build a context module
 *    over the whole themes/ directory, so every theme is in the graph anyway —
 *    it only splits them into chunks the user then has to wait for on click;
 *  - the module came back as `any`, so nothing checked that a theme actually
 *    accepts `language` (that is exactly how the NL headings silently broke);
 *  - it forced a `loading` state and a full-height spinner onto the critical
 *    render path, including the live preview, which re-renders on every
 *    keystroke.
 * Three small presentational components are cheaper to ship than the machinery
 * that avoids shipping them.
 */
const THEMES: Record<ThemeName, FC<ThemeProps>> = { Basic, Classic, Modern };

export interface ThemeLayoutProps {
  data: ResumeData;
  language?: Locale;
  /**
   * CONTROLLED(ui-ux, per the fe-structure contract). The switcher moved into
   * `widgets/site-header`, so `theme` state lifted to `app/page.tsx` — one
   * owner, two readers. There is no `onThemeChange`: this component stopped
   * owning that interaction rather than proxying it, and two theme switchers on
   * one screen was the failure mode to avoid.
   */
  theme: ThemeName;
}

/**
 * No `"use client"`: with the switcher and its `useState` gone, this is a pure
 * Server Component. It still renders inside the client page via the cascade,
 * but keeping it clean means the public view can go RSC later.
 */
const ThemeLayout: FC<ThemeLayoutProps> = ({ data, language = "en", theme }) => {
  const ActiveTheme = THEMES[theme];

  return (
    <section className="w-full">
      {/*
        The single card wrapper — one place, not three per-theme copies, so the
        three themes cannot drift on the one thing they must agree about: that
        the resume is a sheet of paper lying on the page.

        `border-lightgray` + `shadow-md` — and after fe-theme correction 1 these
        are the ONLY separation there is. `bodyBg` is now pure #FFFFFF, exactly
        equal to the `bg-light` every theme paints itself with, so the card and
        the page are literally the same pixel value: without the hairline and
        the shadow the resume would have no edge whatsoever.
        Measured on the new white page: the `lightgray` hairline is 1.28:1
        (a visible rule at 1px) and `shadow-md` carries the lift. Kept at
        `shadow-md`, not `shadow-lg` — the card is a sheet of paper lying on the
        page, not a modal hovering over it, and `lg` reads as the latter.
        Do NOT restore separation by tinting either surface.
      */}
      <div className="overflow-hidden rounded-md border border-lightgray bg-light shadow-md">
        <ActiveTheme data={data} language={language} />
      </div>
    </section>
  );
};

export default ThemeLayout;
