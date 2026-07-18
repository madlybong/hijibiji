import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { GmDocument, GmPage, GmBlock, BlockType, GlobalBrandSettings } from '../types/document';

export const useDocumentStore = defineStore('document', () => {
  const document    = ref<GmDocument | null>(null);
  
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

  const mutateBlockById = (blocks: GmBlock[], id: string, mutator: (b: GmBlock) => void): boolean => {
    const block = blocks.find(b => b.id === id);
    if (block) {
      mutator(block);
      return true;
    }
    for (const b of blocks) {
      if (b.data && Array.isArray(b.data.blocks)) {
        if (mutateBlockById(b.data.blocks, id, mutator)) return true;
      }
    }
    return false;
  };
  const selectedBlockId = ref<string | null>(null);
  const selectedPageId  = ref<string | null>(null);
  const isDirty  = ref(false);
  const isSaving = ref(false);

  // ----------------------------------------------------------
  // Document lifecycle
  // ----------------------------------------------------------
  const initDocument = (doc: GmDocument) => {
    document.value = doc;
    isDirty.value  = false;
  };

  // ----------------------------------------------------------
  // Page management
  // ----------------------------------------------------------
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

  const deletePage = (id: string) => {
    if (!document.value) return;
    document.value.pages = document.value.pages.filter(p => p.id !== id);
    if (selectedPageId.value === id) selectedPageId.value = null;
    isDirty.value = true;
  };

  const updatePageSettings = (pageId: string, settings: Partial<GmPage>) => {
    if (!document.value) return;
    const page = document.value.pages.find(p => p.id === pageId);
    if (page) {
      Object.assign(page, settings);
      isDirty.value = true;
    }
  };

  // ----------------------------------------------------------
  // Block management
  // ----------------------------------------------------------
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
      const idx = page.blocks.findIndex(b => b.id === afterBlockId);
      if (idx !== -1) {
        page.blocks.splice(idx + 1, 0, newBlock);
      } else {
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
    page.blocks = page.blocks.filter(b => b.id !== blockId);
    if (selectedBlockId.value === blockId) selectedBlockId.value = null;
    isDirty.value = true;
  };

  const updateBlockData = (blockId: string, data: Record<string, any>) => {
    if (!document.value) return;
    for (const page of document.value.pages) {
      const block = page.blocks.find(b => b.id === blockId);
      if (block) {
        block.data    = { ...block.data, ...data };
        isDirty.value = true;
        return;
      }
    }
  };

  const updateBlockStyle = (blockId: string, style: Record<string, any>) => {
    if (!document.value) return;
    for (const page of document.value.pages) {
      const block = page.blocks.find(b => b.id === blockId);
      if (block) {
        block.style   = { ...(block.style || {}), ...style };
        isDirty.value = true;
        return;
      }
    }
  };

  const toggleBlockHidden = (blockId: string) => {
    if (!document.value) return;
    for (const page of document.value.pages) {
      const block = page.blocks.find(b => b.id === blockId);
      if (block) {
        block.isHidden = !block.isHidden;
        isDirty.value = true;
        return;
      }
    }
  };

  const toggleBlockLocked = (blockId: string) => {
    if (!document.value) return;
    for (const page of document.value.pages) {
      const block = page.blocks.find(b => b.id === blockId);
      if (block) {
        block.isLocked = !block.isLocked;
        isDirty.value = true;
        return;
      }
    }
  };

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
  const selectBlock = (id: string | null) => {
    selectedBlockId.value = id;
    if (id) selectedPageId.value = null;
  };

  const selectPage = (id: string | null) => {
    selectedPageId.value = id;
    if (id) selectedBlockId.value = null;
  };

  return {
    document,
    selectedBlockId,
    selectedPageId,
    isDirty,
    isSaving,
    initDocument,
    addPage,
    deletePage,
    updatePageSettings,
    addBlock,
    deleteBlock,
    updateBlockData,
    updateBlockStyle,
    toggleBlockHidden,
    toggleBlockLocked,
    updateBrandSettings,
    selectBlock,
    selectPage,
  };
});