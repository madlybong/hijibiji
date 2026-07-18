<script setup lang="ts">
import { computed } from 'vue';
import { useDocumentStore } from '../../store/useDocumentStore';
import GmDocumentProperties from './GmDocumentProperties.vue';
import GmBlockProperties from './GmBlockProperties.vue';
import PropsPage from './props/PropsPage.vue';
import GmLayersPanel from './GmLayersPanel.vue';
import Button from 'primevue/button';
import { ref } from 'vue';

const docStore = useDocumentStore();

const selectedPage = computed(() => {
  if (!docStore.document || !docStore.selectedPageId) return null;
  return docStore.document.pages.find(p => p.id === docStore.selectedPageId) || null;
});

const closePanel = () => {
  docStore.selectBlock(null);
  docStore.selectPage(null);
};

const activeTab = ref<'properties' | 'layers'>('properties');
</script>

<template>
  <div class="h-full flex flex-col bg-slate-900 border-l border-white/5">
    <!-- Header -->
    <div class="flex items-center justify-between px-4 h-11 border-b border-white/5 shrink-0">
      <div class="flex items-center gap-2 w-48">
        <div class="flex bg-slate-800 rounded-full p-1 w-full">
          <button 
            class="flex-1 flex justify-center items-center gap-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors"
            :class="activeTab === 'properties' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'"
            @click="activeTab = 'properties'"
          >Props</button>
          <button
            class="flex-1 flex justify-center items-center gap-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors"
            :class="activeTab === 'layers' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'"
            @click="activeTab = 'layers'"
          >Layers</button>
        </div>
      </div>
      <Button 
        v-if="docStore.selectedBlockId || docStore.selectedPageId"
        icon="pi pi-times" 
        variant="text" 
        severity="secondary" 
        rounded 
        class="!w-6 !h-6 !p-0"
        @click="closePanel" 
      />
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto overflow-x-hidden p-4 custom-scrollbar">
      <div v-if="activeTab === 'layers'" class="h-full -mx-4 -mt-4">
        <GmLayersPanel @blockSelected="activeTab = 'properties'" />
      </div>
      <div v-else class="flex flex-col gap-4">
        <GmBlockProperties v-if="docStore.selectedBlockId" />
        <PropsPage v-else-if="docStore.selectedPageId && selectedPage" :page="selectedPage" />
        <GmDocumentProperties v-else />
      </div>
    </div>
  </div>
</template>

