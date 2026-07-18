<script setup lang="ts">
import { computed } from 'vue';
import type { GmBlock } from '../../types/document';
import GmBlockWrapper from './GmBlockWrapper.vue';
import { VueDraggable } from 'vue-draggable-plus';
import { useAppStore } from '../../store/useAppStore';
import { useDocumentStore } from '../../store/useDocumentStore';

// Import all block components
import GmTextHeading from '../GmTextHeading.vue';
import GmTextParagraph from '../GmTextParagraph.vue';
import GmTextList from '../GmTextList.vue';
import GmDateTime from '../GmDateTime.vue';
import GmMarketCard from '../GmMarketCard.vue';
import GmStockPickBlock from '../GmStockPickBlock.vue';
import GmSectionDivider from '../GmSectionDivider.vue';
import GmTrendBadge from '../GmTrendBadge.vue';
import GmInfoCard from '../GmInfoCard.vue';
import GmDataRow from '../GmDataRow.vue';
import GmContentGrid from '../GmContentGrid.vue';
import GmFlexRow from '../GmFlexRow.vue';
import GmFlexCol from '../GmFlexCol.vue';
import GmSpacer from '../GmSpacer.vue';
import GmRawHtml from '../GmRawHtml.vue';
import GmPageNumber from '../GmPageNumber.vue';

const props = defineProps<{
  block: GmBlock;
  pageId: string;
}>();

const appStore = useAppStore();
const docStore = useDocumentStore();

const componentMap: Record<string, any> = {
  'heading': GmTextHeading,
  'paragraph': GmTextParagraph,
  'text-list': GmTextList,
  'datetime': GmDateTime,
  'market-card': GmMarketCard,
  'stock-pick': GmStockPickBlock,
  'section-divider': GmSectionDivider,
  'trend-badge': GmTrendBadge,
  'info-card': GmInfoCard,
  'data-row': GmDataRow,
  'content-grid': GmContentGrid,
  'flex-row': GmFlexRow,
  'flex-col': GmFlexCol,
  'spacer': GmSpacer,
  'raw-html': GmRawHtml,
  'page-number': GmPageNumber,
};

const resolvedComponent = computed(() => {
  return componentMap[props.block.type];
});

const getContainerStyle = (block: GmBlock) => {
  if (block.type === 'content-grid') {
    return {
      display: 'grid',
      gridTemplateColumns: `repeat(${block.data.cols || 1}, 1fr)`,
      gap: block.data.gap || '0.75rem',
      alignItems: block.data.alignItems || 'stretch',
      justifyItems: block.data.justifyItems || 'stretch',
    };
  }
  if (block.type === 'flex-row') {
    return {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: block.data.wrap || 'nowrap',
      gap: block.data.gap || '1rem',
      justifyContent: block.data.justifyContent || 'flex-start',
      alignItems: block.data.alignItems || 'stretch',
    };
  }
  if (block.type === 'flex-col') {
    return {
      display: 'flex',
      flexDirection: 'column',
      gap: block.data.gap || '1rem',
      justifyContent: block.data.justifyContent || 'flex-start',
      alignItems: block.data.alignItems || 'stretch',
    };
  }
  return {};
};
</script>

<template>
  <GmBlockWrapper :block="block" :page-id="pageId">
    <component 
      v-if="resolvedComponent" 
      :is="resolvedComponent" 
      v-bind="{
        ...block.data,
        ...(block.type === 'paragraph' ? { 
          html: block.data.html, 
          blockId: block.id,
          isEditing: docStore.selectedBlockId === block.id,
          isPreview: appStore.editorMode === 'preview'
        } : {}),
        ...(block.type === 'heading' ? {
          blockId: block.id,
          isEditing: docStore.selectedBlockId === block.id,
          isPreview: appStore.editorMode === 'preview'
        } : {})
      }"
    >
      <template v-if="block.type === 'heading'">
        {{ block.data.text }}
      </template>
      <template v-if="block.type === 'paragraph'">
        <span v-html="block.data.html"></span>
      </template>
      <template v-if="block.type === 'info-card'">
        <span v-html="block.data.text"></span>
      </template>
      
      <!-- Container logic -->
      <template v-if="block.type === 'content-grid' || block.type === 'flex-row' || block.type === 'flex-col'">
        <VueDraggable 
          v-model="block.data.blocks"
          :group="{ name: 'blocks' }"
          :animation="150"
          :force-fallback="true"
          class="min-h-[40px] w-full h-full border border-dashed border-transparent hover:border-gray-400"
          :style="getContainerStyle(block)"
        >
          <GmBlockRenderer 
            v-for="child in (block.data.blocks || [])" 
            :key="child.id" 
            :block="child" 
            :page-id="pageId" 
          />
        </VueDraggable>
      </template>
    </component>
    
    <div v-else class="p-4 bg-red-100 text-red-800 text-xs border border-red-300">
      Unknown block type: {{ block.type }}
    </div>
  </GmBlockWrapper>
</template>
