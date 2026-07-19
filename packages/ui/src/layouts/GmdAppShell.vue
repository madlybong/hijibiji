<script setup lang="ts">
/**
 * @component GmdAppShell
 * @description The primary layout shell for the Goldmine Desktop App.
 * Handles the arrangement of the titlebar and a three-pane layout (left, center, right).
 * 
 * @slot titlebar - The top title bar section (typically GmdTitlebar)
 * @slot left - The left panel/sidebar area
 * @slot center - The main central work area (e.g., GmdCanvas)
 * @slot right - The right panel/sidebar area
 * 
 * @example
 * <GmdAppShell>
 *   <template #titlebar><GmdTitlebar /></template>
 *   <template #left><GmdLeftPanel /></template>
 *   <template #center><GmdCanvas /></template>
 *   <template #right><GmdRightPanel /></template>
 * </GmdAppShell>
 */
</script>

<template>
  <div class="gmd-app-shell bg-surface-50 dark:bg-surface-900 text-surface-900 dark:text-surface-0">
    <slot name="titlebar" />
    <div class="gmd-app-shell-body">
      <slot name="left" />
      <slot name="center" style="flex: 1" />
      <slot name="right" />
    </div>
  </div>
</template>
