<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label class="text-[10px] font-bold uppercase tracking-widest" style="color: var(--p-text-muted-color)">
      {{ label }}
      <span v-if="$slots.hint" class="font-normal normal-case tracking-normal ml-1" style="color: var(--p-text-muted-color)">
        <slot name="hint"></slot>
      </span>
    </label>
    <div class="w-full">
      <slot></slot>
    </div>
  </div>
</template>
