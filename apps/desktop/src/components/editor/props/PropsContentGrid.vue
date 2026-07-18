<script setup lang="ts">
import SelectButton from 'primevue/selectbutton';

const props = defineProps<{ data: any }>();
const emit = defineEmits(['update']);

const updateField = (field: string, value: any) => {
  emit('update', { [field]: value });
};

const colOptions = [
  { label: '2 Columns', value: 2 },
  { label: '3 Columns', value: 3 },
  { label: '4 Columns', value: 4 },
];
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex flex-col gap-1">
      <label class="text-[10px] font-bold text-gray-500 uppercase">Columns</label>
      <SelectButton 
        :modelValue="data.cols" 
        @update:modelValue="v => updateField('cols', v)"
        :options="colOptions"
        optionLabel="label"
        optionValue="value"
      />
    </div>
  </div>
</template>