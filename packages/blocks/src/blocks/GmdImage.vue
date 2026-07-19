<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
  blockId: string;
  src?: string;
  altText?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  caption?: string;
  isEditing?: boolean;
  isPreview?: boolean;
}>();

const emit = defineEmits<{
  (e: 'updateBlock', id: string, data: any): void;
}>();

const fileInput = ref<HTMLInputElement | null>(null);

const handleFileUpload = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      emit('updateBlock', props.blockId, { src: dataUrl });
    };
    reader.readAsDataURL(file);
  }
};

const triggerUpload = () => {
  if (!props.isPreview) {
    if (fileInput.value) fileInput.value.click();
  }
};

const removeImage = () => {
  emit('updateBlock', props.blockId, { src: '' });
};

</script>

<template>
  <div class="w-full flex flex-col items-center relative group">
    <div v-if="!src" class="w-full h-32 flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-colors hover:opacity-80" style="background: var(--p-surface-ground); border-color: var(--p-content-border-color);" @click="triggerUpload">
      <i class="pi pi-image text-3xl mb-2" style="color: var(--p-text-muted-color);"></i>
      <span class="text-sm font-medium" style="color: var(--p-text-color);">Click to upload image</span>
    </div>
    <div v-else class="w-full relative">
      <img :src="src" :alt="altText" class="w-full h-full block" :style="{ objectFit: objectFit || 'contain' }" />
      <div v-if="isEditing && !isPreview" class="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button @click.stop="triggerUpload" class="p-1.5 rounded shadow hover:opacity-80" style="background: var(--p-content-background); color: var(--p-text-color); border: 1px solid var(--p-content-border-color);" title="Change Image">
          <i class="pi pi-upload text-xs"></i>
        </button>
        <button @click.stop="removeImage" class="p-1.5 rounded shadow hover:opacity-80" style="background: var(--p-red-500); color: white; border: 1px solid var(--p-red-600);" title="Remove Image">
          <i class="pi pi-trash text-xs"></i>
        </button>
      </div>
    </div>
    
    <div v-if="caption" class="mt-2 text-xs text-center italic" style="color: var(--p-text-muted-color);">
      {{ caption }}
    </div>

    <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleFileUpload" />
  </div>
</template>
