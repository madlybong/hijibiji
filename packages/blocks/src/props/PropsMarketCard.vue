<script setup lang="ts">
import InputText from 'primevue/inputtext';
import SelectButton from 'primevue/selectbutton';
import Select from 'primevue/select';
import { GmdPropField } from '@goldmine/ui';

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
  <div class="flex flex-col gap-4">
    <GmdPropField label="Label">
      <InputText 
        :modelValue="data.label" 
        @update:modelValue="($event: any) => updateField('label', $event)"
        size="small" 
        fluid
      />
    </GmdPropField>

    <GmdPropField label="Value (e.g., 22,331)">
      <InputText 
        :modelValue="data.value" 
        @update:modelValue="($event: any) => updateField('value', $event)"
        size="small" 
        fluid
      />
    </GmdPropField>
    
    <div class="gmd-prop-grid-2">
      <GmdPropField label="Badge Value">
        <InputText 
          :modelValue="data.badgeValue" 
          @update:modelValue="($event: any) => updateField('badgeValue', $event)"
          size="small" 
          fluid
        />
      </GmdPropField>
      
      <GmdPropField label="Trend">
        <SelectButton 
          :modelValue="data.trend || ''"
          @update:modelValue="($event: any) => updateField('trend', $event)"
          :options="trendOptions"
          optionLabel="label"
          optionValue="value"
        />
      </GmdPropField>
    </div>

    <GmdPropField label="Description">
      <InputText 
        :modelValue="data.description" 
        @update:modelValue="($event: any) => updateField('description', $event)"
        size="small" 
        fluid
      />
    </GmdPropField>

    <GmdPropField label="Border Color">
      <Select 
        :modelValue="data.borderColor"
        @update:modelValue="($event: any) => updateField('borderColor', $event)"
        :options="borderOptions"
        optionLabel="label"
        optionValue="value"
        class="w-full text-xs"
      />
    </GmdPropField>
  </div>
</template>
