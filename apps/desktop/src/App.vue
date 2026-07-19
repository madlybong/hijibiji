<script setup lang="ts">
import { computed } from 'vue';
import { useDocumentStore } from './store/useDocumentStore';
import { useTheme } from '@goldmine/ui';
import GmdHome from './views/GmdHome.vue';
import GmdEditorShell from './layouts/GmdEditorShell.vue';
import ConfirmDialog from 'primevue/confirmdialog';

const { initTheme } = useTheme();
initTheme();

const docStore = useDocumentStore();
const hasDocument = computed(() => docStore.document !== null);
</script>

<template>
  <ConfirmDialog></ConfirmDialog>
  <GmdEditorShell v-if="hasDocument" />
  <GmdHome v-else />
</template>
