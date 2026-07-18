<script setup lang="ts">
import { ref, computed } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import { GripVertical } from 'lucide-vue-next';
import type { BlockType, GmBlock } from '../../types/document';
import InputText from 'primevue/inputtext';

const createTemplate = (type: BlockType, data: any): GmBlock => ({
  id: crypto.randomUUID(),
  type,
  data
});

const blockMeta: Record<string, { label: string; svg: string; desc: string }> = {
  'heading': { label: 'Heading', desc: 'Large title text (H1, H2, H3)', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16M4 6h16M4 18h10"/></svg>' },
  'paragraph': { label: 'Paragraph', desc: 'Standard block of text', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>' },
  'text-list': { label: 'Text List', desc: 'Bulleted or numbered list', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/><path d="M8 6h12M8 12h12M8 18h12"/></svg>' },
  'datetime': { label: 'Date & Time', desc: 'Auto or manual date label', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>' },
  'page-number': { label: 'Page Number', desc: 'Auto-updating page number', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><text x="12" y="16" text-anchor="middle" font-size="10" fill="currentColor" stroke="none">#</text></svg>' },
  'market-card': { label: 'Market Card', desc: 'Metric card with trend border', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 10h4M6 14h6"/><circle cx="17" cy="12" r="2"/></svg>' },
  'stock-pick': { label: 'Stock Pick', desc: 'Detailed stock recommendation', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2" fill="currentColor" fill-opacity="0.1"/><path d="M4 8h8M4 12h6M14 8h6M14 12h4M4 16h16"/></svg>' },
  'info-card': { label: 'Info Card', desc: 'Outlined box with title and text', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/></svg>' },
  'data-row': { label: 'Data Row', desc: 'Simple Label : Value row', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h6M14 12h6"/></svg>' },
  'trend-badge': { label: 'Trend Badge', desc: 'Small up/down trend pill', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="8" width="16" height="8" rx="4"/><path d="M10 12l2-2 2 2M12 10v4"/></svg>' },
  'content-grid': { label: 'Grid', desc: 'Multi-column container', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="9" height="16" rx="1"/><rect x="13" y="4" width="9" height="16" rx="1"/></svg>' },
  'section-divider': { label: 'Divider', desc: 'Horizontal line with label', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h8M14 12h8"/><circle cx="11" cy="12" r="1" fill="currentColor"/></svg>' },
  'spacer': { label: 'Spacer', desc: 'Vertical empty space', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 4v16M8 8l4-4 4 4M8 16l4 4 4-4"/></svg>' },
  'raw-html': { label: 'Raw HTML', desc: 'Arbitrary HTML block', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>' },
  'flex-row': { label: 'Row', desc: 'Horizontal flex container', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="8" width="8" height="8" rx="1"/><rect x="13" y="8" width="8" height="8" rx="1"/></svg>' },
  'flex-col': { label: 'Column', desc: 'Vertical flex container', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="3" width="8" height="8" rx="1"/><rect x="8" y="13" width="8" height="8" rx="1"/></svg>' },
};

const typographyBlocks = ref([
  createTemplate('heading', { level: 2, html: '<p>New Heading</p>' }),
  createTemplate('paragraph', { html: '<p>Enter text here...</p>' }),
  createTemplate('text-list', { ordered: false, items: ['Item 1', 'Item 2'] }),
  createTemplate('datetime', { mode: 'auto', format: 'MMMM YYYY' }),
  createTemplate('page-number', { format: 'page-of-total' }),
]);

const dataBlocks = ref([
  createTemplate('market-card', { label: 'LABEL', value: '1,000', borderColor: 'none' }),
  createTemplate('stock-pick', { stockName: 'STOCK', stockDesc: 'Description', cmp: '-', target: '-', addOnDip: '-', exit: '-', upside: '-', upsideTime: '-' }),
  createTemplate('info-card', { title: 'Title', text: 'Info text...' }),
  createTemplate('data-row', { label: 'Label', value: 'Value' }),
  createTemplate('trend-badge', { value: '0%', trend: 'up' }),
]);

const layoutBlocks = ref([
  createTemplate('content-grid', { cols: 2, blocks: [] }),
  createTemplate('section-divider', { label: 'DIVIDER' }),
  createTemplate('flex-row', { blocks: [] }),
  createTemplate('flex-col', { blocks: [] }),
  createTemplate('raw-html', { html: '<div>Custom HTML</div>' }),
]);

const cloneBlock = (block: GmBlock): GmBlock => {
  return {
    ...block,
    id: crypto.randomUUID(),
    data: JSON.parse(JSON.stringify(block.data)), // Deep copy data
    children: block.children ? [] : undefined
  };
};

const searchQuery = ref('');

const filterBlocks = (blocks: GmBlock[]) => {
  if (!searchQuery.value) return blocks;
  const q = searchQuery.value.toLowerCase();
  return blocks.filter(b => blockMeta[b.type].label.toLowerCase().includes(q));
};

const filteredTypography = computed(() => filterBlocks(typographyBlocks.value));
const filteredData = computed(() => filterBlocks(dataBlocks.value));
const filteredLayout = computed(() => filterBlocks(layoutBlocks.value));
</script>

<template>
  <div class="flex flex-col select-none h-full">
    
    <div class="p-4 border-b border-white/5">
      <InputText v-model="searchQuery" placeholder="Search blocks..." size="small" class="w-full text-xs" />
    </div>

    <div class="p-4 flex flex-col overflow-y-auto">
      <div v-show="filteredTypography.length > 0" class="mb-6">
        <div class="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-2 px-1">Typography</div>
        <VueDraggable
          :modelValue="filteredTypography"
          :group="{ name: 'blocks', pull: 'clone', put: false }"
          :clone="cloneBlock"
          :sort="false"
          :force-fallback="true"
          class="flex flex-col gap-2"
        >
          <div v-for="block in filteredTypography" :key="block.id" class="bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 rounded-lg p-2 flex items-center gap-3 cursor-grab group transition-colors">
            <div class="w-9 h-6 flex-shrink-0 bg-slate-900 border border-slate-700 rounded flex items-center justify-center p-1 text-yellow-500/70" v-html="blockMeta[block.type].svg"></div>
            <div class="flex-1 flex flex-col min-w-0">
              <span class="text-xs font-medium text-slate-100 truncate">{{ blockMeta[block.type].label }}</span>
              <span class="text-[9px] text-slate-500 truncate">{{ blockMeta[block.type].desc }}</span>
            </div>
            <div class="cursor-grab text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity pr-1">
              <GripVertical class="w-3.5 h-3.5" />
            </div>
          </div>
        </VueDraggable>
      </div>

      <div v-show="filteredData.length > 0" class="mb-6">
        <div class="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-2 px-1">Data & Markets</div>
        <VueDraggable
          :modelValue="filteredData"
          :group="{ name: 'blocks', pull: 'clone', put: false }"
          :clone="cloneBlock"
          :sort="false"
          :force-fallback="true"
          class="flex flex-col gap-2"
        >
          <div v-for="block in filteredData" :key="block.id" class="bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 rounded-lg p-2 flex items-center gap-3 cursor-grab group transition-colors">
            <div class="w-9 h-6 flex-shrink-0 bg-slate-900 border border-slate-700 rounded flex items-center justify-center p-1 text-yellow-500/70" v-html="blockMeta[block.type].svg"></div>
            <div class="flex-1 flex flex-col min-w-0">
              <span class="text-xs font-medium text-slate-100 truncate">{{ blockMeta[block.type].label }}</span>
              <span class="text-[9px] text-slate-500 truncate">{{ blockMeta[block.type].desc }}</span>
            </div>
            <div class="cursor-grab text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity pr-1">
              <GripVertical class="w-3.5 h-3.5" />
            </div>
          </div>
        </VueDraggable>
      </div>

      <div v-show="filteredLayout.length > 0">
        <div class="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-2 px-1">Layout</div>
        <VueDraggable
          :modelValue="filteredLayout"
          :group="{ name: 'blocks', pull: 'clone', put: false }"
          :clone="cloneBlock"
          :sort="false"
          :force-fallback="true"
          class="flex flex-col gap-2"
        >
          <div v-for="block in filteredLayout" :key="block.id" class="bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 rounded-lg p-2 flex items-center gap-3 cursor-grab group transition-colors">
            <div class="w-9 h-6 flex-shrink-0 bg-slate-900 border border-slate-700 rounded flex items-center justify-center p-1 text-yellow-500/70" v-html="blockMeta[block.type].svg"></div>
            <div class="flex-1 flex flex-col min-w-0">
              <span class="text-xs font-medium text-slate-100 truncate">{{ blockMeta[block.type].label }}</span>
              <span class="text-[9px] text-slate-500 truncate">{{ blockMeta[block.type].desc }}</span>
            </div>
            <div class="cursor-grab text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity pr-1">
              <GripVertical class="w-3.5 h-3.5" />
            </div>
          </div>
        </VueDraggable>
      </div>
      
      <div v-show="filteredTypography.length === 0 && filteredData.length === 0 && filteredLayout.length === 0" class="text-center text-xs text-gray-500 mt-4">
        No blocks found.
      </div>
    </div>
  </div>
</template>
