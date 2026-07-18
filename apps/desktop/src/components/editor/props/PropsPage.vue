<script setup lang="ts">
import InputText from 'primevue/inputtext';
import ToggleSwitch from 'primevue/toggleswitch';
import ColorPicker from 'primevue/colorpicker';
import Tag from 'primevue/tag';
import PropField from './PropField.vue';
import GmPropSection from './GmPropSection.vue';
import type { GmPage } from '../../../types/document';
import { useDocumentStore } from '../../../store/useDocumentStore';

const props = defineProps<{
  page: GmPage;
}>();

const docStore = useDocumentStore();

const updateField = (field: keyof GmPage, value: any) => {
  docStore.updatePageSettings(props.page.id, { [field]: value });
};

const updatePageStyle = (field: string, value: any) => {
  const currentStyle = props.page.pageStyle || { padding: '0', bgColor: '#FFFFFF' };
  docStore.updatePageSettings(props.page.id, {
    pageStyle: { ...currentStyle, [field]: value }
  });
};

const handlePageColorChange = (e: any) => {
  const hex = e.value.startsWith('#') ? e.value : '#' + e.value;
  updatePageStyle('bgColor', hex);
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center mb-2">
      <Tag :value="page.type" severity="secondary" class="uppercase tracking-widest text-[9px]" />
    </div>

    <!-- Common Page Properties -->
    <div v-if="page.type === 'blank'" class="flex flex-col gap-4">
      <GmPropSection label="Layout Options" :default-open="true">
        <PropField label="Header Visibility">
          <ToggleSwitch 
            :modelValue="page.showHeader !== false" 
            @update:modelValue="v => updateField('showHeader', v)"
          />
        </PropField>

        <PropField label="Footer Visibility">
          <ToggleSwitch 
            :modelValue="page.showFooter !== false" 
            @update:modelValue="v => updateField('showFooter', v)"
          />
        </PropField>
      </GmPropSection>
    </div>

    <GmPropSection label="Page Style" :default-open="true">
      <PropField label="Background Color">
        <div class="flex items-center gap-3">
          <ColorPicker 
            :modelValue="page.pageStyle?.bgColor?.replace('#', '') || 'FFFFFF'" 
            @change="handlePageColorChange" 
          />
          <InputText 
            :modelValue="page.pageStyle?.bgColor || '#FFFFFF'" 
            @update:modelValue="v => updatePageStyle('bgColor', v)"
            size="small" 
            class="flex-1 font-mono text-xs"
          />
        </div>
      </PropField>

      <PropField label="Padding">
        <InputText 
          :modelValue="page.pageStyle?.padding || '0'" 
          @update:modelValue="v => updatePageStyle('padding', v)"
          size="small"
          fluid 
        />
      </PropField>
      
      <PropField label="Background Image URL">
        <InputText 
          :modelValue="page.pageStyle?.bgImage || ''" 
          @update:modelValue="v => updatePageStyle('bgImage', v)"
          size="small"
          fluid 
          placeholder="https://..."
        />
      </PropField>
    </GmPropSection>
  </div>
</template>