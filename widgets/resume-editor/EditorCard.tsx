"use client";

import type { ReactNode } from "react";
import { Button } from "@/shared/ui";

export interface EditorCardProps {
  title: string;
  children: ReactNode;
  /** Renders the pill "+ Add" control in the card header. */
  onAdd?: () => void;
  addLabel?: string;
  /** Shown next to the title so the section reads as countable at a glance. */
  count?: number;
}

/**
 * The rounded white section shell every editor section sits in.
 *
 * SEPARATION(fe-theme correction 1): `bodyBg` is now pure white, so this card
 * and the panel behind it are the same colour and the fill does no work at all.
 * The 1px `border-lightgray` hairline plus `shadow-sm` are the ONLY things
 * giving the card an edge — do not drop either, and do not replace them with an
 * off-white fill.
 */
export function EditorCard({
  title,
  children,
  onAdd,
  addLabel = "+ Add",
  count,
}: EditorCardProps) {
  return (
    <section className="bg-light rounded-xl border border-lightgray shadow-sm p-lg flex flex-col gap-md">
      <header className="flex items-center justify-between gap-sm">
        <h2 className="text-clamp-lg font-bold text-dark flex items-baseline gap-xs">
          {title}
          {typeof count === "number" && (
            <span className="text-clamp-xs font-normal text-gray-400">
              {count}
            </span>
          )}
        </h2>
        {onAdd && (
          <Button size="sm" onClick={onAdd}>
            {addLabel}
          </Button>
        )}
      </header>
      {children}
    </section>
  );
}

export default EditorCard;
