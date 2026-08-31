import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // The dev-only floating build-activity icon (bottom-left) is a fixed-position
  // DOM element — it prints along with the page since it's part of the DOM.
  // Off entirely so it never shows up, in dev or in a print/PDF taken from dev.
  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
  },
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
