<script setup lang="ts">
import { computed, inject, type Ref, ref } from 'vue';

const props = defineProps<{
  format?: 'number-only' | 'page-of-total' | 'custom-prefix';
  prefix?: string;
  suffix?: string;
  pageId: string;
  isPreview?: boolean;
}>();

const currentPage = inject<Ref<number>>('gm-current-page', ref(1));
const totalPages = inject<Ref<number>>('gm-total-pages', ref(1));

const displayText = computed(() => {
  const fmt = props.format || 'number-only';
  const pfx = props.prefix || '';
  const sfx = props.suffix || '';
  
  if (fmt === 'number-only') {
    return `${pfx}${currentPage.value}${sfx}`;
  } else if (fmt === 'page-of-total') {
    return `${pfx}Page ${currentPage.value} of ${totalPages.value}${sfx}`;
  } else if (fmt === 'custom-prefix') {
    return `${pfx}${currentPage.value}${sfx}`;
  }
  
  return `${currentPage.value}`;
});
</script>

<template>
  <div class="gm-page-number outline-none break-words min-h-[1em]" style="
    color: var(--block-color, inherit);
    background-color: var(--block-bg-color, transparent);
    font-size: var(--block-font-size, 1em);
    font-weight: var(--block-font-weight, inherit);
    font-family: var(--block-font-family, inherit);
    text-align: var(--block-text-align, inherit);
    font-style: var(--block-font-style, inherit);
    text-decoration: var(--block-text-decoration, inherit);
    text-transform: var(--block-text-transform, inherit);
    line-height: var(--block-line-height, 1.5);
  ">
    {{ displayText }}
  </div>
</template>
