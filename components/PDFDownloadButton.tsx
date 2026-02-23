"use client";
import { FaFileDownload } from "react-icons/fa";
import { FC, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { Subtitle } from "./Text";
import { ResumeData } from "@/types/resume";
import { ClassicPDF, ModernPDF, BasicPDF } from "./pdf";

interface PDFDownloadButtonProps {
  fileName: string;
  data: ResumeData;
  theme: string;
}

const PDFDownloadButton: FC<PDFDownloadButtonProps> = ({
  fileName,
  data,
  theme,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);

    try {
      // Select the correct PDF component based on theme
      let PDFComponent;
      switch (theme) {
        case "Modern":
          PDFComponent = <ModernPDF data={data} />;
          break;
        case "Basic":
          PDFComponent = <BasicPDF data={data} />;
          break;
        case "Classic":
        default:
          PDFComponent = <ClassicPDF data={data} />;
          break;
      }

      // Generate PDF blob
      const blob = await pdf(PDFComponent).toBlob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log("PDF generated successfully");
    } catch (err) {
      console.error("Error generating PDF:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hidden lg:flex flex-col gap-sm items-center">
      <div>
        <Subtitle>{fileName}&apos;s Resume</Subtitle>
      </div>
      <button
        className="flex gap-sm border border-text-dark px-md py-sm rounded-lg shadow-lg hover:bg-dark hover:text-light ease-in-out duration-300 transition-all"
        onClick={handleDownload}
        disabled={loading}
      >
        {loading && (
          <span className="flex justify-center items-center">
            <div className="w-md h-md border-4 border-t-4 border-third border-solid rounded-full animate-spin border-t-secondary"></div>
          </span>
        )}
        <FaFileDownload /> Download PDF
      </button>
    </div>
  );
};

export default PDFDownloadButton;
