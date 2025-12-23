import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  i18n: {
    locales: ["en", "nl"], // Define supported languages
    defaultLocale: "en", // Default language
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "app/styles")],
  },
};

export default nextConfig;
