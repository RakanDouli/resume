/**
 * Route-level loading UI for `/`, shown by Next.js while this segment's code
 * is being fetched/rendered on navigation — separate from `auth.checking`
 * (an in-page state for the session check), which now only ever fires once
 * per app load since ResumeSessionProvider moved to the root layout.
 */
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bodyBg">
      <div
        role="status"
        aria-label="Loading"
        className="h-8 w-8 animate-spin rounded-full border-2 border-lightgray border-t-primary"
      />
    </div>
  );
}
