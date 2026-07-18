import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  const activeDocumentId = ref<string | null>(null);
  const editorMode = ref<'edit' | 'preview'>('edit');
  const recentDocuments = ref<{ id: string, title: string, monthYear: string }[]>([]);

  const setActiveDocument = (id: string | null) => {
    activeDocumentId.value = id;
  };

  const setEditorMode = (mode: 'edit' | 'preview') => {
    editorMode.value = mode;
  };

  return {
    activeDocumentId,
    editorMode,
    recentDocuments,
    setActiveDocument,
    setEditorMode,
  };
});
