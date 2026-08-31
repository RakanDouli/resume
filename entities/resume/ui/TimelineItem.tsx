import type { ReactNode } from "react";

export interface TimelineItemProps {
  /** Colour of the timeline dot. */
  accent: string;
  children: ReactNode;
}

/**
 * Indents its child and puts a decorative dot in the gutter.
 *
 * Composition rather than an `EntryBlock timeline` boolean: Classic and Modern
 * wrap their experience entries in this, Basic and the project lists do not.
 * It carries no bottom margin of its own — `EntryBlock` already owns that.
 */
export function TimelineItem({ accent, children }: TimelineItemProps) {
  return (
    <div className="relative pl-md print:break-inside-avoid">
      <span
        aria-hidden="true"
        className="absolute left-0 top-[6px] w-[8px] h-[8px] rounded-full"
        style={{ backgroundColor: accent }}
      />
      {children}
    </div>
  );
}

export default TimelineItem;
