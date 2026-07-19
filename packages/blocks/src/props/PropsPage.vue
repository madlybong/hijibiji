<script setup lang="ts">
import InputText from 'primevue/inputtext';
import ToggleSwitch from 'primevue/toggleswitch';
import Tag from 'primevue/tag';
import { GmdPropSection, GmdPropField, GmdColorField } from '@goldmine/ui';
import type { GmPage } from '@goldmine/types';

const props = defineProps<{
  page: GmPage;
}>();

const emit = defineEmits<{
  (e: 'updateField', field: string, value: any): void;
}>();

const updateField = (field: keyof GmPage, value: any) => {
  emit('updateField', field as string, value);
};

const updatePageStyle = (field: string, value: any) => {
  const currentStyle = props.page.pageStyle || { padding: '0', bgColor: '#FFFFFF' };
  emit('updateField', 'pageStyle', { ...currentStyle, [field]: value });
};

</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center mb-2">
      <Tag :value="page.type" severity="secondary" class="uppercase tracking-widest text-[9px]" />
    </div>

    <!-- Common Page Properties -->
    <div v-if="page.type === 'blank'" class="flex flex-col gap-4">
      <GmdPropSection label="Layout Options" :default-open="true">
        <GmdPropField label="Header Visibility">
          <ToggleSwitch 
            :modelValue="page.showHeader !== false" 
            @update:modelValue="v => updateField('showHeader', v)"
          />
        </GmdPropField>

        <GmdPropField label="Footer Visibility">
          <ToggleSwitch 
            :modelValue="page.showFooter !== false" 
            @update:modelValue="v => updateField('showFooter', v)"
          />
        </GmdPropField>
      </GmdPropSection>
    </div>

    <GmdPropSection label="Page Style" :default-open="true">
      <GmdPropField label="Background Color">
        <GmdColorField 
          :modelValue="page.pageStyle?.bgColor || ''" 
          @update:modelValue="v => updatePageStyle('bgColor', v)" 
        />
      </GmdPropField>

      <GmdPropField label="Padding">
        <InputText 
          :modelValue="page.pageStyle?.padding || '0'" 
          @update:modelValue="v => updatePageStyle('padding', v)"
          size="small"
          fluid 
        />
      </GmdPropField>
      
      <GmdPropField label="Background Image URL">
        <InputText 
          :modelValue="page.pageStyle?.bgImage || ''" 
          @update:modelValue="v => updatePageStyle('bgImage', v)"
          size="small"
          fluid 
          placeholder="https://..."
        />
      </GmdPropField>
    </GmdPropSection>
  </div>
</template>