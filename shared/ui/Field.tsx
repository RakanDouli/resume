"use client";

import { useId } from "react";

export interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: "text" | "password" | "email" | "tel" | "url";
  /** Quiet helper text under the label. */
  hint?: string;
  /** Non-empty turns the field red and announces the message. */
  error?: string;
  required?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
}

export function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  hint,
  error,
  required = false,
  autoFocus = false,
  autoComplete,
}: FieldProps) {
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
        {required && (
          <span className="text-errorText ml-[2px]" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {hint && (
        <span id={hintId} className="text-clamp-xs text-gray-400">
          {hint}
        </span>
      )}
      <input
        id={id}
        type={type}
        value={value ?? ""}
        placeholder={placeholder}
        required={required}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-md border bg-light text-dark text-clamp-sm px-sm py-[8px] transition-colors duration-150 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-30 ${
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

export default Field;
