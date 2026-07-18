<script setup lang="ts">
import PropField from './PropField.vue';
import SelectButton from 'primevue/selectbutton';
import Message from 'primevue/message';

const props = defineProps<{ data: any }>();
const emit = defineEmits(['update']);

const updateField = (field: string, value: any) => {
  emit('update', { [field]: value });
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <Message severity="info" :closable="false" size="small" class="text-xs">
      Click the heading on the canvas to edit text.
    </Message>

    <PropField label="Level">
      <SelectButton 
        :modelValue="data.level || 2" 
        @update:modelValue="v => updateField('level', v)"
        :options="[
          { label: 'H1', value: 1 },
          { label: 'H2', value: 2 },
          { label: 'H3', value: 3 }
        ]"
        optionLabel="label"
        optionValue="value"
        size="small" 
      />
    </PropField>
  </div>
</template>
