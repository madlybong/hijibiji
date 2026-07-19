import type { GmDocument } from '@goldmine/types';

export const validateDocument = (doc: any): doc is GmDocument => {
  // Simple structural validation (placeholder for zod)
  if (!doc || typeof doc !== 'object') return false;
  if (typeof doc.id !== 'string') return false;
  if (!Array.isArray(doc.pages)) return false;
  return true;
};
