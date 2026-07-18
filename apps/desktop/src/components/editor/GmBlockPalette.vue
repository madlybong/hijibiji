<script setup lang="ts">
import { ref } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import { Type, LayoutGrid, FileText, Activity, TrendingUp, Maximize2 } from 'lucide-vue-next';
import type { BlockType, GmBlock } from '../../types/document';

const createTemplate = (type: BlockType, data: any): GmBlock => ({
  id: crypto.randomUUID(),
  type,
  data
});

const blockMeta: Record<string, { label: string; icon: any }> = {
  'heading': { label: 'Heading', icon: Type },
  'paragraph': { label: 'Paragraph', icon: FileText },
  'section-label': { label: 'Section Label', icon: Type },
  'highlight-text': { label: 'Highlight Text', icon: Type },
  'text-list': { label: 'Text List', icon: FileText },
  'market-card': { label: 'Market Card', icon: Activity },
  'stock-pick': { label: 'Stock Pick', icon: TrendingUp },
  'info-card': { label: 'Info Card', icon: FileText },
  'data-row': { label: 'Data Row', icon: Activity },
  'trend-badge': { label: 'Trend Badge', icon: TrendingUp },
  'content-grid': { label: 'Grid', icon: LayoutGrid },
  'section-divider': { label: 'Divider', icon: Maximize2 },
  'spacer': { label: 'Spacer', icon: Maximize2 },
};

const typographyBlocks = [
  createTemplate('heading', { level: 2, text: 'New Heading' }),
  createTemplate('paragraph', { html: 'Enter text here...' }),
  createTemplate('section-label', { text: 'SECTION LABEL' }),
  createTemplate('highlight-text', { text: 'Highlight Text' }),
  createTemplate('text-list', { ordered: false, items: ['Item 1', 'Item 2'] }),
];

const dataBlocks = [
  createTemplate('market-card', { label: 'LABEL', value: '1,000', borderColor: 'none' }),
  createTemplate('stock-pick', { stockName: 'STOCK', stockDesc: 'Description', cmp: '-', target: '-', addOnDip: '-', exit: '-', upside: '-', upsideTime: '-' }),
  createTemplate('info-card', { title: 'Title', text: 'Info text...' }),
  createTemplate('data-row', { label: 'Label', value: 'Value' }),
  createTemplate('trend-badge', { value: '0%', trend: 'up' }),
];

const layoutBlocks = [
  createTemplate('content-grid', { cols: 2, blocks: [] }),
  createTemplate('content-grid', { cols: 4, blocks: [] }),
  createTemplate('section-divider', { label: 'DIVIDER' }),
  createTemplate('spacer', { height: 20 }),
];

const cloneBlock = (block: GmBlock): GmBlock => {
  return {
    ...block,
    id: crypto.randomUUID(),
    data: JSON.parse(JSON.stringify(block.data)), // Deep copy data
    children: block.children ? [] : undefined
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
        :force-fallback="true"
        class="grid grid-cols-2 gap-2"
      >
        <div v-for="block in typographyBlocks" :key="block.id" class="bg-[#2A2A2A] border border-[#404040] rounded p-2 flex flex-col items-center justify-center gap-2 cursor-grab hover:bg-[#333] hover:border-gm-gold transition-colors">
          <component :is="blockMeta[block.type].icon" class="w-5 h-5 text-gray-400" />
          <span class="text-[10px] font-semibold text-gray-300 text-center leading-tight">{{ blockMeta[block.type].label }}</span>
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
        :force-fallback="true"
        class="grid grid-cols-2 gap-2"
      >
        <div v-for="block in dataBlocks" :key="block.id" class="bg-[#2A2A2A] border border-[#404040] rounded p-2 flex flex-col items-center justify-center gap-2 cursor-grab hover:bg-[#333] hover:border-gm-gold transition-colors">
          <component :is="blockMeta[block.type].icon" class="w-5 h-5 text-gray-400" />
          <span class="text-[10px] font-semibold text-gray-300 text-center leading-tight">{{ blockMeta[block.type].label }}</span>
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
        :force-fallback="true"
        class="grid grid-cols-2 gap-2"
      >
        <div v-for="block in layoutBlocks" :key="block.id" class="bg-[#2A2A2A] border border-[#404040] rounded p-2 flex flex-col items-center justify-center gap-2 cursor-grab hover:bg-[#333] hover:border-gm-gold transition-colors">
          <component :is="blockMeta[block.type].icon" class="w-5 h-5 text-gray-400" />
          <span class="text-[10px] font-semibold text-gray-300 text-center leading-tight">{{ blockMeta[block.type].label }}</span>
        </div>
      </VueDraggable>
    </div>

  </div>
</template>
