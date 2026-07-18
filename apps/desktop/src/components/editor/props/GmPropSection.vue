<script setup lang="ts">
import { ref } from 'vue';
import { ChevronRight } from 'lucide-vue-next';

const props = withDefaults(defineProps<{
  label: string;
  defaultOpen?: boolean;
}>(), {
  defaultOpen: true
});

const isOpen = ref(props.defaultOpen);
</script>

<template>
  <div class="flex flex-col border border-surface-800 rounded overflow-hidden">
    <!-- Header -->
    <button 
      class="flex items-center justify-between w-full p-2.5 bg-surface-800 hover:bg-surface-700 transition-colors focus:outline-none"
      @click="isOpen = !isOpen"
    >
      <span class="text-[10px] font-bold uppercase tracking-widest text-surface-200 select-none">
        {{ label }}
      </span>
      <ChevronRight 
        class="w-3.5 h-3.5 text-surface-400 transition-transform duration-200"
        :class="{ 'rotate-90': isOpen }" 
      />
    </button>
    
    <!-- Content -->
    <div v-show="isOpen" class="p-4 bg-surface-900 border-t border-surface-800 flex flex-col gap-4">
      <slot></slot>
    </div>
  </div>
</template>