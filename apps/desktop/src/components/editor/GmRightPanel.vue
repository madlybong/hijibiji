<script setup lang="ts">
import { useDocumentStore } from '../../store/useDocumentStore';
import GmDocumentProperties from './GmDocumentProperties.vue';
import GmBlockProperties from './GmBlockProperties.vue';

const docStore = useDocumentStore();
</script>

<template>
  <div class="h-full bg-[#1E1E1E] flex flex-col">
    <!-- Header -->
    <div class="h-12 border-b border-[#333333] flex items-center px-4 font-semibold text-xs tracking-wide text-gray-300">
      {{ docStore.selectedBlockId ? 'Block Properties' : 'Document Settings' }}
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto p-4">
      <GmBlockProperties v-if="docStore.selectedBlockId" />
      <GmDocumentProperties v-else />
    </div>
  </div>
</template>
