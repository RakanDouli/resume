/**
 * The catalogue of resume themes.
 *
 * DECISION(fe-structure): this lives in `entities/resume`, not in
 * `widgets/resume-view`, because there are now TWO widgets that need it:
 * `resume-view` renders the active theme, and `site-header` renders the theme
 * switcher. A widget may not import a sibling widget, so the shared vocabulary
 * has to sit on the layer below both of them.
 *
 * It is entity-level and not `shared/` because "Basic / Classic / Modern" is
 * resume-domain knowledge — `shared/` is contractually domain-free.
 *
 * `ThemeProps` deliberately stays in `widgets/resume-view/themes/registry.ts`:
 * that is the widget's internal contract for what a theme component must accept,
 * and no other slice has any business knowing it.
 */
export const THEME_NAMES = ["Basic", "Classic", "Modern"] as const;

export type ThemeName = (typeof THEME_NAMES)[number];

/**
 * Each theme's signature colour. Used by the theme switcher dots so the control
 * previews the theme without shipping a screenshot that goes stale the moment
 * anyone touches the theme.
 *
 * UNCHANGED by the fe-theme recolour, on purpose. The three themes are
 * documented as intentionally distinct and must not be homogenised, so the app
 * chrome moved to them rather than the other way round: `primary` is now
 * indigo-600 #4F46E5, the far end of Modern's own banner gradient.
 * Verified still mutually legible after the rebrand — Basic teal vs Classic
 * navy is 4.77:1, and neither is confusable with the indigo chrome.
 *
 * FLAG for fe-dry — the duplication here is REAL but is NOT a clean 3-for-3:
 *   Basic   THEME_ACCENTS #0D9488 == themes/Basic ACCENT   #0D9488  (true dupe)
 *   Modern  THEME_ACCENTS #7C3AED == themes/Modern ACCENT  #7C3AED  (true dupe)
 *   Classic THEME_ACCENTS #0F172A != themes/Classic ACCENT #34D399  (NOT a dupe)
 * Classic's two values are different ON PURPOSE: the switcher dot previews the
 * theme's navy SIDEBAR, while the in-theme ACCENT is the emerald it prints text
 * in. So a blind `import { THEME_ACCENTS }` into all three theme files would
 * silently repaint every emerald element in Classic navy-on-navy. If fe-dry
 * collapses these, Classic needs two named values (e.g. a `swatch` and an
 * `accent`), not one.
 */
export const THEME_ACCENTS: Record<ThemeName, string> = {
  Basic: "#0D9488", // teal-600
  Classic: "#0F172A", // slate-900 — the sidebar, NOT Classic's emerald accent
  Modern: "#7C3AED", // violet-600 — the near end of Modern's banner gradient
};

/**
 * Per-theme customizable colors. Deliberately NOT a uniform `{primary,
 * secondary}` shape across all three — Classic's sidebar background and its
 * emerald accent are two different things a user might want two different
 * colors for, and Modern's gradient genuinely has a start and an end. Named
 * fields say what each color actually does; a generic slot1/slot2 wouldn't.
 */
export interface BasicColors {
  accent: string;
}
export interface ClassicColors {
  sidebarBg: string;
  accent: string;
}
export interface ModernColors {
  accent: string;
  gradientEnd: string;
}

export interface ThemeColorSettings {
  Basic?: BasicColors;
  Classic?: ClassicColors;
  Modern?: ModernColors;
}

/**
 * The values every theme renders with until a user overrides them — same
 * hex constants each theme file used to hardcode at module scope. Exported
 * so the editor's color pickers and each theme component merge against the
 * exact same fallback, not two copies that can drift.
 */
export const DEFAULT_THEME_COLORS: Required<ThemeColorSettings> = {
  Basic: { accent: "#0D9488" },
  Classic: { sidebarBg: "#0F172A", accent: "#34D399" },
  Modern: { accent: "#7C3AED", gradientEnd: "#4F46E5" },
};
