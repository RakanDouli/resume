// Public API of the `resume` entity.
// Consumers import from "@/entities/resume" — never from a deep path.
export type {
  Link,
  Entry,
  LanguageItem,
  ResumeData,
  Locale,
  PhotoShape,
  PhotoStyle,
} from "./model/types";
export { SECTION_LABELS, LOCALES } from "./model/types";

// The theme catalogue. Lives here (not in widgets/resume-view) because both
// resume-view and site-header need it and widgets may not import siblings.
export { THEME_NAMES, THEME_ACCENTS, DEFAULT_THEME_COLORS } from "./model/theme";
export { linkIconFor } from "./model/linkIcon";
export type {
  ThemeName,
  ThemeColorSettings,
  BasicColors,
  ClassicColors,
  ModernColors,
} from "./model/theme";

// Shared, resume-aware presentational pieces (see ./ui/index.ts for what is
// deliberately NOT in here).
export {
  SectionHeading,
  EntryBlock,
  TimelineItem,
  SkillPills,
  LanguageDots,
  ProfilePhoto,
  LanguageSwitch,
  ThemeSwitch,
} from "./ui";
export type {
  SectionHeadingProps,
  EntryBlockProps,
  TimelineItemProps,
  SkillPillsProps,
  LanguageDotsProps,
  ProfilePhotoProps,
  LanguageSwitchProps,
  ThemeSwitchProps,
} from "./ui";
