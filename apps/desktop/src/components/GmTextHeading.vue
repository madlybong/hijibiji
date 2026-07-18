<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{ level: 1 | 2 | 3; }>();
const Tag = computed(() => `h${props.level}`);

// Default sizes per heading level — overridable via --block-font-size
const defaultSize = computed(() => {
  if (props.level === 1) return '2.25rem';   // 36px — h1
  if (props.level === 2) return '1.5rem';    // 24px — h2
  return '1.125rem';                          // 18px — h3
});
const defaultWeight = computed(() => props.level === 1 ? '800' : '700');
const defaultMarginBottom = computed(() => {
  if (props.level === 1) return '0.75rem';
  if (props.level === 2) return '0.5rem';
  return '0.375rem';
});
</script>

<template>
  <component :is="Tag" :style="{
    color:        'var(--block-color, var(--color-gm-accent))',
    fontFamily:   'var(--block-font-family, var(--font-montserrat))',
    fontSize:     `var(--block-font-size, ${defaultSize})`,
    fontWeight:   `var(--block-font-weight, ${defaultWeight})`,
    textAlign:    'var(--block-text-align, left)',
    textTransform: level === 1 ? 'uppercase' : 'none',
    letterSpacing: level === 1 ? '-0.025em' : 'normal',
    lineHeight:    level === 1 ? '1' : '1.3',
    marginBottom:  defaultMarginBottom,
    marginTop:     level > 1 ? '1rem' : '0',
  }">
    <slot></slot>
  </component>
</template>