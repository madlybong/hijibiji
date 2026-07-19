<script setup lang="ts">
/**
 * @component GmdRightPanel
 * @description The primary right sidebar content for the editor.
 * Provides properties editing (for pages/blocks) and layer management views.
 * 
 * @example
 * <GmdRightPanel />
 */
import { computed } from 'vue';
import { useDocumentStore } from '../../store/useDocumentStore';
import GmdDocumentProperties from './GmdDocumentProperties.vue';
import GmdBlockProperties from './GmdBlockProperties.vue';
import { PropsPage } from '@goldmine/blocks';
import GmdLayersPanel from './GmdLayersPanel.vue';
import { GmdSegmentedControl, GmdPanelHeader } from '@goldmine/ui';
import Button from 'primevue/button';
import { ref } from 'vue';

const docStore = useDocumentStore();
const activeTab = ref<'properties' | 'layers'>('properties');
const tabOptions = [
  { label: 'Props', value: 'properties' },
  { label: 'Layers', value: 'layers' }
];

const selectedPage = computed(() => {
  if (!docStore.document || !docStore.selectedPageId) return null;
  return docStore.document.pages.find(p => p.id === docStore.selectedPageId) || null;
});

const closePanel = () => {
  docStore.selectBlock(null);
  docStore.selectPage(null);
};

const updatePageField = (field: string, value: any) => {
  if (selectedPage.value) {
    docStore.updatePageSettings(selectedPage.value.id, { [field]: value });
  }
};

</script>

<template>
  <!-- GmdSidebar acts as the layout provider, so no outer wrapper needed -->
  <!-- Header -->
    <GmdPanelHeader>
      <template #start>
        <div class="w-48 -ml-4">
          <GmdSegmentedControl v-model="activeTab" :options="tabOptions" />
        </div>
      </template>
      <template #end>
        <Button 
          v-if="docStore.selectedBlockId || docStore.selectedPageId"
          icon="pi pi-times" 
          variant="text" 
          severity="secondary" 
          rounded 
          class="!w-6 !h-6 !p-0"
          @click="closePanel" 
        />
      </template>
    </GmdPanelHeader>

    <!-- Content -->
    <div class="gmd-panel-content custom-scrollbar">
      <div v-if="activeTab === 'layers'" class="h-full">
        <GmdLayersPanel @blockSelected="activeTab = 'properties'" />
      </div>
      <div v-else class="flex flex-col gap-4 p-4">
        <GmdBlockProperties v-if="docStore.selectedBlockId" />
        <PropsPage v-else-if="docStore.selectedPageId && selectedPage" :page="selectedPage" @update-field="updatePageField" />
        <GmdDocumentProperties v-else />
      </div>
    </div>
</template>
