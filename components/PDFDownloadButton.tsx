import { FaFileDownload } from "react-icons/fa";
import { Subtitle } from "./Text";
import { useState } from "react";
import html2pdf from "html2pdf.js";

interface PDFDownloadButtonProps {
  resumeTemplateRef: React.RefObject<HTMLDivElement>;
  fileName: string;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({
  resumeTemplateRef,
  fileName,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    if (resumeTemplateRef.current) {
      setLoading(true); // Show the loading spinner

      // Get the current height of the resume
      const resumeHeight = resumeTemplateRef.current.offsetHeight;

      // Calculate extra height (4% of the original height)
      const extraPadding = resumeHeight * 0.32;

      // Total height for the PDF
      const customHeight = resumeHeight + extraPadding;

      // Custom width (fixed value)
      const customWidth = 976; // In pixels

      // Convert custom dimensions to inches (for jsPDF)
      const pxToIn = (px: number) => px / 96; // Assuming 96 DPI
      const widthInInches = pxToIn(customWidth);
      const heightInInches = pxToIn(customHeight);

      const options = {
        margin: [0, 0], // No margin to match your dimensions
        filename: `${fileName}.pdf`,
        image: { type: "jpeg", quality: 2 }, // For images in your HTML
        html2canvas: { scale: 2, useCORS: true }, // High-quality canvas rendering
        jsPDF: {
          unit: "in", // Units in inches
          format: [widthInInches, heightInInches], // Custom dimensions in inches
          orientation: "portrait", // Orientation
        },
      };

      // Use html2pdf to render and save the PDF
      const generatePDF = () => {
        return new Promise<void>((resolve) => {
          html2pdf().from(resumeTemplateRef.current!).set(options).save();
          resolve();
        });
      };

      generatePDF()
        .then(() => {
          console.log("PDF generated successfully");
        })
        .catch((err) => {
          console.error("Error generating PDF:", err);
        })
        .finally(() => setLoading(false)); // Hide the loading spinner
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
