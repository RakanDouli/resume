import type { Entry } from "../model/types";

export interface EntryBlockProps {
  entry: Entry;
  /** Theme accent, used for the organization line. */
  accent: string;
  /**
   * Content flag, not a style toggle: Classic's project list deliberately shows
   * only the organization, while every other list shows `org · location`.
   */
  showLocation?: boolean;
}

/**
 * One experience / project entry: title + date range on one line, organization
 * underneath, then the bullets. This markup is identical in Basic, Classic and
 * Modern, which is why it lives here instead of being copy-pasted three times.
 *
 * The trailing `mb-md` is intentional — sections rely on it for the gap after
 * the last entry.
 */
export function EntryBlock({
  entry,
  accent,
  showLocation = true,
}: EntryBlockProps) {
  const { title, organization, location, start, end, bullets } = entry;

  return (
    // `print:break-inside-avoid` — without it, a long entry can split
    // across two printed pages with its bullets orphaned on the next page,
    // separated from its own title/org line.
    <div className="mb-md print:break-inside-avoid">
      <div className="flex justify-between items-baseline flex-wrap gap-xs">
        <span className="font-bold text-dark text-clamp-md">{title}</span>
        <span className="text-gray-400 text-clamp-xs whitespace-nowrap">
          {start} — {end}
        </span>
      </div>
      <div className="text-clamp-sm" style={{ color: accent }}>
        {organization}
        {showLocation && location ? ` · ${location}` : ""}
      </div>
      {bullets?.length > 0 && (
        <ul className="list-disc list-inside mt-xs flex flex-col gap-[2px]">
          {bullets.map((b, i) => (
            <li key={i} className="text-clamp-sm text-gray-700">
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EntryBlock;
