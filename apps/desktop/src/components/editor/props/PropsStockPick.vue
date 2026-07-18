<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';

const props = defineProps<{
  data: any;
}>();
const emit = defineEmits(['update']);

const updateField = (field: string, value: any) => {
  emit('update', { [field]: value });
};
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex flex-col gap-1">
      <label class="text-[10px] font-bold text-gray-500 uppercase">Stock Name</label>
      <InputText :modelValue="data.stockName" @update:modelValue="v => updateField('stockName', v)" size="small" />
    </div>
    
    <div class="flex flex-col gap-1">
      <label class="text-[10px] font-bold text-gray-500 uppercase">Description</label>
      <Textarea :modelValue="data.stockDesc" @update:modelValue="v => updateField('stockDesc', v)" rows="3" />
    </div>

    <div class="grid grid-cols-2 gap-2">
      <div class="flex flex-col gap-1">
        <label class="text-[10px] font-bold text-gray-500 uppercase">CMP</label>
        <InputText :modelValue="data.cmp" @update:modelValue="v => updateField('cmp', v)" size="small" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-[10px] font-bold text-gray-500 uppercase">Target</label>
        <InputText :modelValue="data.target" @update:modelValue="v => updateField('target', v)" size="small" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-[10px] font-bold text-gray-500 uppercase">Add On Dip</label>
        <InputText :modelValue="data.addOnDip" @update:modelValue="v => updateField('addOnDip', v)" size="small" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-[10px] font-bold text-gray-500 uppercase">Exit</label>
        <InputText :modelValue="data.exit" @update:modelValue="v => updateField('exit', v)" size="small" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-[10px] font-bold text-gray-500 uppercase">Upside %</label>
        <InputText :modelValue="data.upside" @update:modelValue="v => updateField('upside', v)" size="small" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-[10px] font-bold text-gray-500 uppercase">Upside Time</label>
        <InputText :modelValue="data.upsideTime" @update:modelValue="v => updateField('upsideTime', v)" size="small" />
      </div>
    </div>
  </div>
</template>
