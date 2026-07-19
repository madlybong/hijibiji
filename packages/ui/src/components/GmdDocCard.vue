<script setup lang="ts">
/**
 * @component GmdDocCard
 * @description A card component used to display a summary of a document, including its title, description, and last updated time.
 * Provides actions to open or delete the document.
 * 
 * @example
 * <GmdDocCard :doc="documentData" @open="openDoc" @delete="deleteDoc" />
 */
import Card from 'primevue/card';
import Button from 'primevue/button';

defineProps<{
  /**
   * The document metadata object.
   */
  doc: { id: string; title: string; description?: string; updatedAt: string };
}>();

const emit = defineEmits<{
  /**
   * Emitted when the card is clicked to open the document.
   * @param e - Event name
   * @param id - The ID of the document to open
   */
  (e: 'open', id: string): void;
  /**
   * Emitted when the delete button is clicked.
   * @param e - Event name
   * @param id - The ID of the document to delete
   */
  (e: 'delete', id: string): void;
}>();
</script>

<template>
  <Card class="gmd-doc-card cursor-pointer group hover:-translate-y-1 hover:shadow-xl transition-all duration-200 border" style="background: var(--p-content-background); border-color: var(--p-content-border-color)" @click="emit('open', doc.id)">
    <template #title>
      <div class="text-base truncate">{{ doc.title || 'Untitled Document' }}</div>
    </template>
    <template #subtitle>
      <div class="text-xs truncate" style="color: var(--p-text-muted-color)">{{ doc.description || 'No description' }}</div>
    </template>
    <template #content>
      <div class="text-[10px] mt-4" style="color: var(--p-text-muted-color)">
        Last updated: {{ new Date(doc.updatedAt).toLocaleString() }}
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button icon="pi pi-trash" severity="danger" variant="text" rounded size="small" @click.stop="emit('delete', doc.id)" />
      </div>
    </template>
  </Card>
</template>
