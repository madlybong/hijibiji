import type { GmBlock } from './block';

// ============================================================
//  PAGE STYLE — controls the page canvas itself
// ============================================================
export interface PageStyle {
  padding?: string;     // Inner content padding (default: '8mm')
  bgColor?: string;     // Page background color  (default: '#FFFFFF')
  bgImage?: string;     // Optional background image URL
}

// ============================================================
//  PAGE TYPE — determines which layout component renders it
//  'blank'      → GmDocPage.vue      (standard white page)
//  'cover'      → GmDocCover.vue     (dark/styled cover)
//  'back-cover' → GmDocBackCover.vue (dark/styled back)
// ============================================================
export type PageType = 'blank' | 'cover' | 'back-cover';

// ============================================================
//  PAGE — a single page within a document
// ============================================================
export interface GmPage {
  id: string;
  type: PageType;
  label: string;              // User-given page name (e.g., "Cover", "Page 1")
  blocks: GmBlock[];
  showHeader?: boolean;       // Default: true for 'blank', false for 'cover'/'back-cover'
  showFooter?: boolean;       // Default: true for 'blank', false for 'cover'/'back-cover'

  pageStyle?: PageStyle;
}

// ============================================================
//  PAGE SIZE — dimensions for the page canvas
// ============================================================
export type PageSize = 'A4' | 'Letter' | 'A3' | 'A5';
