// Public API of the resume-view slice.
//
// DECISION(ui-ux): `Resume` was dissolved into app/page.tsx. Once the PDF button
// (and with it `resumeTemplateRef` / `selectedTheme`) went away, it was a single
// -caller wrapper holding nothing but a language toggle and a `<ThemeLayout />`
// — page-level composition that belongs in the page.
//
// MOVED(fe-structure): this barrel used to re-export THEME_NAMES /
// THEME_ACCENTS / ThemeName. They now live in "@/entities/resume". The
// re-export was removed on purpose: leaving it here would let
// `widgets/site-header` reach the theme vocabulary through a sibling widget,
// which is the one FSD rule this project must not break. Import them from the
// entity.
export { default as ThemeLayout } from "./ThemeLayout";
export type { ThemeLayoutProps } from "./ThemeLayout";
