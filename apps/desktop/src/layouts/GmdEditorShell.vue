<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import GmdTitlebar from '../components/editor/GmdTitlebar.vue';
import GmdLeftPanel from '../components/editor/GmdLeftPanel.vue';
import GmdCanvas from '../components/editor/GmdCanvas.vue';
import GmdRightPanel from '../components/editor/GmdRightPanel.vue';
import { useAppStore } from '../store/useAppStore';
import { useDocumentStore } from '../store/useDocumentStore';

import { GmdAppShell, GmdSidebar } from '@goldmine/ui';

const appStore = useAppStore();
const docStore = useDocumentStore();

const leftCollapsed = ref(false);
const rightCollapsed = ref(false);

const isInputActive = () => {
  const activeElement = document.activeElement;
  if (!activeElement) return false;
  
  const isInput = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA';
  const isContentEditable = activeElement.hasAttribute('contenteditable') && activeElement.getAttribute('contenteditable') !== 'false';
  
  return isInput || isContentEditable;
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    docStore.selectBlock(null);
    docStore.selectPage(null);
    return;
  }

  if (isInputActive()) return;

  if (e.ctrlKey || e.metaKey) {
    if (e.key === 'z') {
      e.preventDefault();
      if (e.shiftKey) {
        if (docStore.canRedo) docStore.redo();
      } else {
        if (docStore.canUndo) docStore.undo();
      }
    } else if (e.key === 'y') {
      e.preventDefault();
      if (docStore.canRedo) docStore.redo();
    } else if (e.key === 'd') {
      e.preventDefault();
      if (docStore.selectedBlockId) {
        docStore.duplicateBlock(docStore.selectedBlockId);
      }
    }
  } else {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (docStore.selectedBlockId) {
        e.preventDefault();
        // Since deleteBlock currently requires pageId, we need to pass it, but wait: 
        // We can make a deleteBlockById that just uses selectedBlockId.
        docStore.deleteBlockById(docStore.selectedBlockId);
      } else if (docStore.selectedPageId) {
        e.preventDefault();
        docStore.deletePage(docStore.selectedPageId);
      }
    }
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
  <GmdAppShell>
    <template #titlebar>
      <GmdTitlebar v-if="appStore.editorMode === 'edit'" />
    </template>
    
    <template #left>
      <GmdSidebar side="left" v-model:collapsed="leftCollapsed" v-if="appStore.editorMode === 'edit'">
        <GmdLeftPanel />
      </GmdSidebar>
    </template>
    
    <template #center>
      <GmdCanvas class="gmd-canvas" />
    </template>
    
    <template #right>
      <GmdSidebar side="right" v-model:collapsed="rightCollapsed" v-if="appStore.editorMode === 'edit'">
        <GmdRightPanel />
      </GmdSidebar>
    </template>
  </GmdAppShell>
</template>
