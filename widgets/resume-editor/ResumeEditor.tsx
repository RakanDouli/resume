"use client";

import type { ResumeData, ThemeName } from "@/entities/resume";
import { PhotoSection } from "./PhotoSection";
import { AppearanceSection } from "./AppearanceSection";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { LinksSection } from "./LinksSection";
import { EntryListSection } from "./EntryListSection";
import { SkillsSection } from "./SkillsSection";
import { LanguagesSection } from "./LanguagesSection";

export interface ResumeEditorProps {
  data: ResumeData;
  /** Fires on every keystroke — the preview is live and nothing is persisted here. */
  onChange: (next: ResumeData) => void;
  /**
   * Uploads a profile photo and resolves the public URL to store in
   * `data.photoUrl`. Injected by `app/page.tsx` (which closes over the edit
   * password) so this slice never learns about auth or endpoints — see
   * `app/_lib/uploadResumePhoto.ts`. Rejects with a message fit to show a user.
   */
  onUploadPhoto?: (file: File) => Promise<string>;
  /** Passed straight through to `AppearanceSection` — see its own prop doc. */
  theme: ThemeName;
}

/**
 * The whole left-hand form. Fully controlled: it owns no resume state, so the
 * route can keep a single source of truth and drive the live preview from it.
 *
 * Note it does NOT render the preview — that is `ThemeLayout` from the
 * resume-view widget, and a widget may not import a sibling widget. The /edit
 * route composes the two.
 */
export function ResumeEditor({
  data,
  onChange,
  onUploadPhoto,
  theme,
}: ResumeEditorProps) {
  const patch = (p: Partial<ResumeData>) => onChange({ ...data, ...p });

  return (
    <div className="flex flex-col gap-md">
      <PhotoSection data={data} onPatch={patch} onUploadPhoto={onUploadPhoto} />

      <AppearanceSection data={data} onPatch={patch} theme={theme} />

      <PersonalInfoSection data={data} onPatch={patch} />

      <LinksSection
        links={data.links ?? []}
        onChange={(links) => patch({ links })}
      />

      <EntryListSection
        title="Experience"
        entries={data.experience ?? []}
        onChange={(experience) => patch({ experience })}
        addLabel="+ Add role"
        itemNoun="role"
        emptyMessage="No experience entries yet"
        emptyHint="Add your most recent role first — entries render in the order shown here."
      />

      <EntryListSection
        title="Projects"
        entries={data.projects ?? []}
        onChange={(projects) => patch({ projects })}
        addLabel="+ Add project"
        itemNoun="project"
        emptyMessage="No projects yet"
        emptyHint="Side projects, freelance work, anything worth showing."
      />

      <EntryListSection
        title="Education"
        entries={data.education ?? []}
        onChange={(education) => patch({ education })}
        showType
        addLabel="+ Add education"
        itemNoun="education entry"
        emptyMessage="No education entries yet"
        emptyHint="Degrees, certificates and courses all go here."
      />

      <SkillsSection
        skills={data.skills ?? []}
        onChange={(skills) => patch({ skills })}
      />

      <LanguagesSection
        languages={data.languages ?? []}
        onChange={(languages) => patch({ languages })}
      />
    </div>
  );
}

export default ResumeEditor;
