<script setup lang="ts">
import { Layers, Component, GripVertical } from 'lucide-vue-next';
import GmBlockPalette from './GmBlockPalette.vue';
import { useDocumentStore } from '../../store/useDocumentStore';
import { VueDraggable } from 'vue-draggable-plus';
import { ref } from 'vue';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import Menu from 'primevue/menu';

const docStore = useDocumentStore();
const activeTab = ref<'blocks' | 'pages'>('blocks');
const menu = ref();

const pageOptions = ref([
  { label: 'Add Blank Page', icon: 'pi pi-file', command: () => docStore.addPage('blank') },
  { label: 'Add Cover Page', icon: 'pi pi-image', command: () => docStore.addPage('cover') },
  { label: 'Add Back Cover', icon: 'pi pi-image', command: () => docStore.addPage('back-cover') },
]);

const toggleMenu = (event: Event) => {
  menu.value.toggle(event);
};

const getPageSeverity = (type: string) => {
  if (type === 'cover') return 'info';
  if (type === 'back-cover') return 'warn';
  return 'secondary';
};
</script>

<template>
  <div class="flex flex-col h-full bg-slate-950 border-r border-white/5">
    <!-- Segmented Control -->
    <div class="px-4 py-3 border-b border-white/5">
      <div class="flex bg-slate-800 rounded-full p-1">
        <button 
          class="flex-1 flex justify-center items-center gap-2 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors" 
          :class="activeTab === 'blocks' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'" 
          @click="activeTab = 'blocks'"
        >
          <Component class="w-3.5 h-3.5" /> Blocks
        </button>
        <button 
          class="flex-1 flex justify-center items-center gap-2 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full transition-colors" 
          :class="activeTab === 'pages' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'" 
          @click="activeTab = 'pages'"
        >
          <Layers class="w-3.5 h-3.5" /> Pages
        </button>
      </div>
    </div>

    <!-- Content Area -->
    <div class="flex-1 overflow-y-auto">
      <div v-show="activeTab === 'blocks'" class="h-full">
        <GmBlockPalette />
      </div>

      <div v-show="activeTab === 'pages'" class="p-4 flex flex-col gap-4 h-full">
        <!-- Add Page Button -->
        <div>
          <Button 
            label="Add Page" 
            icon="pi pi-plus" 
            @click="docStore.addPage('blank')" 
            size="small" 
            severity="secondary" 
            variant="outlined"
            class="w-full text-xs" 
          />
          <Button 
            icon="pi pi-angle-down" 
            @click="toggleMenu" 
            size="small" 
            severity="secondary" 
            variant="text"
            class="absolute right-6 mt-0.5 !w-8 !h-8"
            aria-haspopup="true" aria-controls="overlay_menu"
          />
          <Menu ref="menu" id="overlay_menu" :model="pageOptions" :popup="true" />
        </div>
        
        <!-- Page List -->
        <VueDraggable 
          v-if="docStore.document"
          v-model="docStore.document.pages" 
          handle=".drag-handle"
          class="flex flex-col gap-2"
        >
          <div 
            v-for="(page, index) in docStore.document.pages" 
            :key="page.id"
            class="bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-lg p-2 flex items-center gap-3 cursor-pointer group transition-colors"
            :class="{ '!bg-slate-700 !border-yellow-500/60': docStore.selectedPageId === page.id }"
            @click="docStore.selectPage(page.id)"
          >
            <!-- Drag Handle -->
            <div class="drag-handle cursor-grab text-slate-500 hover:text-slate-200 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <GripVertical class="w-3.5 h-3.5" />
            </div>
            
            <!-- Thumbnail Silhouette -->
            <div class="rounded-sm aspect-[1/1.41] bg-slate-900 border border-slate-600 w-6 flex items-center justify-center flex-shrink-0">
              <div class="w-full h-full opacity-20" :style="{ backgroundColor: page.pageStyle?.bgColor || '#0F172A' }" v-if="page.type !== 'blank'"></div>
              <div class="w-full h-full bg-white opacity-90" v-else></div>
            </div>

            <!-- Title & Badge -->
            <div class="flex-1 flex flex-col gap-1 min-w-0">
              <span class="font-bold text-xs truncate text-slate-100">
                {{ page.label || `Page ${index + 1}` }}
              </span>
              <div class="flex items-center">
                <Tag :value="page.type" :severity="getPageSeverity(page.type)" class="text-[8px] uppercase tracking-wider !px-1.5 !py-0.5 leading-none" />
              </div>
            </div>

            <!-- Delete -->
            <Button icon="pi pi-trash" variant="text" severity="danger" size="small" rounded class="!w-6 !h-6 !p-0 opacity-0 group-hover:opacity-100 transition-opacity" @click.stop="docStore.deletePage(page.id)" />
          </div>
        </VueDraggable>
      </div>
    </div>
  </div>
</template>
