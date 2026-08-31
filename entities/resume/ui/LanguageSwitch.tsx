import { LOCALES } from "../model/types";
import type { Locale } from "../model/types";

export interface LanguageSwitchProps {
  language: Locale;
  onChange: (language: Locale) => void;
  /** Extra classes on the track — callers place this differently (under the
   * nav, inside the edit panel header, etc.), so sizing/margin stay theirs. */
  className?: string;
}

const FOCUS =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-light";

/**
 * Extracted out of SiteHeader (fe-theme originally built it in the nav pill)
 * once the nav stopped carrying language/theme at all — this is now composed
 * directly by `app/page.tsx` in whichever of the three spots applies: under
 * the nav in view mode, or the edit panel's own header in edit mode.
 */
export function LanguageSwitch({
  language,
  onChange,
  className = "",
}: LanguageSwitchProps) {
  return (
    <div
      role="group"
      aria-label="Language"
      className={`flex items-center gap-[2px] rounded-full bg-lightgray p-[3px] ${className}`}
    >
      {LOCALES.map((l) => {
        const active = language === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => onChange(l)}
            aria-pressed={active}
            className={`h-10 min-w-[40px] rounded-full px-sm text-clamp-xs font-semibold uppercase transition-colors duration-150 ${FOCUS} ${
              active
                ? "bg-light text-primary shadow-sm"
                : "text-gray-600 hover:bg-light-50 hover:text-dark"
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}

export default LanguageSwitch;
