"use client";

import { FC } from "react";
import { ResumeData } from "@/types/resume";
import PDFDownloadButton from "./PDFDownloadButton";
import ThemeLayout from "@/components/ThemeLayout";

interface ResumeProps {
  data: ResumeData;
}

const Resume: FC<ResumeProps> = ({ data }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 py-20 sm:py-10 text-black dark:text-white">
      {/* Theme Layout */}
      <ThemeLayout data={data} />

      {/* PDF Download Button */}
      <div className="text-center mt-8">
        <PDFDownloadButton resumeData={data.basicInfo.name} />
      </div>
    </div>
  );
};

export default Resume;
