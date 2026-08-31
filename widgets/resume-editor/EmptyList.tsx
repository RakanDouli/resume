"use client";

import { Button } from "@/shared/ui";

export interface EmptyListProps {
  /** Why this list is empty. */
  message: string;
  /** What to do about it. */
  hint?: string;
  actionLabel?: string;
  onAction?: () => void;
}

/**
 * What a list section looks like before the first "+ Add" — a blank gap here
 * reads as a broken form, so say what is missing and offer the way out.
 */
export function EmptyList({
  message,
  hint,
  actionLabel,
  onAction,
}: EmptyListProps) {
  return (
    <div className="flex flex-col items-center gap-xs rounded-lg border border-dashed border-gray-300 bg-bodyBg py-lg px-md text-center">
      <p className="text-clamp-sm font-medium text-gray-700">{message}</p>
      {hint && <p className="text-clamp-xs text-gray-400">{hint}</p>}
      {onAction && actionLabel && (
        <div className="mt-xs">
          <Button size="sm" variant="primary" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

export default EmptyList;
