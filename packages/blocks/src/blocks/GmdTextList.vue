<script setup lang="ts">
defineProps<{ ordered?: boolean; items?: string[]; }>();
</script>

<template>
  <component :is="ordered ? 'ol' : 'ul'" :style="{
    marginBottom: '0.75rem', 
    paddingLeft: '1.5rem',
    listStyle: ordered ? 'decimal' : 'disc',
    color:      'var(--block-color, var(--color-gm-text-dark))',
    fontSize:   'var(--block-font-size, 0.875rem)',
    fontFamily: 'var(--block-font-family, var(--font-inter))',
    lineHeight: 'var(--block-line-height, 1.6)',
  }">
    <li v-for="(item, i) in items" :key="i" style="margin-bottom: 0.25rem;">
      {{ item }}
    </li>
  </component>
</template>