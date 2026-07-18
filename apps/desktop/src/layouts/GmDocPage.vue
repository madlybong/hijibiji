<script setup lang="ts">
import { computed } from 'vue';
import type { GmPage } from '../../types/document';
import GmBlockRenderer from '../editor/GmBlockRenderer.vue';
import { VueDraggable } from 'vue-draggable-plus';
import { useAppStore } from '../../store/useAppStore';
import { useDocumentStore } from '../../store/useDocumentStore';

const props = defineProps<{ page: GmPage }>();
const appStore = useAppStore();
const docStore = useDocumentStore();

const isPreview = computed(() => appStore.editorMode === 'preview');
const isSelected = computed(() => docStore.selectedPageId === props.page.id);

const selectPage = () => {
  if (!isPreview.value) docStore.selectPage(props.page.id);
};
</script>

<template>
  <div 
    class="gm-doc-page flex flex-col"
    :class="[
      isSelected && !isPreview ? 'outline outline-4 outline-primary/50' : ''
    ]"
    :style="{
      padding:         page.pageStyle?.padding || '8mm',
      backgroundColor: page.pageStyle?.bgColor || '#FFFFFF',
      backgroundImage: page.pageStyle?.bgImage ? `url(${page.pageStyle.bgImage})` : 'none',
      backgroundSize:  'cover'
    }"
    @click="selectPage"
  >
    <!-- HEADER ZONE -->
    <div v-if="page.showHeader" class="w-full min-h-[40px] mb-4">
      <VueDraggable 
        v-model="page.headerBlocks"
        :group="{ name: 'blocks' }"
        :animation="150"
        :disabled="isPreview"
        class="min-h-[40px] w-full"
        :class="!isPreview ? 'border border-dashed border-transparent hover:border-gray-300' : ''"
      >
        <GmBlockRenderer 
          v-for="block in page.headerBlocks" 
          :key="block.id" 
          :block="block" 
          :page-id="page.id" 
        />
      </VueDraggable>
    </div>

    <!-- MAIN CONTENT ZONE -->
    <div class="flex-1 w-full">
      <VueDraggable 
        v-model="page.blocks"
        :group="{ name: 'blocks' }"
        :animation="150"
        :disabled="isPreview"
        class="min-h-[100px] h-full w-full"
        :class="!isPreview ? 'border border-dashed border-transparent hover:border-gray-300' : ''"
      >
        <GmBlockRenderer 
          v-for="block in page.blocks" 
          :key="block.id" 
          :block="block" 
          :page-id="page.id" 
        />
      </VueDraggable>
    </div>

    <!-- FOOTER ZONE -->
    <div v-if="page.showFooter" class="w-full min-h-[40px] mt-4">
      <VueDraggable 
        v-model="page.footerBlocks"
        :group="{ name: 'blocks' }"
        :animation="150"
        :disabled="isPreview"
        class="min-h-[40px] w-full"
        :class="!isPreview ? 'border border-dashed border-transparent hover:border-gray-300' : ''"
      >
        <GmBlockRenderer 
          v-for="block in page.footerBlocks" 
          :key="block.id" 
          :block="block" 
          :page-id="page.id" 
        />
      </VueDraggable>
    </div>
  </div>
</template>