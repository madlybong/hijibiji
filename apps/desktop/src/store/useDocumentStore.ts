import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useRefHistory, useDebounceFn } from '@vueuse/core';
import type { GmDocument, GmPage, GmBlock, BlockType, GlobalBrandSettings } from '@goldmine/types';
import type { DocumentAdapter } from '@goldmine/data';

/**
 * @description Pinia store for managing the active document, including its pages, blocks, selection state, and undo/redo history.
 */
export const useDocumentStore = defineStore('document', () => {
  /**
   * The currently active document being edited.
   */
  const document    = ref<GmDocument | null>(null);
  
  /**
   * The storage adapter used to save/load documents (e.g., FileSystem or LocalStorage).
   */
  const adapter     = ref<DocumentAdapter | null>(null);
  
  /**
   * Sets the active storage adapter for the document store.
   * @param a - The initialized DocumentAdapter instance.
   */
  const setAdapter  = (a: DocumentAdapter) => adapter.value = a;
  
  const removeBlockById = (blocks: GmBlock[], id: string): boolean => {
    const idx = blocks.findIndex(b => b.id === id);
    if (idx !== -1) {
      blocks.splice(idx, 1);
      return true;
    }
    for (const block of blocks) {
      if (block.data && Array.isArray(block.data.blocks)) {
        if (removeBlockById(block.data.blocks, id)) return true;
      }
    }
    return false;
  };

  const mutateBlockById = (blocks: GmBlock[], id: string, mutator: (b: GmBlock, parentArr: GmBlock[], idx: number) => void): boolean => {
    const idx = blocks.findIndex(b => b.id === id);
    if (idx !== -1) {
      mutator(blocks[idx], blocks, idx);
      return true;
    }
    for (const b of blocks) {
      if (b.data && Array.isArray(b.data.blocks)) {
        if (mutateBlockById(b.data.blocks, id, mutator)) return true;
      }
    }
    return false;
  };
  /**
   * ID of the currently selected block in the editor.
   */
  const selectedBlockId = ref<string | null>(null);
  /**
   * ID of the currently selected page in the editor.
   */
  const selectedPageId  = ref<string | null>(null);
  /**
   * Tracks whether the document has unsaved changes.
   */
  const isDirty  = ref(false);
  /**
   * Tracks whether the document is actively saving to the adapter.
   */
  const isSaving = ref(false);

  const { undo, redo, canUndo, canRedo, clear: clearHistory } = useRefHistory(document, { 
    deep: true, 
    clone: true,
    capacity: 50
  });

  const debouncedSave = useDebounceFn(async () => {
    if (document.value && adapter.value) {
      isSaving.value = true;
      document.value.updatedAt = new Date().toISOString();
      await adapter.value.saveDocument(document.value);
      isDirty.value = false;
      isSaving.value = false;
    }
  }, 2000);

  watch(document, (newVal, oldVal) => {
    if (newVal && oldVal && newVal.id === oldVal.id) {
      isDirty.value = true;
      debouncedSave();
    }
  }, { deep: true });

  // ----------------------------------------------------------
  // Document lifecycle
  // ----------------------------------------------------------
  
  /**
   * Initializes the store with a new or loaded document.
   * Resets selection state, dirty flag, and undo/redo history.
   * 
   * @param doc - The document object to initialize, or null to clear.
   */
  const initDocument = (doc: GmDocument | null) => {
    document.value = doc;
    isDirty.value  = false;
    clearHistory();
  };

  // ----------------------------------------------------------
  // Page management
  // ----------------------------------------------------------
  
  /**
   * Adds a new page to the document.
   * 
   * @param type - The type of page (cover, back-cover, or blank).
   * @returns The newly created page ID, or undefined if no document exists.
   */
  const addPage = (type: GmPage['type'] = 'blank') => {
    if (!document.value) return;
    const pageIndex = document.value.pages.length + 1;
    const newPage: GmPage = {
      id:    crypto.randomUUID(),
      type,
      label: type === 'cover' ? 'Cover' : type === 'back-cover' ? 'Back Cover' : `Page ${pageIndex}`,
      blocks:       [],
      showHeader:   type === 'blank',    // covers have no header by default
      showFooter:   type === 'blank',    // covers have no footer by default
      pageStyle: {
        padding: '8mm',
        bgColor: type === 'blank' ? '#FFFFFF' : '#0F172A',
      },
    };
    document.value.pages.push(newPage);
    isDirty.value = true;
    return newPage.id;
  };

  /**
   * Deletes a page from the document.
   * Clears selection if the active page is deleted.
   * 
   * @param id - The ID of the page to delete.
   */
  const deletePage = (id: string) => {
    if (!document.value) return;
    document.value.pages = document.value.pages.filter(p => p.id !== id);
    if (selectedPageId.value === id) selectedPageId.value = null;
    isDirty.value = true;
  };

  /**
   * Updates settings for a specific page (e.g. background color).
   * 
   * @param pageId - The target page ID.
   * @param settings - Partial page settings to apply.
   */
  const updatePageSettings = (pageId: string, settings: Partial<GmPage>) => {
    if (!document.value) return;
    const page = document.value.pages.find(p => p.id === pageId);
    if (page) {
      Object.assign(page, settings);
      isDirty.value = true;
    }
  };

  const duplicatePage = (pageId: string) => {
    if (!document.value) return;
    const idx = document.value.pages.findIndex(p => p.id === pageId);
    if (idx !== -1) {
      const clone = JSON.parse(JSON.stringify(document.value.pages[idx]));
      clone.id = crypto.randomUUID();
      const reIdBlocks = (blocks: any[]) => {
        for (const b of blocks) {
          b.id = crypto.randomUUID();
          if (b.data && Array.isArray(b.data.blocks)) {
            reIdBlocks(b.data.blocks);
          }
        }
      };
      reIdBlocks(clone.blocks);
      document.value.pages.splice(idx + 1, 0, clone);
      isDirty.value = true;
    }
  };

  // ----------------------------------------------------------
  // Block management
  // ----------------------------------------------------------
  
  /**
   * Appends or inserts a new block on a page.
   * 
   * @param pageId - The ID of the page.
   * @param type - The block type.
   * @param data - The block's internal data payload.
   * @param afterBlockId - Optional block ID to insert the new block after.
   * @returns The generated ID of the new block.
   */
  const addBlock = (
    pageId: string,
    type: BlockType,
    data: Record<string, any> = {},
    afterBlockId?: string
  ) => {
    if (!document.value) return;
    const page = document.value.pages.find(p => p.id === pageId);
    if (!page) return;

    const newBlock: GmBlock = { id: crypto.randomUUID(), type, data };

    if (afterBlockId) {
      const inserted = mutateBlockById(page.blocks, afterBlockId, (block, parentArr, idx) => {
        parentArr.splice(idx + 1, 0, newBlock);
      });
      if (!inserted) {
        page.blocks.push(newBlock);
      }
    } else {
      page.blocks.push(newBlock);
    }
    isDirty.value = true;
    return newBlock.id;
  };

  const deleteBlock = (pageId: string, blockId: string) => {
    if (!document.value) return;
    const page = document.value.pages.find(p => p.id === pageId);
    if (!page) return;
    if (removeBlockById(page.blocks, blockId)) {
      if (selectedBlockId.value === blockId) selectedBlockId.value = null;
      isDirty.value = true;
    }
  };

  const deleteBlockById = (blockId: string) => {
    if (!document.value) return;
    for (const page of document.value.pages) {
      if (removeBlockById(page.blocks, blockId)) {
        if (selectedBlockId.value === blockId) selectedBlockId.value = null;
        isDirty.value = true;
        return;
      }
    }
  };

  const duplicateBlock = (blockId: string) => {
    if (!document.value) return;
    for (const page of document.value.pages) {
      if (mutateBlockById(page.blocks, blockId, (block, parentArr, idx) => {
        const clone = JSON.parse(JSON.stringify(block));
        clone.id = crypto.randomUUID();
        parentArr.splice(idx + 1, 0, clone);
      })) {
        isDirty.value = true;
        return;
      }
    }
  };

  const updateBlockData = (blockId: string, data: Record<string, any>) => {
    if (!document.value) return;
    for (const page of document.value.pages) {
      if (mutateBlockById(page.blocks, blockId, (block) => {
        block.data = { ...block.data, ...data };
      })) {
        isDirty.value = true;
        return;
      }
    }
  };

  const updateBlockStyle = (blockId: string, style: Record<string, any>) => {
    if (!document.value) return;
    for (const page of document.value.pages) {
      if (mutateBlockById(page.blocks, blockId, (block) => {
        block.style = { ...(block.style || {}), ...style };
      })) {
        isDirty.value = true;
        return;
      }
    }
  };

  const updateBlockMeta = (blockId: string, meta: Partial<GmBlock>) => {
    if (!document.value) return;
    for (const page of document.value.pages) {
      if (mutateBlockById(page.blocks, blockId, (block) => {
        if (meta.label !== undefined) block.label = meta.label;
        if (meta.isHidden !== undefined) block.isHidden = meta.isHidden;
        if (meta.isLocked !== undefined) block.isLocked = meta.isLocked;
      })) {
        isDirty.value = true;
        return;
      }
    }
  };

  const toggleBlockHidden = (blockId: string) => {
    if (!document.value) return;
    for (const page of document.value.pages) {
      if (mutateBlockById(page.blocks, blockId, (block) => {
        block.isHidden = !block.isHidden;
      })) {
        isDirty.value = true;
        return;
      }
    }
  };

  const toggleBlockLocked = (blockId: string) => {
    if (!document.value) return;
    for (const page of document.value.pages) {
      if (mutateBlockById(page.blocks, blockId, (block) => {
        block.isLocked = !block.isLocked;
      })) {
        isDirty.value = true;
        return;
      }
    }
  };

  /**
   * Updates global brand settings for the document.
   * @param settings - The brand settings to merge.
   */
  const updateBrandSettings = (settings: Partial<GlobalBrandSettings>) => {
    if (!document.value) return;
    document.value.brandSettings = {
      ...document.value.brandSettings,
      ...settings,
    };
    isDirty.value = true;
  };

  // ----------------------------------------------------------
  // Selection management
  // ----------------------------------------------------------
  
  /**
   * Selects a block by ID. Deselects the active page.
   * @param id - The ID of the block to select, or null to clear.
   */
  const selectBlock = (id: string | null) => {
    selectedBlockId.value = id;
    if (id) selectedPageId.value = null;
  };

  /**
   * Selects a page by ID. Deselects the active block.
   * @param id - The ID of the page to select, or null to clear.
   */
  const selectPage = (id: string | null) => {
    selectedPageId.value = id;
    if (id) selectedBlockId.value = null;
  };

  const forceSave = async () => {
    if (document.value && adapter.value) {
      isSaving.value = true;
      document.value.updatedAt = new Date().toISOString();
      await adapter.value.saveDocument(document.value);
      isDirty.value = false;
      isSaving.value = false;
    }
  };

  return {
    document,
    adapter,
    setAdapter,
    selectedBlockId,
    selectedPageId,
    isDirty,
    isSaving,
    initDocument,
    addPage,
    deletePage,
    duplicatePage,
    updatePageSettings,
    addBlock,
    deleteBlock,
    deleteBlockById,
    duplicateBlock,
    updateBlockData,
    updateBlockStyle,
    updateBlockMeta,
    toggleBlockHidden,
    toggleBlockLocked,
    updateBrandSettings,
    selectBlock,
    selectPage,
    undo,
    redo,
    canUndo,
    canRedo,
    forceSave,
  };
});