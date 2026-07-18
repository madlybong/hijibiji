<script setup lang="ts">
import InputText from 'primevue/inputtext';
import SelectButton from 'primevue/selectbutton';
import Select from 'primevue/select';

const props = defineProps<{
  data: any;
}>();
const emit = defineEmits(['update']);

const updateField = (field: string, value: any) => {
  emit('update', { [field]: value });
};

const trendOptions = [
  { label: 'None', value: '' },
  { label: 'Up', value: 'up' },
  { label: 'Down', value: 'down' },
];

const borderOptions = [
  { label: 'None', value: 'none' },
  { label: 'Green (Bullish)', value: 'green' },
  { label: 'Red (Bearish)', value: 'red' },
];
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
      <label class="text-[10px] font-bold text-gray-500 uppercase">Value (e.g., 22,331)</label>
      <InputText 
        :modelValue="data.value" 
        @update:modelValue="v => updateField('value', v)"
        size="small" 
      />
    </div>
    
    <div class="flex gap-2">
      <div class="flex flex-col gap-1 flex-1">
        <label class="text-[10px] font-bold text-gray-500 uppercase">Badge Value</label>
        <InputText 
          :modelValue="data.badgeValue" 
          @update:modelValue="v => updateField('badgeValue', v)"
          size="small" 
        />
      </div>
      <div class="flex flex-col gap-1 flex-1">
        <label class="text-[10px] font-bold text-gray-500 uppercase">Trend</label>
        <SelectButton 
          :modelValue="data.trend || ''"
          @update:modelValue="v => updateField('trend', v)"
          :options="trendOptions"
          optionLabel="label"
          optionValue="value"
        />
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-[10px] font-bold text-gray-500 uppercase">Description</label>
      <InputText 
        :modelValue="data.description" 
        @update:modelValue="v => updateField('description', v)"
        size="small" 
      />
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-[10px] font-bold text-gray-500 uppercase">Border Color</label>
      <Select 
        :modelValue="data.borderColor"
        @update:modelValue="v => updateField('borderColor', v)"
        :options="borderOptions"
        optionLabel="label"
        optionValue="value"
        class="w-full text-xs"
      />
    </div>
  </div>
</template>
