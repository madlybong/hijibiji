<script setup lang="ts">
import { computed } from 'vue';
import { useDocumentStore } from '../../store/useDocumentStore';

const docStore = useDocumentStore();

const emit = defineEmits(['blockSelected']);

const currentPage = computed(() => {
  if (!docStore.document || !docStore.selectedPageId) return null;
  return docStore.document.pages.find(p => p.id === docStore.selectedPageId) || null;
});

const humanize = (type: string) => type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const getIcon = (type: string) => {
  // Simplified icons just for the layers panel (could import blockMeta from GmBlockPalette, but keeping it simple)
  if (type === 'heading') return 'pi pi-heading';
  if (type === 'paragraph') return 'pi pi-align-left';
  if (type === 'datetime') return 'pi pi-calendar';
  if (type === 'text-list') return 'pi pi-list';
  if (type === 'market-card') return 'pi pi-chart-line';
  if (type === 'stock-pick') return 'pi pi-star';
  if (type === 'info-card') return 'pi pi-info-circle';
  if (type === 'data-row') return 'pi pi-table';
  if (type === 'trend-badge') return 'pi pi-arrow-up-right';
  if (type === 'content-grid') return 'pi pi-th-large';
  if (type === 'section-divider') return 'pi pi-minus';
  if (type === 'spacer') return 'pi pi-arrows-v';
  if (type === 'flex-row') return 'pi pi-ellipsis-h';
  if (type === 'flex-col') return 'pi pi-ellipsis-v';
  if (type === 'raw-html') return 'pi pi-code';
  return 'pi pi-box';
};

const selectBlock = (id: string) => {
  docStore.selectBlock(id);
  emit('blockSelected');
};
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
      <div 
        v-for="(block, index) in currentPage.blocks" 
        :key="block.id"
        @click="selectBlock(block.id)"
        class="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors border-l-2"
        :class="docStore.selectedBlockId === block.id ? 'bg-slate-800 border-primary text-slate-100' : 'border-transparent hover:bg-slate-800/50 text-slate-400'"
      >
        <span class="text-xs text-slate-500 w-4">{{ index + 1 }}</span>
        <i :class="getIcon(block.type)" class="text-primary opacity-80 text-sm"></i>
        <span class="text-sm font-medium">{{ humanize(block.type) }}</span>
      </div>
    </div>
  </div>
</template>