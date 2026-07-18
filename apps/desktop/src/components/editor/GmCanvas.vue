<script setup lang="ts">
import { useDocumentStore } from '../../store/useDocumentStore';
import { useAppStore } from '../../store/useAppStore';
import GmNlPage from '../../layouts/GmNlPage.vue';
import GmNlCover from '../../layouts/GmNlCover.vue';
import GmNlBackcover from '../../layouts/GmNlBackcover.vue';

const docStore = useDocumentStore();
const appStore = useAppStore();

const deselect = () => {
  docStore.selectBlock(null);
};
</script>

<template>
  <div 
    class="flex flex-col items-center py-8 gap-8" 
    :class="{ 'pointer-events-none': appStore.editorMode === 'preview' }"
    @click.self="deselect"
  >
    <template v-if="docStore.document">
      <div v-for="page in docStore.document.pages" :key="page.id" class="relative group">
        <!-- We can wrap it in a container if we want page-level hover actions -->
        
        <GmNlCover v-if="page.type === 'cover'" :page-data="page" />
        <GmNlBackcover v-else-if="page.type === 'backcover'" :page-data="page" />
        <GmNlPage v-else :page-data="page" />
        
      </div>
    </template>
  </div>
</template>
