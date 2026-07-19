<script setup lang="ts">
defineProps<{ label: string; }>();
</script>

<template>
  <div :style="{
    display:      'flex',
    gap:          '0.5rem',
    marginBottom: '0.25rem',
    fontSize:     'var(--block-font-size, 0.875rem)',
    fontFamily:   'var(--block-font-family, var(--font-inter))',
    color:        'var(--block-color, var(--color-gm-text-dark))',
    textAlign:    'var(--block-text-align, left)',
  } as any">
    <span :style="{ fontWeight: '700' }">{{ label }}:</span>
    <span><slot></slot></span>
  </div>
</template>