<script setup lang="ts">
import { computed } from 'vue';
import type { GmBlock } from '@goldmine/types';
import Button from 'primevue/button';
import ButtonGroup from 'primevue/buttongroup';
import Tag from 'primevue/tag';

const props = defineProps<{
  block: GmBlock;
  pageId: string;
  isSelected?: boolean;
  isPreview?: boolean;
}>();

const emit = defineEmits<{
  (e: 'select', id: string): void;
  (e: 'duplicate', id: string): void;
  (e: 'remove', id: string): void;
}>();

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


const duplicate = (e: MouseEvent) => {
  e.stopPropagation();
  emit('duplicate', props.block.id);
};

const remove = (e: MouseEvent) => {
  e.stopPropagation();
  emit('remove', props.block.id);
};
</script>

<template>
  <div 
    class="relative group transition-all duration-200 rounded"
    :class="[
      block.isLocked && !isPreview ? 'pointer-events-none' : '',
      !block.isLocked && !isPreview ? 'cursor-pointer' : '',
      block.isHidden && !isPreview ? 'opacity-30 select-none bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.05)_10px,rgba(0,0,0,0.05)_20px)] pointer-events-none' : '',
      isSelected && !isPreview ? 'outline outline-1 outline-primary/50 z-10' : (!isPreview && !block.isHidden ? 'hover:outline hover:outline-1 hover:outline-surface-border' : '')
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
    @click.stop="!isPreview && emit('select', block.id)"
  >
    <!-- Block Label -->
    <Tag 
      v-if="isSelected && !isPreview && !block.isHidden"
      :value="block.label || block.type.replace('-', ' ')"
      severity="primary"
      class="absolute -top-6 left-2 uppercase tracking-widest text-[9px] pointer-events-none z-10 !rounded-b-none"
    />

    <!-- Hidden / Locked Badges -->
    <Tag 
      v-if="block.isHidden && !isPreview"
      value="Hidden"
      icon="pi pi-eye-slash"
      severity="secondary"
      class="absolute -top-6 left-2 uppercase tracking-widest text-[9px] pointer-events-none z-10 !rounded-b-none"
    />
    <Tag 
      v-if="block.isLocked && !isPreview"
      icon="pi pi-lock"
      severity="warn"
      class="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"
    />

    <!-- The actual rendered block -->
    <slot></slot>

    <!-- Selection Overlay Toolbar -->
    <div 
      v-if="isSelected && !isPreview" 
      class="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center shadow-xl z-20"
    >
      <ButtonGroup>
        <Button disabled icon="pi pi-bars" severity="secondary" size="small" class="cursor-grab" />
        <Button icon="pi pi-copy" severity="secondary" size="small" @click="duplicate" v-tooltip.top="'Duplicate'" />
        <Button icon="pi pi-trash" severity="danger" size="small" @click="remove" v-tooltip.top="'Delete'" />
      </ButtonGroup>
    </div>
  </div>
</template>
