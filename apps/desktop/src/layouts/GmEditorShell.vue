<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import GmTitlebar from '../components/editor/GmTitlebar.vue';
import GmLeftPanel from '../components/editor/GmLeftPanel.vue';
import GmCanvas from '../components/editor/GmCanvas.vue';
import GmRightPanel from '../components/editor/GmRightPanel.vue';
import { useAppStore } from '../store/useAppStore';
import { useDocumentStore } from '../store/useDocumentStore';

const appStore = useAppStore();
const docStore = useDocumentStore();

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    docStore.selectBlock(null);
    docStore.selectPage(null);
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
  <div class="w-full h-screen flex flex-col overflow-hidden bg-slate-900 text-slate-100">
    <!-- Custom Titlebar -->
    <GmTitlebar v-if="appStore.editorMode === 'edit'" />

    <!-- Three-panel layout -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Left Sidebar (Blocks & Pages) -->
      <GmLeftPanel v-if="appStore.editorMode === 'edit'" class="w-[280px] flex-shrink-0 border-r border-white/5 bg-slate-950" />

      <!-- Center Canvas -->
      <GmCanvas class="flex-1 overflow-hidden relative" />

      <!-- Right Sidebar (Properties) -->
      <GmRightPanel v-if="appStore.editorMode === 'edit'" class="w-[320px] flex-shrink-0 border-l border-white/5 bg-slate-900" />
    </div>
  </div>
</template>
