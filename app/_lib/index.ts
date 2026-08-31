// Page-level orchestration for `/`.
//
// `_`-prefixed so the App Router treats the folder as private and never tries
// to route it. Everything here has exactly one consumer — `app/page.tsx` — and
// knows the /api/resume endpoints by name, which is why it is not in
// `shared/lib` (domain-free by contract) or `entities/resume` (data shapes).
export { useResumeAuth } from "./useResumeAuth";
export type { ResumeAuth } from "./useResumeAuth";

export { useResumeDoc } from "./useResumeDoc";
export type {
  ResumeDoc,
  UseResumeDocOptions,
  SaveState,
} from "./useResumeDoc";

export { uploadResumePhoto } from "./uploadResumePhoto";

export { ResumeSessionProvider, useResumeSession } from "./ResumeSessionProvider";
export type { ResumeSession } from "./ResumeSessionProvider";

export { AppHeader } from "./AppHeader";
