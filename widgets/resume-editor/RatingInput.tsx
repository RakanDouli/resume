"use client";

import { useId } from "react";

export interface RatingInputProps {
  label: string;
  /** 1-5. */
  value: number;
  onChange: (v: number) => void;
  max?: number;
}

/**
 * 1-5 proficiency selector for `LanguageItem.rating`.
 *
 * Native radios under the dots on purpose: they give arrow-key navigation,
 * a real focus ring and a group announcement for free. The dots are filled
 * cumulatively (1..value) because that is what a rating reads as, which is not
 * something `peer-checked` alone can express.
 */
export function RatingInput({
  label,
  value,
  onChange,
  max = 5,
}: RatingInputProps) {
  const name = useId();

  return (
    <fieldset className="flex flex-col gap-[4px]">
      <legend className="text-clamp-sm font-medium text-gray-700 leading-snug">
        {label}
      </legend>
      <div className="flex items-center gap-xs pt-[6px]">
        {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
          <label key={n} className="cursor-pointer leading-none">
            <input
              type="radio"
              name={name}
              value={n}
              checked={value === n}
              onChange={() => onChange(n)}
              className="sr-only peer"
            />
            <span
              className={`block w-[20px] h-[20px] rounded-full border transition-colors duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 ${
                n <= value
                  ? "bg-primary border-primary"
                  : "bg-light border-gray-300 hover:border-primary"
              }`}
            />
            <span className="sr-only">{n}</span>
          </label>
        ))}
        <span className="text-clamp-xs text-gray-400 ml-xs">
          {value || 0} / {max}
        </span>
      </div>
    </fieldset>
  );
}

export default RatingInput;
