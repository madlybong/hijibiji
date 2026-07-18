<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { listDocuments, loadDocument, deleteDocument } from '../services/dbService';
import { useDocumentStore } from '../store/useDocumentStore';
import { createGoldmineTemplate, createBlankDocument } from '../services/seedData';
import Button from 'primevue/button';
import Card from 'primevue/card';
import { FileText, Hexagon } from 'lucide-vue-next';

const docs = ref<any[]>([]);
const docStore = useDocumentStore();

const refreshList = async () => {
  docs.value = await listDocuments();
};

onMounted(() => {
  refreshList();
});

const handleNewDocument = () => {
  docStore.initDocument(createBlankDocument());
};

const handleNewFromTemplate = () => {
  docStore.initDocument(createGoldmineTemplate());
};

const handleOpen = async (id: string) => {
  const doc = await loadDocument(id);
  if (doc) docStore.initDocument(doc);
};

const handleDelete = async (id: string) => {
  await deleteDocument(id);
  await refreshList();
};
</script>

<template>
  <div class="min-h-screen bg-surface-950 p-8 flex flex-col items-center">
    <div class="w-full max-w-5xl">
      
      <div class="flex items-center gap-4 mb-12 select-none">
        <Hexagon class="w-8 h-8 fill-primary text-primary" />
        <h1 class="text-2xl font-montserrat font-bold tracking-widest text-white">GOLDMINE</h1>
      </div>

      <div class="flex justify-between items-end mb-6">
        <h2 class="text-xl font-bold text-white">Recent Documents</h2>
        <div class="flex gap-2">
          <Button label="Blank Document" icon="pi pi-file" size="small" @click="handleNewDocument" />
          <Button label="Newsletter Template" icon="pi pi-sparkles" severity="secondary" size="small" @click="handleNewFromTemplate" />
        </div>
      </div>

      <div v-if="docs.length === 0" class="flex flex-col items-center justify-center p-16 border border-dashed border-surface-700 rounded-xl bg-surface-900/50">
        <FileText class="w-12 h-12 text-slate-500 mb-4" />
        <p class="text-slate-300">No documents found. Create one to get started.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card v-for="doc in docs" :key="doc.id" class="bg-surface-900 border border-surface-700 hover:border-primary/50 transition-colors cursor-pointer" @click="handleOpen(doc.id)">
          <template #title>
            <div class="text-base truncate">{{ doc.title || 'Untitled Document' }}</div>
          </template>
          <template #subtitle>
            <div class="text-xs text-slate-400 truncate">{{ doc.description || 'No description' }}</div>
          </template>
          <template #content>
            <div class="text-[10px] text-slate-500 mt-4">
              Last updated: {{ new Date(doc.updatedAt).toLocaleString() }}
            </div>
          </template>
          <template #footer>
            <div class="flex justify-end mt-2">
              <Button icon="pi pi-trash" severity="danger" variant="text" rounded size="small" @click.stop="handleDelete(doc.id)" />
            </div>
          </template>
        </Card>
      </div>

    </div>
  </div>
</template>
