<script setup lang="ts">
import { computed } from 'vue';
import { useDocumentStore } from '../../store/useDocumentStore';
// Dynamic prop imports will go here, but for now we'll do a simple fallback
import PropsHeading from './props/PropsHeading.vue';
import PropsParagraph from './props/PropsParagraph.vue';
import PropsMarketCard from './props/PropsMarketCard.vue';
import PropsStockPick from './props/PropsStockPick.vue';
// ...

const docStore = useDocumentStore();

const selectedBlock = computed(() => {
  if (!docStore.document || !docStore.selectedBlockId) return null;
  for (const page of docStore.document.pages) {
    // A proper search would be recursive
    const block = page.blocks.find(b => b.id === docStore.selectedBlockId);
    if (block) return block;
  }
  return null;
});

const getPropsComponent = (type: string) => {
  switch (type) {
    case 'heading': return PropsHeading;
    case 'paragraph': return PropsParagraph;
    case 'market-card': return PropsMarketCard;
    case 'stock-pick': return PropsStockPick;
    // ... add more as we create them
    default: return null;
  }
};

const updateData = (data: any) => {
  if (selectedBlock.value) {
    docStore.updateBlockData(selectedBlock.value.id, data);
  }
};

const deselect = () => {
  docStore.selectBlock(null);
};
</script>

<template>
  <div v-if="selectedBlock" class="flex flex-col h-full">
    <div class="flex items-center justify-between mb-4">
      <div class="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-[#2A2A2A] px-2 py-1 rounded">
        Type: <span class="text-white">{{ selectedBlock.type }}</span>
      </div>
      <button @click="deselect" class="text-xs text-gray-400 hover:text-white underline">Done</button>
    </div>

    <!-- Dynamic Property Form -->
    <div class="flex-1 overflow-y-auto">
      <component 
        v-if="getPropsComponent(selectedBlock.type)"
        :is="getPropsComponent(selectedBlock.type)" 
        :data="selectedBlock.data" 
        @update="updateData"
      />
      <div v-else class="text-xs text-gray-500 italic p-4 border border-dashed border-[#404040] rounded">
        No property editor available for this block type yet. Edit JSON below:
        <textarea 
          class="w-full h-32 bg-[#1E1E1E] border border-[#404040] rounded mt-2 p-2 font-mono text-[10px]"
          :value="JSON.stringify(selectedBlock.data, null, 2)"
          @change="e => { try { updateData(JSON.parse((e.target as HTMLTextAreaElement).value)) } catch {} }"
        ></textarea>
      </div>
    </div>
  </div>
</template>
