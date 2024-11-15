"use client";
import { FC, useRef } from "react";
import { ResumeData } from "@/types/resume";
import PDFDownloadButton from "./PDFDownloadButton";
import ThemeLayout from "@/components/ThemeLayout";

interface ResumeProps {
  data: ResumeData;
}

const Resume: FC<ResumeProps> = ({ data }) => {
  // Reference for the specific Resume-template section
  const resumeTemplateRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen sm:pt-2xl sm:pb-2xl pb-lg pt-md">
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
