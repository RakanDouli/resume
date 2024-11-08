"use client"; // Add this line at the top of your file

import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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
    <div>
      <button onClick={handleDownload}>Download PDF</button>
      <div ref={resumeRef}>
        <h1>{resumeData}&apos;s Resume</h1>
      </div>
    </div>
  );
};

export default PDFDownloadButton;
