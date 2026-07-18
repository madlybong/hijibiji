<script setup lang="ts">
const props = defineProps<{ cols?: number; }>();
</script>

<template>
  <div class="w-full h-full min-h-0 min-w-0">
    <slot></slot>
  </div>
</template>