<script setup lang="ts">
import { computed } from 'vue';
import { useDocumentStore } from './store/useDocumentStore';
import GmHome from './views/GmHome.vue';
import GmEditorShell from './layouts/GmEditorShell.vue';

const docStore = useDocumentStore();
const hasDocument = computed(() => docStore.document !== null);
</script>

<template>
  <GmEditorShell v-if="hasDocument" />
  <GmHome v-else />
</template>
