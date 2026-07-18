<script setup lang="ts">
import PropField from './PropField.vue';
import Select from 'primevue/select';
import InputText from 'primevue/inputtext';

const props = defineProps<{
  data: any;
}>();

const emit = defineEmits(['update']);

const updateData = (field: string, val: string) => {
  emit('update', { ...props.data, [field]: val });
};

const justifyOptions = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'];
const alignOptions = ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'];
</script>

<template>
  <div class="flex flex-col gap-4">
    <PropField label="Gap">
      <InputText 
        :modelValue="data.gap || ''" 
        @update:modelValue="v => updateData('gap', v)"
        size="small"
        fluid
        placeholder="e.g. 1rem"
      />
    </PropField>
    <PropField label="Justify Content">
      <Select 
        :modelValue="data.justifyContent || 'flex-start'" 
        :options="justifyOptions"
        @update:modelValue="v => updateData('justifyContent', v)"
        size="small"
        class="w-full"
      />
    </PropField>
    <PropField label="Align Items">
      <Select 
        :modelValue="data.alignItems || 'stretch'" 
        :options="alignOptions"
        @update:modelValue="v => updateData('alignItems', v)"
        size="small"
        class="w-full"
      />
    </PropField>
  </div>
</template>