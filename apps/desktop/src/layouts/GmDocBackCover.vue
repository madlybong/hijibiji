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
    class="gm-doc-page relative flex flex-col"
    :class="[
      isSelected && !isPreview ? 'outline outline-4 outline-primary/50' : ''
    ]"
    :style="{
      padding:         page.pageStyle?.padding || '0',
      backgroundColor: page.pageStyle?.bgColor || '#0F172A',
      backgroundImage: page.pageStyle?.bgImage ? `url(${page.pageStyle.bgImage})` : 'none',
      backgroundSize:  'cover'
    }"
    @click="selectPage"
  >
    <!-- MAIN CONTENT ZONE (Centered vertically/horizontally by default) -->
    <div class="flex-1 w-full flex flex-col justify-center items-center p-12">
      <VueDraggable 
        v-model="page.blocks"
        :group="{ name: 'blocks' }"
        :animation="150"
        :disabled="isPreview"
        class="min-h-[100px] w-full"
        :class="!isPreview ? 'border border-dashed border-transparent hover:border-gray-500/50' : ''"
      >
        <GmBlockRenderer 
          v-for="block in page.blocks" 
          :key="block.id" 
          :block="block" 
          :page-id="page.id" 
        />
      </VueDraggable>
    </div>
  </div>
</template>