<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useDocumentStore } from '../../store/useDocumentStore';
import { 
  PropsHeading, PropsParagraph, PropsTextList, PropsDateTime, PropsMarketCard, 
  PropsStockPick, PropsSpacer, PropsContentGrid, PropsInfoCard, PropsDataRow, 
  PropsTrendBadge, PropsSectionDivider, PropsFlexRow, PropsFlexCol, PropsRawHtml, 
  PropsStyle
} from '@goldmine/blocks';
import { GmdPropSection, GmdPropField } from '@goldmine/ui';
import Message from 'primevue/message';
import Tag from 'primevue/tag';
import InputText from 'primevue/inputtext';

const docStore = useDocumentStore();

const selectedBlock = computed(() => {
  if (!docStore.document || !docStore.selectedBlockId) return null;
  
  const findBlockRecursive = (blocks: any[], id: string): any => {
    for (const b of blocks) {
      if (b.id === id) return b;
      if (b.data && Array.isArray(b.data.blocks)) {
        const found = findBlockRecursive(b.data.blocks, id);
        if (found) return found;
      }
    }
    return null;
  };

  for (const page of docStore.document.pages) {
    const block = findBlockRecursive(page.blocks, docStore.selectedBlockId);
    if (block) return block;
  }
  return null;
});

const blockLabel = ref('');

watch(() => selectedBlock.value, (newBlock) => {
  if (newBlock) {
    blockLabel.value = newBlock.label || '';
  }
}, { immediate: true });

/**
 * Resolves the property component mapped to the specific block type.
 * @param {string} type - The block type string (e.g., 'heading')
 * @returns {any} The Vue component for the property editor
 */
const getPropsComponent = (type: string) => {
  switch (type) {
    case 'heading': return PropsHeading;
    case 'paragraph': return PropsParagraph;
    case 'text-list': return PropsTextList;
    case 'datetime': return PropsDateTime;
    case 'market-card': return PropsMarketCard;
    case 'stock-pick': return PropsStockPick;
    case 'spacer': return PropsSpacer;
    case 'content-grid': return PropsContentGrid;
    case 'info-card': return PropsInfoCard;
    case 'data-row': return PropsDataRow;
    case 'trend-badge': return PropsTrendBadge;
    case 'section-divider': return PropsSectionDivider;
    case 'flex-row': return PropsFlexRow;
    case 'flex-col': return PropsFlexCol;
    case 'raw-html': return PropsRawHtml;
    default: return null;
  }
};

const updateData = (data: any) => {
  if (selectedBlock.value) {
    docStore.updateBlockData(selectedBlock.value.id, data);
  }
};

const updateLabel = () => {
  if (selectedBlock.value) {
    docStore.updateBlockMeta(selectedBlock.value.id, { label: blockLabel.value });
  }
};

const updateStyle = (field: string, value: any) => {
  if (selectedBlock.value) {
    docStore.updateBlockStyle(selectedBlock.value.id, { [field]: value });
  }
};
</script>

<template>
  <template v-if="selectedBlock">
    <div class="flex items-center justify-between">
      <Tag :value="selectedBlock.type" severity="warn" class="uppercase tracking-widest text-[9px]" />
    </div>

    <!-- Block Custom Label -->
    <GmdPropField label="Block Label (Optional)">
      <InputText 
        size="small" 
        v-model="blockLabel"
        @blur="updateLabel"
        @keyup.enter="updateLabel"
        placeholder="e.g., 'Hero Section'" 
        class="w-full text-xs"
      />
    </GmdPropField>

    <GmdPropSection label="Content" :default-open="true">
      <component 
        v-if="getPropsComponent(selectedBlock.type)"
        :is="getPropsComponent(selectedBlock.type)" 
        :data="selectedBlock.data" 
        @update="updateData"
      />
      <Message v-else severity="secondary" :closable="false" class="text-xs">
        This block type is not currently editable.
      </Message>
    </GmdPropSection>

    <PropsStyle :block="selectedBlock" @update-style="updateStyle" />
  </template>
</template>
