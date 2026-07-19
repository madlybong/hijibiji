<script setup lang="ts">
import { computed } from 'vue';
import Button from 'primevue/button';
import { Moon, Sun, Monitor } from 'lucide-vue-next';
import { useTheme } from '../composables/useTheme';

const { mode, setMode } = useTheme();

const cycleTheme = () => {
  const modes = ['dark', 'light', 'system'] as const;
  const currentIndex = modes.indexOf(mode.value);
  const nextIndex = (currentIndex + 1) % modes.length;
  setMode(modes[nextIndex]);
};

const tooltipText = computed(() => {
  return `Theme: ${mode.value.charAt(0).toUpperCase() + mode.value.slice(1)}`;
});
</script>

<template>
  <Button 
    variant="text" 
    severity="secondary" 
    size="small" 
    rounded 
    class="!w-7 !h-7 !p-0 flex items-center justify-center" 
    @click="cycleTheme" 
    v-tooltip.bottom="tooltipText"
  >
    <Moon v-if="mode === 'dark'" class="w-4 h-4" />
    <Sun v-else-if="mode === 'light'" class="w-4 h-4" />
    <Monitor v-else class="w-4 h-4" />
  </Button>
</template>
