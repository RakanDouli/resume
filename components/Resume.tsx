import { FC, useRef } from "react";
import { ResumeData } from "@/types/resume"; // Ensure types are imported correctly
import PDFDownloadButton from "./PDFDownloadButton";
import ThemeLayout from "@/components/ThemeLayout";

// Update the type of setLanguage to accept "en" or "nl"
interface ResumeProps {
  data: ResumeData;
  language: string;
  setLanguage: (language: "en" | "nl") => void; // Specify the valid language types
}

const Resume: FC<ResumeProps> = ({ data, setLanguage, language }) => {
  const resumeTemplateRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen flex flex-col gap-md">
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
      <ThemeLayout data={data} resumeTemplateRef={resumeTemplateRef} />

      {/* PDF Download Button */}
      <div className="text-center my-lg">
        <PDFDownloadButton
          resumeTemplateRef={resumeTemplateRef}
          fileName={`${data.basicInfo.name}`}
        />
      </div>
    </div>
  );
};

export default Resume;
