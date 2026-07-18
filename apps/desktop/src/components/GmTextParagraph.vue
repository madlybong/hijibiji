<script setup lang="ts">
import { watch, onBeforeUnmount, ref } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import { BubbleMenu } from '@tiptap/vue-3/menus';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
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
    Underline,
    Placeholder.configure({ placeholder: 'Click to start typing...' })
  ],
  onUpdate: ({ editor }) => {
    docStore.updateBlockData(props.blockId, { html: editor.getHTML() });
  },
});

watch(() => props.html, (newHtml) => {
  if (editor.value && editor.value.getHTML() !== newHtml) {
    editor.value.commands.setContent(newHtml, false);
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
    <div v-if="isEditing && !isPreview && editor">
      <bubble-menu
        :editor="editor"
        :tippy-options="{ duration: 100 }"
        class="flex items-center gap-1 bg-slate-900 border border-slate-700 shadow-xl rounded-lg p-1"
      >
        <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'bg-slate-700 text-white': editor.isActive('bold'), 'text-slate-400 hover:text-slate-200 hover:bg-slate-800': !editor.isActive('bold') }" class="w-7 h-7 flex items-center justify-center rounded transition-colors">
          <i class="pi pi-bold text-xs" />
        </button>
        <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'bg-slate-700 text-white': editor.isActive('italic'), 'text-slate-400 hover:text-slate-200 hover:bg-slate-800': !editor.isActive('italic') }" class="w-7 h-7 flex items-center justify-center rounded transition-colors">
          <i class="pi pi-italic text-xs" />
        </button>
        <button @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'bg-slate-700 text-white': editor.isActive('underline'), 'text-slate-400 hover:text-slate-200 hover:bg-slate-800': !editor.isActive('underline') }" class="w-7 h-7 flex items-center justify-center rounded transition-colors">
          <i class="pi pi-underline text-xs" />
        </button>
        <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'bg-slate-700 text-white': editor.isActive('strike'), 'text-slate-400 hover:text-slate-200 hover:bg-slate-800': !editor.isActive('strike') }" class="w-7 h-7 flex items-center justify-center rounded transition-colors">
          <i class="pi pi-strikethrough text-xs" />
        </button>
      </bubble-menu>
      <editor-content :editor="editor" />
    </div>
    <div v-else v-html="html"></div>
  </div>
</template>
