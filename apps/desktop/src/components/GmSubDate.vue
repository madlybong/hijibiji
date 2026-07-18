<script setup lang="ts">
defineProps<{ text?: string; }>();
</script>

<template>
  <div class="gm-text-sub-date font-montserrat tracking-widest text-[9px] uppercase font-bold text-gm-text-muted mb-4">{{ text }}</div>
</template>