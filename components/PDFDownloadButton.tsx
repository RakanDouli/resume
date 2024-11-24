"use client";
import { FaFileDownload } from "react-icons/fa";
import { FC, useState, useEffect } from "react";
import { Subtitle } from "./Text";

interface PDFDownloadButtonProps {
  resumeTemplateRef: React.RefObject<HTMLDivElement>;
  fileName: string;
}

// Define a more precise type for html2pdf
type Html2Pdf = {
  from: (element: HTMLElement) => Html2PdfInstance;
};

type Html2PdfInstance = {
  set: (options: object) => Html2PdfInstance;
  save: () => void;
};

const PDFDownloadButton: FC<PDFDownloadButtonProps> = ({
  resumeTemplateRef,
  fileName,
}) => {
  const [loading, setLoading] = useState(false);
  const [html2pdf, setHtml2pdf] = useState<Html2Pdf | null>(null); // Specify the type

  // Load html2pdf.js dynamically when the component mounts
  useEffect(() => {
    import("html2pdf.js")
      .then((module) => {
        setHtml2pdf(module.default); // Assign the default export
      })
      .catch((err) => {
        console.error("Failed to load html2pdf.js", err);
      });
  }, []);

  const handleDownload = () => {
    if (resumeTemplateRef.current && html2pdf) {
      setLoading(true);

      // Get the current height of the resume
      const resumeHeight = resumeTemplateRef.current.offsetHeight;

      // Calculate extra height (4% of the original height)
      const extraPadding = resumeHeight * 0.27;

      // Total height for the PDF
      const customHeight = resumeHeight + extraPadding;

      // Custom width (fixed value)
      const customWidth = 1200; // In pixels

      // Convert custom dimensions to inches (for jsPDF)
      const pxToIn = (px: number) => px / 96; // Assuming 96 DPI
      const widthInInches = pxToIn(customWidth);
      const heightInInches = pxToIn(customHeight);

      const options = {
        filename: `${fileName}.pdf`,
        margin: [0, 0, 0, 0] as [number, number, number, number],
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: {
          unit: "in",
          format: [widthInInches, heightInInches] as unknown as string, // Fix type conflict
          orientation: "portrait",
        },
      };

      // Use html2pdf.js to generate the PDF from the content in resumeTemplateRef
      const generatePDF = () => {
        return new Promise<void>((resolve) => {
          html2pdf.from(resumeTemplateRef.current!).set(options).save();
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
        .finally(() => setLoading(false));
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
