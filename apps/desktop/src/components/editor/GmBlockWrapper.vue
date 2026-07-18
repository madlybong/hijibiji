<script setup lang="ts">
import { computed } from 'vue';
import { useDocumentStore } from '../../store/useDocumentStore';
import { useAppStore } from '../../store/useAppStore';
import type { GmBlock } from '../../types/document';
import Button from 'primevue/button';
import { GripVertical } from 'lucide-vue-next';

const props = defineProps<{
  block: GmBlock;
  pageId: string;
}>();

const docStore = useDocumentStore();
const appStore = useAppStore();

const isSelected = computed(() => docStore.selectedBlockId === props.block.id);
const isPreview = computed(() => appStore.editorMode === 'preview');

const cssVars = computed(() => {
  const s = props.block.style;
  if (!s) return {};
  return {
    ...(s.color && { '--block-color': s.color }),
    ...(s.backgroundColor && { '--block-bg-color': s.backgroundColor }),
    ...(s.padding && { '--block-padding': s.padding }),
    ...(s.margin && { '--block-margin': s.margin }),
    ...(s.fontSize && { '--block-font-size': s.fontSize }),
    ...(s.fontWeight && { '--block-font-weight': s.fontWeight }),
    ...(s.fontFamily && { '--block-font-family': s.fontFamily }),
    ...(s.textAlign && { '--block-text-align': s.textAlign }),
    ...(s.fontStyle && { '--block-font-style': s.fontStyle }),
    ...(s.textDecoration && { '--block-text-decoration': s.textDecoration }),
    ...(s.textTransform && { '--block-text-transform': s.textTransform }),
    ...(s.lineHeight && { '--block-line-height': s.lineHeight }),
    ...(s.borderRadius && { '--block-border-radius': s.borderRadius }),
    ...(s.opacity && { '--block-opacity': s.opacity }),
    ...(s.width && { '--block-width': s.width }),
    ...(s.height && { '--block-height': s.height }),
    ...(s.minHeight && { '--block-min-height': s.minHeight }),
    ...(s.border && { '--block-border': s.border }),
    ...(s.borderColor && { '--block-border-color': s.borderColor }),
    ...(s.borderWidth && { '--block-border-width': s.borderWidth }),
    ...(s.borderStyle && { '--block-border-style': s.borderStyle }),
    ...(s.boxShadow && { '--block-box-shadow': s.boxShadow }),
    ...(s.overflow && { '--block-overflow': s.overflow }),
  };
});

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
    class="relative group transition-all duration-200"
    :class="[
      block.isLocked && !isPreview ? 'pointer-events-none' : '',
      !block.isLocked && !isPreview ? 'cursor-pointer' : '',
      block.isHidden && !isPreview ? 'opacity-30 select-none bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.05)_10px,rgba(0,0,0,0.05)_20px)] pointer-events-none' : '',
      isSelected && !isPreview ? 'outline outline-2 outline-primary z-10' : (!isPreview && !block.isHidden ? 'hover:outline-dashed hover:outline-1 hover:outline-primary/60' : '')
    ]"
    :style="[
      cssVars,
      {
        width: block.style?.width,
        height: block.style?.height,
        minHeight: block.style?.minHeight,
        border: block.style?.border,
        borderColor: block.style?.borderColor,
        borderWidth: block.style?.borderWidth,
        borderStyle: block.style?.borderStyle,
        boxShadow: block.style?.boxShadow,
        overflow: block.style?.overflow
      }
    ]"
    @click="selectBlock"
  >
    <!-- Block Label -->
    <div 
      v-if="isSelected && !isPreview && !block.isHidden"
      class="absolute -top-6 left-2 bg-slate-800/95 backdrop-blur-sm border border-slate-600 border-b-0 rounded-t px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-primary shadow-sm pointer-events-none"
    >
      {{ block.type.replace('-', ' ') }}
    </div>

    <!-- Hidden / Locked Badges -->
    <div 
      v-if="block.isHidden && !isPreview"
      class="absolute -top-6 left-2 bg-slate-700/80 backdrop-blur-sm border border-slate-600 border-b-0 rounded-t px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-slate-300 shadow-sm pointer-events-none flex items-center gap-1"
    >
      <i class="pi pi-eye-slash text-[8px]"></i> Hidden
    </div>
    <div 
      v-if="block.isLocked && !isPreview"
      class="absolute top-1 right-1 bg-amber-500/80 backdrop-blur-sm rounded text-white px-1.5 py-0.5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <i class="pi pi-lock text-[10px]"></i>
    </div>

    <!-- The actual rendered block -->
    <slot></slot>

    <!-- Selection Overlay Toolbar -->
    <div 
      v-if="isSelected && !isPreview" 
      class="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center shadow-xl z-20 bg-slate-800/95 backdrop-blur-sm border border-slate-600/60 rounded-full p-1"
    >
      <div class="flex items-center gap-1">
        <div class="px-2 text-slate-400 cursor-grab hover:text-slate-200">
          <GripVertical class="w-4 h-4" />
        </div>
        <div class="w-px h-4 bg-slate-600 mx-1"></div>
        <Button icon="pi pi-copy" size="small" severity="secondary" variant="text" rounded @click="duplicate" v-tooltip.top="'Duplicate'" class="!w-7 !h-7 !p-0" />
        <Button icon="pi pi-trash" size="small" severity="danger" variant="text" rounded @click="remove" v-tooltip.top="'Delete'" class="!w-7 !h-7 !p-0" />
      </div>
    </div>
  </div>
</template>
