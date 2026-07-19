<script setup lang="ts">
import { computed, watch } from 'vue';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Button from 'primevue/button';
import ButtonGroup from 'primevue/buttongroup';

const props = defineProps<{ 
  level: 1 | 2 | 3; 
  html: string;
  text?: string;
  blockId: string;
  isEditing: boolean;
  isPreview: boolean;
}>();

const emit = defineEmits<{
  (e: 'updateBlock', id: string, data: any): void;
}>();

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
    Underline,
  ],
  content: props.html || props.text || '',
  onUpdate: ({ editor }) => {
    emit('updateBlock', props.blockId, { html: editor.getHTML() });
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
  if (editor.value && editor.value.getHTML() !== newHtml) {
    editor.value.commands.setContent(newHtml, false);
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
        class="shadow-xl rounded-lg overflow-hidden border border-surface-border bg-surface-ground"
      >
        <ButtonGroup>
          <Button 
            @click="editor.chain().focus().toggleBold().run()" 
            :severity="editor.isActive('bold') ? 'primary' : 'secondary'" 
            variant="text"
            icon="pi pi-bold" 
            size="small" 
            class="!w-8 !h-8 !p-0"
          />
          <Button 
            @click="editor.chain().focus().toggleItalic().run()" 
            :severity="editor.isActive('italic') ? 'primary' : 'secondary'" 
            variant="text"
            icon="pi pi-italic" 
            size="small" 
            class="!w-8 !h-8 !p-0"
          />
        </ButtonGroup>
      </bubble-menu>
      <editor-content :editor="editor" class="tiptap" />
    </template>
    <span v-else v-html="html || text || '<p>Heading text...</p>'"></span>
  </component>
</template>