"use client";
import { useState, createContext, ReactNode } from "react";
import localFont from "next/font/local";
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
  language: "en" | "nl";
  setLanguage: (lang: "en" | "nl") => void;
} | null>(null);

export default function RootLayout({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<"en" | "nl">("en");

  return (
    <html lang={language}>
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageContext.Provider value={{ language, setLanguage }}>
          {children}
        </LanguageContext.Provider>
      </body>
    </html>
  );
}
