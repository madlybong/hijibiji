<script setup lang="ts">
import { watch, onBeforeUnmount } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useDocumentStore } from '../store/useDocumentStore';

const props = defineProps<{
  html: string;
  blockId: string;
  isEditing: boolean;
  isPreview: boolean;
}>();

const docStore = useDocumentStore();

const editor = useEditor({
  content: props.html,
  extensions: [
    StarterKit,
    Placeholder.configure({ placeholder: 'Click to start typing...' })
  ],
  onUpdate: ({ editor }) => {
    docStore.updateBlockData(props.blockId, { html: editor.getHTML() });
  },
});

watch(() => props.html, (newHtml) => {
  if (editor.value && editor.value.getHTML() !== newHtml) {
    editor.value.commands.setContent(newHtml);
  }
});

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});
</script>

<template>
  <div :style="{
    color:        'var(--block-color, var(--color-gm-text-dark))',
    fontFamily:   'var(--block-font-family, var(--font-inter))',
    fontSize:     'var(--block-font-size, 0.875rem)',
    fontWeight:   'var(--block-font-weight, 400)',
    textAlign:    'var(--block-text-align, left)',
    lineHeight:   '1.625',
    marginBottom: '0.75rem',
  } as any">
    <editor-content v-if="isEditing && !isPreview" :editor="editor" />
    <div v-else v-html="html"></div>
  </div>
</template>
