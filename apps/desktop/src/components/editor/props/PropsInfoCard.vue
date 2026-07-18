<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';

const props = defineProps<{ data: any }>();
const emit = defineEmits(['update']);

const updateField = (field: string, value: any) => {
  emit('update', { [field]: value });
};
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex flex-col gap-1">
      <label class="text-[10px] font-bold text-gray-500 uppercase">Title</label>
      <InputText 
        :modelValue="data.title" 
        @update:modelValue="v => updateField('title', v)"
        size="small" 
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-[10px] font-bold text-gray-500 uppercase">Text Content</label>
      <Textarea 
        :modelValue="data.text" 
        @update:modelValue="v => updateField('text', v)"
        rows="4" 
      />
    </div>
  </div>
</template>