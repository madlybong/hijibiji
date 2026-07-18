<script setup lang="ts">
import { useDocumentStore } from '../../store/useDocumentStore';
import { useAppStore } from '../../store/useAppStore';
import GmDocPage from '../../layouts/GmDocPage.vue';
import GmDocCover from '../../layouts/GmDocCover.vue';
import GmDocBackCover from '../../layouts/GmDocBackCover.vue';

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
        
        <GmDocCover v-if="page.type === 'cover'" :page="page" />
        <GmDocBackCover v-else-if="page.type === 'back-cover'" :page="page" />
        <GmDocPage v-else :page="page" />
        
      </div>
    </template>
  </div>
</template>
