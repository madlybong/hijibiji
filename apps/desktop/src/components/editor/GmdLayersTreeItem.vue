<script setup lang="ts">
/**
 * @component GmdLayersTreeItem
 * @description A recursive wrapper for `GmdLayerItem` that renders a block and its nested children
 * within the layers panel.
 * 
 * @example
 * <GmdLayersTreeItem :block="block" :depth="0" :index="0" />
 */
import { computed } from 'vue';
import { useDocumentStore } from '../../store/useDocumentStore';
import { GmdLayerItem } from '@goldmine/ui';

const props = defineProps<{
  /**
   * The block to render in the tree.
   */
  block: any;
  /**
   * Current recursive depth of the block (used for visual indentation).
   */
  depth: number;
  /**
   * The index position of the block in its parent array.
   */
  index: number | string;
}>();

const emit = defineEmits(['blockSelected']);
const docStore = useDocumentStore();

const selectBlock = (id: string) => {
  docStore.selectBlock(id);
  emit('blockSelected');
};

const children = computed(() => {
  if (props.block.data && Array.isArray(props.block.data.blocks)) {
    return props.block.data.blocks;
  }
  return [];
});
</script>

<template>
  <GmdLayerItem 
    :block="block"
    :depth="depth"
    :isSelected="docStore.selectedBlockId === block.id"
    @select="selectBlock"
  />
  
  <template v-if="children.length > 0">
    <GmdLayersTreeItem 
      v-for="(child, idx) in children" 
      :key="child.id"
      :block="child"
      :depth="depth + 1"
      :index="idx"
      @blockSelected="emit('blockSelected')"
    />
  </template>
</template>
