<script setup lang="ts">
import { ref, watch } from 'vue';
import InputText from 'primevue/inputtext';
import ColorPicker from 'primevue/colorpicker';
import PropField from './PropField.vue';
import GmPropSection from './GmPropSection.vue';
import type { GmBlock } from '../../../types/document';
import { useDocumentStore } from '../../../store/useDocumentStore';
import Select from 'primevue/select';

const props = defineProps<{
  block: GmBlock;
}>();

const docStore = useDocumentStore();

const updateStyle = (field: string, value: any) => {
  docStore.updateBlockStyle(props.block.id, { [field]: value });
};

const handleColorChange = (field: string, e: any) => {
  const hex = e.value.startsWith('#') ? e.value : '#' + e.value;
  updateStyle(field, hex);
};

const textAlignOptions = ['left', 'center', 'right', 'justify'];
const fontWeightOptions = ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
</script>

<template>
  <GmPropSection label="Style" :default-open="false">
    
    <PropField label="Text Color">
      <div class="flex items-center gap-3">
        <ColorPicker 
          :modelValue="block.style?.color?.replace('#', '') || ''" 
          @change="e => handleColorChange('color', e)" 
        />
        <InputText 
          :modelValue="block.style?.color || ''" 
          @update:modelValue="v => updateStyle('color', v)"
          size="small" 
          class="flex-1 font-mono text-xs"
          placeholder="Inherit"
        />
      </div>
    </PropField>

    <PropField label="Background Color">
      <div class="flex items-center gap-3">
        <ColorPicker 
          :modelValue="block.style?.backgroundColor?.replace('#', '') || ''" 
          @change="e => handleColorChange('backgroundColor', e)" 
        />
        <InputText 
          :modelValue="block.style?.backgroundColor || ''" 
          @update:modelValue="v => updateStyle('backgroundColor', v)"
          size="small" 
          class="flex-1 font-mono text-xs"
          placeholder="Transparent"
        />
      </div>
    </PropField>

    <div class="grid grid-cols-2 gap-4 mt-2">
      <PropField label="Padding">
        <InputText 
          :modelValue="block.style?.padding || ''" 
          @update:modelValue="v => updateStyle('padding', v)"
          size="small"
          fluid
          placeholder="e.g. 1rem"
        />
      </PropField>
      <PropField label="Margin">
        <InputText 
          :modelValue="block.style?.margin || ''" 
          @update:modelValue="v => updateStyle('margin', v)"
          size="small"
          fluid
          placeholder="e.g. 0 auto"
        />
      </PropField>
    </div>

    <div class="grid grid-cols-2 gap-4 mt-2">
      <PropField label="Font Size">
        <InputText 
          :modelValue="block.style?.fontSize || ''" 
          @update:modelValue="v => updateStyle('fontSize', v)"
          size="small"
          fluid
          placeholder="e.g. 14px"
        />
      </PropField>
      <PropField label="Font Weight">
        <Select 
          :modelValue="block.style?.fontWeight || ''" 
          :options="fontWeightOptions"
          @update:modelValue="v => updateStyle('fontWeight', v)"
          size="small"
          class="w-full"
          placeholder="Default"
          showClear
        />
      </PropField>
    </div>

    <PropField label="Font Family">
      <InputText 
        :modelValue="block.style?.fontFamily || ''" 
        @update:modelValue="v => updateStyle('fontFamily', v)"
        size="small"
        fluid
        placeholder="Inherit"
      />
    </PropField>

    <PropField label="Text Align">
      <Select 
        :modelValue="block.style?.textAlign || ''" 
        :options="textAlignOptions"
        @update:modelValue="v => updateStyle('textAlign', v)"
        size="small"
        class="w-full"
        placeholder="Inherit"
        showClear
      />
    </PropField>

    <div class="grid grid-cols-2 gap-4 mt-2">
      <PropField label="Border Radius">
        <InputText 
          :modelValue="block.style?.borderRadius || ''" 
          @update:modelValue="v => updateStyle('borderRadius', v)"
          size="small"
          fluid
          placeholder="e.g. 8px"
        />
      </PropField>
      <PropField label="Opacity">
        <InputText 
          :modelValue="block.style?.opacity || ''" 
          @update:modelValue="v => updateStyle('opacity', v)"
          size="small"
          fluid
          placeholder="0.0 to 1.0"
        />
      </PropField>
    </div>

  </GmPropSection>
</template>