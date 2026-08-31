// Public API of the resume-editor slice: the form, and nothing else.
//
// The live preview is deliberately NOT here — it is `ThemeLayout` from the
// resume-view widget, and widgets may not import sibling widgets. `app/page.tsx`
// composes the two panes.
//
// REMOVED(fe-structure): `PasswordGate`. The full-screen gate is gone with the
// /edit route — `/` is public and must render the resume to everyone. Its
// replacement is the inline sign-in popover inside `widgets/site-header`, which
// is where the button that anchors it lives.
export { ResumeEditor } from "./ResumeEditor";
export type { ResumeEditorProps } from "./ResumeEditor";
