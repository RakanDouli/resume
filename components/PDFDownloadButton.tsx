import { FaFileDownload } from "react-icons/fa";
import html2pdf from "html2pdf.js";
import { Subtitle } from "./Text";

interface PDFDownloadButtonProps {
  resumeTemplateRef: React.RefObject<HTMLDivElement>;
  fileName: string;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({
  resumeTemplateRef,
  fileName,
}) => {
  const handleDownload = () => {
    if (resumeTemplateRef.current) {
      // Get the current height of the resume
      const resumeHeight = resumeTemplateRef.current.offsetHeight;

      // Calculate extra height as 4% of the original height
      const extraPadding = resumeHeight * 0.259;
      console.log(extraPadding);
      // Total height for the PDF
      const totalHeight = resumeHeight + extraPadding;
      console.log("totalHeight", totalHeight);
      // Configure PDF options
      const options = {
        margin: [0, 0, 0, 0], // Remove extra margin
        filename: `${fileName}.pdf`,
        image: { type: "png", quality: 1 },
        html2canvas: {
          scale: 2, // Higher quality rendering
          useCORS: true, // Handle CORS for external images
        },
        jsPDF: {
          unit: "px",
          format: [976, totalHeight], // Add the calculated padding
          orientation: "portrait",
        },
      };

      // Generate and save the PDF
      html2pdf().from(resumeTemplateRef.current).set(options).save();
    }
  };

  return (
    <div className="flex flex-col gap-sm items-center ">
      <div>
        <Subtitle>{fileName}&apos;s Resume</Subtitle>
      </div>
      <button
        className="flex gap-sm border border-text-dark px-md py-sm rounded-lg shadow-lg hover:bg-dark hover:text-light ease-in-out duration-300 transition-all"
        onClick={handleDownload}
      >
        <FaFileDownload /> Download PDF
      </button>
    </div>
  );
};

export default PDFDownloadButton;
