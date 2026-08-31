/** Route-level loading UI for `/edit` — same shape as `app/loading.tsx`. */
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
