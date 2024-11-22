// Resume.tsx (or the file where you define the Resume component)

import { FC, useRef } from "react";
import { ResumeData } from "@/types/resume"; // Make sure the types are imported correctly
import PDFDownloadButton from "./PDFDownloadButton";
import ThemeLayout from "@/components/ThemeLayout";

interface ResumeProps {
  data: ResumeData; // Define the type for the 'data' prop
}

const Resume: FC<ResumeProps> = ({ data }) => {
  const resumeTemplateRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen flex flex-col gap-md">
      <ThemeLayout data={data} resumeTemplateRef={resumeTemplateRef} />
      <div className="text-center mt-8">
        <PDFDownloadButton
          resumeTemplateRef={resumeTemplateRef}
          fileName={`${data.basicInfo.name}`}
        />
      </div>
    </div>
  );
};

export default Resume;
