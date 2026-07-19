import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  const activeDocumentId = ref<string | null>(null);
  const editorMode = ref<'edit' | 'preview'>('edit');
  const recentDocuments = ref<{ id: string, title: string, monthYear: string }[]>([]);
  const themeMode = ref<'dark' | 'light' | 'system'>('system');

  const setActiveDocument = (id: string | null) => {
    activeDocumentId.value = id;
  };

  const setEditorMode = (mode: 'edit' | 'preview') => {
    editorMode.value = mode;
  };

  const setThemeMode = (mode: 'dark' | 'light' | 'system') => {
    themeMode.value = mode;
  };

  return {
    activeDocumentId,
    editorMode,
    recentDocuments,
    themeMode,
    setActiveDocument,
    setEditorMode,
    setThemeMode,
  };
});
