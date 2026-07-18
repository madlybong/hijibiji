<script setup lang="ts">
import { computed, watch } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import { BubbleMenu } from '@tiptap/vue-3/menus';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useDocumentStore } from '../store/useDocumentStore';

const props = defineProps<{ 
  level: 1 | 2 | 3; 
  html?: string;
  text?: string;
  blockId?: string;
  isEditing?: boolean;
  isPreview?: boolean;
}>();

const docStore = useDocumentStore();
const Tag = computed(() => `h${props.level}`);

const editor = useEditor({
  extensions: [
    StarterKit.configure({
      heading: false,
      bulletList: false,
      orderedList: false,
      blockquote: false,
      codeBlock: false,
      horizontalRule: false,
    }),
    Placeholder.configure({
      placeholder: 'Heading text...',
      emptyEditorClass: 'is-editor-empty',
    }),
  ],
  content: props.html || props.text || '',
  onUpdate: ({ editor }) => {
    if (props.blockId) {
      docStore.updateBlockData(props.blockId, { html: editor.getHTML() });
    }
  },
  editorProps: {
    handleKeyDown: (_view, event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        return true;
      }
      return false;
    }
  }
});

watch(() => props.html, (newHtml) => {
  if (editor.value && newHtml !== editor.value.getHTML()) {
    editor.value.commands.setContent(newHtml || '');
  }
});

const defaultSize = computed(() => {
  if (props.level === 1) return '2.25rem';
  if (props.level === 2) return '1.5rem';
  return '1.125rem';
});
const defaultWeight = computed(() => props.level === 1 ? '800' : '700');
const defaultMarginBottom = computed(() => {
  if (props.level === 1) return '0.75rem';
  if (props.level === 2) return '0.5rem';
  return '0.375rem';
});
</script>

<template>
  <component :is="Tag" :style="{
    color:        'var(--block-color, var(--doc-accent, var(--color-gm-accent)))',
    fontFamily:   'var(--block-font-family, var(--doc-heading-font, var(--font-montserrat)))',
    fontSize:     `var(--block-font-size, ${defaultSize})`,
    fontWeight:   `var(--block-font-weight, ${defaultWeight})`,
    textAlign:    'var(--block-text-align, left)',
    textTransform: 'var(--block-text-transform, ' + (level === 1 ? 'uppercase' : 'none') + ')',
    letterSpacing: level === 1 ? '-0.025em' : 'normal',
    lineHeight:    'var(--block-line-height, ' + (level === 1 ? '1' : '1.3') + ')',
    marginBottom:  defaultMarginBottom,
    marginTop:     level > 1 ? '1rem' : '0',
    fontStyle:     'var(--block-font-style, normal)',
    textDecoration:'var(--block-text-decoration, none)',
  }">
    <template v-if="isEditing && !isPreview && editor">
      <bubble-menu
        :editor="editor"
        :tippy-options="{ duration: 100 }"
        class="flex items-center gap-1 bg-slate-900 border border-slate-700 shadow-xl rounded-lg p-1 font-inter text-[1rem] leading-normal font-normal tracking-normal normal-case"
      >
        <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'bg-slate-700 text-white': editor.isActive('bold'), 'text-slate-400 hover:text-slate-200 hover:bg-slate-800': !editor.isActive('bold') }" class="w-7 h-7 flex items-center justify-center rounded transition-colors">
          <i class="pi pi-bold text-xs" />
        </button>
        <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'bg-slate-700 text-white': editor.isActive('italic'), 'text-slate-400 hover:text-slate-200 hover:bg-slate-800': !editor.isActive('italic') }" class="w-7 h-7 flex items-center justify-center rounded transition-colors">
          <i class="pi pi-italic text-xs" />
        </button>
      </bubble-menu>
      <editor-content :editor="editor" class="tiptap" />
    </template>
    <span v-else v-html="html || text || '<p>Heading text...</p>'"></span>
  </component>
</template>