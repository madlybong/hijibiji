<script setup lang="ts">
/**
 * @component GmdLayerItem
 * @description A recursive tree item for displaying individual blocks within the layers panel.
 * 
 * @example
 * <GmdLayerItem :block="block" :depth="0" :is-selected="false" @select="handleSelect" />
 */
const props = defineProps<{
  /**
   * The block data structure to display.
   */
  block: any;
  /**
   * The current nesting depth of the layer in the tree, used for indentation.
   */
  depth: number;
  /**
   * Indicates if the current block is active/selected in the editor.
   */
  isSelected: boolean;
}>();

const emit = defineEmits<{
  /**
   * Emitted when a layer item is clicked.
   * @param e - Event name
   * @param id - The ID of the selected block
   */
  (e: 'select', id: string): void;
}>();

const humanize = (type: string) => type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

const getIcon = (type: string) => {
  if (type === 'heading') return 'pi pi-heading';
  if (type === 'paragraph') return 'pi pi-align-left';
  if (type === 'datetime') return 'pi pi-calendar';
  if (type === 'text-list') return 'pi pi-list';
  if (type === 'market-card') return 'pi pi-chart-line';
  if (type === 'stock-pick') return 'pi pi-star';
  if (type === 'info-card') return 'pi pi-info-circle';
  if (type === 'data-row') return 'pi pi-table';
  if (type === 'trend-badge') return 'pi pi-arrow-up-right';
  if (type === 'content-grid') return 'pi pi-th-large';
  if (type === 'section-divider') return 'pi pi-minus';
  if (type === 'spacer') return 'pi pi-arrows-v';
  if (type === 'flex-row') return 'pi pi-ellipsis-h';
  if (type === 'flex-col') return 'pi pi-ellipsis-v';
  if (type === 'raw-html') return 'pi pi-code';
  return 'pi pi-box';
};

const selectBlock = (id: string) => {
  emit('select', id);
};
</script>

<template>
  <div 
    @click.stop="selectBlock(block.id)"
    class="gmd-layer-item"
    :class="{ 'gmd-layer-item-active': isSelected, 'gmd-layer-item-hidden': block.isHidden }"
    :style="{ paddingLeft: `${0.75 + depth * 1.25}rem` }"
  >
    <i :class="getIcon(block.type)" class="gmd-layer-item-icon"></i>
    <span class="gmd-layer-item-label">{{ block.label || humanize(block.type) }}</span>
    <div class="gmd-layer-item-actions">
      <i v-if="block.isLocked" class="pi pi-lock gmd-layer-item-locked"></i>
      <i v-if="block.isHidden" class="pi pi-eye-slash opacity-50"></i>
    </div>
  </div>
</template>
