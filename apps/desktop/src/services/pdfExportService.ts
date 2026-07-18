import { toPng } from 'html-to-image';
import { PDFDocument } from 'pdf-lib';
import { save } from '@tauri-apps/plugin-dialog';
import { writeFile } from '@tauri-apps/plugin-fs';

export const exportPdf = async (pageElements: HTMLElement[], documentTitle: string) => {
  try {
    const pdfDoc = await PDFDocument.create();
    
    // A4 dimensions in points (approx 210mm x 297mm)
    const A4_WIDTH = 595.28;
    const A4_HEIGHT = 841.89;

    for (let i = 0; i < pageElements.length; i++) {
      const el = pageElements[i];
      // Capture at a high pixel ratio for print-quality text (approx 300 DPI)
      const dataUrl = await toPng(el, {
        pixelRatio: 3.0,
        backgroundColor: '#ffffff',
        style: {
          transform: 'none', // Prevent layout shifts during capture
        },
      });

      const pngImage = await pdfDoc.embedPng(dataUrl);
      const page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
      
      page.drawImage(pngImage, {
        x: 0,
        y: 0,
        width: A4_WIDTH,
        height: A4_HEIGHT,
      });
    }

    const pdfBytes = await pdfDoc.save();

    const filePath = await save({
      title: 'Save PDF',
      defaultPath: `${documentTitle.replace(/[^a-zA-Z0-9]/g, '_')}_Export.pdf`,
      filters: [{ name: 'PDF Document', extensions: ['pdf'] }]
    });

    if (filePath) {
      await writeFile(filePath, pdfBytes);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to export PDF:', error);
    throw error;
  }
};
