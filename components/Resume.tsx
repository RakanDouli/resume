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
    <div className="min-h-screen sm:pt-2xl sm:pb-2xl pb-lg pt-md">
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
