<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{ cols?: number; }>();
const gridCols = computed(() => `repeat(${props.cols || 1}, 1fr)`);
</script>

<template>
  <div :style="{
    display:             'grid',
    gridTemplateColumns: gridCols,
    gap:                 '0.75rem',
    marginBottom:        '0.75rem',
  }">
    <slot></slot>
  </div>
</template>