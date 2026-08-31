"use client";

import { useEffect, useRef } from "react";

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Styles the confirm button as destructive. */
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Minimal confirmation dialog. Exists so nothing irreversible in this app
 * happens on a single mis-click: deleting a filled-in entry, or throwing away
 * unsaved edits by switching language.
 *
 * Escape and the overlay both cancel; focus lands on the confirm button so the
 * dialog is operable from the keyboard alone.
 */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    confirmRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-modalBg flex items-center justify-center p-md"
      onClick={onCancel}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className="bg-light rounded-xl shadow-lg p-lg w-full max-w-[400px] flex flex-col gap-sm"
      >
        <h2 className="text-clamp-lg font-bold text-dark">{title}</h2>
        {description && (
          <p className="text-clamp-sm text-gray-600 leading-relaxed">
            {description}
          </p>
        )}
        <div className="flex justify-end gap-sm mt-sm">
          <button
            type="button"
            onClick={onCancel}
            // SIZING(fe-theme correction 3): these two buttons are hand-rolled
            // rather than `<Button>` (they need a ref and per-variant focus
            // rings), so they MIRROR the shared `SIZES.md` string by hand:
            // `min-h-10 px-lg py-sm text-clamp-sm`. If you change Button's size
            // map, change these in the same commit — otherwise the app ships
            // two different button heights sitting next to each other.
            className="inline-flex items-center justify-center min-h-10 rounded-full px-lg py-sm text-clamp-sm font-medium bg-lightgray text-dark transition-colors duration-150 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmRef}
            type="button"
            onClick={onConfirm}
            // Mirrors `SIZES.md` — see the cancel button above.
            className={`inline-flex items-center justify-center min-h-10 rounded-full px-lg py-sm text-clamp-sm font-semibold transition-colors duration-150 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              destructive
                ? "bg-errorText text-light focus-visible:ring-errorText"
                : "bg-primary text-light focus-visible:ring-primary"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
