<script setup lang="ts">
import { GmdPropField } from '@goldmine/ui';
import SelectButton from 'primevue/selectbutton';
import InputText from 'primevue/inputtext';

const props = defineProps<{ data: any }>();
const emit = defineEmits(['update']);

const updateField = (field: string, value: any) => {
  emit('update', { [field]: value });
};

const colOptions = [
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
];

const alignOptions = [
  { label: 'Start', value: 'start' },
  { label: 'Center', value: 'center' },
  { label: 'End', value: 'end' },
  { label: 'Stretch', value: 'stretch' },
];

const justifyOptions = [
  { label: 'Start', value: 'start' },
  { label: 'Center', value: 'center' },
  { label: 'End', value: 'end' },
  { label: 'Stretch', value: 'stretch' },
];
</script>

<template>
  <div class="flex flex-col gap-4">
    <GmdPropField label="Columns">
      <SelectButton 
        :modelValue="data.cols || 2" 
        @update:modelValue="v => updateField('cols', v)"
        :options="colOptions"
        optionLabel="label"
        optionValue="value"
        size="small"
        :pt="{ root: { class: 'flex-wrap gap-1 w-full' }, pcButton: { root: { class: 'flex-1 min-w-0' } } }"
      />
    </GmdPropField>
    <GmdPropField label="Gap">
      <InputText 
        :modelValue="data.gap || '0.75rem'" 
        @update:modelValue="v => updateField('gap', v)"
        size="small"
        fluid
        placeholder="e.g. 1rem"
      />
    </GmdPropField>
    <GmdPropField label="Vertical Align (Items)">
      <SelectButton 
        :modelValue="data.alignItems || 'stretch'" 
        @update:modelValue="v => updateField('alignItems', v)"
        :options="alignOptions"
        optionLabel="label"
        optionValue="value"
        size="small"
        :pt="{ root: { class: 'flex-wrap gap-1 w-full' }, pcButton: { root: { class: 'flex-1 min-w-0' } } }"
      />
    </GmdPropField>
    <GmdPropField label="Horizontal Align (Items)">
      <SelectButton 
        :modelValue="data.justifyItems || 'stretch'" 
        @update:modelValue="v => updateField('justifyItems', v)"
        :options="justifyOptions"
        optionLabel="label"
        optionValue="value"
        size="small"
        :pt="{ root: { class: 'flex-wrap gap-1 w-full' }, pcButton: { root: { class: 'flex-1 min-w-0' } } }"
      />
    </GmdPropField>
  </div>
</template>
