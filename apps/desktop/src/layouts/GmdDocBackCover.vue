<script setup lang="ts">
import { computed } from 'vue';
import type { GmPage } from '@goldmine/types';
import { GmdBlockRenderer } from '@goldmine/blocks';
import { VueDraggable } from 'vue-draggable-plus';
import { useAppStore } from '../store/useAppStore';
import { useDocumentStore } from '../store/useDocumentStore';

const props = defineProps<{ page: GmPage }>();
const appStore = useAppStore();
const docStore = useDocumentStore();

const isPreview = computed(() => appStore.editorMode === 'preview');
const isSelected = computed(() => docStore.selectedPageId === props.page.id);

const pageSize = computed(() => docStore.document?.pageSize || 'A4');
const pageDimensions = computed(() => {
  switch (pageSize.value) {
    case 'Letter': return { width: '215.9mm', minHeight: '279.4mm' };
    case 'A3': return { width: '297mm', minHeight: '420mm' };
    case 'A5': return { width: '148mm', minHeight: '210mm' };
    case 'A4':
    default:
      return { width: '210mm', minHeight: '297mm' };
  }
});

const selectPage = () => {
  if (!isPreview.value) docStore.selectPage(props.page.id);
};
</script>

<template>
  <div 
    class="gmd-doc-page relative flex flex-col"
    :class="[
      isSelected && !isPreview ? 'outline outline-4 outline-primary/50' : ''
    ]"
    :style="{
      width:           pageDimensions.width,
      minHeight:       pageDimensions.minHeight,
      padding:         page.pageStyle?.padding || '0',
      backgroundColor: page.pageStyle?.bgColor || docStore.document?.brandSettings?.accentColor || '#0F172A',
      backgroundImage: page.pageStyle?.bgImage ? `url(${page.pageStyle.bgImage})` : 'none',
      backgroundSize:  'cover',
      '--doc-primary': docStore.document?.brandSettings?.primaryColor,
      '--doc-accent': docStore.document?.brandSettings?.accentColor,
      '--doc-text': docStore.document?.brandSettings?.textColor,
      '--doc-heading-font': docStore.document?.brandSettings?.headingFont,
      '--doc-body-font': docStore.document?.brandSettings?.bodyFont,
    } as any"
    @click="selectPage"
  >
    <!-- MAIN CONTENT ZONE -->
    <div class="flex-1 w-full flex flex-col justify-center items-center p-12">
      <VueDraggable 
        v-model="page.blocks"
        :group="{ name: 'blocks' }"
        :animation="150"
        :disabled="isPreview"
        class="min-h-[200px] h-full w-full"
        :class="!isPreview ? 'gmd-drop-zone' : ''"
      >
        <GmdBlockRenderer 
          v-for="block in page.blocks" 
          :key="block.id" 
          :block="block" 
          :page-id="page.id" 
          :selected-block-id="docStore.selectedBlockId"
          :editor-mode="appStore.editorMode"
          @select="docStore.selectBlock"
          @duplicate="docStore.duplicateBlock"
          @remove="docStore.deleteBlockById"
          @updateBlock="docStore.updateBlockData"
        />
      </VueDraggable>
    </div>
  </div>
</template>
