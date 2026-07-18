<script setup lang="ts">
import InputText from 'primevue/inputtext';
import SelectButton from 'primevue/selectbutton';

const props = defineProps<{
  data: any;
}>();
const emit = defineEmits(['update']);

const updateField = (field: string, value: any) => {
  emit('update', { [field]: value });
};

const levelOptions = [
  { label: 'H1', value: 1 },
  { label: 'H2', value: 2 },
  { label: 'H3', value: 3 },
];
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex flex-col gap-1">
      <label class="text-[10px] font-bold text-gray-500 uppercase">Heading Text</label>
      <InputText 
        :modelValue="data.text" 
        @update:modelValue="v => updateField('text', v)"
        size="small" 
      />
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-[10px] font-bold text-gray-500 uppercase">Level</label>
      <SelectButton 
        :modelValue="data.level"
        @update:modelValue="v => updateField('level', v)"
        :options="levelOptions"
        optionLabel="label"
        optionValue="value"
      />
    </div>
  </div>
</template>
