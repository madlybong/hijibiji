<script setup lang="ts">
import { watch, onBeforeUnmount } from 'vue';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Button from 'primevue/button';
import ButtonGroup from 'primevue/buttongroup';

const props = defineProps<{
  html: string;
  blockId: string;
  isEditing: boolean;
  isPreview: boolean;
}>();

const emit = defineEmits<{
  (e: 'updateBlock', id: string, data: any): void;
}>();

const editor = useEditor({
  content: props.html,
  extensions: [
    StarterKit,
    Underline,
    Placeholder.configure({ placeholder: 'Click to start typing...' })
  ],
  onUpdate: ({ editor }: any) => {
    emit('updateBlock', props.blockId, { html: editor.getHTML() });
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
          <Button 
            @click="editor.chain().focus().toggleUnderline().run()" 
            :severity="editor.isActive('underline') ? 'primary' : 'secondary'" 
            variant="text"
            icon="pi pi-underline" 
            size="small" 
            class="!w-8 !h-8 !p-0"
          />
        </ButtonGroup>
      </bubble-menu>
      <editor-content :editor="editor" class="tiptap" />
    </template>
    <div v-else v-html="html"></div>
  </div>
</template>
