<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<template>
  <div class="gm-prop-field">
    <div class="gm-prop-label">
      <span>{{ label }}</span>
      <span v-if="$slots.hint" class="gm-prop-hint">
        <slot name="hint"></slot>
      </span>
    </div>
    <slot></slot>
  </div>
</template>
