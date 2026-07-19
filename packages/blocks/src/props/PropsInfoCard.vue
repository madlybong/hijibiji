<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import { GmdPropField } from '@goldmine/ui';

const props = defineProps<{ data: any }>();
const emit = defineEmits(['update']);

const updateField = (field: string, value: any) => {
  emit('update', { [field]: value });
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <GmdPropField label="Title">
      <InputText 
        :modelValue="data.title" 
        @update:modelValue="v => updateField('title', v)"
        size="small" 
        fluid
      />
    </GmdPropField>
    <GmdPropField label="Text Content">
      <Textarea 
        :modelValue="data.text" 
        @update:modelValue="v => updateField('text', v)"
        rows="4" 
        class="w-full text-xs"
      />
    </GmdPropField>
  </div>
</template>