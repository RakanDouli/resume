import type { ResumeData, Locale } from "@/entities/resume";

/**
 * The theme *component* contract, internal to the `resume-view` widget slice.
 *
 * This file is metadata only — it holds no imports of the theme components
 * themselves, so themes can import `ThemeProps` from here without creating a
 * cycle. `ThemeLayout` owns the name -> component map.
 *
 * Themes live under resume-view rather than as their own `widgets/resume-themes`
 * slice because a theme is only ever rendered by ThemeLayout — a separate slice
 * would make resume-view import a sibling widget, which FSD forbids.
 *
 * MOVED(fe-structure): `THEME_NAMES` / `ThemeName` / `THEME_ACCENTS` used to
 * live here. They now live in `entities/resume/model/theme.ts` because
 * `widgets/site-header` renders the theme switcher and may not import this
 * sibling widget. Import them from "@/entities/resume".
 */

/** Every theme in ./Basic, ./Classic, ./Modern must accept exactly these props. */
export interface ThemeProps {
  data: ResumeData;
  language?: Locale;
}
