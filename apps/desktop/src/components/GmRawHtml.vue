<script setup lang="ts">
defineProps<{ html?: string; }>();
</script>

<template>
  <div class="w-full h-full" v-html="html"></div>
</template>