<script setup lang="ts">
import Button from 'primevue/button';
import { ZoomIn, ZoomOut, Maximize, Move, MousePointer2, ChevronLeft, ChevronRight } from 'lucide-vue-next';

defineProps<{
  scale: number;
  isPanMode: boolean;
  totalPages: number;
  activePageIndex: number;
  pages: any[];
}>();

const emit = defineEmits<{
  (e: 'update:scale', value: number): void;
  (e: 'update:isPanMode', value: boolean): void;
  (e: 'fitToScreen'): void;
  (e: 'goToPage', index: number): void;
}>();
</script>

<template>
  <div class="gmd-floating-toolbar">
    <Button variant="text" severity="secondary" size="small" rounded @click="emit('update:isPanMode', false)" :class="{ 'bg-surface-700 text-primary': !isPanMode }" v-tooltip.top="'Select Mode'" class="!w-8 !h-8 !p-0">
      <template #icon><MousePointer2 class="w-4 h-4" /></template>
    </Button>
    <Button variant="text" severity="secondary" size="small" rounded @click="emit('update:isPanMode', true)" :class="{ 'bg-surface-700 text-primary': isPanMode }" v-tooltip.top="'Pan Mode'" class="!w-8 !h-8 !p-0">
      <template #icon><Move class="w-4 h-4" /></template>
    </Button>
    
    <div class="w-px h-4 bg-surface-700 mx-1"></div>
    
    <Button variant="text" severity="secondary" size="small" rounded @click="emit('update:scale', Math.max(0.2, scale - 0.1))" v-tooltip.top="'Zoom Out'" class="!w-8 !h-8 !p-0">
      <template #icon><ZoomOut class="w-4 h-4" /></template>
    </Button>
    <div class="flex items-center justify-center w-12 text-xs font-mono pointer-events-none" style="color: var(--p-text-muted-color)">
      {{ Math.round(scale * 100) }}%
    </div>
    <Button variant="text" severity="secondary" size="small" rounded @click="emit('update:scale', Math.min(3, scale + 0.1))" v-tooltip.top="'Zoom In'" class="!w-8 !h-8 !p-0">
      <template #icon><ZoomIn class="w-4 h-4" /></template>
    </Button>
    
    <div class="w-px h-4 bg-surface-700 mx-1"></div>
    
    <Button variant="text" severity="secondary" size="small" rounded @click="emit('fitToScreen')" v-tooltip.top="'Fit to Screen'" class="!w-8 !h-8 !p-0">
      <template #icon><Maximize class="w-4 h-4" /></template>
    </Button>

    <template v-if="totalPages > 1">
      <div class="w-px h-4 bg-surface-700 mx-2"></div>
      
      <Button variant="text" severity="secondary" size="small" rounded @click="emit('goToPage', activePageIndex - 1)" :disabled="activePageIndex <= 0" class="!w-8 !h-8 !p-0" style="color: var(--p-text-muted-color)">
        <template #icon><ChevronLeft class="w-4 h-4" /></template>
      </Button>
      
      <div class="flex items-center gap-1.5 px-2">
        <button 
          v-for="(page, idx) in pages" 
          :key="page.id"
          @click="emit('goToPage', idx)"
          class="w-2 h-2 rounded-full transition-colors"
          :class="activePageIndex === idx ? 'bg-primary' : 'bg-surface-500 hover:bg-surface-400'"
          :title="page.label || `Page ${idx + 1}`"
        ></button>
      </div>
      
      <Button variant="text" severity="secondary" size="small" rounded @click="emit('goToPage', activePageIndex + 1)" :disabled="activePageIndex >= totalPages - 1" class="!w-8 !h-8 !p-0" style="color: var(--p-text-muted-color)">
        <template #icon><ChevronRight class="w-4 h-4" /></template>
      </Button>
    </template>
  </div>
</template>
