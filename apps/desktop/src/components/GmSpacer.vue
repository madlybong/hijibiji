<script setup lang="ts">
defineProps<{ height?: number; }>();
</script>

<template>
  <div :style="{ height: `${height || 16}px` }"></div>
</template>