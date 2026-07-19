<script setup lang="ts">
/**
 * @component GmdSectionLabel
 * @description A standardized uppercase, small, tracked-out label used for dividing sections in panels.
 * 
 * @example
 * <GmdSectionLabel label="Page Content" />
 */
defineProps<{
  /**
   * The text label to display.
   */
  label: string;
}>();
</script>

<template>
  <div class="gmd-section-label">{{ label }}</div>
</template>
