<script setup lang="ts">
import { computed } from 'vue';
import { useDocumentStore } from '../../store/useDocumentStore';
import PropsHeading from './props/PropsHeading.vue';
import PropsParagraph from './props/PropsParagraph.vue';
import PropsTextList from './props/PropsTextList.vue';
import PropsDateTime from './props/PropsDateTime.vue';
import PropsMarketCard from './props/PropsMarketCard.vue';
import PropsStockPick from './props/PropsStockPick.vue';
import PropsSpacer from './props/PropsSpacer.vue';
import PropsContentGrid from './props/PropsContentGrid.vue';
import PropsInfoCard from './props/PropsInfoCard.vue';
import PropsDataRow from './props/PropsDataRow.vue';
import PropsTrendBadge from './props/PropsTrendBadge.vue';
import PropsSectionDivider from './props/PropsSectionDivider.vue';
import PropsFlexRow from './props/PropsFlexRow.vue';
import PropsFlexCol from './props/PropsFlexCol.vue';
import PropsRawHtml from './props/PropsRawHtml.vue';
import PropsStyle from './props/PropsStyle.vue';
import GmPropSection from './props/GmPropSection.vue';
import Message from 'primevue/message';
import Tag from 'primevue/tag';

const docStore = useDocumentStore();

const selectedBlock = computed(() => {
  if (!docStore.document || !docStore.selectedBlockId) return null;
  for (const page of docStore.document.pages) {
    const block = page.blocks.find(b => b.id === docStore.selectedBlockId);
    if (block) return block;
  }
  return null;
});

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

</script>

<template>
  <div v-if="selectedBlock" class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <Tag :value="selectedBlock.type" severity="warn" class="uppercase tracking-widest text-[9px]" />
    </div>

    <!-- Dynamic Property Form -->
    <div class="flex-1 flex flex-col gap-4">
      <GmPropSection label="Content" :default-open="true">
        <component 
          v-if="getPropsComponent(selectedBlock.type)"
          :is="getPropsComponent(selectedBlock.type)" 
          :data="selectedBlock.data" 
          @update="updateData"
        />
        <Message v-else severity="secondary" :closable="false" class="text-xs">
          This block type is not currently editable.
        </Message>
      </GmPropSection>

      <PropsStyle :block="selectedBlock" />
    </div>
  </div>
</template>
