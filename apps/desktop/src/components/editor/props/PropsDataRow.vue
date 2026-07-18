<script setup lang="ts">
import InputText from 'primevue/inputtext';

const props = defineProps<{ data: any }>();
const emit = defineEmits(['update']);

const updateField = (field: string, value: any) => {
  emit('update', { [field]: value });
};
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex flex-col gap-1">
      <label class="text-[10px] font-bold text-gray-500 uppercase">Label</label>
      <InputText 
        :modelValue="data.label" 
        @update:modelValue="v => updateField('label', v)"
        size="small" 
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-[10px] font-bold text-gray-500 uppercase">Value</label>
      <InputText 
        :modelValue="data.value" 
        @update:modelValue="v => updateField('value', v)"
        size="small" 
      />
    </div>
  </div>
</template>