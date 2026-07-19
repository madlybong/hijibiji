<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { useDocumentStore } from '../store/useDocumentStore';
import { TEMPLATES } from '@goldmine/sdk';
import { GmdHomePage, GmdTemplateCard, GmdDocCard, GmdEmptyState } from '@goldmine/ui';
import { FileText, Hexagon } from 'lucide-vue-next';

const docs = ref<any[]>([]);
const docStore = useDocumentStore();

const refreshList = async () => {
  if (docStore.adapter) {
    docs.value = await docStore.adapter.listDocuments();
  }
};

onMounted(() => {
  refreshList();
});

const handleNewFromTemplate = (templateId: string) => {
  const tpl = TEMPLATES.find(t => t.id === templateId);
  if (tpl) docStore.initDocument(tpl.create());
};

const handleOpen = async (id: string) => {
  if (!docStore.adapter) return;
  const doc = await docStore.adapter.loadDocument(id);
  if (doc) docStore.initDocument(doc);
};

const handleDelete = async (id: string) => {
  if (!docStore.adapter) return;
  await docStore.adapter.deleteDocument(id);
  await refreshList();
};
</script>

<template>
  <GmdHomePage>
    <template #brand>
      <div class="gmd-brand-logo">
        <Hexagon class="w-8 h-8 fill-primary text-primary" />
        <h1 class="gmd-brand-name">GOLDMINE</h1>
      </div>
    </template>
    <template #templates>
      <GmdTemplateCard 
        v-for="tpl in TEMPLATES" 
        :key="tpl.id"
        :template="tpl"
        @select="handleNewFromTemplate"
      />
    </template>
    <template #recent-header>
      <div class="flex justify-between items-end mb-6">
        <h2 class="gmd-section-title !mb-0">Recent Documents</h2>
      </div>
    </template>
    <template #recent>
      <div v-if="docs.length === 0" class="col-span-full">
        <GmdEmptyState title="No documents found" description="Create one to get started">
          <template #icon>
            <FileText class="w-12 h-12" />
          </template>
        </GmdEmptyState>
      </div>
      <template v-else>
        <GmdDocCard 
          v-for="doc in docs" 
          :key="doc.id" 
          :doc="doc" 
          @open="handleOpen" 
          @delete="handleDelete" 
        />
      </template>
    </template>
  </GmdHomePage>
</template>
