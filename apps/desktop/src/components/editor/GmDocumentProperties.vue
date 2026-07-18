<script setup lang="ts">
import { useDocumentStore } from '../../store/useDocumentStore';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import ColorPicker from 'primevue/colorpicker';
import PropField from './props/PropField.vue';
import GmPropSection from './props/GmPropSection.vue';
import type { PageSize } from '../../types/document';

const docStore = useDocumentStore();

const pageSizes: PageSize[] = ['A4', 'Letter', 'A3', 'A5'];

const updateBrandSetting = (field: string, value: string) => {
  if (docStore.document) {
    const currentSettings = docStore.document.brandSettings;
    docStore.document.brandSettings = { ...currentSettings, [field]: value };
    docStore.isDirty = true;
  }
};

const handleColorChange = (field: string, e: any) => {
  const hex = e.value.startsWith('#') ? e.value : '#' + e.value;
  updateBrandSetting(field, hex);
};
</script>

<template>
  <div v-if="docStore.document" class="flex flex-col gap-4">
    
    <GmPropSection label="Metadata" :default-open="true">
      <PropField label="Document Title">
        <InputText 
          v-model="docStore.document.title" 
          @update:modelValue="docStore.isDirty = true"
          size="small"
          fluid
        />
      </PropField>

      <PropField label="Description" hint="Optional subtitle or description">
        <InputText 
          v-model="docStore.document.description" 
          @update:modelValue="docStore.isDirty = true"
          size="small"
          fluid
        />
      </PropField>

      <PropField label="Page Size">
        <Select 
          v-model="docStore.document.pageSize" 
          :options="pageSizes" 
          @change="docStore.isDirty = true"
          size="small"
          class="w-full"
        />
      </PropField>
    </GmPropSection>
    
    <GmPropSection label="Brand Settings" :default-open="false">
      <PropField label="Primary Color">
        <div class="flex items-center gap-3">
          <ColorPicker 
            :modelValue="docStore.document.brandSettings?.primaryColor?.replace('#', '') || 'D4AF37'" 
            @change="e => handleColorChange('primaryColor', e)" 
          />
          <InputText 
            :modelValue="docStore.document.brandSettings?.primaryColor || '#D4AF37'" 
            @update:modelValue="v => updateBrandSetting('primaryColor', v)"
            size="small" 
            class="flex-1 font-mono text-xs"
          />
        </div>
      </PropField>
      
      <PropField label="Accent Color">
        <div class="flex items-center gap-3">
          <ColorPicker 
            :modelValue="docStore.document.brandSettings?.accentColor?.replace('#', '') || '0F172A'" 
            @change="e => handleColorChange('accentColor', e)" 
          />
          <InputText 
            :modelValue="docStore.document.brandSettings?.accentColor || '#0F172A'" 
            @update:modelValue="v => updateBrandSetting('accentColor', v)"
            size="small" 
            class="flex-1 font-mono text-xs"
          />
        </div>
      </PropField>

      <PropField label="Text Color">
        <div class="flex items-center gap-3">
          <ColorPicker 
            :modelValue="docStore.document.brandSettings?.textColor?.replace('#', '') || '1E293B'" 
            @change="e => handleColorChange('textColor', e)" 
          />
          <InputText 
            :modelValue="docStore.document.brandSettings?.textColor || '#1E293B'" 
            @update:modelValue="v => updateBrandSetting('textColor', v)"
            size="small" 
            class="flex-1 font-mono text-xs"
          />
        </div>
      </PropField>

      <PropField label="Background Color">
        <div class="flex items-center gap-3">
          <ColorPicker 
            :modelValue="docStore.document.brandSettings?.bgColor?.replace('#', '') || 'FFFFFF'" 
            @change="e => handleColorChange('bgColor', e)" 
          />
          <InputText 
            :modelValue="docStore.document.brandSettings?.bgColor || '#FFFFFF'" 
            @update:modelValue="v => updateBrandSetting('bgColor', v)"
            size="small" 
            class="flex-1 font-mono text-xs"
          />
        </div>
      </PropField>
      
      <PropField label="Heading Font">
        <InputText 
          :modelValue="docStore.document.brandSettings?.headingFont || 'Montserrat, sans-serif'" 
          @update:modelValue="v => updateBrandSetting('headingFont', v)"
          size="small"
          fluid
        />
      </PropField>

      <PropField label="Body Font">
        <InputText 
          :modelValue="docStore.document.brandSettings?.bodyFont || 'Inter, sans-serif'" 
          @update:modelValue="v => updateBrandSetting('bodyFont', v)"
          size="small"
          fluid
        />
      </PropField>
    </GmPropSection>

  </div>
</template>