<script setup lang="ts">
import { computed } from 'vue';
import Textarea from 'primevue/textarea';
import SelectButton from 'primevue/selectbutton';
import { GmdPropField } from '@goldmine/ui';

const props = defineProps<{ data: any }>();
const emit = defineEmits(['update']);

const updateField = (field: string, value: any) => {
  emit('update', { [field]: value });
};

const listTypeOptions = [
  { label: 'Bulleted', value: false },
  { label: 'Numbered', value: true },
];

const itemsText = computed({
  get: () => props.data.items?.join('\n') || '',
  set: (val: string) => {
    updateField('items', val.split('\n').filter(s => s.trim() !== ''));
  }
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <GmdPropField label="List Style">
      <SelectButton 
        :modelValue="data.ordered" 
        @update:modelValue="v => updateField('ordered', v)"
        :options="listTypeOptions"
        optionLabel="label"
        optionValue="value"
      />
    </GmdPropField>
    <GmdPropField label="Items (One per line)">
      <Textarea 
        v-model="itemsText"
        rows="8" 
        class="w-full text-xs"
      />
    </GmdPropField>
  </div>
</template>
