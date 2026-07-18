<script setup lang="ts">
import { useDocumentStore } from '../../store/useDocumentStore';
import { useAppStore } from '../../store/useAppStore';
import { exportPdf } from '../../services/pdfExportService';
import { saveDocument } from '../../services/dbService';
import { FileDown, Save, File, X, Minus, Square } from 'lucide-vue-next';
import { Window } from '@tauri-apps/api/window';
import { ref } from 'vue';

const docStore = useDocumentStore();
const appStore = useAppStore();
const isExporting = ref(false);

const handleExport = async () => {
  isExporting.value = true;
  appStore.setEditorMode('preview'); // Hide all editor chrome
  
  // Wait for Vue to update the DOM (hide editor UI, remove margins)
  setTimeout(async () => {
    try {
      const pageElements = Array.from(document.querySelectorAll('.gm-nl-page')) as HTMLElement[];
      if (pageElements.length > 0 && docStore.document) {
        await exportPdf(pageElements, docStore.document.title);
      }
    } catch (e) {
      console.error(e);
    } finally {
      appStore.setEditorMode('edit');
      isExporting.value = false;
    }
  }, 500); // 500ms delay to ensure CSS styles are applied
};

const handleSave = async () => {
  if (docStore.document) {
    docStore.document.updatedAt = new Date().toISOString();
    await saveDocument(docStore.document);
    docStore.isDirty = false;
  }
};

const minimize = () => {
  Window.getCurrent().minimize();
};

const toggleMaximize = () => {
  Window.getCurrent().toggleMaximize();
};

const close = () => {
  Window.getCurrent().close();
};

</script>

<template>
  <div data-tauri-drag-region class="h-10 bg-[#1A1A1A] border-b border-[#333333] flex items-center justify-between px-3 select-none">
    
    <!-- Left: Menu -->
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2 text-gm-gold font-bold font-montserrat tracking-widest text-xs">
        <File class="w-4 h-4" />
        GOLDMINE
      </div>
      <div class="h-4 w-px bg-[#404040]"></div>
      <button @click="handleSave" class="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white px-2 py-1 rounded hover:bg-[#333]">
        <Save class="w-3.5 h-3.5" /> Save
      </button>
    </div>

    <!-- Center: Title -->
    <div class="text-xs font-semibold text-gray-300 flex-1 text-center pointer-events-none">
      {{ docStore.document?.title || 'Untitled Document' }}
      <span v-if="docStore.isDirty" class="text-gm-gold">*</span>
    </div>

    <!-- Right: Actions & Window Controls -->
    <div class="flex items-center gap-2">
      <button 
        @click="handleExport" 
        :disabled="isExporting"
        class="flex items-center gap-1.5 text-xs font-semibold bg-gm-gold text-gm-navy px-3 py-1 rounded hover:bg-yellow-500 disabled:opacity-50 transition-colors mr-2"
      >
        <FileDown class="w-3.5 h-3.5" />
        {{ isExporting ? 'Exporting...' : 'Export PDF' }}
      </button>

      <div class="flex items-center h-full">
        <div @click="minimize" class="w-10 h-10 flex items-center justify-center hover:bg-[#333333] cursor-pointer text-gray-400">
          <Minus class="w-4 h-4" />
        </div>
        <div @click="toggleMaximize" class="w-10 h-10 flex items-center justify-center hover:bg-[#333333] cursor-pointer text-gray-400">
          <Square class="w-3.5 h-3.5" />
        </div>
        <div @click="close" class="w-10 h-10 flex items-center justify-center hover:bg-red-500 hover:text-white cursor-pointer text-gray-400">
          <X class="w-4 h-4" />
        </div>
      </div>
    </div>
  </div>
</template>
