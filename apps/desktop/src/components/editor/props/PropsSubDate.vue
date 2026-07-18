<script setup lang="ts">
import PropField from './PropField.vue';
import InputText from 'primevue/inputtext';

const props = defineProps<{
  data: any;
}>();

const emit = defineEmits(['update']);

const updateText = (val: string | undefined) => {
  emit('update', { ...props.data, text: val || '' });
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <PropField label="Text">
      <InputText 
        :modelValue="data.text" 
        @update:modelValue="updateText"
        size="small"
        fluid
      />
    </PropField>
  </div>
</template>