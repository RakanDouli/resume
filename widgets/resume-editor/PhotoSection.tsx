"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { ProfilePhoto } from "@/entities/resume";
import type { ResumeData } from "@/entities/resume";
import { Button } from "@/shared/ui";
import { EditorCard } from "./EditorCard";

export interface PhotoSectionProps {
  data: ResumeData;
  onPatch: (patch: Partial<ResumeData>) => void;
  /**
   * Uploads the file and resolves the public URL. Injected from `app/page.tsx`
   * so this widget never learns the endpoint or the edit password — see
   * `app/_lib/uploadResumePhoto.ts`. Rejects with a message fit to show a user.
   * Optional: when it is absent the preview and "Remove photo" still work, and
   * the file picker simply is not offered.
   */
  onUploadPhoto?: (file: File) => Promise<string>;
}

const PREVIEW_SIZE = 72;

/** Placeholder monogram shown when there is no usable photo. */
function initialsOf(name: string): string {
  return (
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w.charAt(0).toUpperCase())
      .join("") || "—"
  );
}

/**
 * Split out of `PersonalInfoSection` so the panel reads photo -> appearance
 * -> the rest of your info, instead of the upload control being buried
 * inside a "Personal info" card alongside name/email/etc.
 *
 * The FILE itself lives here — upload/replace/remove — because it's one
 * value shared by every theme. Its per-theme shape/background/border live in
 * `AppearanceSection` right after this card: this preview always renders
 * round/plain, since "which theme's style am I even looking at" has no good
 * answer on a card that isn't theme-scoped.
 */
export function PhotoSection({ data, onPatch, onUploadPhoto }: PhotoSectionProps) {
  // Two values, one consumer, nothing shared: useState, not a store.
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    // Reset immediately so picking the SAME file again still fires `change`
    // (otherwise a retry after a failed upload silently does nothing).
    e.target.value = "";
    if (!file || !onUploadPhoto) return;

    setUploadError("");
    setUploading(true);
    try {
      const url = await onUploadPhoto(file);
      // STAGED, not saved. `photoUrl` is patched in memory exactly like every
      // other field; the page's Save button is what writes it to disk.
      onPatch({ photoUrl: url });
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : "Upload failed. Please try again."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <EditorCard title="Profile photo">
      <div className="flex items-start gap-md">
        {/*
          The placeholder sits UNDER the photo rather than beside it, because
          ProfilePhoto hides itself on a broken URL and the parent cannot tell
          whether it rendered. Stacking means a stale `photoUrl` — which the
          committed JSON currently has — degrades to the monogram instead of
          leaving a hole where the preview should be.
        */}
        <div
          className="relative shrink-0"
          style={{ width: PREVIEW_SIZE, height: PREVIEW_SIZE }}
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center rounded-full border border-gray-300 bg-lightgray text-clamp-sm font-semibold text-gray-600"
          >
            {initialsOf(data.name)}
          </span>
          <ProfilePhoto
            src={data.photoUrl}
            alt={data.name}
            size={PREVIEW_SIZE}
            className="absolute inset-0"
          />
          {uploading && (
            <span
              aria-hidden="true"
              className="absolute inset-0 animate-pulse rounded-full bg-dark-20"
            />
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-xs">
          <p className="text-clamp-xs text-gray-400">
            JPEG, PNG, GIF or WebP, up to 5&nbsp;MB. Staged like every other
            field — it is written when you press Save. Shape, background and
            border are set per-theme, in Appearance below.
          </p>

          <div className="mt-xs flex flex-wrap items-center gap-xs">
            {onUploadPhoto && (
              <>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/png,image/jpeg,image/gif,image/webp"
                  onChange={handleFile}
                  className="hidden"
                  tabIndex={-1}
                  aria-hidden="true"
                />
                {/* A real button, not a bare <label>: labels are not keyboard
                    focusable, so a file picker driven by one is mouse-only. */}
                <Button
                  size="sm"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading
                    ? "Uploading…"
                    : data.photoUrl
                      ? "Replace photo"
                      : "Upload photo"}
                </Button>
              </>
            )}
            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                setUploadError("");
                // "" and not `undefined`: PUT serialises the whole object, so
                // dropping the key would leave the stale value on disk intact.
                onPatch({ photoUrl: "" });
              }}
              disabled={uploading || !data.photoUrl}
            >
              Remove photo
            </Button>
          </div>

          {uploading && (
            <p role="status" className="text-clamp-xs text-gray-600">
              Uploading your photo…
            </p>
          )}
          {uploadError && (
            <p role="alert" className="text-clamp-xs text-errorText">
              {uploadError} Pick a file to try again.
            </p>
          )}
        </div>
      </div>
    </EditorCard>
  );
}

export default PhotoSection;
