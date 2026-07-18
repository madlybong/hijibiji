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
          <button 
            v-if="!page.pageStyle?.bgColor" 
            @click="updatePageStyle('bgColor', '#ffffff')" 
            class="w-6 h-6 rounded border border-dashed border-slate-500 bg-transparent-checker shrink-0 hover:border-slate-400 transition-colors"
            title="Pick Color"
          ></button>
          <div v-else class="flex items-center gap-1">
            <ColorPicker 
              :modelValue="page.pageStyle.bgColor.replace('#', '')"
              @change="e => updatePageStyle('bgColor', '#' + e.value)" 
            />
            <button @click="updatePageStyle('bgColor', undefined)" class="text-slate-500 hover:text-red-400 w-5 h-5 flex items-center justify-center transition-colors">
              <i class="pi pi-times text-[10px]" />
            </button>
          </div>
          <InputText 
            :modelValue="page.pageStyle?.bgColor || ''" 
            @update:modelValue="v => updatePageStyle('bgColor', v)"
            size="small" 
            class="flex-1 font-mono text-xs"
            placeholder="Transparent"
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