import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { ResumeData } from "@/entities/resume";
import { isAuthorized } from "./_auth";

const FILE_PATHS: Record<"en" | "nl", string> = {
  en: path.join(process.cwd(), "app/locales/en/common.json"),
  nl: path.join(process.cwd(), "app/locales/nl/common.json"),
};

const INDENT: Record<"en" | "nl", number> = { en: 2, nl: 4 };

function getLang(req: NextRequest): "en" | "nl" {
  return req.nextUrl.searchParams.get("lang") === "nl" ? "nl" : "en";
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const lang = getLang(req);
  try {
    const raw = fs.readFileSync(FILE_PATHS[lang], "utf8");
    return NextResponse.json(JSON.parse(raw));
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to read resume data", detail: String(err) },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const lang = getLang(req);
  let body: ResumeData;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    fs.writeFileSync(
      FILE_PATHS[lang],
      JSON.stringify(body, null, INDENT[lang]) + "\n",
      "utf8"
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to write resume data", detail: String(err) },
      { status: 500 }
    );
  }
}
