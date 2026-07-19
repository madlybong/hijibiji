<script setup lang="ts">
/**
 * @component GmdLeftPanel
 * @description The primary left sidebar content for the editor. 
 * Toggles between the Block Palette (for dragging new blocks) and Page Management (for ordering pages).
 * 
 * @example
 * <GmdLeftPanel />
 */
import { Layers, Component } from 'lucide-vue-next';
import { GmdSegmentedControl, GmdPageItem, GmdPanelHeader, GmdEmptyState } from '@goldmine/ui';
import GmdBlockPalette from './GmdBlockPalette.vue';
import { useDocumentStore } from '../../store/useDocumentStore';
import { VueDraggable } from 'vue-draggable-plus';
import { ref } from 'vue';
import Button from 'primevue/button';
import SplitButton from 'primevue/splitbutton';

const docStore = useDocumentStore();
const activeTab = ref<'blocks' | 'pages'>('blocks');

const tabOptions = [
  { label: 'Blocks', value: 'blocks', icon: Component },
  { label: 'Pages', value: 'pages', icon: Layers }
];

const pageOptions = ref([
  { label: 'Add Blank Page', icon: 'pi pi-file', command: () => docStore.addPage('blank') },
  { label: 'Add Cover Page', icon: 'pi pi-image', command: () => docStore.addPage('cover') },
  { label: 'Add Back Cover', icon: 'pi pi-image', command: () => docStore.addPage('back-cover') },
]);

</script>

<template>
  <!-- GmdSidebar acts as the layout provider, so no outer wrapper needed -->
  <GmdPanelHeader>
    <template #start>
      <GmdSegmentedControl v-model="activeTab" :options="tabOptions" />
    </template>
  </GmdPanelHeader>

  <!-- Content Area -->
  <div class="gmd-panel-content">
    <div v-show="activeTab === 'blocks'" class="h-full">
      <GmdBlockPalette />
    </div>

    <div v-show="activeTab === 'pages'" class="p-4 flex flex-col gap-4">
      <!-- Add Page Button -->
      <SplitButton 
        label="Add New Page" 
        icon="pi pi-plus" 
        @click="docStore.addPage('blank')" 
        :model="pageOptions"
        size="small" 
        severity="secondary" 
        variant="outlined"
        class="w-full text-xs" 
      />
      
      <!-- Empty State -->
      <GmdEmptyState 
        v-if="!docStore.document?.pages?.length" 
        title="No pages yet" 
        description="Click 'Add New Page' to get started" 
      />

      <!-- Page List -->
      <VueDraggable 
        v-else
        v-model="docStore.document.pages" 
        handle=".drag-handle"
        class="gmd-block-list"
      >
        <GmdPageItem 
          v-for="(page, index) in docStore.document.pages" 
          :key="page.id"
          :page="page"
          :index="index"
          :isSelected="docStore.selectedPageId === page.id"
          @click="docStore.selectPage(page.id)"
          @duplicate="docStore.duplicatePage(page.id)"
          @delete="docStore.deletePage(page.id)"
        />
      </VueDraggable>
    </div>
  </div>
</template>
