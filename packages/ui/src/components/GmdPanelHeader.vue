<script setup lang="ts">
/**
 * @component GmdPanelHeader
 * @description A standardized header container for sidebar panels.
 * 
 * @slot start - Content for the left side of the header
 * @slot end - Content for the right side of the header (usually actions)
 * 
 * @example
 * <GmdPanelHeader>
 *   <template #start><h3>Layers</h3></template>
 *   <template #end><Button icon="pi pi-times" /></template>
 * </GmdPanelHeader>
 */
</script>

<template>
  <div class="gmd-panel-header justify-between">
    <div class="flex items-center gap-2">
      <slot name="start" />
    </div>
    <div class="flex items-center gap-2">
      <slot name="end" />
    </div>
  </div>
</template>
