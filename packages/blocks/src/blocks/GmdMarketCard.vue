<script setup lang="ts">
import { computed } from 'vue';
import GmdTrendBadge from './GmdTrendBadge.vue';
const props = defineProps<{
  label: string;
  value: string;
  badgeValue?: string;
  trend?: 'up' | 'down';
  description?: string;
  borderColor?: 'red' | 'green' | 'none';
}>();
const borderStyle = computed(() => {
  if (props.borderColor === 'red')   return '4px solid var(--color-gm-bearish)';
  if (props.borderColor === 'green') return '4px solid var(--color-gm-bullish)';
  return 'none';
});
</script>

<template>
  <div :style="{
    border:           '1px solid var(--color-gm-border-light)',
    borderLeft:       borderStyle,
    backgroundColor:  'var(--block-bg-color, #FFFFFF)',
    padding:          '0.625rem 0.625rem 0.625rem ' + (borderColor && borderColor !== 'none' ? '0.5rem' : '0.625rem'),
    display:          'flex',
    flexDirection:    'column',
  }">
    <div :style="{
      fontFamily:    'var(--block-font-family, var(--font-montserrat))',
      fontSize:      '9px',
      color:         'var(--color-gm-text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom:  '0.25rem',
    }">{{ label }}</div>
    <h3 :style="{
      fontFamily:   'var(--block-font-family, var(--font-montserrat))',
      fontSize:     'var(--block-font-size, 1.5rem)',
      fontWeight:   '800',
      color:        'var(--block-color, var(--color-gm-text-dark))',
      marginBottom: '0.25rem',
    }">{{ value }}</h3>
    <GmdTrendBadge v-if="badgeValue && trend" :value="badgeValue" :trend="trend" />
    <div v-if="description" :style="{ fontSize: '9px', color: 'var(--color-gm-text-muted)' }" v-html="description"></div>
  </div>
</template>