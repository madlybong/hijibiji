<script setup lang="ts">
import { computed } from 'vue';
import type { GmBlock } from '../../types/document';
import GmBlockWrapper from './GmBlockWrapper.vue';

// Import all block components
import GmTextHeading from '../GmTextHeading.vue';
import GmTextParagraph from '../GmTextParagraph.vue';
import GmMarketCard from '../GmMarketCard.vue';
import GmStockPickBlock from '../GmStockPickBlock.vue';
import GmSectionDivider from '../GmSectionDivider.vue';
import GmTrendBadge from '../GmTrendBadge.vue';
import GmInfoCard from '../GmInfoCard.vue';
import GmDataRow from '../GmDataRow.vue';
// Container components need recursive rendering, but we can start simple

const props = defineProps<{
  block: GmBlock;
  pageId: string;
}>();

const componentMap: Record<string, any> = {
  'heading': GmTextHeading,
  'paragraph': GmTextParagraph,
  'market-card': GmMarketCard,
  'stock-pick': GmStockPickBlock,
  'section-divider': GmSectionDivider,
  'trend-badge': GmTrendBadge,
  'info-card': GmInfoCard,
  'data-row': GmDataRow,
  // Add section-label, sub-date, content-grid, etc.
};

const resolvedComponent = computed(() => {
  return componentMap[props.block.type];
});
</script>

<template>
  <GmBlockWrapper :block="block" :page-id="pageId">
    <!-- Simple fallback if component not found or simple div wrappers -->
    <template v-if="block.type === 'section-label'">
      <div class="gm-text-section-label">{{ block.data.text }}</div>
    </template>
    
    <template v-else-if="block.type === 'sub-date'">
      <div class="gm-text-sub-date font-montserrat tracking-widest text-[9px] uppercase font-bold text-gm-text-muted mb-4">{{ block.data.text }}</div>
    </template>
    
    <template v-else-if="block.type === 'highlight-text'">
      <span class="gm-text-highlight">{{ block.data.text }}</span>
    </template>

    <template v-else-if="block.type === 'spacer'">
      <div :style="{ height: `${block.data.height}px` }"></div>
    </template>
    
    <template v-else-if="block.type === 'raw-html'">
      <div v-html="block.data.html"></div>
    </template>

    <!-- Dynamically resolved components -->
    <component 
      v-else-if="resolvedComponent" 
      :is="resolvedComponent" 
      v-bind="block.data" 
    >
      <!-- If the component needs slot content, we can pass it here -->
      <!-- For example, GmTextHeading uses <slot> instead of text prop. Let's fix that or handle it -->
      <template v-if="block.type === 'heading'">
        {{ block.data.text }}
      </template>
      <template v-if="block.type === 'paragraph'">
        <span v-html="block.data.html"></span>
      </template>
      <template v-if="block.type === 'info-card'">
        <span v-html="block.data.text"></span>
      </template>
    </component>
    
    <div v-else class="p-4 bg-red-100 text-red-800 text-xs border border-red-300">
      Unknown block type: {{ block.type }}
    </div>
  </GmBlockWrapper>
</template>
