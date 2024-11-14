// pages/api/themes.ts
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const themesDirectory = path.join(process.cwd(), "components/themes");
    const themeFiles = fs.readdirSync(themesDirectory);

    // Get theme names by filtering only `.tsx` files and removing the extension
    const themeNames = themeFiles
      .filter((file) => file.endsWith(".tsx"))
      .map((file) => file.replace(".tsx", ""));

    res.status(200).json({ themeNames });
  } catch (error) {
    console.error("Error loading themes:", error);
    res.status(500).json({ error: "Failed to load themes" });
  }
}
