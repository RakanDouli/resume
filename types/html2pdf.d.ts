// types/html2pdf.d.ts
declare module "html2pdf.js" {
  interface Html2PdfOptions {
    margin?: number | [number, number, number, number]; // Margin settings
    filename?: string; // PDF filename
    image?: { type: string; quality: number }; // Image settings
    html2canvas?: { scale: number }; // Options for html2canvas
    jsPDF?: { unit: string; format: string; orientation: string }; // Options for jsPDF
  }

  interface Html2Pdf {
    from(element: HTMLElement): Html2Pdf; // Start PDF generation from an element
    save(filename?: string): void; // Save the generated PDF
    set(options: Html2PdfOptions): Html2Pdf; // Set options for pdf generation
  }

  // html2pdf is a function returning an instance of Html2Pdf
  const html2pdf: () => Html2Pdf;

  export default html2pdf;
}
