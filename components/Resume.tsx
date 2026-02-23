"use client";
import { FC, useState, useRef, useCallback } from "react";
import { ResumeData } from "@/types/resume";
import PDFDownloadButton from "./PDFDownloadButton";
import ThemeLayout from "@/components/ThemeLayout";

interface ResumeProps {
  data: ResumeData;
  language: string;
  setLanguage: (language: "en" | "nl") => void;
}

const Resume: FC<ResumeProps> = ({ data, setLanguage, language }) => {
  const resumeTemplateRef = useRef<HTMLDivElement>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>("Basic");

  const handleThemeChange = useCallback((theme: string) => {
    setSelectedTheme(theme);
  }, []);

  return (
    <div className="min-h-screen flex flex-col gap-md md:mx-0 mx-md">
      {/* Language Switch Buttons */}
      <div className="container flex justify-end mb-sm">
        <div className="rounded-lg shadow-lg bg-light overflow-hidden">
          <button
            className={`px-md py-sm ${
              language === "en" ? "bg-primary text-light" : "text-dark"
            } transition`}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
          <button
            className={`px-md py-sm ${
              language === "nl" ? "bg-primary text-light" : "text-dark"
            } transition`}
            onClick={() => setLanguage("nl")}
          >
            NL
          </button>
        </div>
      </div>

      {/* Theme Layout */}
      <ThemeLayout
        data={data}
        resumeTemplateRef={resumeTemplateRef}
        onThemeChange={handleThemeChange}
      />

      {/* PDF Download Button */}
      <div className="text-center my-lg">
        <PDFDownloadButton
          fileName={data.basicInfo.name}
          data={data}
          theme={selectedTheme}
        />
      </div>
    </div>
  );
};

export default Resume;
