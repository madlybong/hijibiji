<script setup lang="ts">
import type { StyleValue } from 'vue';
defineProps<{ label: string; }>();

const rowStyle: StyleValue = {
  display:      'flex',
  gap:          '0.5rem',
  marginBottom: '0.25rem',
  fontSize:     'var(--block-font-size, 0.875rem)',
  fontFamily:   'var(--block-font-family, var(--font-inter))',
  color:        'var(--block-color, var(--color-gm-text-dark))',
  textAlign:    'var(--block-text-align, left)' as any,
};
</script>

<template>
  <div :style="rowStyle">
    <span :style="{ fontWeight: '700' }">{{ label }}:</span>
    <span><slot></slot></span>
  </div>
</template>