"use client";

import type { Link } from "@/entities/resume";
import { ConfirmDialog, Field } from "@/shared/ui";
import { useListField } from "@/shared/lib";
import { EditorCard } from "./EditorCard";
import { EmptyList } from "./EmptyList";
import { SubCard } from "./SubCard";

export interface LinksSectionProps {
  links: Link[];
  onChange: (links: Link[]) => void;
}

const hasContent = (l: Link) => Boolean(l.label.trim() || l.url.trim());

export function LinksSection({ links, onChange }: LinksSectionProps) {
  const list = useListField(links, onChange, hasContent);

  const add = () => list.add({ label: "", url: "" });

  return (
    <EditorCard
      title="Links"
      onAdd={add}
      addLabel="+ Add link"
      count={links.length}
    >
      {links.length === 0 ? (
        <EmptyList
          message="No links yet"
          hint="GitHub, LinkedIn, a portfolio — each theme renders these next to your contact details."
          actionLabel="+ Add link"
          onAction={add}
        />
      ) : (
        <div className="flex flex-col gap-md">
          {links.map((link, i) => (
            <SubCard
              key={i}
              index={i}
              total={links.length}
              label={link.label || "New link"}
              onMove={(dir) => list.move(i, dir)}
              onRemove={() => list.requestRemove(i)}
              removeAriaLabel={`Remove link ${i + 1}`}
            >
              <div className="flex flex-col sm:flex-row gap-sm">
                <Field
                  label="Label"
                  value={link.label}
                  placeholder="GitHub"
                  onChange={(v) => list.update(i, { label: v })}
                />
                <Field
                  label="URL"
                  type="url"
                  value={link.url}
                  placeholder="https://github.com/you"
                  onChange={(v) => list.update(i, { url: v })}
                />
              </div>
            </SubCard>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={list.pendingRemove !== null}
        title="Remove this link?"
        description="Nothing is written to disk until you press Save."
        confirmLabel="Remove"
        destructive
        onConfirm={list.confirmRemove}
        onCancel={list.cancelRemove}
      />
    </EditorCard>
  );
}

export default LinksSection;
