"use client";

import { useContext } from "react";
import Resume from "@/components/Resume";
import enData from "./locales/en/common.json";
import nlData from "./locales/nl/common.json";
import { LanguageContext } from "@/app/RootLayout"; // Import context

export default function Home() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("LanguageContext not found!");
  }

  const { language, setLanguage } = context;

  // Select the appropriate data based on the language
  const resumeData = language === "en" ? enData : nlData;

  return (
    <div className="min-h-screen sm:pb-2xl pb-lg pt-md md:mx-0 mx-md flex flex-col gap-sm">
      <div className="container flex justify-end">
        <div className="rounded-lg bg-light overflow-hidden shadow-lg">
          {/* Language Switch Buttons */}
          <button
            className="px-md py-sm text-dark focus:bg-dark focus:text-light transition"
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
          <button
            className="px-md py-sm  text-dark focus:bg-dark focus:text-light transition"
            onClick={() => setLanguage("nl")}
          >
            NL
          </button>
        </div>
      </div>

      <main>
        <Resume data={resumeData} /> {/* Pass the data prop correctly */}
      </main>
    </div>
  );
}
