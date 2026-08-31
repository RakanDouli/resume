import type { ReactNode } from "react";

export interface SectionHeadingProps {
  children: ReactNode;
  /** Theme accent applied to the label text. */
  color: string;
  /**
   * Full CSS `border-bottom` shorthand for the rule under the heading, e.g.
   * `2px solid #0D948820`. Omit for no rule.
   *
   * Deliberately one string instead of `underline`/`underlineColor`/
   * `underlineWidth` props: the component owns the typography and spacing (the
   * part that is genuinely shared), the theme owns its own colours.
   */
  rule?: string;
}

/**
 * The main section heading used on the light body of a resume theme.
 *
 * NOT used for Classic's sidebar headings — those are a different type scale
 * (clamp-xs / tracking-widest / no rule) on a dark ground, and folding them in
 * here would mean a `variant` prop that forks the entire style.
 */
export function SectionHeading({ children, color, rule }: SectionHeadingProps) {
  return (
    <h2
      // `print:break-after-avoid` stops a heading from ever being the last
      // line on a page with its own section's content pushed to the next.
      className="text-clamp-lg font-bold uppercase tracking-wide mb-sm pb-xs print:break-after-avoid"
      style={{ color, borderBottom: rule }}
    >
      {children}
    </h2>
  );
}

export default SectionHeading;
