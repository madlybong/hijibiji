<script setup lang="ts">
import { computed } from 'vue';
import { useDocumentStore } from '../../store/useDocumentStore';

const props = defineProps<{
  block: any;
  depth: number;
  index: number;
}>();

const docStore = useDocumentStore();

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
  docStore.selectBlock(id);
};

const children = computed(() => {
  if (props.block.data && Array.isArray(props.block.data.blocks)) {
    return props.block.data.blocks;
  }
  return [];
});
</script>

<template>
  <div class="flex flex-col">
    <div 
      @click.stop="selectBlock(block.id)"
      class="flex items-center gap-3 py-2 rounded-md cursor-pointer transition-colors border-l-2"
      :class="[
        docStore.selectedBlockId === block.id ? 'bg-slate-800 border-primary text-slate-100' : 'border-transparent hover:bg-slate-800/50 text-slate-400',
        block.isHidden ? 'opacity-50' : ''
      ]"
      :style="{ paddingLeft: `${0.75 + depth * 1.25}rem`, paddingRight: '0.75rem' }"
    >
      <i :class="getIcon(block.type)" class="text-primary opacity-80 text-sm w-4 text-center"></i>
      <span class="text-sm font-medium truncate flex-1">{{ humanize(block.type) }}</span>
      <div class="flex items-center gap-2 opacity-60">
        <i v-if="block.isLocked" class="pi pi-lock text-amber-500 text-xs"></i>
        <i v-if="block.isHidden" class="pi pi-eye-slash text-slate-400 text-xs"></i>
      </div>
    </div>
    
    <template v-if="children.length > 0">
      <GmLayersTreeItem 
        v-for="(child, idx) in children" 
        :key="child.id"
        :block="child"
        :depth="depth + 1"
        :index="idx"
      />
    </template>
  </div>
</template>
