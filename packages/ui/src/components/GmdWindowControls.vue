<script setup lang="ts">
import { Window } from '@tauri-apps/api/window';
import Button from 'primevue/button';
import { X, Minus, Square } from 'lucide-vue-next';
import { ref, onMounted } from 'vue';

const isTauriEnv = ref(false);

onMounted(() => {
  isTauriEnv.value = (window as any).__TAURI__ !== undefined;
});

const minimize = () => {
  if (isTauriEnv.value) Window.getCurrent().minimize();
};

const toggleMaximize = () => {
  if (isTauriEnv.value) Window.getCurrent().toggleMaximize();
};

const close = () => {
  if (isTauriEnv.value) Window.getCurrent().close();
};
</script>

<template>
  <div v-if="isTauriEnv" class="flex items-center gap-0.5 bg-surface-800 rounded-full px-1 py-0.5">
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
</template>
