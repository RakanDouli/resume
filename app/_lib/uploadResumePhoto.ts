/**
 * Client half of the profile-photo upload.
 *
 * DECISION(fe-structure): a plain async function in `app/_lib`, NOT a fetch
 * inside `PersonalInfoSection`.
 *
 * The editor widget is fully controlled and knows nothing about auth or
 * endpoints — threading the password down page -> ResumeEditor ->
 * PersonalInfoSection just to build a header would leak the session into a
 * presentational slice. Instead `app/page.tsx` closes over the password and
 * hands the editor a single `onUploadPhoto: (file: File) => Promise<string>`.
 * The widget awaits a URL and patches `photoUrl`; it never learns where the URL
 * came from, and it stays testable with a stub.
 *
 * Sends `x-edit-password` explicitly even though the httpOnly cookie would also
 * authorise: PUT already does, and the cookie expires at 8h while the
 * sessionStorage password does not.
 */
export async function uploadResumePhoto(
  file: File,
  password: string
): Promise<string> {
  const body = new FormData();
  body.append("photo", file);

  const res = await fetch("/api/resume/photo", {
    method: "POST",
    headers: { "x-edit-password": password },
    body, // no Content-Type — the browser must set the multipart boundary
  });

  if (!res.ok) {
    const detail = await res
      .json()
      .then((j: { error?: string }) => j.error)
      .catch(() => null);
    throw new Error(detail ?? `Upload failed (${res.status})`);
  }

  const { url } = (await res.json()) as { url: string };
  return url;
}
