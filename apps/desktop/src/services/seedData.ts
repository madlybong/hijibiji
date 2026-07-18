import type { GmDocument } from '../types/document';

/**
 * Creates a minimal blank document for new users.
 * Contains one blank page with no pre-filled content.
 */
export const createBlankDocument = (): GmDocument => ({
  id:          crypto.randomUUID(),
  title:       'Untitled Document',
  description: '',
  pageSize:    'A4',
  orientation: 'portrait',
  createdAt:   new Date().toISOString(),
  updatedAt:   new Date().toISOString(),
  headerBlocks: [],
  footerBlocks: [],
  brandSettings: {
    primaryColor: '#D4AF37',
    accentColor:  '#0F172A',
    textColor:    '#1E293B',
    bgColor:      '#FFFFFF',
    headingFont:  'Montserrat, sans-serif',
    bodyFont:     'Inter, sans-serif',
  },
  pages: [
    {
      id:           crypto.randomUUID(),
      type:         'blank',
      label:        'Page 1',
      blocks:       [],
      showHeader:   true,
      showFooter:   true,
      pageStyle: {
        padding: '8mm',
        bgColor: '#FFFFFF',
      },
    },
  ],
});

/**
 * Creates a Goldmine-branded starter document with cover, content, and back cover.
 * Used as a template for new Goldmine reports.
 */
export const createGoldmineTemplate = (): GmDocument => ({
  id:          crypto.randomUUID(),
  title:       'New Goldmine Report',
  description: 'Monthly financial research',
  pageSize:    'A4',
  orientation: 'portrait',
  createdAt:   new Date().toISOString(),
  updatedAt:   new Date().toISOString(),
  headerBlocks: [],
  footerBlocks: [],
  brandSettings: {
    primaryColor: '#D4AF37',
    accentColor:  '#0F172A',
    textColor:    '#1E293B',
    bgColor:      '#FFFFFF',
    headingFont:  'Montserrat, sans-serif',
    bodyFont:     'Inter, sans-serif',
  },
  pages: [
    {
      id:           crypto.randomUUID(),
      type:         'cover',
      label:        'Cover',
      blocks:       [],
      showHeader:   false,
      showFooter:   false,
      pageStyle:    { padding: '0', bgColor: '#0F172A' },
    },
    {
      id:           crypto.randomUUID(),
      type:         'blank',
      label:        'Page 1',
      blocks:       [],
      showHeader:   true,
      showFooter:   true,
    },
    {
      id:           crypto.randomUUID(),
      type:         'back-cover',
      label:        'Back Cover',
      blocks:       [],
      showHeader:   false,
      showFooter:   false,
      pageStyle:    { padding: '0', bgColor: '#0F172A' },
    }
  ],
});
