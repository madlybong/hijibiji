<script setup lang="ts">
import { useDocumentStore } from '../../store/useDocumentStore';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import { GmdPropSection, GmdPropField, GmdColorField } from '@goldmine/ui';
import type { PageSize } from '@goldmine/types';

const docStore = useDocumentStore();

const pageSizes: PageSize[] = ['A4', 'Letter', 'A3', 'A5'];

const updateBrandSetting = (field: string, value: any) => {
  docStore.updateBrandSettings({ [field]: value });
};
</script>

<template>
  <div v-if="docStore.document" class="flex flex-col gap-4">
    
    <GmdPropSection label="Metadata" :default-open="true">
      <GmdPropField label="Document Title">
        <InputText 
          v-model="docStore.document.title" 
          @update:modelValue="docStore.isDirty = true"
          size="small"
          fluid
        />
      </GmdPropField>

      <GmdPropField label="Description" hint="Optional subtitle or description">
        <InputText 
          v-model="docStore.document.description" 
          @update:modelValue="docStore.isDirty = true"
          size="small"
          fluid
        />
      </GmdPropField>

      <GmdPropField label="Page Size">
        <Select 
          v-model="docStore.document.pageSize" 
          :options="pageSizes" 
          @change="docStore.isDirty = true"
          size="small"
          fluid
        />
      </GmdPropField>
    </GmdPropSection>
    
    <GmdPropSection label="Brand Settings" :default-open="false">
      <GmdPropField label="Primary Color">
        <GmdColorField 
          :modelValue="docStore.document.brandSettings?.primaryColor || '#D4AF37'" 
          @update:modelValue="($event: any) => updateBrandSetting('primaryColor', $event)"
        />
      </GmdPropField>
      
      <GmdPropField label="Accent Color">
        <GmdColorField 
          :modelValue="docStore.document.brandSettings?.accentColor || '#0F172A'" 
          @update:modelValue="($event: any) => updateBrandSetting('accentColor', $event)"
        />
      </GmdPropField>

      <GmdPropField label="Text Color">
        <GmdColorField 
          :modelValue="docStore.document.brandSettings?.textColor || '#1E293B'" 
          @update:modelValue="($event: any) => updateBrandSetting('textColor', $event)"
        />
      </GmdPropField>

      <GmdPropField label="Background Color">
        <GmdColorField 
          :modelValue="docStore.document.brandSettings?.bgColor || '#FFFFFF'" 
          @update:modelValue="($event: any) => updateBrandSetting('bgColor', $event)"
        />
      </GmdPropField>
      
      <GmdPropField label="Heading Font">
        <InputText 
          :modelValue="docStore.document.brandSettings?.headingFont || 'Montserrat, sans-serif'" 
          @update:modelValue="($event: any) => updateBrandSetting('headingFont', $event)"
          size="small"
          fluid
        />
      </GmdPropField>

      <GmdPropField label="Body Font">
        <InputText 
          :modelValue="docStore.document.brandSettings?.bodyFont || 'Inter, sans-serif'" 
          @update:modelValue="($event: any) => updateBrandSetting('bodyFont', $event)"
          size="small"
          fluid
        />
      </GmdPropField>
    </GmdPropSection>

  </div>
</template>