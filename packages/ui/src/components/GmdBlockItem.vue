<script setup lang="ts">
/**
 * @component GmdBlockItem
 * @description A draggable list item used in the block palette representing a type of block that can be added to the document.
 * 
 * @example
 * <GmdBlockItem label="Heading" description="Large title" :icon="Type" />
 */

defineProps<{
  /**
   * The display name of the block.
   */
  label: string;
  /**
   * A short description of the block's purpose.
   */
  description: string;
  /**
   * A Lucide Vue component to render as the block's icon.
   */
  icon: any;
}>();
</script>

<template>
  <div 
    class="group flex flex-col items-center justify-center p-3 rounded-lg transition-all cursor-grab gap-2 text-center relative"
    style="background: var(--p-content-background); border: 1px solid var(--p-content-border-color);"
    v-tooltip.top="description"
  >
    <div class="w-10 h-8 flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-110" 
         style="color: var(--p-text-muted-color)"
    >
      <component :is="icon" class="w-6 h-6 group-hover:text-primary transition-colors" />
    </div>
    <span class="text-[10px] font-bold uppercase tracking-wider truncate w-full" style="color: var(--p-text-color)">{{ label }}</span>
    
    <!-- Hover Border Overlay -->
    <div class="absolute inset-0 border-2 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" style="border-color: var(--gm-accent)"></div>
  </div>
</template>
