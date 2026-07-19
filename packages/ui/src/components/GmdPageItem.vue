<script setup lang="ts">
import { GripVertical } from 'lucide-vue-next';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import type { GmPage } from '@goldmine/types';

const props = defineProps<{
  page: GmPage;
  isSelected: boolean;
  index: number;
}>();

const emit = defineEmits<{
  (e: 'click'): void;
  (e: 'duplicate'): void;
  (e: 'delete'): void;
}>();

const getPageSeverity = (type: string) => {
  if (type === 'cover') return 'info';
  if (type === 'back-cover') return 'warn';
  return 'secondary';
};
</script>

<template>
  <div 
    class="gmd-list-item group"
    :class="{ 'gmd-list-item--active': isSelected }"
    @click="emit('click')"
  >
    <!-- Drag Handle -->
    <div class="drag-handle cursor-grab text-surface-500 hover:text-surface-200 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <GripVertical class="w-3.5 h-3.5" />
    </div>
    
    <!-- Thumbnail Silhouette -->
    <div class="rounded-sm aspect-[1/1.41] bg-surface-950 border border-surface-700 w-6 flex items-center justify-center flex-shrink-0 overflow-hidden">
      <div class="w-full h-full opacity-20" :style="{ backgroundColor: page.pageStyle?.bgColor || '#0F172A' }" v-if="page.type !== 'blank'"></div>
      <div class="w-full h-full bg-white opacity-90" v-else></div>
    </div>

    <!-- Title & Badge -->
    <div class="flex-1 flex flex-col gap-1 min-w-0">
      <span class="font-bold text-xs truncate" :style="{ color: isSelected ? 'var(--p-text-color)' : 'var(--p-text-color)' }">
        {{ page.label || `Page ${index + 1}` }}
      </span>
      <div class="flex items-center">
        <Tag :value="page.type" :severity="getPageSeverity(page.type)" class="text-[8px] uppercase tracking-wider !px-1.5 !py-0.5 leading-none" />
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <Button icon="pi pi-copy" variant="text" severity="secondary" size="small" rounded class="!w-6 !h-6 !p-0" @click.stop="emit('duplicate')" v-tooltip="'Duplicate'" />
      <Button icon="pi pi-trash" variant="text" severity="danger" size="small" rounded class="!w-6 !h-6 !p-0" @click.stop="emit('delete')" v-tooltip="'Delete'" />
    </div>
  </div>
</template>
