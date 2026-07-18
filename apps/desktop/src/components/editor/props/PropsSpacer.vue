<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';

const props = defineProps<{ data: any }>();
const emit = defineEmits(['update']);

const updateField = (field: string, value: any) => {
  emit('update', { [field]: value });
};
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex flex-col gap-1">
      <label class="text-[10px] font-bold text-gray-500 uppercase">Height (px)</label>
      <InputNumber 
        :modelValue="data.height" 
        @update:modelValue="v => updateField('height', v)"
        size="small" 
        showButtons 
        :min="0"
        :max="200"
      />
    </div>
  </div>
</template>