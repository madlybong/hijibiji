<script setup lang="ts">
import { useDocumentStore } from '../../store/useDocumentStore';
import { useAppStore } from '../../store/useAppStore';
import { exportPdf } from '../../services/pdfExportService';
import { saveDocument } from '../../services/dbService';
import { X, Minus, Square } from 'lucide-vue-next';
import { Window } from '@tauri-apps/api/window';
import { ref } from 'vue';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';

const docStore = useDocumentStore();
const appStore = useAppStore();
const isExporting = ref(false);

const isTauri = () => {
  return (window as any).__TAURI__ !== undefined;
};

const handleExport = async () => {
  isExporting.value = true;
  appStore.setEditorMode('preview');
  
  setTimeout(async () => {
    try {
      const pageElements = Array.from(document.querySelectorAll('.gm-doc-page')) as HTMLElement[];
      if (pageElements.length > 0 && docStore.document) {
        await exportPdf(pageElements, docStore.document.title);
      }
    } catch (e) {
      console.error(e);
    } finally {
      appStore.setEditorMode('edit');
      isExporting.value = false;
    }
  }, 500);
};

const handleSave = async () => {
  if (docStore.document) {
    docStore.document.updatedAt = new Date().toISOString();
    await saveDocument(docStore.document);
    docStore.isDirty = false;
  }
};

const minimize = () => {
  if (isTauri()) Window.getCurrent().minimize();
};

const toggleMaximize = () => {
  if (isTauri()) Window.getCurrent().toggleMaximize();
};

const close = () => {
  if (isTauri()) Window.getCurrent().close();
};

const handleBack = async () => {
  if (docStore.isDirty) {
    // We cannot easily use tauri confirm since we didn't import it, so we fallback to window.confirm
    const confirmed = window.confirm('You have unsaved changes. Are you sure you want to go back?');
    if (!confirmed) return;
  }
  docStore.initDocument(null as any);
};

</script>
<template>
  <div data-tauri-drag-region class="select-none">
    <Toolbar class="h-11 border-b border-surface-700 px-3 py-0 !rounded-none !bg-surface-900">
      <!-- Left: Menu -->
      <template #start>
        <div class="flex items-center gap-4">
          <button @click="handleBack" class="flex items-center gap-2 text-primary font-bold font-montserrat tracking-widest text-xs hover:text-primary/80 transition-colors">
            GOLDMINE
          </button>
          <div class="h-4 w-px bg-surface-700"></div>
          <Button 
            label="Save" 
            icon="pi pi-save" 
            severity="secondary"
            size="small"
            class="text-xs"
            @click="handleSave" 
          />
        </div>
      </template>

      <!-- Center: Title -->
      <template #center>
        <div class="flex flex-col items-center pointer-events-none">
          <div class="text-sm font-bold text-surface-0 flex items-center gap-1">
            {{ docStore.document?.title || 'Untitled Document' }}
            <span v-if="docStore.isSaving" class="text-[10px] font-normal text-slate-400 ml-2">Saving...</span>
            <span v-else-if="docStore.isDirty" class="text-yellow-400 text-lg leading-none">*</span>
            <span v-else class="text-[10px] font-normal text-slate-500 ml-2">Saved</span>
          </div>
        </div>
      </template>

      <!-- Right: Actions & Window Controls -->
      <template #end>
        <div class="flex items-center gap-4 h-full">
          <Button 
            :label="isExporting ? 'Exporting...' : 'Export PDF'" 
            icon="pi pi-file-pdf" 
            severity="primary"
            size="small"
            :loading="isExporting"
            @click="handleExport" 
            class="text-xs font-bold"
          />

          <div v-if="isTauri()" class="flex items-center gap-0.5 bg-surface-800 rounded-full px-1 py-0.5">
            <Button variant="text" severity="secondary" size="small" rounded class="!w-6 !h-6 !p-0" @click="minimize" v-tooltip.bottom="'Minimize'">
              <Minus class="w-3 h-3" />
            </Button>
            <Button variant="text" severity="secondary" size="small" rounded class="!w-6 !h-6 !p-0" @click="toggleMaximize" v-tooltip.bottom="'Maximize'">
              <Square class="w-2.5 h-2.5" />
            </Button>
            <Button variant="text" severity="danger" size="small" rounded class="!w-6 !h-6 !p-0" @click="close" v-tooltip.bottom="'Close'">
              <X class="w-3 h-3" />
            </Button>
          </div>
        </div>
      </template>
    </Toolbar>
  </div>
</template>
