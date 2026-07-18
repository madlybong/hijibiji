<script setup lang="ts">
import { computed, ref } from 'vue';
import { useResizeObserver, useMutationObserver } from '@vueuse/core';
import type { GmPage } from '../types/document';
import GmBlockRenderer from '../components/editor/GmBlockRenderer.vue';
import { VueDraggable } from 'vue-draggable-plus';
import { useAppStore } from '../store/useAppStore';
import { useDocumentStore } from '../store/useDocumentStore';

const props = defineProps<{ page: GmPage }>();
const appStore = useAppStore();
const docStore = useDocumentStore();

const isPreview = computed(() => appStore.editorMode === 'preview');
const isSelected = computed(() => docStore.selectedPageId === props.page.id);

const selectPage = () => {
  if (!isPreview.value) docStore.selectPage(props.page.id);
};

const pageRef = ref<HTMLElement | null>(null);
const isOverflowing = ref(false);

const checkOverflow = () => {
  if (pageRef.value) {
    isOverflowing.value = pageRef.value.scrollHeight > pageRef.value.clientHeight + 2;
  }
};

useResizeObserver(pageRef, checkOverflow);
useMutationObserver(pageRef, checkOverflow, { childList: true, subtree: true, characterData: true });
</script>

<template>
  <div 
    ref="pageRef"
    class="gm-doc-page flex flex-col relative"
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

    <!-- OVERFLOW INDICATOR -->
    <div 
      v-if="isOverflowing && !isPreview" 
      class="absolute bottom-0 left-0 w-full flex items-end justify-center pointer-events-none pb-1"
      style="height: 24px; background: linear-gradient(to top, rgba(239,68,68,0.15), transparent); border-bottom: 2px dashed #ef4444;"
    >
      <span class="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-t-sm shadow-sm tracking-wider uppercase">
        Content Overflow
      </span>
    </div>
  </div>
</template>