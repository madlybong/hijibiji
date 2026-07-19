<script setup lang="ts">
import InputText from 'primevue/inputtext';
import SelectButton from 'primevue/selectbutton';
import { GmdPropField } from '@goldmine/ui';

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
  <div class="flex flex-col gap-4">
    <GmdPropField label="Value (e.g. 5%)">
      <InputText 
        :modelValue="data.value" 
        @update:modelValue="v => updateField('value', v)"
        size="small" 
        fluid
      />
    </GmdPropField>
    <GmdPropField label="Trend">
      <SelectButton 
        :modelValue="data.trend" 
        @update:modelValue="v => updateField('trend', v)"
        :options="trendOptions"
        optionLabel="label"
        optionValue="value"
      />
    </GmdPropField>
  </div>
</template>