<script setup lang="ts">
/**
 * @component GmdTitlebar
 * @description The desktop application titlebar. Provides document saving status,
 * undo/redo controls, export actions, and window controls (minimize, maximize, close).
 * 
 * @example
 * <GmdTitlebar />
 */
import { useDocumentStore } from '../../store/useDocumentStore';
import { exportPdf } from '../../services/pdfExportService';
import { GmdWindowControls, GmdThemeToggle } from '@goldmine/ui';
import { ref } from 'vue';
import Button from 'primevue/button';
import Toolbar from 'primevue/toolbar';
import Divider from 'primevue/divider';
import { useConfirm } from 'primevue/useconfirm';

const confirm = useConfirm();

const docStore = useDocumentStore();
const isExporting = ref(false);

// Window controls are now handled by GmdWindowControls

const handleBack = async () => {
  if (docStore.isDirty) {
    confirm.require({
      message: 'You have unsaved changes. Are you sure you want to go back?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        docStore.initDocument(null as any);
      }
    });
  } else {
    docStore.initDocument(null as any);
  }
};

const handleSave = async () => {
  if (!docStore.isDirty || docStore.isSaving) return;
  await docStore.forceSave();
};

const handleExport = async () => {
  if (!docStore.document) return;
  isExporting.value = true;
  try {
    await exportPdf(docStore.document.title);
  } catch (error) {
    console.error('Failed to export PDF:', error);
  } finally {
    isExporting.value = false;
  }
};

</script>
<template>
  <div data-tauri-drag-region class="select-none">
    <Toolbar class="gmd-titlebar border-x-0 border-t-0 !rounded-none !px-3 !py-0">
      <!-- Left: Menu -->
      <template #start>
        <div class="flex items-center gap-4">
          <Button @click="handleBack" variant="text" class="flex items-center gap-2 font-bold font-montserrat tracking-widest text-xs transition-colors !text-primary" v-tooltip.bottom="'Back to Documents'">
            <i class="pi pi-arrow-left"></i>
            <span>GOLDMINE</span>
          </Button>
          <Divider layout="vertical" />
          <Button 
            icon="pi pi-undo" 
            severity="secondary"
            variant="text"
            size="small"
            class="!w-7 !h-7 !p-0"
            :disabled="!docStore.canUndo"
            @click="docStore.undo()" 
            v-tooltip.bottom="'Undo (Ctrl+Z)'"
          />
          <Button 
            icon="pi pi-refresh" 
            severity="secondary"
            variant="text"
            size="small"
            class="!w-7 !h-7 !p-0"
            :disabled="!docStore.canRedo"
            @click="docStore.redo()" 
            v-tooltip.bottom="'Redo (Ctrl+Y)'"
          />
        </div>
      </template>

      <!-- Center: Title -->
      <template #center>
        <div class="flex flex-col items-center pointer-events-none">
          <div class="gmd-titlebar-title">
            {{ docStore.document?.title || 'Untitled Document' }}
            <span v-if="docStore.isSaving" class="gmd-save-status ml-2">Saving...</span>
            <span v-else-if="docStore.isDirty" class="gmd-save-status gmd-save-status--dirty ml-1 text-lg leading-none">*</span>
            <span v-else class="gmd-save-status ml-2">Saved</span>
          </div>
        </div>
      </template>

      <!-- Right: Actions & Window Controls -->
      <template #end>
        <div class="flex items-center gap-4 h-full">
          <Button 
            :label="docStore.isSaving ? 'Saving...' : 'Save'" 
            icon="pi pi-save" 
            severity="secondary"
            size="small"
            :disabled="!docStore.isDirty"
            :loading="docStore.isSaving"
            @click="handleSave" 
            class="text-xs font-bold"
            v-tooltip.bottom="'Save Document (Ctrl+S)'"
          />
          <Button 
            :label="isExporting ? 'Exporting...' : 'Export PDF'" 
            icon="pi pi-file-pdf" 
            severity="primary"
            size="small"
            :loading="isExporting"
            @click="handleExport" 
            class="text-xs font-bold ml-2"
          />

          <GmdThemeToggle />
          <GmdWindowControls />
        </div>
      </template>
    </Toolbar>
  </div>
</template>
