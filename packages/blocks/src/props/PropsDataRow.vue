<script setup lang="ts">
import InputText from 'primevue/inputtext';
import { GmdPropField } from '@goldmine/ui';

const props = defineProps<{ data: any }>();
const emit = defineEmits(['update']);

const updateField = (field: string, value: any) => {
  emit('update', { [field]: value });
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <GmdPropField label="Label">
      <InputText 
        :modelValue="data.label" 
        @update:modelValue="v => updateField('label', v)"
        size="small" 
        fluid
      />
    </GmdPropField>
    <GmdPropField label="Value">
      <InputText 
        :modelValue="data.value" 
        @update:modelValue="v => updateField('value', v)"
        size="small" 
        fluid
      />
    </GmdPropField>
  </div>
</template>