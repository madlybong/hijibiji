<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';
import { GmdPropField } from '@goldmine/ui';

defineProps<{ data: any }>();
const emit = defineEmits(['update']);

const updateField = (field: string, value: any) => {
  emit('update', { [field]: value });
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <GmdPropField label="Min Height (px)">
      <InputNumber fluid 
        :modelValue="data.height" 
        @update:modelValue="v => updateField('height', v)"
        size="small" 
        showButtons 
        :min="0"
        :max="200"
      />
    </GmdPropField>
  </div>
</template>
