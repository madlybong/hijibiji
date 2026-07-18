<script setup lang="ts">
import { computed } from 'vue';
import { useDocumentStore } from '../../store/useDocumentStore';
import GmLayersTreeItem from './GmLayersTreeItem.vue';

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
</script>

<template>
  <div class="h-full flex flex-col">
    <div v-if="!currentPage" class="p-4 text-center text-slate-500 text-sm">
      No page selected.
    </div>
    <div v-else-if="currentPage.blocks.length === 0" class="p-4 text-center text-slate-500 text-sm">
      Page is empty.
    </div>
    <div v-else class="flex flex-col gap-1 p-2">
      <GmLayersTreeItem 
        v-for="(block, index) in currentPage.blocks" 
        :key="block.id"
        :block="block"
        :depth="0"
        :index="index"
      />
    </div>
  </div>
</template>
