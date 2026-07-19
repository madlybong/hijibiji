import type { GmDocument } from '@goldmine/types';

export const migrateDocument = (doc: GmDocument): GmDocument => {
  const removedTypes = ['section-label', 'highlight-text', 'sub-date'];
  
  const filterBlocks = (blocks: any[]): any[] => {
    return blocks
      .filter(b => !removedTypes.includes(b.type))
      .map(b => {
        if (b.children) b.children = filterBlocks(b.children);
        if (b.data && b.data.blocks) b.data.blocks = filterBlocks(b.data.blocks);
        return b;
      });
  };

  doc.headerBlocks = doc.headerBlocks || [];
  doc.footerBlocks = doc.footerBlocks || [];

  doc.pages.forEach(page => {
    page.blocks = filterBlocks(page.blocks);
    
    // Migrate legacy per-page headers/footers to document level
    // (We take the blocks from the first page that has them)
    if ((page as any).headerBlocks && (page as any).headerBlocks.length > 0) {
      if (doc.headerBlocks.length === 0) {
        doc.headerBlocks = filterBlocks((page as any).headerBlocks);
      }
      delete (page as any).headerBlocks;
    }
    
    if ((page as any).footerBlocks && (page as any).footerBlocks.length > 0) {
      if (doc.footerBlocks.length === 0) {
        doc.footerBlocks = filterBlocks((page as any).footerBlocks);
      }
      delete (page as any).footerBlocks;
    }
  });

  doc.headerBlocks = filterBlocks(doc.headerBlocks);
  doc.footerBlocks = filterBlocks(doc.footerBlocks);
  
  if (doc.schemaVersion === undefined) {
    doc.schemaVersion = 1;
  }
  
  return doc;
};
