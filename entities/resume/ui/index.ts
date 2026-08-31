// Presentational pieces that are genuinely shared by two or more resume themes.
// Everything here takes an `accent` colour and nothing else style-ish — a theme
// that needs a different treatment keeps its own markup rather than adding a
// `variant` / `onDark` / `bordered` flag here.
export { SectionHeading } from "./SectionHeading";
export type { SectionHeadingProps } from "./SectionHeading";

export { EntryBlock } from "./EntryBlock";
export type { EntryBlockProps } from "./EntryBlock";

export { TimelineItem } from "./TimelineItem";
export type { TimelineItemProps } from "./TimelineItem";

export { SkillPills } from "./SkillPills";
export type { SkillPillsProps } from "./SkillPills";

export { LanguageDots } from "./LanguageDots";
export type { LanguageDotsProps } from "./LanguageDots";

// Shared for its hide-on-error behaviour, not its looks — see the file header.
// Consumed by all three themes AND by the Personal Info editor's preview.
export { ProfilePhoto } from "./ProfilePhoto";
export type { ProfilePhotoProps } from "./ProfilePhoto";

// Not theme rendering — navigation controls. Live here because they are
// composed from three different spots in `app/page.tsx` (under the nav in
// view mode; split into the edit panel header + above the view pane in edit
// mode), not because any theme itself uses them.
export { LanguageSwitch } from "./LanguageSwitch";
export type { LanguageSwitchProps } from "./LanguageSwitch";

export { ThemeSwitch } from "./ThemeSwitch";
export type { ThemeSwitchProps } from "./ThemeSwitch";
