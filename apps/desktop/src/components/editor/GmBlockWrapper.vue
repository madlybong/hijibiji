<script setup lang="ts">
import { computed } from 'vue';
import { useDocumentStore } from '../../store/useDocumentStore';
import { useAppStore } from '../../store/useAppStore';
import type { GmBlock } from '../../types/document';
import { Trash2, Copy } from 'lucide-vue-next';

const props = defineProps<{
  block: GmBlock;
  pageId: string;
}>();

const docStore = useDocumentStore();
const appStore = useAppStore();

const isSelected = computed(() => docStore.selectedBlockId === props.block.id);
const isPreview = computed(() => appStore.editorMode === 'preview');

const selectBlock = (e: MouseEvent) => {
  if (isPreview.value) return;
  e.stopPropagation();
  docStore.selectBlock(props.block.id);
};

const duplicate = (e: MouseEvent) => {
  e.stopPropagation();
  // Deep clone data
  docStore.addBlock(props.pageId, props.block.type, JSON.parse(JSON.stringify(props.block.data)), props.block.id);
};

const remove = (e: MouseEvent) => {
  e.stopPropagation();
  docStore.deleteBlock(props.pageId, props.block.id);
};
</script>

<template>
  <div 
    class="relative group"
    :class="[
      !isPreview ? 'cursor-pointer min-h-[20px] transition-all duration-200 ring-offset-2' : '',
      isSelected && !isPreview ? 'ring-2 ring-blue-500 z-10' : (!isPreview ? 'hover:ring-1 hover:ring-blue-300' : '')
    ]"
    @click="selectBlock"
  >
    <!-- The actual rendered block -->
    <slot></slot>

    <!-- Selection Overlay Toolbar -->
    <div 
      v-if="isSelected && !isPreview" 
      class="absolute -top-6 right-0 bg-blue-500 text-white flex items-center rounded text-xs shadow-lg z-20 overflow-hidden"
    >
      <div class="px-2 py-1 font-semibold text-[10px] uppercase tracking-wider bg-blue-600">{{ block.type }}</div>
      <button @click="duplicate" class="p-1 hover:bg-blue-400 border-l border-blue-400" title="Duplicate">
        <Copy class="w-3.5 h-3.5" />
      </button>
      <button @click="remove" class="p-1 hover:bg-red-500 hover:text-white border-l border-blue-400 text-blue-100" title="Delete">
        <Trash2 class="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
</template>
