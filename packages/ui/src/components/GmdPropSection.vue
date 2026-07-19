<script setup lang="ts">
import { ref } from 'vue';
import Panel from 'primevue/panel';

const props = withDefaults(defineProps<{
  label: string;
  defaultOpen?: boolean;
}>(), {
  defaultOpen: true
});

const isCollapsed = ref(!props.defaultOpen);
</script>

<template>
  <Panel 
    :header="label" 
    :toggleable="true" 
    :collapsed="isCollapsed" 
    @update:collapsed="isCollapsed = $event"
    class="mb-2"
  >
    <div class="flex flex-col gap-4">
      <slot></slot>
    </div>
  </Panel>
</template>
