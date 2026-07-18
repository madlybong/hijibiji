<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus';
import { Type, LayoutGrid, FileText, Activity, TrendingUp, Maximize2 } from 'lucide-vue-next';
import type { BlockType } from '../../types/document';

const createTemplate = (type: BlockType, data: any) => ({
  id: crypto.randomUUID(), // Temporarily use an ID, will be replaced on drop
  type,
  data
});

// Define available blocks
const typographyBlocks = [
  { label: 'Heading', icon: Type, template: createTemplate('heading', { level: 2, text: 'New Heading' }) },
  { label: 'Paragraph', icon: FileText, template: createTemplate('paragraph', { html: 'Enter text here...' }) },
  { label: 'Section Label', icon: Type, template: createTemplate('section-label', { text: 'SECTION LABEL' }) },
  { label: 'Highlight Text', icon: Type, template: createTemplate('highlight-text', { text: 'Highlight Text' }) },
  { label: 'Text List', icon: FileText, template: createTemplate('text-list', { ordered: false, items: ['Item 1', 'Item 2'] }) },
];

const dataBlocks = [
  { label: 'Market Card', icon: Activity, template: createTemplate('market-card', { label: 'LABEL', value: '1,000', borderColor: 'none' }) },
  { label: 'Stock Pick', icon: TrendingUp, template: createTemplate('stock-pick', { stockName: 'STOCK', stockDesc: 'Description', cmp: '-', target: '-', addOnDip: '-', exit: '-', upside: '-', upsideTime: '-' }) },
  { label: 'Info Card', icon: FileText, template: createTemplate('info-card', { title: 'Title', text: 'Info text...' }) },
  { label: 'Data Row', icon: Activity, template: createTemplate('data-row', { label: 'Label', value: 'Value' }) },
  { label: 'Trend Badge', icon: TrendingUp, template: createTemplate('trend-badge', { value: '0%', trend: 'up' }) },
];

const layoutBlocks = [
  { label: '2-Col Grid', icon: LayoutGrid, template: createTemplate('content-grid', { cols: 2, blocks: [] }) },
  { label: '4-Col Grid', icon: LayoutGrid, template: createTemplate('content-grid', { cols: 4, blocks: [] }) },
  { label: 'Divider', icon: Maximize2, template: createTemplate('section-divider', { label: 'DIVIDER' }) },
  { label: 'Spacer', icon: Maximize2, template: createTemplate('spacer', { height: 20 }) },
];

// Combine all for the clone function
const cloneBlock = (blockTemplate: any) => {
  return {
    ...blockTemplate.template,
    id: crypto.randomUUID()
  };
};

</script>

<template>
  <div class="flex flex-col gap-6 select-none">
    
    <div>
      <h3 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Typography</h3>
      <VueDraggable
        :modelValue="typographyBlocks"
        :group="{ name: 'blocks', pull: 'clone', put: false }"
        :clone="cloneBlock"
        :sort="false"
        class="grid grid-cols-2 gap-2"
      >
        <div v-for="block in typographyBlocks" :key="block.label" class="bg-[#2A2A2A] border border-[#404040] rounded p-2 flex flex-col items-center justify-center gap-2 cursor-grab hover:bg-[#333] hover:border-gm-gold transition-colors">
          <component :is="block.icon" class="w-5 h-5 text-gray-400" />
          <span class="text-[10px] font-semibold text-gray-300 text-center leading-tight">{{ block.label }}</span>
        </div>
      </VueDraggable>
    </div>

    <div>
      <h3 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Data & Markets</h3>
      <VueDraggable
        :modelValue="dataBlocks"
        :group="{ name: 'blocks', pull: 'clone', put: false }"
        :clone="cloneBlock"
        :sort="false"
        class="grid grid-cols-2 gap-2"
      >
        <div v-for="block in dataBlocks" :key="block.label" class="bg-[#2A2A2A] border border-[#404040] rounded p-2 flex flex-col items-center justify-center gap-2 cursor-grab hover:bg-[#333] hover:border-gm-gold transition-colors">
          <component :is="block.icon" class="w-5 h-5 text-gray-400" />
          <span class="text-[10px] font-semibold text-gray-300 text-center leading-tight">{{ block.label }}</span>
        </div>
      </VueDraggable>
    </div>

    <div>
      <h3 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Layout</h3>
      <VueDraggable
        :modelValue="layoutBlocks"
        :group="{ name: 'blocks', pull: 'clone', put: false }"
        :clone="cloneBlock"
        :sort="false"
        class="grid grid-cols-2 gap-2"
      >
        <div v-for="block in layoutBlocks" :key="block.label" class="bg-[#2A2A2A] border border-[#404040] rounded p-2 flex flex-col items-center justify-center gap-2 cursor-grab hover:bg-[#333] hover:border-gm-gold transition-colors">
          <component :is="block.icon" class="w-5 h-5 text-gray-400" />
          <span class="text-[10px] font-semibold text-gray-300 text-center leading-tight">{{ block.label }}</span>
        </div>
      </VueDraggable>
    </div>

  </div>
</template>
