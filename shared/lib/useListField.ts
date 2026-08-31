"use client";

import { useState } from "react";

export interface ListField<T> {
  /** Append `item` to the end of the list. */
  add: (item: T) => void;
  /** Shallow-merge `patch` into the item at `index`. */
  update: (index: number, patch: Partial<T>) => void;
  /** Swap the item at `index` with its neighbour; a no-op at either edge. */
  move: (index: number, dir: -1 | 1) => void;
  /** Drop the item at `index` immediately, with no confirmation. */
  remove: (index: number) => void;

  /** Index awaiting confirmation, or `null`. Drives the ConfirmDialog's `open`. */
  pendingRemove: number | null;
  /** Remove at once if the row is blank, otherwise arm `pendingRemove`. */
  requestRemove: (index: number) => void;
  confirmRemove: () => void;
  cancelRemove: () => void;
}

/**
 * Add / update / reorder / confirm-then-remove over a controlled array.
 *
 * Extracted because `LinksSection`, `EntryListSection` and `LanguagesSection`
 * each shipped a byte-for-byte copy of this algebra plus the same
 * `pendingRemove` state machine — three chances to fix an off-by-one in `move`
 * and only ever fix two of them.
 *
 * Controlled on purpose: it holds no copy of the list, only the transient
 * "which row is awaiting a confirm" index. The list itself stays the caller's
 * single source of truth, so the /edit live preview still updates on every
 * keystroke.
 *
 * `hasContent` decides whether removing a row is worth a confirmation —
 * confirming a row the user just added and never typed into is pure noise.
 * It defaults to always-confirm, which is the safe direction to be wrong in.
 */
export function useListField<T>(
  items: T[],
  onChange: (next: T[]) => void,
  hasContent: (item: T) => boolean = () => true
): ListField<T> {
  const [pendingRemove, setPendingRemove] = useState<number | null>(null);

  const add = (item: T) => onChange([...items, item]);

  const update = (index: number, patch: Partial<T>) =>
    onChange(items.map((it, i) => (i === index ? { ...it, ...patch } : it)));

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const remove = (index: number) => onChange(items.filter((_, i) => i !== index));

  const requestRemove = (index: number) => {
    if (hasContent(items[index])) setPendingRemove(index);
    else remove(index);
  };

  const confirmRemove = () => {
    if (pendingRemove !== null) remove(pendingRemove);
    setPendingRemove(null);
  };

  const cancelRemove = () => setPendingRemove(null);

  return {
    add,
    update,
    move,
    remove,
    pendingRemove,
    requestRemove,
    confirmRemove,
    cancelRemove,
  };
}

export default useListField;
