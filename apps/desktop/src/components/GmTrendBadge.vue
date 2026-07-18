<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{ value: string; trend: 'up' | 'down'; }>();
const style = computed(() => props.trend === 'up'
  ? { background: 'var(--color-gm-bullish-bg)', color: 'var(--color-gm-bullish)' }
  : { background: 'var(--color-gm-bearish-bg)', color: 'var(--color-gm-bearish)' }
);
</script>

<template>
  <span :style="{
    ...style,
    display:       'inline-block',
    padding:       '0.125rem 0.375rem',
    fontSize:      '9px',
    fontWeight:    '700',
    marginBottom:  '0.5rem',
    borderRadius:  '2px',
  }">{{ value }}</span>
</template>