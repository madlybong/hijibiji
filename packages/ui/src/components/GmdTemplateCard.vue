<script setup lang="ts">
/**
 * @component GmdTemplateCard
 * @description A card component used to display a document template option.
 * 
 * @example
 * <GmdTemplateCard :template="tplData" @select="createFromTemplate" />
 */
defineProps<{
  /**
   * The template metadata.
   */
  template: { id: string; name: string; description: string; icon: string };
}>();

const emit = defineEmits<{
  /**
   * Emitted when the template card is clicked.
   * @param e - Event name
   * @param id - The ID of the selected template
   */
  (e: 'select', id: string): void;
}>();
</script>

<template>
  <div 
    @click="emit('select', template.id)"
    class="gmd-template-card"
  >
    <div class="w-12 h-12 rounded-full flex items-center justify-center border" style="background: var(--p-content-background); border-color: var(--p-content-border-color)">
      <i :class="template.icon" class="text-xl" style="color: var(--gm-accent)"></i>
    </div>
    <div>
      <div class="text-sm font-bold mb-1" style="color: var(--p-text-color)">{{ template.name }}</div>
      <div class="text-[10px] leading-tight" style="color: var(--p-text-muted-color)">{{ template.description }}</div>
    </div>
  </div>
</template>
