"use client";

import type { Entry } from "@/entities/resume";
import { ConfirmDialog, Field, TextArea } from "@/shared/ui";
import { useListField } from "@/shared/lib";
import { EditorCard } from "./EditorCard";
import { EmptyList } from "./EmptyList";
import { SubCard } from "./SubCard";

export interface EntryListSectionProps {
  title: string;
  entries: Entry[];
  onChange: (entries: Entry[]) => void;
  /** Education carries the optional `type` field ("Certificate", "Bachelor…"). */
  showType?: boolean;
  addLabel: string;
  emptyMessage: string;
  emptyHint: string;
  /** Singular noun used in the remove confirmation copy. */
  itemNoun: string;
}

const BLANK: Entry = {
  title: "",
  organization: "",
  location: "",
  start: "",
  end: "",
  bullets: [],
};

function hasContent(entry: Entry): boolean {
  return Boolean(
    entry.title.trim() ||
      entry.organization.trim() ||
      entry.location?.trim() ||
      entry.start.trim() ||
      entry.end.trim() ||
      entry.type?.trim() ||
      entry.bullets.length
  );
}

export function EntryListSection({
  title,
  entries,
  onChange,
  showType = false,
  addLabel,
  emptyMessage,
  emptyHint,
  itemNoun,
}: EntryListSectionProps) {
  /** Only ask before throwing away typed content — confirming a blank row is noise. */
  const list = useListField(entries, onChange, hasContent);

  const add = () => list.add({ ...BLANK, ...(showType ? { type: "" } : {}) });

  const { pendingRemove } = list;
  const pendingLabel =
    pendingRemove !== null
      ? entries[pendingRemove]?.title ||
        entries[pendingRemove]?.organization ||
        `${itemNoun} #${pendingRemove + 1}`
      : "";

  return (
    <EditorCard
      title={title}
      onAdd={add}
      addLabel={addLabel}
      count={entries.length}
    >
      {entries.length === 0 ? (
        <EmptyList
          message={emptyMessage}
          hint={emptyHint}
          actionLabel={addLabel}
          onAction={add}
        />
      ) : (
        <div className="flex flex-col gap-md">
          {entries.map((entry, i) => (
            <SubCard
              key={i}
              index={i}
              total={entries.length}
              label={entry.organization || entry.title || "New entry"}
              onMove={(dir) => list.move(i, dir)}
              onRemove={() => list.requestRemove(i)}
              removeAriaLabel={`Remove ${itemNoun} ${i + 1}`}
            >
              <Field
                label="Title"
                value={entry.title}
                placeholder="Full-Stack Developer"
                onChange={(v) => list.update(i, { title: v })}
              />
              <Field
                label="Organization"
                value={entry.organization ?? ""}
                placeholder="Company or school"
                onChange={(v) => list.update(i, { organization: v })}
              />
              <Field
                label="Location"
                value={entry.location ?? ""}
                placeholder="Utrecht, The Netherlands"
                onChange={(v) => list.update(i, { location: v })}
              />
              <div className="flex flex-col sm:flex-row gap-sm">
                <Field
                  label="Start"
                  value={entry.start}
                  placeholder="January 2024"
                  onChange={(v) => list.update(i, { start: v })}
                />
                <Field
                  label="End"
                  value={entry.end}
                  placeholder="Present"
                  onChange={(v) => list.update(i, { end: v })}
                />
              </div>
              {showType && (
                <Field
                  label="Type"
                  value={entry.type ?? ""}
                  placeholder="Bachelor's Degree"
                  hint="Optional — shown as a tag on the Modern theme"
                  onChange={(v) => list.update(i, { type: v })}
                />
              )}
              <TextArea
                label="Bullets"
                hint="One bullet per line"
                rows={4}
                placeholder={"Built X that did Y\nLed the Z migration"}
                value={(entry.bullets ?? []).join("\n")}
                onChange={(v) =>
                  list.update(i, {
                    bullets: v.split("\n").filter((line) => line.trim() !== ""),
                  })
                }
              />
            </SubCard>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={pendingRemove !== null}
        title={`Remove ${pendingLabel}?`}
        description="This entry and everything typed into it will be discarded. Nothing is written to disk until you press Save."
        confirmLabel="Remove"
        destructive
        onConfirm={list.confirmRemove}
        onCancel={list.cancelRemove}
      />
    </EditorCard>
  );
}

export default EntryListSection;
