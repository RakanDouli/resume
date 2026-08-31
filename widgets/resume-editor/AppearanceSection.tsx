"use client";

import { DEFAULT_THEME_COLORS, ProfilePhoto } from "@/entities/resume";
import type { PhotoShape, PhotoStyle, ResumeData, ThemeName } from "@/entities/resume";
import { EditorCard } from "./EditorCard";

const DEFAULT_PHOTO_STYLE: PhotoStyle = {
  shape: "round",
  backgroundColor: "",
  innerBorderColor: "",
  innerBorderWidth: 0,
  outerBorderColor: "",
  outerBorderWidth: 0,
};

const MAX_BORDER_WIDTH = 12;
const PREVIEW_SIZE = 64;

export interface AppearanceSectionProps {
  data: ResumeData;
  onPatch: (patch: Partial<ResumeData>) => void;
  /** The theme currently active in the view pane — this section has no
   * switch of its own, it just shows whatever theme you're already looking
   * at. Change the theme in the zoom toolbar / under-nav switch instead. */
  theme: ThemeName;
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-xs text-clamp-xs font-medium text-gray-700">
      {label}
      <input
        type="color"
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-7 w-7 cursor-pointer rounded border border-gray-300 p-0"
      />
    </label>
  );
}

function WidthField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="flex items-center gap-xs text-clamp-xs font-medium text-gray-700">
      {label}
      <input
        type="number"
        aria-label={label}
        min={0}
        max={MAX_BORDER_WIDTH}
        value={value}
        onChange={(e) =>
          onChange(Math.max(0, Math.min(MAX_BORDER_WIDTH, Number(e.target.value) || 0)))
        }
        className="w-14 rounded-md border border-gray-300 px-sm py-[2px] text-clamp-xs"
      />
      <span className="text-clamp-xs text-gray-400">px</span>
    </label>
  );
}

/** One ring's color+width pair, plus a "Clear" that zeroes the width — a 0px
 * ring simply doesn't render, so "no outer border" IS width 0, not a
 * separate on/off flag to keep in sync with it. */
function BorderRingFields({
  label,
  color,
  width,
  onColorChange,
  onWidthChange,
}: {
  label: string;
  color: string;
  width: number;
  onColorChange: (v: string) => void;
  onWidthChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-sm">
      <span className="text-clamp-xs font-semibold text-gray-500">{label}</span>
      <ColorField label="Color" value={color || "#000000"} onChange={onColorChange} />
      <WidthField label="Width" value={width} onChange={onWidthChange} />
      {width > 0 && (
        <button
          type="button"
          onClick={() => onWidthChange(0)}
          className="text-clamp-xs text-gray-400 underline hover:text-dark"
        >
          Clear
        </button>
      )}
    </div>
  );
}

/**
 * Colors AND photo style, both scoped to the theme currently active in the
 * view pane — a resume-level customization that's genuinely per-theme, not a
 * global setting. Deliberately its own card, separate from Personal Info: the
 * photo FILE is one value shared by every theme (that lives in Personal
 * Info); how it looks is N values, one per theme (that lives here).
 *
 * NO SEPARATE THEME SWITCH: this used to have its own `ThemeSwitch` for
 * picking which theme's colors to edit, independent of what the view pane
 * was actually showing — two controls both claiming to answer "which theme,"
 * disagreeing with each other. `theme` is a prop now: switch themes once, in
 * the view pane's own switcher, and this section follows it.
 */
