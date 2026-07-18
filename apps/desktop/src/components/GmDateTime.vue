<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  mode: 'auto' | 'manual';
  format?: string;
  value?: string;
}>();

const display = computed(() => {
  if (props.mode === 'manual') return props.value || 'DATE LABEL';
  
  const now = new Date();
  const fmt = props.format || 'MMMM YYYY';
  
  try {
    if (fmt === 'MMMM YYYY')      return now.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }).toUpperCase();
    if (fmt === 'DD MMMM YYYY')   return now.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    if (fmt === 'Q[Q] YYYY')      return `Q${Math.ceil((now.getMonth() + 1) / 3)} ${now.getFullYear()}`;
    if (fmt === 'YYYY-MM-DD')     return now.toISOString().split('T')[0];
    if (fmt === "MMM 'YY")        return now.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' });
  } catch (e) {
    // fallback
  }
  
  return props.value || 'DATE LABEL';
});
</script>

<template>
  <div :style="{
    fontFamily:    'var(--block-font-family, var(--font-montserrat))',
    fontSize:      'var(--block-font-size, 0.5625rem)',
    fontWeight:    'var(--block-font-weight, 700)',
    color:         'var(--block-color, var(--color-gm-text-muted))',
    letterSpacing: '0.15em',
    textTransform: 'var(--block-text-transform, uppercase)',
    fontStyle:     'var(--block-font-style, normal)',
    textDecoration:'var(--block-text-decoration, none)',
    lineHeight:    'var(--block-line-height, 1.4)',
    marginBottom:  '0.75rem',
  } as any">{{ display }}</div>
</template>