<script setup lang="ts">
import { GmdPropField as PropField } from '@goldmine/ui';
import Textarea from 'primevue/textarea';

const props = defineProps<{
  data: any;
}>();

const emit = defineEmits(['update']);

const updateHtml = (val: string) => {
  emit('update', { ...props.data, html: val });
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <PropField label="HTML Content">
      <Textarea 
        :modelValue="data.html" 
        @update:modelValue="updateHtml"
        rows="8"
        size="small"
        class="w-full font-mono text-xs"
      />
    </PropField>
  </div>
</template>