"use client";

import type { ReactNode } from "react";
import { RiArrowUpSLine, RiArrowDownSLine, RiDeleteBin6Line } from "react-icons/ri";
import { Button } from "@/shared/ui";

export interface SubCardProps {
  /** Zero-based position, shown as #1, #2 … */
  index: number;
  total: number;
  /** Short identifier for this row, e.g. the organization name. */
  label: string;
  children: ReactNode;
  onMove?: (dir: -1 | 1) => void;
  onRemove: () => void;
  removeAriaLabel: string;
}

/**
 * One entry inside a list section: rounded, with its own row controls.
 *
 * SEPARATION(fe-theme correction 1): this used to be a TINTED row — `bg-bodyBg`
 * recessed against the white `EditorCard` around it. `bodyBg` is now pure white,
 * so that tonal step is gone and the row is defined by `border-lightgray` +
 * `shadow-sm` instead. The fill is kept on `bg-bodyBg` deliberately (it is still
 * "the page surface"); the border and shadow are what you must not remove.
 */
export function SubCard({
  index,
  total,
  label,
  children,
  onMove,
  onRemove,
  removeAriaLabel,
}: SubCardProps) {
  return (
    <div className="rounded-lg border border-lightgray shadow-sm bg-bodyBg p-md flex flex-col gap-sm">
      <div className="flex items-center justify-between gap-sm">
        <span className="text-clamp-xs font-medium text-gray-600 truncate">
          <span className="text-gray-400">#{index + 1}</span> {label}
        </span>
        <div className="flex gap-xs shrink-0">
          {onMove && (
            <>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onMove(-1)}
                disabled={index === 0}
                ariaLabel={`Move ${label} up`}
              >
                <RiArrowUpSLine aria-hidden="true" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onMove(1)}
                disabled={index === total - 1}
                ariaLabel={`Move ${label} down`}
              >
                <RiArrowDownSLine aria-hidden="true" />
              </Button>
            </>
          )}
          <Button
            size="sm"
            variant="danger"
            onClick={onRemove}
            ariaLabel={removeAriaLabel}
          >
            <RiDeleteBin6Line aria-hidden="true" />
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
}

export default SubCard;
