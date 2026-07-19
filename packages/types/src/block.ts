import type { BlockStyle } from './block-style';

// ============================================================
//  BLOCK TYPES
//  Each string literal corresponds to a registered block
//  component in GmBlockRenderer.vue.
// ============================================================
export type BlockType =
  | 'heading'
  | 'paragraph'
  | 'image'
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
//  BLOCK — a single content unit on a page
// ============================================================
export interface GmBlock {
  id: string;
  type: BlockType;
  label?: string;              // Optional user-defined label for the block
  data: Record<string, any>;   // Block-type-specific content data
  style?: BlockStyle;          // User overrides applied via CSS vars
  children?: GmBlock[];        // For container blocks (content-grid, etc.)
  isHidden?: boolean;          // Is the block hidden from preview/export?
  isLocked?: boolean;          // Is the block locked from editing?
}
