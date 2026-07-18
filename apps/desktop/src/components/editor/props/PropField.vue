<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label class="text-[10px] font-bold uppercase tracking-widest text-slate-400">
      {{ label }}
      <span v-if="$slots.hint" class="font-normal normal-case tracking-normal text-slate-500 ml-1">
        <slot name="hint"></slot>
      </span>
    </label>
    <div class="w-full">
      <slot></slot>
    </div>
  </div>
</template>
