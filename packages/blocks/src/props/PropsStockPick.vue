<script setup lang="ts">
import { GmdPropField } from '@goldmine/ui';
import type { GmBlock } from '@goldmine/types';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';

defineProps<{
  data: any;
}>();
const emit = defineEmits(['update']);

const updateField = (field: string, value: any) => {
  emit('update', { [field]: value });
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <GmdPropField label="Stock Name">
      <InputText :modelValue="data.stockName" @update:modelValue="v => updateField('stockName', v)" size="small" fluid />
    </GmdPropField>
    
    <GmdPropField label="Description">
      <Textarea :modelValue="data.stockDesc" @update:modelValue="v => updateField('stockDesc', v)" rows="3" class="w-full text-xs" />
    </GmdPropField>

    <div class="gmd-prop-grid-2">
      <GmdPropField label="CMP">
        <InputText :modelValue="data.cmp" @update:modelValue="v => updateField('cmp', v)" size="small" fluid />
      </GmdPropField>
      <GmdPropField label="Target">
        <InputText :modelValue="data.target" @update:modelValue="v => updateField('target', v)" size="small" fluid />
      </GmdPropField>
      <GmdPropField label="Add On Dip">
        <InputText :modelValue="data.addOnDip" @update:modelValue="v => updateField('addOnDip', v)" size="small" fluid />
      </GmdPropField>
      <GmdPropField label="Exit">
        <InputText :modelValue="data.exit" @update:modelValue="v => updateField('exit', v)" size="small" fluid />
      </GmdPropField>
      <GmdPropField label="Upside %">
        <InputText :modelValue="data.upside" @update:modelValue="v => updateField('upside', v)" size="small" fluid />
      </GmdPropField>
      <GmdPropField label="Upside Time">
        <InputText :modelValue="data.upsideTime" @update:modelValue="v => updateField('upsideTime', v)" size="small" fluid />
      </GmdPropField>
    </div>
  </div>
</template>
