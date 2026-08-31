"use client";

import { TextArea } from "@/shared/ui";
import { EditorCard } from "./EditorCard";
import { EmptyList } from "./EmptyList";

export interface SkillsSectionProps {
  skills: string[];
  onChange: (skills: string[]) => void;
}

export function SkillsSection({ skills, onChange }: SkillsSectionProps) {
  return (
    <EditorCard title="Skills" count={skills.length}>
      <TextArea
        label="Skills"
        hint="One skill per line. Blank lines are dropped."
        rows={8}
        placeholder={"React\nTypeScript\nNode.js"}
        value={skills.join("\n")}
        onChange={(v) =>
          onChange(v.split("\n").filter((line) => line.trim() !== ""))
        }
      />

      {skills.length === 0 ? (
        <EmptyList
          message="No skills yet"
          hint="Type one per line in the box above — they render as pills on every theme."
        />
      ) : (
        <div>
          <span className="text-clamp-xs text-gray-400">
            Preview — {skills.length} skill{skills.length === 1 ? "" : "s"}
          </span>
          <ul className="flex flex-wrap gap-xs list-none mt-xs">
            {skills.map((s, i) => (
              <li
                key={i}
                className="text-clamp-xs px-sm py-[2px] rounded-full border border-gray-300 text-gray-700"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </EditorCard>
  );
}

export default SkillsSection;
