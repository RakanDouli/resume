"use client";

import type { ReactNode } from "react";

export type ButtonVariant = "default" | "primary" | "danger" | "ghost";
export type ButtonSize = "sm" | "md";

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: "button" | "submit";
  /** Blocks the click AND dims the control — use it while a request is in flight. */
  disabled?: boolean;
  /** Required when `children` is an icon or a bare glyph with no readable text. */
  ariaLabel?: string;
  title?: string;
  fullWidth?: boolean;
}

const VARIANTS: Record<ButtonVariant, string> = {
  default: "bg-lightgray text-dark hover:opacity-80",
  primary: "bg-primary text-light hover:opacity-90",
  danger: "bg-errorBg text-errorText hover:opacity-80",
  ghost: "bg-transparent text-gray-600 hover:bg-lightgray",
};

/**
 * SIZING(fe-theme correction 3). The old map was `sm: px-sm py-[4px]` /
 * `md: px-md py-xs`, which rendered a 24.8px `sm` and a 27.5px `md` — cramped,
 * and `md` was below the 40px that makes a comfortable touch target.
 *
 * Both went up one step on the shared spacing scale, and each gained a
 * `min-h-*` floor. The floor is not decoration: the labels use `text-clamp-*`,
 * so on a narrow viewport the font shrinks to its 10-11px lower bound and the
 * padding alone would collapse the control back to ~30px. `min-h-9` / `min-h-10`
 * pin the target height at every viewport, and `items-center` on the base class
 * centres the label inside it.
 *
 *   sm  min-h-9  (36px) — px 16 / py 8,  text-clamp-xs (10-12px, lh 1.4)
 *                         natural height 32.8px at 12px type, floored to 36
 *   md  min-h-10 (40px) — px 24 / py 8,  text-clamp-sm (11-13px, lh 1.5)
 *                         natural height 35.5px at 13px type, floored to 40
 *
 * Horizontal padding stays comfortably larger than vertical (16>8, 24>8) ON
 * PURPOSE — these are `rounded-full` pills, and a pill whose width approaches
 * its height stops reading as a pill and starts reading as a lozenge or a
 * circle. If you raise `py`, raise `px` by more.
 */
const SIZES: Record<ButtonSize, string> = {
  sm: "min-h-9 px-md py-sm text-clamp-xs",
  md: "min-h-10 px-lg py-sm text-clamp-sm",
};

export function Button({
  children,
  onClick,
  variant = "default",
  size = "md",
  type = "button",
  disabled = false,
  ariaLabel,
  title,
  fullWidth = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      title={title ?? ariaLabel}
      className={[
        VARIANTS[variant],
        SIZES[size],
        fullWidth ? "w-full justify-center" : "",
        "inline-flex items-center gap-xs rounded-full font-medium whitespace-nowrap",
        "transition-colors duration-150",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-50",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
}

export default Button;
