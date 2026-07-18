<script setup lang="ts">
import { onMounted } from 'vue';
import { useDocumentStore } from './store/useDocumentStore';
import GmEditorShell from './layouts/GmEditorShell.vue';
import { createGoldmineTemplate } from './services/seedData';
// import { loadDocument } from './services/dbService'; // Will use later

const docStore = useDocumentStore();

onMounted(async () => {
  // For now, initialize an empty document if none exists
  if (!docStore.document) {
    docStore.initDocument(createGoldmineTemplate());
  }
});
</script>

<template>
  <GmEditorShell />
</template>
