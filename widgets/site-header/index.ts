// Public API of the site-header slice.
//
// The header is mounted on BOTH `/` (view) and `/edit` (editing) — each page
// is responsible for its own auth wiring and for what it passes as `action`
// (an "Edit →" link on `/`, a Save button on `/edit`). It carries no
// language/theme/editing state of its own; see types.ts for why.
//
// It imports DOWNWARD only: `@/shared/ui`. It must never import
// `@/widgets/resume-view` or `@/widgets/resume-editor` — that is the
// sibling-widget import FSD forbids.
//
// `./SignInPopover.tsx` is intentionally NOT exported: a popover positioned
// against this header's own trigger button has no second consumer.
export { SiteHeader } from "./SiteHeader";
export type { SiteHeaderProps } from "./types";

// Exported so `/` and `/edit` can build their own `action` pill (an "Edit →"
// link, a Save button) with the exact same shape/focus treatment as every
// other control in the bar, instead of redefining it twice.
export { ACTION_PILL } from "./SiteHeader";
