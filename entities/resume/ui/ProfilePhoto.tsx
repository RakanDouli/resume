"use client";

import { useEffect, useState } from "react";
import type { PhotoStyle } from "../model/types";

const SQUARE_RADIUS = 10; // px — a fixed corner radius, not a user-adjustable slider

export interface ProfilePhotoProps {
  /** `data.photoUrl`. Absent, empty or broken => renders nothing at all. */
  src?: string;
  /** `data.name` — the photo is the person, so the name is the alt text. */
  alt: string;
  /** Rendered size in px. Basic/Classic/Modern each pick their own. */
  size: number;
  /** Theme-owned extras: position/spacing only now — see the shape/background/
   * border note below for why border treatment moved out of this. */
  className?: string;
  /**
   * `data.photoStyle`. Shape, background fill, and the inner/outer border
   * rings are now a resume-level user setting (the edit form has a shape
   * toggle, a background picker, and a color+width pair for each ring), not
   * a per-theme design choice — the docstring below used to draw that line
   * the other way, before that control existed.
   * Missing/undefined falls back to the original look: round, no border, no
   * background fill, so a resume that predates this feature renders
   * byte-for-byte as it always did.
   */
  photoStyle?: PhotoStyle;
}

/**
 * DECISION(fe-structure): this IS shared, against the fe-dry default of "2+
 * honest consumers or it stays inline".
 *
 * What's shared is the *failure behaviour*: render nothing unless a photo is
 * set AND it actually loaded. That is stateful, it is identical in all three
 * themes and in the editor's preview, and it is not optional — resumes can
 * ship with a stale/broken `photoUrl` (the original committed data did).
 *
 * PROBE FIRST, RENDER SECOND. Loading the URL through an off-document
 * `Image()` first means nothing is ever committed to the DOM until the bytes
 * have decoded: the server renders null, a broken photo renders null forever,
 * and a page with no photo set looks byte-for-byte like one that predates
 * this component. `onError` stays on the rendered element as a second line of
 * defence for a file that disappears after it was probed.
 *
 * "use client" sits HERE, on the leaf that needs it, and not on the themes —
 * they stay Server Components.
 *
 * Plain `<img>`, not `next/image`: the source is written into `public/uploads`
 * at runtime, which the build-time image optimiser does not know about.
 * `next/core-web-vitals` warns on this — keep the narrow eslint-disable line
 * below. Do not blanket-disable the rule.
 */
export function ProfilePhoto({
  src,
  alt,
  size,
  className,
  photoStyle,
}: ProfilePhotoProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    if (!src) return;

    let alive = true;
    const probe = new window.Image();
    probe.onload = () => {
      if (alive) setLoaded(true);
    };
    probe.onerror = () => {
      if (alive) setLoaded(false);
    };
    probe.src = src;
    // An image already in the browser cache can finish before the handlers are
    // attached, in which case neither event ever fires.
    if (probe.complete && probe.naturalWidth > 0) setLoaded(true);

    return () => {
      alive = false;
      probe.onload = null;
      probe.onerror = null;
    };
  }, [src]);

  if (!src || !loaded) return null;

  const shape = photoStyle?.shape ?? "round";
  const innerWidth = photoStyle?.innerBorderWidth ?? 0;
  const outerWidth = photoStyle?.outerBorderWidth ?? 0;

  // Two rings via stacked `box-shadow`, not `border`: a single element can
  // only ever have one real border, but `box-shadow` accepts a comma-
  // separated list of solid, zero-blur rings — each one a spread distance
  // (not a stroke width the browser draws INSIDE the box, the way `border`
  // does), so the outer ring's spread is simply the inner ring's own spread
  // plus its own width, making the two sit flush with no gap. Neither ring
  // changes the element's box size the way `border` would, and both follow
  // `border-radius` correctly for the square shape too.
  const shadows: string[] = [];
  if (innerWidth > 0) {
    shadows.push(`0 0 0 ${innerWidth}px ${photoStyle?.innerBorderColor || "transparent"}`);
  }
  if (outerWidth > 0) {
    shadows.push(
      `0 0 0 ${innerWidth + outerWidth}px ${photoStyle?.outerBorderColor || "transparent"}`
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      onError={() => setLoaded(false)}
      className={`object-cover shrink-0 ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        borderRadius: shape === "round" ? "9999px" : `${SQUARE_RADIUS}px`,
        backgroundColor: photoStyle?.backgroundColor || undefined,
        boxShadow: shadows.length > 0 ? shadows.join(", ") : undefined,
      }}
    />
  );
}

export default ProfilePhoto;
