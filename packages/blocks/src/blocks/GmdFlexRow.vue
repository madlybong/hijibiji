<script setup lang="ts">
// Props defined for property binding, but layout is handled by parent sortable container
defineProps<{
  gap?: string;
  justifyContent?: string;
  alignItems?: string;
}>();
</script>
<template>
  <div class="w-full h-full min-h-0 min-w-0">
    <slot></slot>
  </div>
</template>