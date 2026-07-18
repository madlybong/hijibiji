<script setup lang="ts">
import { ref } from 'vue';
import { Layers, Component } from 'lucide-vue-next';
import GmBlockPalette from './GmBlockPalette.vue';
import { useDocumentStore } from '../../store/useDocumentStore';
import { VueDraggable } from 'vue-draggable-plus';

const activeTab = ref<'blocks' | 'pages'>('blocks');
const docStore = useDocumentStore();

const addPage = () => {
  docStore.addPage('blank');
};
</script>

<template>
  <div class="flex flex-col h-full bg-[#1E1E1E]">
    <!-- Tabs -->
    <div class="flex border-b border-[#333333]">
      <button 
        @click="activeTab = 'blocks'"
        class="flex-1 py-3 text-xs font-semibold flex flex-col items-center gap-1 border-b-2 transition-colors"
        :class="activeTab === 'blocks' ? 'border-gm-gold text-white' : 'border-transparent text-gray-500 hover:text-gray-300'"
      >
        <Component class="w-4 h-4" />
        Blocks
      </button>
      <button 
        @click="activeTab = 'pages'"
        class="flex-1 py-3 text-xs font-semibold flex flex-col items-center gap-1 border-b-2 transition-colors"
        :class="activeTab === 'pages' ? 'border-gm-gold text-white' : 'border-transparent text-gray-500 hover:text-gray-300'"
      >
        <Layers class="w-4 h-4" />
        Pages
      </button>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto">
      <div v-if="activeTab === 'blocks'" class="p-4">
        <GmBlockPalette />
      </div>

      <div v-else-if="activeTab === 'pages'" class="p-4 flex flex-col gap-4">
        <button @click="addPage" class="w-full bg-[#333] hover:bg-[#444] text-white py-2 rounded text-xs font-semibold transition-colors">
          + Add New Page
        </button>
        
        <VueDraggable 
          v-if="docStore.document"
          v-model="docStore.document.pages" 
          handle=".drag-handle"
          class="flex flex-col gap-3"
        >
          <div 
            v-for="(page, index) in docStore.document.pages" 
            :key="page.id"
            class="bg-[#2A2A2A] rounded p-2 flex items-center gap-3 border border-[#404040]"
          >
            <div class="drag-handle cursor-grab text-gray-500 hover:text-white">
              <svg width="12" height="24" viewBox="0 0 12 24" fill="currentColor"><path d="M4 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-6 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-6 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/></svg>
            </div>
            <div class="flex-1 text-xs">
              <div class="font-bold text-gray-300">Page {{ index + 1 }}</div>
              <div class="text-[10px] text-gray-500 capitalize">{{ page.type }}</div>
            </div>
            <button @click="docStore.deletePage(page.id)" class="text-gray-500 hover:text-red-400" title="Delete Page">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </VueDraggable>
      </div>
    </div>
  </div>
</template>
