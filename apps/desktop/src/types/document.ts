// ============================================================
//  BLOCK TYPES
//  Each string literal corresponds to a registered block
//  component in GmBlockRenderer.vue.
// ============================================================
export type BlockType =
  | 'heading'
  | 'paragraph'
  | 'datetime'
  | 'section-divider'
  | 'text-list'
  | 'data-row'
  | 'content-grid'
  | 'flex-row'
  | 'flex-col'
  | 'market-card'
  | 'info-card'
  | 'stock-pick'
  | 'data-table'
  | 'trend-badge'
  | 'spacer'
  | 'raw-html'
  | 'page-number';

// ============================================================
//  BLOCK STYLE — flat object that maps to CSS custom properties
//  All fields are optional. GmBlockWrapper converts these to
//  --block-* CSS variables so block components can read them.
// ============================================================
export interface BlockStyle {
  color?: string;               // → --block-color
  backgroundColor?: string;     // → --block-bg-color
  padding?: string;             // → --block-padding (applied directly)
  margin?: string;              // → --block-margin  (applied directly)
  fontSize?: string;            // → --block-font-size
  fontWeight?: string;          // → --block-font-weight
  fontFamily?: string;          // → --block-font-family
  textAlign?: 'left' | 'center' | 'right' | 'justify'; // → --block-text-align
  fontStyle?: 'normal' | 'italic';                     // → --block-font-style
  textDecoration?: 'none' | 'underline' | 'line-through'; // → --block-text-decoration
  textTransform?: 'none' | 'uppercase' | 'capitalize' | 'lowercase'; // → --block-text-transform
  lineHeight?: string;          // → --block-line-height
  borderRadius?: string;        // → --block-border-radius
  opacity?: string;             // → --block-opacity
  width?: string;               // → --block-width
  height?: string;              // → --block-height
  minHeight?: string;           // → --block-min-height
  border?: string;              // → --block-border
  borderColor?: string;         // → --block-border-color
  borderWidth?: string;         // → --block-border-width
  borderStyle?: string;         // → --block-border-style
  boxShadow?: string;           // → --block-box-shadow
  overflow?: string;            // → --block-overflow
}

// ============================================================
//  BLOCK — a single content unit on a page
// ============================================================
export interface GmBlock {
  id: string;
  type: BlockType;
  data: Record<string, any>;   // Block-type-specific content data
  style?: BlockStyle;          // User overrides applied via CSS vars
  children?: GmBlock[];        // For container blocks (content-grid, etc.)
  isHidden?: boolean;          // Is the block hidden from preview/export?
  isLocked?: boolean;          // Is the block locked from editing?
}

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
  showFooter?: boolean;       // Default: true for 'blank', false for 'cover'/'back-cover'
  pageStyle?: PageStyle;
}

// ============================================================
//  PAGE SIZE — dimensions for the page canvas
// ============================================================
export type PageSize = 'A4' | 'Letter' | 'A3' | 'A5';

// ============================================================
//  GLOBAL BRAND SETTINGS — document-level defaults that
//  block components fall back to when no block.style override
//  is present.
// ============================================================
export interface GlobalBrandSettings {
  primaryColor: string;    // e.g., '#D4AF37'
  accentColor: string;     // e.g., '#0F172A'
  textColor: string;       // e.g., '#1E293B' — default body text
  bgColor: string;         // e.g., '#FFFFFF' — default page background
  headingFont: string;     // e.g., 'Montserrat, sans-serif'
  bodyFont: string;        // e.g., 'Inter, sans-serif'
}

// ============================================================
//  DOCUMENT — the top-level data structure for a user's document
// ============================================================
export interface GmDocument {
  id: string;
  title: string;
  description?: string;        // Optional subtitle or short description
  pageSize: PageSize;          // Canvas dimensions (replaces hardcoded A4)
  orientation: 'portrait' | 'landscape';
  createdAt: string;           // ISO 8601 timestamp
  updatedAt: string;           // ISO 8601 timestamp
  brandSettings: GlobalBrandSettings;
  headerBlocks: GmBlock[];
  footerBlocks: GmBlock[];
  pages: GmPage[];
}
