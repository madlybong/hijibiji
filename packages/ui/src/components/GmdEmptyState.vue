<script setup lang="ts">
/**
 * @component GmdEmptyState
 * @description Standardized empty state component for the Goldmine Design System.
 * Replaces raw tailwind and text elements across the app.
 *
 * @slot icon - Optional slot for an icon or illustration
 * @slot action - Optional slot for an action button
 * 
 * @example
 * <GmdEmptyState title="No items" description="Check back later">
 *   <template #icon><Icon /></template>
 * </GmdEmptyState>
 */
defineProps<{
  /**
   * The main text to display in the empty state.
   */
  title: string;
  /**
   * Optional subtext for additional context.
   */
  description?: string;
}>();
</script>

<template>
  <div class="gmd-empty-state">
    <div v-if="$slots.icon" class="opacity-50">
      <slot name="icon" />
    </div>
    <div class="flex flex-col gap-1">
      <div class="font-bold text-sm">{{ title }}</div>
      <div v-if="description" class="text-xs opacity-75">{{ description }}</div>
    </div>
    <div v-if="$slots.action" class="mt-2">
      <slot name="action" />
    </div>
  </div>
</template>
