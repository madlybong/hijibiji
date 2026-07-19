export const exportPdf = async (documentTitle: string) => {
  try {
    const originalTitle = document.title;
    document.title = documentTitle ? `${documentTitle} - Export` : 'Goldmine Export';
    
    window.print();
    
    document.title = originalTitle;
    return true;
  } catch (error) {
    console.error('Failed to print PDF:', error);
    throw error;
  }
};
