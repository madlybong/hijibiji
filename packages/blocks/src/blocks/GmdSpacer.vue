<script setup lang="ts">
defineProps<{ height?: number; }>();
</script>

<template>
  <div class="w-full" :style="{ minHeight: `${height || 16}px` }"></div>
</template>