<script setup lang="ts">
defineProps<{
  gap?: string;
  justifyContent?: string;
  alignItems?: string;
}>();
</script>
<template>
  <div :style="{ display: 'flex', flexDirection: 'column', gap: gap || '1rem', justifyContent: justifyContent || 'flex-start', alignItems: alignItems || 'stretch', width: '100%' }">
    <slot></slot>
  </div>
</template>