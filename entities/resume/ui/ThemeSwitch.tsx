import { THEME_NAMES, THEME_ACCENTS } from "../model/theme";
import type { ThemeName } from "../model/theme";

export interface ThemeSwitchProps {
  theme: ThemeName;
  onChange: (theme: ThemeName) => void;
  className?: string;
}

const FOCUS =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-light";

/**
 * Extracted out of SiteHeader alongside LanguageSwitch — see that file's
 * comment. Composed by `app/page.tsx`: under the nav in view mode, or
 * directly above the view pane in edit mode (theme only affects the
 * preview, so it moves with it rather than staying in the nav).
 */
export function ThemeSwitch({
  theme,
  onChange,
  className = "",
}: ThemeSwitchProps) {
  return (
    <div
      role="group"
      aria-label="Theme"
      className={`flex items-center gap-[2px] rounded-full bg-lightgray p-[3px] ${className}`}
    >
      {THEME_NAMES.map((t) => {
        const active = theme === t;
        return (
          <button
            key={t}
            type="button"
            onClick={() => onChange(t)}
            aria-pressed={active}
            aria-label={t}
            title={t}
            className={`inline-flex h-10 min-w-[40px] items-center justify-center gap-xs rounded-full px-sm text-clamp-xs font-semibold transition-colors duration-150 sm:px-md ${FOCUS} ${
              active
                ? "bg-light text-primary shadow-sm"
                : "text-gray-600 hover:bg-light-50 hover:text-dark"
            }`}
          >
            {/* Flat, full-opacity dot — see SiteHeader's original comment on
                why an inactive-state dimming/rim was wrong once the bar went
                white. Unrelated to the nav now, but the same contrast facts
                still hold wherever this renders. */}
            <span
              aria-hidden="true"
              className="h-[10px] w-[10px] shrink-0 rounded-full"
              style={{ backgroundColor: THEME_ACCENTS[t] }}
            />
            <span className="hidden sm:inline">{t}</span>
          </button>
        );
      })}
    </div>
  );
}

export default ThemeSwitch;
