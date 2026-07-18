import type { GmBlock } from '../types/document';

/** Recursively find a block by ID. Children are stored in block.data.blocks. */
export const findBlockById = (blocks: GmBlock[], id: string): GmBlock | null => {
  for (const block of blocks) {
    if (block.id === id) return block;
    if (Array.isArray(block.data?.blocks)) {
      const found = findBlockById(block.data.blocks, id);
      if (found) return found;
    }
  }
  return null;
};

/** Find a block and invoke a mutation callback. Returns true if found. */
export const mutateBlockById = (
  blocks: GmBlock[],
  id: string,
  mutate: (block: GmBlock) => void
): boolean => {
  for (const block of blocks) {
    if (block.id === id) { mutate(block); return true; }
    if (Array.isArray(block.data?.blocks)) {
      if (mutateBlockById(block.data.blocks, id, mutate)) return true;
    }
  }
  return false;
};

/** Remove a block by ID, searching recursively. Returns true if removed. */
export const removeBlockById = (blocks: GmBlock[], id: string): boolean => {
  const idx = blocks.findIndex(b => b.id === id);
  if (idx !== -1) { blocks.splice(idx, 1); return true; }
  for (const block of blocks) {
    if (Array.isArray(block.data?.blocks)) {
      if (removeBlockById(block.data.blocks, id)) return true;
    }
  }
  return false;
};