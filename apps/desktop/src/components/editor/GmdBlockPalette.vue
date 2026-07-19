<script setup lang="ts">
/**
 * @component GmdBlockPalette
 * @description Provides a searchable palette of draggable blocks categorized into 
 * Typography, Data & Markets, and Layout. Users can drag these blocks onto the canvas.
 * 
 * @example
 * <GmdBlockPalette />
 */
import { ref, computed } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import type { BlockType, GmBlock } from '@goldmine/types';
import InputText from 'primevue/inputtext';
import { GmdBlockItem, GmdEmptyState, GmdPropSection, GmdPanelHeader } from '@goldmine/ui';
import { 
  Type, AlignLeft, List, CalendarClock, Hash, 
  LineChart, TrendingUp, Info, ListMinus, ArrowUpRight, 
  LayoutGrid, Minus, Space, Code2, Columns, Rows 
} from 'lucide-vue-next';

const createTemplate = (type: BlockType, data: any): GmBlock => ({
  id: crypto.randomUUID(),
  type,
  data
});

const blockMeta: Record<string, { label: string; icon: any; desc: string }> = {
  'heading': { label: 'Heading', desc: 'Large title text (H1, H2, H3)', icon: Type },
  'paragraph': { label: 'Paragraph', desc: 'Standard block of text', icon: AlignLeft },
  'text-list': { label: 'Text List', desc: 'Bulleted or numbered list', icon: List },
  'datetime': { label: 'Date & Time', desc: 'Auto or manual date label', icon: CalendarClock },
  'page-number': { label: 'Page Number', desc: 'Auto-updating page number', icon: Hash },
  'market-card': { label: 'Market Card', desc: 'Metric card with trend border', icon: LineChart },
  'stock-pick': { label: 'Stock Pick', desc: 'Detailed stock recommendation', icon: TrendingUp },
  'info-card': { label: 'Info Card', desc: 'Outlined box with title and text', icon: Info },
  'data-row': { label: 'Data Row', desc: 'Simple Label : Value row', icon: ListMinus },
  'trend-badge': { label: 'Trend Badge', desc: 'Small up/down trend pill', icon: ArrowUpRight },
  'content-grid': { label: 'Grid', desc: 'Multi-column container', icon: LayoutGrid },
  'section-divider': { label: 'Divider', desc: 'Horizontal line with label', icon: Minus },
  'spacer': { label: 'Spacer', desc: 'Vertical empty space', icon: Space },
  'raw-html': { label: 'Raw HTML', desc: 'Arbitrary HTML block', icon: Code2 },
  'flex-row': { label: 'Row', desc: 'Horizontal flex container', icon: Columns },
  'flex-col': { label: 'Column', desc: 'Vertical flex container', icon: Rows },
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
  <GmdPanelHeader>
    <template #start>
      <InputText v-model="searchQuery" placeholder="Search blocks..." size="small" class="w-full text-xs" />
    </template>
  </GmdPanelHeader>

  <div class="gmd-panel-content p-4 flex flex-col select-none">
    <GmdPropSection v-show="filteredTypography.length > 0" label="Typography" class="mb-2">
      <VueDraggable
        :modelValue="filteredTypography"
        :group="{ name: 'blocks', pull: 'clone', put: false }"
        :clone="cloneBlock"
        :sort="false"
        :force-fallback="true"
        class="grid grid-cols-3 gap-2"
      >
        <GmdBlockItem 
          v-for="block in filteredTypography" 
          :key="block.id"
          :label="blockMeta[block.type].label"
          :description="blockMeta[block.type].desc"
          :icon="blockMeta[block.type].icon"
        />
      </VueDraggable>
    </GmdPropSection>

    <GmdPropSection v-show="filteredData.length > 0" label="Data & Markets" class="mb-2">
      <VueDraggable
        :modelValue="filteredData"
        :group="{ name: 'blocks', pull: 'clone', put: false }"
        :clone="cloneBlock"
        :sort="false"
        :force-fallback="true"
        class="grid grid-cols-3 gap-2"
      >
        <GmdBlockItem 
          v-for="block in filteredData" 
          :key="block.id"
          :label="blockMeta[block.type].label"
          :description="blockMeta[block.type].desc"
          :icon="blockMeta[block.type].icon"
        />
      </VueDraggable>
    </GmdPropSection>

    <GmdPropSection v-show="filteredLayout.length > 0" label="Layout" class="mb-2">
      <VueDraggable
        :modelValue="filteredLayout"
        :group="{ name: 'blocks', pull: 'clone', put: false }"
        :clone="cloneBlock"
        :sort="false"
        :force-fallback="true"
        class="grid grid-cols-3 gap-2"
      >
        <GmdBlockItem 
          v-for="block in filteredLayout" 
          :key="block.id"
          :label="blockMeta[block.type].label"
          :description="blockMeta[block.type].desc"
          :icon="blockMeta[block.type].icon"
        />
      </VueDraggable>
    </GmdPropSection>
    
    <div v-show="filteredTypography.length === 0 && filteredData.length === 0 && filteredLayout.length === 0" class="mt-4">
      <GmdEmptyState title="No blocks found" description="Try a different search term" />
    </div>
  </div>
</template>
