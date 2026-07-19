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
