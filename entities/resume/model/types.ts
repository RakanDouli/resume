import type { ThemeName, ThemeColorSettings } from "./theme";

export interface Link {
  label: string;
  url: string;
}

export interface Entry {
  title: string;
  organization: string;
  location?: string;
  start: string;
  end: string;
  bullets: string[];
  type?: string; // education only, e.g. "Certificate", "Bachelor's Degree"
}

export interface LanguageItem {
  language: string;
  level: string; // display label, e.g. "Native", "Advanced"
  rating: number; // 1-5, drives the dot/bar UI
}

export type PhotoShape = "round" | "square";

export interface PhotoStyle {
  /** "round" = full circle (the original, unconfigurable default). "square" =
   * fixed 10px corner radius, not user-adjustable — the ask was a shape
   * choice, not a radius slider. */
  shape: PhotoShape;
  /** Shows through a transparent PNG, or letterboxes a non-square photo.
   * Hex string; undefined/"" means no fill (the frame stays transparent). */
  backgroundColor?: string;
  /**
   * Two independent rings, not one border — the inner one sits directly
   * against the photo, the outer one sits immediately outside it (touching,
   * no gap). Either can be used alone: a 0-width ring simply doesn't render,
   * so "just one border" is just leaving the other ring's width at 0.
   */
  innerBorderColor?: string;
  innerBorderWidth?: number; // px, 0 = that ring doesn't render
  outerBorderColor?: string;
  outerBorderWidth?: number; // px, 0 = that ring doesn't render
}

export interface ResumeData {
  name: string;
  jobTitle: string;
  location: string;
  phone: string;
  whatsApp?: string;
  email: string;
  photoUrl?: string;
  /**
   * Keyed per theme, not a single shared style — a photo's background/border
   * can suit Classic's dark sidebar and clash with Basic's white sheet, so
   * each theme keeps its own. `data.photoStyle?.[activeTheme]`, not
   * `data.photoStyle` directly.
   */
  photoStyle?: Partial<Record<ThemeName, PhotoStyle>>;
  themeColors?: ThemeColorSettings;
  dateOfBirth?: string;
  drivingLicense?: string;
  drivingLicenseType?: string;
  summary: string;
  links: Link[];
  experience: Entry[];
  projects: Entry[];
  education: Entry[];
  skills: string[];
  languages: LanguageItem[];
}

/**
 * Every locale the resume ships in, in the order the language switchers render
 * them. Single source of truth: `Locale` is derived from it, so adding one here
 * is a compile error everywhere it still needs handling — the list used to be
 * re-declared in both `app/page.tsx` and `app/edit/page.tsx`, free to drift.
 */
export const LOCALES = ["en", "nl"] as const;

export type Locale = (typeof LOCALES)[number];

export const SECTION_LABELS: Record<Locale, Record<string, string>> = {
  en: {
    profile: "Profile",
    experience: "Experience",
    projects: "Personal Projects",
    education: "Education",
    skills: "Skills",
    languages: "Languages",
    links: "Links",
    contact: "Contact",
    personalInfo: "Personal Info",
    theme: "Theme",
    drivingLicense: "Driving license",
  },
  nl: {
    profile: "Profiel",
    experience: "Werkervaring",
    projects: "Persoonlijke Projecten",
    education: "Opleidingen",
    skills: "Vaardigheden",
    languages: "Talen",
    links: "Links",
    contact: "Contact",
    personalInfo: "Basisgegevens",
    theme: "Thema",
    drivingLicense: "Rijbewijs",
  },
};
