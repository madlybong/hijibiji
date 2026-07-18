import type { PageSize } from '../types/document';

export interface PageDimensions {
  widthMm: number; heightMm: number;
  widthPt: number; heightPt: number;
}

const PAGE_SIZES: Record<PageSize, PageDimensions> = {
  A4:     { widthMm: 210,   heightMm: 297,   widthPt: 595.28,  heightPt: 841.89  },
  Letter: { widthMm: 215.9, heightMm: 279.4, widthPt: 612,     heightPt: 792     },
  A3:     { widthMm: 297,   heightMm: 420,   widthPt: 841.89,  heightPt: 1190.55 },
  A5:     { widthMm: 148,   heightMm: 210,   widthPt: 419.53,  heightPt: 595.28  },
};

export const getPageDimensions = (size: PageSize): PageDimensions =>
  PAGE_SIZES[size] ?? PAGE_SIZES.A4;