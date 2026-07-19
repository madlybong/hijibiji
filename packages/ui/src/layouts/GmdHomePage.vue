<script setup lang="ts">
/**
 * @component GmdHomePage
 * @description The primary layout shell for the Goldmine app home screen.
 * Displays brand info, templates, and recent documents.
 * 
 * @slot brand - The top brand logo and name
 * @slot templates - The grid of template cards
 * @slot recent-header - The header for the recent documents section
 * @slot recent - The grid of recent document cards
 * 
 * @example
 * <GmdHomePage>
 *   <template #brand><h1>Brand</h1></template>
 *   <template #templates><GmdTemplateCard /></template>
 *   <template #recent-header><h2>Recent</h2></template>
 *   <template #recent><GmdDocCard /></template>
 * </GmdHomePage>
 */
</script>

<template>
  <div class="gmd-home">
    <div class="gmd-home-inner">
      <slot name="brand" />
      <div class="gmd-section-title">Start from a Template</div>
      <div class="gmd-template-grid">
        <slot name="templates" />
      </div>
      <slot name="recent-header" />
      <div class="gmd-doc-grid">
        <slot name="recent" />
      </div>
    </div>
  </div>
</template>
