"use client";
import { useState, createContext, ReactNode } from "react";
import localFont from "next/font/local";
import type { Locale } from "@/entities/resume";
import { ResumeSessionProvider } from "./_lib/ResumeSessionProvider";
import { AppHeader } from "./_lib/AppHeader";
import "./styles/global.scss";

// Load fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Create Language Context
export const LanguageContext = createContext<{
  language: Locale;
  setLanguage: (lang: Locale) => void;
} | null>(null);

export default function RootLayout({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Locale>("en");

  return (
    <html lang={language}>
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageContext.Provider value={{ language, setLanguage }}>
          {/* Mounted here, ABOVE both `/` and `/edit`, so the session check
              and resume fetch run once per app load, not once per page —
              see ResumeSessionProvider's own comment for why that matters. */}
          <ResumeSessionProvider>
            {/* Also here, not inside either page — see AppHeader's own
                comment. A layout doesn't remount between sibling-page
                navigations, so the header (and its floating pill) now
                persists across `/` <-> `/edit` instead of flashing. */}
            <AppHeader />
            {children}
          </ResumeSessionProvider>
        </LanguageContext.Provider>
      </body>
    </html>
  );
}
