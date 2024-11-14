"use client"; // Add this line at the top of your file
import { FaFileDownload } from "react-icons/fa";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Subtitle } from "./Text";
interface PDFDownloadButtonProps {
  resumeData: string;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({
  resumeData,
}) => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (resumeRef.current) {
      html2canvas(resumeRef.current).then((canvas) => {
        const pdf = new jsPDF();

        const imgData = canvas.toDataURL("image/jpeg");
        pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);

        pdf.save(`${resumeData}-Resume.pdf`);
      });
    }
  };

  return (
    <div className="flex flex-col gap-sm items-center ">
      <div ref={resumeRef}>
        <Subtitle>{resumeData}&apos;s Resume</Subtitle>
      </div>
      <button
        className="flex gap-sm border border-text-dark px-md py-sm rounded-lg shadow-lg hover:bg-dark hover:text-light  ease-in-out duration-300 transition-all"
        onClick={handleDownload}
      >
        <FaFileDownload /> Download PDF
      </button>
    </div>
  );
};

export default PDFDownloadButton;
