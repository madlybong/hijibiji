<script setup lang="ts">
import PropField from './PropField.vue';
import InputText from 'primevue/inputtext';
import SelectButton from 'primevue/selectbutton';
import Select from 'primevue/select';

const props = defineProps<{ data: any }>();
const emit = defineEmits(['update']);

const updateField = (field: string, value: any) => {
  emit('update', { [field]: value });
};

const modeOptions = [
  { label: 'Auto', value: 'auto' },
  { label: 'Manual', value: 'manual' }
];

const formatOptions = [
  'MMMM YYYY',
  'DD MMMM YYYY',
  'Q[Q] YYYY',
  'YYYY-MM-DD',
  "MMM 'YY"
];
</script>

<template>
  <div class="flex flex-col gap-4">
    <PropField label="Mode">
      <SelectButton 
        :modelValue="data.mode || 'auto'" 
        @update:modelValue="v => updateField('mode', v)"
        :options="modeOptions"
        optionLabel="label"
        optionValue="value"
      />
    </PropField>

    <PropField v-if="data.mode !== 'manual'" label="Format">
      <Select 
        :modelValue="data.format || 'MMMM YYYY'"
        @update:modelValue="v => updateField('format', v)"
        :options="formatOptions"
        class="w-full"
      />
    </PropField>

    <PropField v-if="data.mode === 'manual'" label="Text">
      <InputText fluid 
        :modelValue="data.value" 
        @update:modelValue="v => updateField('value', v)"
        size="small" 
      />
    </PropField>
  </div>
</template>