export function AppearanceSection({ data, onPatch, theme }: AppearanceSectionProps) {
  const colors = { ...DEFAULT_THEME_COLORS, ...data.themeColors };
  const photoStyle = data.photoStyle?.[theme] ?? DEFAULT_PHOTO_STYLE;

  function patchPhotoStyle(patch: Partial<PhotoStyle>) {
    onPatch({
      photoStyle: {
        ...data.photoStyle,
        [theme]: { ...DEFAULT_PHOTO_STYLE, ...photoStyle, ...patch },
      },
    });
  }

  return (
    <EditorCard title="Appearance">
      <p className="text-clamp-xs text-gray-400">
        Editing <span className="font-semibold text-dark">{theme}</span> —
        switch the theme above the preview to style a different one.
      </p>

      {/* Colors — fields differ per theme (Classic has a sidebar AND an
          accent, Modern has an accent AND a gradient end, Basic has just
          one), so this switches shape entirely rather than showing the same
          two generic "primary/secondary" pickers for all three. */}
      <div className="flex flex-wrap items-center gap-md">
        {theme === "Basic" && (
          <ColorField
            label="Accent"
            value={colors.Basic.accent}
            onChange={(v) =>
              onPatch({ themeColors: { ...data.themeColors, Basic: { accent: v } } })
            }
          />
        )}

        {theme === "Classic" && (
          <>
            <ColorField
              label="Sidebar"
              value={colors.Classic.sidebarBg}
              onChange={(v) =>
                onPatch({
                  themeColors: {
                    ...data.themeColors,
                    Classic: { ...colors.Classic, sidebarBg: v },
                  },
                })
              }
            />
            <ColorField
              label="Accent"
              value={colors.Classic.accent}
              onChange={(v) =>
                onPatch({
                  themeColors: {
                    ...data.themeColors,
                    Classic: { ...colors.Classic, accent: v },
                  },
                })
              }
            />
          </>
        )}

        {theme === "Modern" && (
          <>
            <ColorField
              label="Gradient start"
              value={colors.Modern.accent}
              onChange={(v) =>
                onPatch({
                  themeColors: {
                    ...data.themeColors,
                    Modern: { ...colors.Modern, accent: v },
                  },
                })
              }
            />
            <ColorField
              label="Gradient end"
              value={colors.Modern.gradientEnd}
              onChange={(v) =>
                onPatch({
                  themeColors: {
                    ...data.themeColors,
                    Modern: { ...colors.Modern, gradientEnd: v },
                  },
                })
              }
            />
          </>
        )}
      </div>

      {/* Photo style for THIS theme only. */}
      <div className="flex items-start gap-md border-t border-lightgray pt-md">
        <div
          className="relative shrink-0"
          style={{ width: PREVIEW_SIZE, height: PREVIEW_SIZE }}
        >
          <ProfilePhoto
            src={data.photoUrl}
            alt={data.name}
            size={PREVIEW_SIZE}
            photoStyle={photoStyle}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-sm">
          <div className="flex items-center gap-sm">
            <span className="text-clamp-xs font-medium text-gray-700">
              Photo shape
            </span>
            <div
              role="group"
              aria-label="Photo shape"
              className="inline-flex items-center gap-[2px] rounded-full bg-lightgray p-[3px]"
            >
              {(["round", "square"] as PhotoShape[]).map((shape) => {
                const active = photoStyle.shape === shape;
                return (
                  <button
                    key={shape}
                    type="button"
                    onClick={() => patchPhotoStyle({ shape })}
                    aria-pressed={active}
                    className={`rounded-full px-md py-[4px] text-clamp-xs font-medium capitalize transition-colors duration-150 ${
                      active
                        ? "bg-light text-primary shadow-sm"
                        : "text-gray-600 hover:text-dark"
                    }`}
                  >
                    {shape}
                  </button>
                );
              })}
            </div>
            {/* "Square" is a fixed 10px corner radius, not a slider — say so
                once, here, rather than leaving it a silent surprise. */}
            {photoStyle.shape === "square" && (
              <span className="text-clamp-xs text-gray-400">10px corners</span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-md">
            <ColorField
              label="Background"
              value={photoStyle.backgroundColor || "#ffffff"}
              onChange={(v) => patchPhotoStyle({ backgroundColor: v })}
            />
            {photoStyle.backgroundColor && (
              <button
                type="button"
                onClick={() => patchPhotoStyle({ backgroundColor: "" })}
                className="text-clamp-xs text-gray-400 underline hover:text-dark"
              >
                Clear
              </button>
            )}
          </div>

          {/* Two independent rings — inner sits against the photo, outer
              sits immediately outside it, both optional. See ProfilePhoto's
              docstring for how they're actually rendered (stacked box-shadow,
              not two real CSS borders). */}
          <BorderRingFields
            label="Inner border"
            color={photoStyle.innerBorderColor ?? ""}
            width={photoStyle.innerBorderWidth ?? 0}
            onColorChange={(v) => patchPhotoStyle({ innerBorderColor: v })}
            onWidthChange={(v) => patchPhotoStyle({ innerBorderWidth: v })}
          />
          <BorderRingFields
            label="Outer border"
            color={photoStyle.outerBorderColor ?? ""}
            width={photoStyle.outerBorderWidth ?? 0}
            onColorChange={(v) => patchPhotoStyle({ outerBorderColor: v })}
            onWidthChange={(v) => patchPhotoStyle({ outerBorderWidth: v })}
          />
        </div>
      </div>
    </EditorCard>
  );
}

export default AppearanceSection;
