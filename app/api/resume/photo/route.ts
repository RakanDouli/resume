import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { isAuthorized } from "../_auth";

/**
 * Profile-photo upload. POST only, same authorisation as `PUT /api/resume`.
 *
 * `isAuthorized` is IMPORTED from `../_auth` and not re-implemented — a second,
 * slightly different copy of the check is exactly how an auth gate gets weakened
 * (see the header of that file).
 *
 * Node runtime, not edge: this writes to the filesystem.
 */
export const runtime = "nodejs";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const FIELD_NAME = "photo";
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

interface Sniffed {
  mime: string;
  ext: string;
}

/**
 * Identify the file from its MAGIC BYTES.
 *
 * The `Content-Type` on a multipart part is supplied by the client and is
 * therefore attacker-controlled: an `.html` payload announced as `image/png`
 * would otherwise be written into `public/` and served same-origin. The
 * extension we write comes from THIS function, never from the upload.
 */
function sniff(buf: Buffer): Sniffed | null {
  if (buf.length < 12) return null;

  // JPEG: FF D8 FF
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return { mime: "image/jpeg", ext: "jpg" };
  }
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47 &&
    buf[4] === 0x0d &&
    buf[5] === 0x0a &&
    buf[6] === 0x1a &&
    buf[7] === 0x0a
  ) {
    return { mime: "image/png", ext: "png" };
  }
  // GIF: "GIF87a" / "GIF89a"
  if (buf.subarray(0, 3).toString("ascii") === "GIF") {
    return { mime: "image/gif", ext: "gif" };
  }
  // WebP: "RIFF" .... "WEBP"
  if (
    buf.subarray(0, 4).toString("ascii") === "RIFF" &&
    buf.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return { mime: "image/webp", ext: "webp" };
  }
  return null;
}

/** `image/jpg` is not a real MIME type but browsers and users both use it. */
function normalise(declared: string): string {
  const bare = declared.split(";")[0].trim().toLowerCase();
  return bare === "image/jpg" ? "image/jpeg" : bare;
}

function fail(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return fail("Unauthorized", 401);
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail("Expected a multipart/form-data upload.", 400);
  }

  const entry = form.get(FIELD_NAME);
  if (!entry || typeof entry === "string") {
    return fail(`No file found in the "${FIELD_NAME}" field.`, 400);
  }
  const file = entry as File;

  if (file.size === 0) {
    return fail("That file is empty.", 400);
  }
  // Cheap check first, so a 50 MB upload is rejected before it is buffered.
  if (file.size > MAX_BYTES) {
    return fail("That image is larger than 5 MB. Please pick a smaller one.", 413);
  }

  const buf = Buffer.from(await file.arrayBuffer());
  if (buf.byteLength > MAX_BYTES) {
    return fail("That image is larger than 5 MB. Please pick a smaller one.", 413);
  }

  const sniffed = sniff(buf);
  if (!sniffed) {
    return fail(
      "That file is not a JPEG, PNG, GIF or WebP image.",
      415
    );
  }
  const declared = normalise(file.type || "");
  if (declared && declared !== sniffed.mime) {
    // The header says one thing and the bytes say another. Refuse rather than
    // guess — this is the disguised-payload case.
    return fail(
      `The file claims to be ${declared} but its contents are ${sniffed.mime}.`,
      415
    );
  }

  // Content hash => a re-upload of a CHANGED image gets a new URL, so no
  // browser or CDN can serve the previous photo from cache. Re-uploading the
  // identical image reuses the same file, which is free and idempotent.
  // The user's filename never reaches the path: traversal is impossible
  // because the name is derived entirely from the bytes and the sniffed type.
  const name = `${crypto
    .createHash("sha256")
    .update(buf)
    .digest("hex")
    .slice(0, 32)}.${sniffed.ext}`;

  try {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    fs.writeFileSync(path.join(UPLOAD_DIR, name), buf);
  } catch (err) {
    return fail(`Could not save the image (${String(err)}).`, 500);
  }

  const url = `/uploads/${name}`;
  // `url` is what the client reads; `path` is the documented field name. Same
  // value — they are aliases so neither caller has to change.
  return NextResponse.json({ url, path: url });
}
