<script setup lang="ts">
import InputText from 'primevue/inputtext';
import ColorPicker from 'primevue/colorpicker';
import SelectButton from 'primevue/selectbutton';
import Select from 'primevue/select';
import PropField from './PropField.vue';
import GmPropSection from './GmPropSection.vue';
import type { GmBlock } from '../../../types/document';
import { useDocumentStore } from '../../../store/useDocumentStore';

const props = defineProps<{ block: GmBlock }>();
const docStore = useDocumentStore();

const updateStyle = (field: string, value: any) => {
  docStore.updateBlockStyle(props.block.id, { [field]: value });
};

const handleColorChange = (prop: string, e: any) => {
  if (e.value) {
    updateStyle(prop, '#' + e.value);
  } else {
    updateStyle(prop, undefined);
  }
};

const fontStyleOptions = [
  { label: 'Normal', value: 'normal' },
  { label: 'Italic', value: 'italic' }
];

const textDecoOptions = [
  { label: 'None', value: 'none' },
  { label: 'Underline', value: 'underline' },
  { label: 'Strike', value: 'line-through' }
];

const textTransformOptions = [
  { label: 'Aa', value: 'none' },
  { label: 'AA', value: 'uppercase' },
  { label: 'Aa', value: 'capitalize' },
  { label: 'aa', value: 'lowercase' }
];

const overflowOptions = [
  { label: 'Visible', value: 'visible' },
  { label: 'Hidden', value: 'hidden' },
  { label: 'Scroll', value: 'scroll' },
  { label: 'Auto', value: 'auto' },
];

const textAlignOptions = ['left', 'center', 'right', 'justify'];
const fontWeightOptions = ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- LAYOUT SECTION -->
    <GmPropSection label="Layout" :default-open="true">
      <div class="grid grid-cols-2 gap-4">
        <PropField label="Width">
          <InputText 
            :modelValue="block.style?.width || ''" 
            @update:modelValue="v => updateStyle('width', v)"
            size="small"
            fluid
            placeholder="e.g. 100%"
          />
        </PropField>
        <PropField label="Height">
          <InputText 
            :modelValue="block.style?.height || ''" 
            @update:modelValue="v => updateStyle('height', v)"
            size="small"
            fluid
            placeholder="e.g. 200px"
          />
        </PropField>
      </div>
      
      <div class="grid grid-cols-2 gap-4 mt-2">
        <PropField label="Min Height">
          <InputText 
            :modelValue="block.style?.minHeight || ''" 
            @update:modelValue="v => updateStyle('minHeight', v)"
            size="small"
            fluid
            placeholder="e.g. 40px"
          />
        </PropField>
        <PropField label="Overflow">
          <Select 
            :modelValue="block.style?.overflow || ''" 
            :options="overflowOptions"
            @update:modelValue="v => updateStyle('overflow', v)"
            size="small"
            class="w-full"
            placeholder="Default"
            showClear
            optionLabel="label"
            optionValue="value"
          />
        </PropField>
      </div>

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

      <div class="mt-2">
        <PropField label="Border">
          <InputText 
            :modelValue="block.style?.border || ''" 
            @update:modelValue="v => updateStyle('border', v)"
            size="small"
            fluid
            placeholder="e.g. 1px solid #ccc"
          />
        </PropField>
      </div>

      <div class="mt-2">
        <PropField label="Box Shadow">
          <InputText 
            :modelValue="block.style?.boxShadow || ''" 
            @update:modelValue="v => updateStyle('boxShadow', v)"
            size="small"
            fluid
            placeholder="e.g. 0 2px 4px rgba(0,0,0,0.1)"
          />
        </PropField>
      </div>
    </GmPropSection>

    <!-- TYPOGRAPHY SECTION -->
    <GmPropSection label="Typography & Colors" :default-open="false">
      <PropField label="Text Color">
        <div class="flex items-center gap-3">
          <button 
            v-if="!block.style?.color" 
            @click="updateStyle('color', '#000000')" 
            class="w-6 h-6 rounded border border-dashed border-slate-500 bg-transparent-checker shrink-0 hover:border-slate-400 transition-colors"
            title="Pick Color"
          ></button>
          <div v-else class="flex items-center gap-1">
            <ColorPicker 
              :modelValue="block.style.color.replace('#', '')" 
              @change="e => handleColorChange('color', e)" 
            />
            <button @click="updateStyle('color', undefined)" class="text-slate-500 hover:text-red-400 w-5 h-5 flex items-center justify-center transition-colors">
              <i class="pi pi-times text-[10px]" />
            </button>
          </div>
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
          <button 
            v-if="!block.style?.backgroundColor" 
            @click="updateStyle('backgroundColor', '#ffffff')" 
            class="w-6 h-6 rounded border border-dashed border-slate-500 bg-transparent-checker shrink-0 hover:border-slate-400 transition-colors"
            title="Pick Color"
          ></button>
          <div v-else class="flex items-center gap-1">
            <ColorPicker 
              :modelValue="block.style.backgroundColor.replace('#', '')" 
              @change="e => handleColorChange('backgroundColor', e)" 
            />
            <button @click="updateStyle('backgroundColor', undefined)" class="text-slate-500 hover:text-red-400 w-5 h-5 flex items-center justify-center transition-colors">
              <i class="pi pi-times text-[10px]" />
            </button>
          </div>
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
        <PropField label="Font Size">
          <InputText 
            :modelValue="block.style?.fontSize || ''" 
            @update:modelValue="v => updateStyle('fontSize', v)"
            size="small"
            fluid
            placeholder="e.g. 1.25rem"
          />
        </PropField>
        <PropField label="Font Weight">
          <Select 
            :modelValue="block.style?.fontWeight || ''" 
            :options="fontWeightOptions"
            @update:modelValue="v => updateStyle('fontWeight', v)"
            size="small"
            class="w-full"
            placeholder="Inherit"
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

      <PropField label="Line Height">
        <InputText fluid 
          :modelValue="block.style?.lineHeight" 
          @update:modelValue="v => updateStyle('lineHeight', v)" 
          placeholder="e.g. 1.5" 
          size="small" 
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

      <PropField label="Font Style">
        <SelectButton 
          :modelValue="block.style?.fontStyle || 'normal'" 
          @update:modelValue="v => updateStyle('fontStyle', v)"
          :options="fontStyleOptions"
          optionLabel="label"
          optionValue="value"
          size="small"
          :pt="{ root: { class: 'flex-wrap gap-1 w-full' }, pcButton: { root: { class: 'flex-1 min-w-0' } } }"
        />
      </PropField>

      <PropField label="Text Decoration">
        <SelectButton 
          :modelValue="block.style?.textDecoration || 'none'" 
          @update:modelValue="v => updateStyle('textDecoration', v)"
          :options="textDecoOptions"
          optionLabel="label"
          optionValue="value"
          size="small"
          :pt="{ root: { class: 'flex-wrap gap-1 w-full' }, pcButton: { root: { class: 'flex-1 min-w-0' } } }"
        />
      </PropField>

      <PropField label="Text Transform">
        <SelectButton 
          :modelValue="block.style?.textTransform || 'none'" 
          @update:modelValue="v => updateStyle('textTransform', v)"
          :options="textTransformOptions"
          optionLabel="label"
          optionValue="value"
          size="small"
          :pt="{ root: { class: 'flex-wrap gap-1 w-full' }, pcButton: { root: { class: 'flex-1 min-w-0' } } }"
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
  </div>
</template>
