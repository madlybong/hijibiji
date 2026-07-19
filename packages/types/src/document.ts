import type { GmBlock } from './block';
import type { GmPage, PageSize } from './page';
import type { GlobalBrandSettings } from './brand';

// ============================================================
//  DOCUMENT — the top-level data structure for a user's document
// ============================================================
export interface GmDocument {
  id: string;
  schemaVersion: number;       // For migration and versioning
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
