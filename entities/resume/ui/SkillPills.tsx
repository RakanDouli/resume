export interface SkillPillsProps {
  skills: string[];
  /** Theme accent — drives both the outline and the label colour. */
  accent: string;
}

/**
 * Outlined accent pills on a light ground. Used by Basic and Modern.
 *
 * Classic's sidebar chips are NOT this component: they are a translucent
 * `bg-white/10` fill on navy with inherited light text. Same shape, completely
 * different treatment — unifying them would take an `onDark` prop whose only
 * job is to fork the whole style, so they stay separate on purpose.
 */
export function SkillPills({ skills, accent }: SkillPillsProps) {
  if (!skills?.length) return null;

  return (
    <ul className="flex flex-wrap gap-xs list-none">
      {skills.map((s, i) => (
        <li
          key={i}
          className="text-clamp-xs px-sm py-[2px] rounded-full border"
          style={{ borderColor: `${accent}60`, color: accent }}
        >
          {s}
        </li>
      ))}
    </ul>
  );
}

export default SkillPills;
