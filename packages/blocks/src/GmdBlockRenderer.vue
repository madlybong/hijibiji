<script setup lang="ts">
import { computed } from 'vue';
import type { GmBlock } from '@goldmine/types';
import GmdBlockWrapper from './GmdBlockWrapper.vue';
import { VueDraggable } from 'vue-draggable-plus';

// Import all block components
import GmdTextHeading from './blocks/GmdTextHeading.vue';
import GmdTextParagraph from './blocks/GmdTextParagraph.vue';
import GmdImage from './blocks/GmdImage.vue';
import GmdTextList from './blocks/GmdTextList.vue';
import GmdDateTime from './blocks/GmdDateTime.vue';
import GmdMarketCard from './blocks/GmdMarketCard.vue';
import GmdStockPickBlock from './blocks/GmdStockPickBlock.vue';
import GmdSectionDivider from './blocks/GmdSectionDivider.vue';
import GmdTrendBadge from './blocks/GmdTrendBadge.vue';
import GmdInfoCard from './blocks/GmdInfoCard.vue';
import GmdDataRow from './blocks/GmdDataRow.vue';
import GmdContentGrid from './blocks/GmdContentGrid.vue';
import GmdFlexRow from './blocks/GmdFlexRow.vue';
import GmdFlexCol from './blocks/GmdFlexCol.vue';
import GmdSpacer from './blocks/GmdSpacer.vue';
import GmdRawHtml from './blocks/GmdRawHtml.vue';
import GmdPageNumber from './blocks/GmdPageNumber.vue';

const props = defineProps<{
  block: GmBlock;
  pageId: string;
  selectedBlockId?: string | null;
  editorMode?: 'edit' | 'preview';
}>();

const emit = defineEmits<{
  (e: 'select', id: string): void;
  (e: 'duplicate', id: string): void;
  (e: 'remove', id: string): void;
  (e: 'updateBlock', id: string, data: any): void;
}>();

const handleUpdateBlock = (id: string, data: any) => {
  emit('updateBlock', id, data);
};

const componentMap: Record<string, any> = {
  'heading': GmdTextHeading,
  'paragraph': GmdTextParagraph,
  'image': GmdImage,
  'text-list': GmdTextList,
  'datetime': GmdDateTime,
  'market-card': GmdMarketCard,
  'stock-pick': GmdStockPickBlock,
  'section-divider': GmdSectionDivider,
  'trend-badge': GmdTrendBadge,
  'info-card': GmdInfoCard,
  'data-row': GmdDataRow,
  'content-grid': GmdContentGrid,
  'flex-row': GmdFlexRow,
  'flex-col': GmdFlexCol,
  'spacer': GmdSpacer,
  'raw-html': GmdRawHtml,
  'page-number': GmdPageNumber,
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
  <GmdBlockWrapper 
    :block="block" 
    :page-id="pageId"
    :is-selected="props.selectedBlockId === block.id"
    :is-preview="props.editorMode === 'preview'"
    @select="id => emit('select', id)"
    @duplicate="id => emit('duplicate', id)"
    @remove="id => emit('remove', id)"
  >
    <component 
      v-if="resolvedComponent" 
      :is="resolvedComponent" 
      v-bind="{
        ...block.data,
        ...(block.type === 'paragraph' ? { 
          html: block.data.html, 
          blockId: block.id,
          isEditing: props.selectedBlockId === block.id,
          isPreview: props.editorMode === 'preview'
        } : {}),
        ...(block.type === 'heading' ? {
          blockId: block.id,
          isEditing: props.selectedBlockId === block.id,
          isPreview: props.editorMode === 'preview'
        } : {}),
        ...(block.type === 'image' ? {
          blockId: block.id
        } : {})
      }"
      @updateBlock="handleUpdateBlock"
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
          class="min-h-[40px] w-full h-full gmd-drop-zone"
          :style="getContainerStyle(block)"
        >
          <GmdBlockRenderer 
            v-for="child in (block.data.blocks || [])" 
            :key="child.id" 
            :block="child" 
            :page-id="pageId"
            :selected-block-id="props.selectedBlockId"
            :editor-mode="props.editorMode"
            @select="id => emit('select', id)"
            @duplicate="id => emit('duplicate', id)"
            @remove="id => emit('remove', id)"
            @updateBlock="(id, data) => emit('updateBlock', id, data)"
          />
        </VueDraggable>
      </template>
    </component>
    
    <div v-else class="p-4 text-xs border" style="background: var(--p-red-50); color: var(--p-red-600); border-color: var(--p-red-200);">
      Unknown block type: {{ block.type }}
    </div>
  </GmdBlockWrapper>
</template>
