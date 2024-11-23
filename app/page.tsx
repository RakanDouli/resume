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
    <div className="min-h-screen sm:pb-2xl pb-xl pt-md md:mx-0 mx-md flex flex-col gap-sm">
      <main>
        <Resume
          data={resumeData}
          setLanguage={setLanguage}
          language={language}
        />{" "}
      </main>
    </div>
  );
}
