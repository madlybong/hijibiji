<script setup lang="ts">
/**
 * @component GmdLayersPanel
 * @description Renders a hierarchical layer tree for the blocks within the current page,
 * including header, body, and footer zones.
 * 
 * @example
 * <GmdLayersPanel @blockSelected="handleBlockSelected" />
 */
import { computed } from 'vue';
import { useDocumentStore } from '../../store/useDocumentStore';
import GmdLayersTreeItem from './GmdLayersTreeItem.vue';
import { GmdEmptyState, GmdSectionLabel } from '@goldmine/ui';

const docStore = useDocumentStore();

const emit = defineEmits(['blockSelected']);

const currentPage = computed(() => {
  if (!docStore.document) return null;
  if (docStore.selectedPageId) {
    return docStore.document.pages.find(p => p.id === docStore.selectedPageId) || null;
  }
  if (docStore.document.pages.length > 0) {
    return docStore.document.pages[0];
  }
  return null;
});

const headerBlocks = computed(() => docStore.document?.headerBlocks || []);
const footerBlocks = computed(() => docStore.document?.footerBlocks || []);
const pageBlocks = computed(() => currentPage.value?.blocks || []);

const isEmpty = computed(() => 
  headerBlocks.value.length === 0 && 
  pageBlocks.value.length === 0 && 
  footerBlocks.value.length === 0
);
</script>

<template>
  <div v-if="!currentPage" class="p-4 h-full">
    <GmdEmptyState title="No page selected" description="Select a page to view its layers" />
  </div>
  <div v-else-if="isEmpty" class="p-4 h-full">
    <GmdEmptyState title="Page is empty" description="Add blocks to see them here" />
  </div>
  <div v-else class="p-2 flex flex-col h-full">
    
    <!-- Header Zone -->
    <div v-if="headerBlocks.length > 0" class="mb-2">
      <GmdSectionLabel label="Document Header" />
      <GmdLayersTreeItem 
        v-for="(block, index) in headerBlocks" 
        :key="block.id"
        :block="block"
        :depth="0"
        :index="index"
        @blockSelected="emit('blockSelected')"
      />
    </div>

    <!-- Main Page Zone -->
    <div v-if="pageBlocks.length > 0" class="mb-2">
      <GmdSectionLabel label="Page Content" />
      <GmdLayersTreeItem 
        v-for="(block, index) in pageBlocks" 
        :key="block.id"
        :block="block"
        :depth="0"
        :index="index"
        @blockSelected="emit('blockSelected')"
      />
    </div>

    <!-- Footer Zone -->
    <div v-if="footerBlocks.length > 0" class="mb-2">
      <GmdSectionLabel label="Document Footer" />
      <GmdLayersTreeItem 
        v-for="(block, index) in footerBlocks" 
        :key="block.id"
        :block="block"
        :depth="0"
        :index="index"
        @blockSelected="emit('blockSelected')"
      />
    </div>

  </div>
</template>
