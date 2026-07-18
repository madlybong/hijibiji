<script setup lang="ts">
import InputText from 'primevue/inputtext';
import SelectButton from 'primevue/selectbutton';

const props = defineProps<{ data: any }>();
const emit = defineEmits(['update']);

const updateField = (field: string, value: any) => {
  emit('update', { [field]: value });
};

const trendOptions = [
  { label: 'Up', value: 'up' },
  { label: 'Down', value: 'down' },
];
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex flex-col gap-1">
      <label class="text-[10px] font-bold text-gray-500 uppercase">Value (e.g. 5%)</label>
      <InputText 
        :modelValue="data.value" 
        @update:modelValue="v => updateField('value', v)"
        size="small" 
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-[10px] font-bold text-gray-500 uppercase">Trend</label>
      <SelectButton 
        :modelValue="data.trend" 
        @update:modelValue="v => updateField('trend', v)"
        :options="trendOptions"
        optionLabel="label"
        optionValue="value"
      />
    </div>
  </div>
</template>