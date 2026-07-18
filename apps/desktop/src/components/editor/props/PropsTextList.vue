<script setup lang="ts">
import { computed } from 'vue';
import Textarea from 'primevue/textarea';
import SelectButton from 'primevue/selectbutton';
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
  <div class="flex flex-col gap-4 p-4">
    <div class="flex flex-col gap-1">
      <label class="text-[10px] font-bold text-gray-500 uppercase">List Style</label>
      <SelectButton 
        :modelValue="data.ordered" 
        @update:modelValue="v => updateField('ordered', v)"
        :options="listTypeOptions"
        optionLabel="label"
        optionValue="value"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-[10px] font-bold text-gray-500 uppercase">Items (One per line)</label>
      <Textarea 
        v-model="itemsText"
        rows="8" 
      />
    </div>
  </div>
</template>
