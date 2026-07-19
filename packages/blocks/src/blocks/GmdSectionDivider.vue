<script setup lang="ts">
defineProps<{ label: string }>();
</script>

<template>
  <div class="w-full h-full" :style="{ display: 'flex', alignItems: 'center' }">
    <span :style="{
      fontFamily:    'var(--block-font-family, var(--font-montserrat))',
      color:         'var(--block-color, var(--color-gm-text-muted))',
      fontSize:      '9px',
      fontWeight:    '600',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginRight:   '0.75rem',
      whiteSpace:    'nowrap',
    }">{{ label }}</span>
    <div :style="{
      flex:           '1',
      height:         '1px',
      backgroundColor: 'var(--block-color, var(--color-gm-border-dark))',
      opacity:        '0.4',
    }"></div>
  </div>
</template>