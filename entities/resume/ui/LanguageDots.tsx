export interface LanguageDotsProps {
  /** 1-5 proficiency rating from `LanguageItem.rating`. */
  rating: number;
  /** Colour of the filled dots. */
  accent: string;
  max?: number;
}

/**
 * The 5-dot proficiency strip, on a light ground. Used by Basic and Modern.
 *
 * Classic renders the same number as five full-width segmented BARS in its dark
 * sidebar, with a `rgba(255,255,255,0.15)` track. That is a different graphic,
 * not a variant of this one, so it stays inside Classic.
 *
 * Only the dots are shared — each theme lays out the surrounding
 * language/level labels itself.
 */
export function LanguageDots({ rating, accent, max = 5 }: LanguageDotsProps) {
  return (
    <span className="flex gap-[2px]" role="img" aria-label={`${rating} / ${max}`}>
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
        <span
          key={n}
          className="w-[7px] h-[7px] rounded-full"
          style={{ backgroundColor: n <= rating ? accent : "#E5E7EB" }}
        />
      ))}
    </span>
  );
}

export default LanguageDots;
