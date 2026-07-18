<script setup lang="ts">
import { computed } from 'vue';
import { useDocumentStore } from '../store/useDocumentStore';

const props = defineProps<{
  format?: 'number-only' | 'page-of-total' | 'custom-prefix';
  prefix?: string;
  suffix?: string;
  pageId: string;
  isPreview?: boolean;
}>();

const docStore = useDocumentStore();

const currentPage = computed(() => {
  if (!docStore.document) return 1;
  const index = docStore.document.pages.findIndex(p => p.id === props.pageId);
  return index !== -1 ? index + 1 : 1;
});

const totalPages = computed(() => {
  return docStore.document?.pages.length || 1;
});

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
