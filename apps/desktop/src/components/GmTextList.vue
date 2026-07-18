<script setup lang="ts">
defineProps<{ ordered?: boolean; }>();
</script>

<template>
  <component :is="ordered ? 'ol' : 'ul'" :style="{
    marginBottom: '0.75rem',
    paddingLeft:  '1.25rem',
    listStyle:    ordered ? 'decimal' : 'disc',
  }">
    <slot></slot>
  </component>
</template>