<script setup lang="ts">
defineProps<{ text?: string; }>();
</script>

<template>
  <div class="gm-text-section-label">{{ text }}</div>
</template>