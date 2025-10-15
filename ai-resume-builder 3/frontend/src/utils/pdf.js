import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

export const exportPdf = async (ref) => {
  if (!ref.current) {
    console.error("No element reference provided for PDF export");
    return;
  }

  try {
    const element = ref.current;

    // Clone element to avoid affecting the original
    const cloned = element.cloneNode(true);

    // Apply styles for PDF generation
    cloned.style.margin = "0";
    cloned.style.padding = "30px";
    cloned.style.backgroundColor = "#ffffff"; // White background for PDF
    cloned.style.color = "#000000"; // Black text for PDF
    cloned.style.width = element.offsetWidth + "px";
    cloned.style.position = "absolute";
    cloned.style.top = "0";
    cloned.style.left = "0";
    cloned.style.zIndex = "-9999";
    cloned.style.fontFamily = "Arial, sans-serif"; // Ensure consistent font

    // Make sure all text is visible in PDF
    const allTextElements = cloned.querySelectorAll('*');
    allTextElements.forEach(el => {
      el.style.color = "#000000";
      el.style.backgroundColor = "transparent";
    });

    // Handle gradient text by converting to solid color
    const gradientElements = cloned.querySelectorAll('[style*="background-clip: text"]');
    gradientElements.forEach(el => {
      el.style.background = "none";
      el.style.color = "#2563eb"; // Blue color for headers
      el.style.WebkitBackgroundClip = "initial";
      el.style.WebkitTextFillColor = "initial";
    });

    document.body.appendChild(cloned);

    // Configure html2canvas for better quality
    const canvas = await html2canvas(cloned, {
      backgroundColor: "#ffffff",
      scale: 2, // Reduced scale for better performance while maintaining quality
      useCORS: true,
      scrollY: 0,
      allowTaint: false,
      width: cloned.offsetWidth,
      height: cloned.offsetHeight,
    });

    const imgData = canvas.toDataURL("image/png", 0.95); // Higher quality

    // Create PDF with proper dimensions
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth - 20; // Add margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Handle multi-page PDFs if content is too long
    let yPosition = 10; // Start with top margin
    const pageHeight = pdfHeight - 20; // Account for margins

    if (imgHeight <= pageHeight) {
      // Single page
      pdf.addImage(imgData, "PNG", 10, yPosition, imgWidth, imgHeight);
    } else {
      // Multi-page handling
      let remainingHeight = imgHeight;
      let sourceY = 0;

      while (remainingHeight > 0) {
        const currentPageHeight = Math.min(pageHeight, remainingHeight);
        const canvasSlice = document.createElement('canvas');
        const ctx = canvasSlice.getContext('2d');

        canvasSlice.width = canvas.width;
        canvasSlice.height = (currentPageHeight / imgHeight) * canvas.height;

        ctx.drawImage(
          canvas,
          0, sourceY, canvas.width, canvasSlice.height,
          0, 0, canvas.width, canvasSlice.height
        );

        const sliceImgData = canvasSlice.toDataURL("image/png", 0.95);
        pdf.addImage(sliceImgData, "PNG", 10, yPosition, imgWidth, currentPageHeight);

        remainingHeight -= currentPageHeight;
        sourceY += canvasSlice.height;

        if (remainingHeight > 0) {
          pdf.addPage();
          yPosition = 10;
        }
      }
    }

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `resume_${timestamp}.pdf`;

    pdf.save(filename);

    // Cleanup
    document.body.removeChild(cloned);

    console.log("PDF exported successfully");
  } catch (error) {
    console.error("Error exporting PDF:", error);
    alert("Failed to export PDF. Please try again.");
  }
};
