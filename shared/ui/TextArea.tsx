"use client";

import { useId } from "react";

export interface TextAreaProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  /** Quiet helper text under the label. */
  hint?: string;
  placeholder?: string;
  error?: string;
}

export function TextArea({
  label,
  value,
  onChange,
  rows = 3,
  hint,
  placeholder,
  error,
}: TextAreaProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className="flex flex-col gap-[4px] w-full">
      <label
        htmlFor={id}
        className="text-clamp-sm font-medium text-gray-700 leading-snug"
      >
        {label}
      </label>
      {hint && (
        <span id={hintId} className="text-clamp-xs text-gray-400">
          {hint}
        </span>
      )}
      <textarea
        id={id}
        rows={rows}
        value={value ?? ""}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-md border bg-light text-dark text-clamp-sm px-sm py-[8px] leading-relaxed transition-colors duration-150 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-30 ${
          error ? "border-errorText focus:border-errorText" : "border-gray-300 focus:border-primary"
        }`}
      />
      {error && (
        <span id={errorId} role="alert" className="text-clamp-xs text-errorText">
          {error}
        </span>
      )}
    </div>
  );
}

export default TextArea;
