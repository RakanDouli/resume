import { FaFileDownload } from "react-icons/fa";
import { jsPDF } from "jspdf";
import { Subtitle } from "./Text";
import html2canvas from "html2canvas";
import { useState } from "react";

interface PDFDownloadButtonProps {
  resumeTemplateRef: React.RefObject<HTMLDivElement>;
  fileName: string;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({
  resumeTemplateRef,
  fileName,
}) => {
  const [loading, setLoading] = useState(false); // State to manage the loading spinner

  const handleDownload = () => {
    if (resumeTemplateRef.current) {
      setLoading(true); // Show the loading spinner

      // Get the current height of the resume
      const resumeHeight = resumeTemplateRef.current.offsetHeight;

      // Calculate extra height (4% of the original height)
      const extraPadding = resumeHeight * 0.259;

      // Total height for the PDF
      const totalHeight = resumeHeight + extraPadding;

      // Use custom dimensions for width and height (e.g., A4 size is 595.28 x 841.89 px)
      const customWidth = 976; // Custom width
      const customHeight = totalHeight; // Calculated height

      // Create a new jsPDF instance with custom dimensions
      const pdf = new jsPDF("p", "px", [customWidth, customHeight]);

      // Use html2canvas to render the HTML content as an image
      const options = {
        scale: 3, // Higher scale for better quality
        useCORS: true, // To allow external resources like images and fonts
      };

      // Render the content of the resume as an image
      html2canvas(resumeTemplateRef.current, options).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        // Add the image to the PDF
        pdf.addImage(imgData, "PNG", 0, 0, customWidth, customHeight);

        // Save the generated PDF
        pdf.save(`${fileName}.pdf`);

        setLoading(false); // Hide the loading spinner after PDF is generated
      });
    }
  };

  return (
    <div className="flex flex-col gap-sm items-center">
      <div>
        <Subtitle>{fileName}&apos;s Resume</Subtitle>
      </div>
      <button
        className="flex gap-sm border border-text-dark px-md py-sm rounded-lg shadow-lg hover:bg-dark hover:text-light ease-in-out duration-300 transition-all"
        onClick={handleDownload}
      >
        {loading && (
          <span className="flex justify-center items-center ">
            <div className="w-md h-md border-4 border-t-4 border-third border-solid rounded-full animate-spin border-t-secondary"></div>
          </span>
        )}
        <FaFileDownload /> Download PDF
      </button>
    </div>
  );
};

export default PDFDownloadButton;
