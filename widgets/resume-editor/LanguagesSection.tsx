"use client";

import type { LanguageItem } from "@/entities/resume";
import { ConfirmDialog, Field } from "@/shared/ui";
import { useListField } from "@/shared/lib";
import { EditorCard } from "./EditorCard";
import { EmptyList } from "./EmptyList";
import { SubCard } from "./SubCard";
import { RatingInput } from "./RatingInput";

export interface LanguagesSectionProps {
  languages: LanguageItem[];
  onChange: (languages: LanguageItem[]) => void;
}

/** The default 3/5 rating is not typed content, so it must not force a confirm. */
const hasContent = (l: LanguageItem) =>
  Boolean(l.language.trim() || l.level.trim());

export function LanguagesSection({
  languages,
  onChange,
}: LanguagesSectionProps) {
  const list = useListField(languages, onChange, hasContent);

  const add = () => list.add({ language: "", level: "", rating: 3 });

  return (
    <EditorCard
      title="Languages"
      onAdd={add}
      addLabel="+ Add language"
      count={languages.length}
    >
      {languages.length === 0 ? (
        <EmptyList
          message="No languages yet"
          hint="Each one needs a name, a level label and a 1-5 rating that drives the dots."
          actionLabel="+ Add language"
          onAction={add}
        />
      ) : (
        <div className="flex flex-col gap-md">
          {languages.map((lng, i) => (
            <SubCard
              key={i}
              index={i}
              total={languages.length}
              label={lng.language || "New language"}
              onMove={(dir) => list.move(i, dir)}
              onRemove={() => list.requestRemove(i)}
              removeAriaLabel={`Remove language ${i + 1}`}
            >
              <div className="flex flex-col sm:flex-row gap-sm">
                <Field
                  label="Language"
                  value={lng.language}
                  placeholder="Dutch"
                  onChange={(v) => list.update(i, { language: v })}
                />
                <Field
                  label="Level"
                  value={lng.level}
                  placeholder="Native / Advanced / B2"
                  onChange={(v) => list.update(i, { level: v })}
                />
              </div>
              <RatingInput
                label="Rating"
                value={lng.rating ?? 0}
                onChange={(v) => list.update(i, { rating: v })}
              />
            </SubCard>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={list.pendingRemove !== null}
        title="Remove this language?"
        description="Nothing is written to disk until you press Save."
        confirmLabel="Remove"
        destructive
        onConfirm={list.confirmRemove}
        onCancel={list.cancelRemove}
      />
    </EditorCard>
  );
}

export default LanguagesSection;
