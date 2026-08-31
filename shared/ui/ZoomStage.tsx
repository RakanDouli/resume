"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { FiMinus, FiPlus, FiMaximize } from "react-icons/fi";

/**
 * Renders `children` at a fixed natural width (matching the resume themes'
 * own `max-w`) so the resume's internal layout never reflows when the
 * surrounding column gets narrower — instead this scales the whole thing
 * down/up visually, like a design-tool canvas, with manual zoom controls and
 * an auto "fit width" default.
 */
const NATURAL_WIDTH = 1000;
const MIN_ZOOM = 0.4;
const MAX_ZOOM = 1.5;

// Same 40px control size as the site header / segmented switches, so a row
// mixing zoom buttons with e.g. ThemeSwitch (via `toolbarStart`) doesn't look
// like two different UI kits glued together.
const ICON_BUTTON =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-lightgray bg-light text-gray-600 hover:bg-lightgray hover:text-dark";

export interface ZoomStageProps {
  children: ReactNode;
  /** Rendered in the same toolbar row, to the left of the zoom controls —
   * e.g. edit mode's ThemeSwitch, which sits directly over this pane. */
  toolbarStart?: ReactNode;
}

export function ZoomStage({ children, toolbarStart }: ZoomStageProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(NATURAL_WIDTH);
  const [contentHeight, setContentHeight] = useState(0);
  // null = auto-fit-to-width; a number is a manual override from +/-.
  const [manualZoom, setManualZoom] = useState<number | null>(null);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      setContentHeight(entries[0].contentRect.height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const autoFit = Math.min(1, containerWidth / NATURAL_WIDTH || 1);
  const zoom = manualZoom ?? autoFit;

  return (
    <div className="flex flex-col gap-md">
      <div className="flex items-center justify-between gap-sm py-[10px]">
        {/* Always present, even with nothing to show, so the zoom group stays
            pinned right regardless of whether a caller passed `toolbarStart` —
            `justify-between` on an empty div still reserves no space, but an
            explicit fragment keeps this obviously intentional, not a bug. */}
        <div className="flex items-center gap-xs">{toolbarStart}</div>

        <div className="flex items-center gap-xs">
          <button
            type="button"
            aria-label="Zoom out"
            onClick={() => setManualZoom(Math.max(MIN_ZOOM, zoom - 0.1))}
            className={ICON_BUTTON}
          >
            <FiMinus className="h-3.5 w-3.5" />
          </button>
          <span className="min-w-[3.5em] text-center text-clamp-xs text-gray-600">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            aria-label="Zoom in"
            onClick={() => setManualZoom(Math.min(MAX_ZOOM, zoom + 0.1))}
            className={ICON_BUTTON}
          >
            <FiPlus className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            aria-label="Fit to width"
            title="Fit to width"
            onClick={() => setManualZoom(null)}
            className={ICON_BUTTON}
          >
            <FiMaximize className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* CANVAS(bg): a distinct backdrop behind the scaled resume, not just
          more white. At 100% the card fills this and it never shows; below
          100% the empty margin around the shrunk card would otherwise be the
          exact same white as the card itself, and there'd be no way to tell
          where the "page" ends and empty space begins. */}
      <div
        ref={outerRef}
        className="w-full overflow-auto rounded-xl bg-lightgray p-md"
        style={{
          height:
            contentHeight * zoom ? contentHeight * zoom + 32 : undefined,
        }}
      >
        <div
          style={{
            width: NATURAL_WIDTH,
            transform: `scale(${zoom})`,
            transformOrigin: "top left",
          }}
        >
          <div ref={innerRef}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default ZoomStage;
