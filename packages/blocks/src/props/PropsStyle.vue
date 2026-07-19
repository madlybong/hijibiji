<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import SelectButton from 'primevue/selectbutton';
import { GmdPropSection, GmdPropField, GmdColorField } from '@goldmine/ui';
import type { GmBlock } from '@goldmine/types';

const props = defineProps<{ block: GmBlock }>();

const emit = defineEmits<{
  (e: 'updateStyle', field: string, value: any): void;
}>();

const updateStyle = (field: string, value: any) => {
  emit('updateStyle', field, value);
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
    <GmdPropSection label="Layout" :default-open="true">
      <div class="gmd-prop-grid-2">
        <GmdPropField label="Width">
          <InputText 
            :modelValue="block.style?.width || ''" 
            @update:modelValue="v => updateStyle('width', v)"
            size="small"
            fluid
            placeholder="e.g. 100%"
          />
        </GmdPropField>
        <GmdPropField label="Height">
          <InputText 
            :modelValue="block.style?.height || ''" 
            @update:modelValue="v => updateStyle('height', v)"
            size="small"
            fluid
            placeholder="e.g. 200px"
          />
        </GmdPropField>
        <GmdPropField label="Min Height">
          <InputText 
            :modelValue="block.style?.minHeight || ''" 
            @update:modelValue="v => updateStyle('minHeight', v)"
            size="small"
            fluid
            placeholder="e.g. 40px"
          />
        </GmdPropField>
        <GmdPropField label="Overflow">
          <Select 
            :modelValue="block.style?.overflow || ''" 
            :options="overflowOptions"
            @update:modelValue="v => updateStyle('overflow', v)"
            size="small"
            fluid
            placeholder="Default"
            showClear
            optionLabel="label"
            optionValue="value"
          />
        </GmdPropField>
        <GmdPropField label="Padding">
          <InputText 
            :modelValue="block.style?.padding || ''" 
            @update:modelValue="v => updateStyle('padding', v)"
            size="small"
            fluid
            placeholder="e.g. 1rem"
          />
        </GmdPropField>
        <GmdPropField label="Margin">
          <InputText 
            :modelValue="block.style?.margin || ''" 
            @update:modelValue="v => updateStyle('margin', v)"
            size="small"
            fluid
            placeholder="e.g. 0 auto"
          />
        </GmdPropField>
        <GmdPropField label="Border">
          <InputText 
            :modelValue="block.style?.border || ''" 
            @update:modelValue="v => updateStyle('border', v)"
            size="small"
            fluid
            placeholder="e.g. 1px solid #ccc"
          />
        </GmdPropField>
        <GmdPropField label="Box Shadow">
          <InputText 
            :modelValue="block.style?.boxShadow || ''" 
            @update:modelValue="v => updateStyle('boxShadow', v)"
            size="small"
            fluid
            placeholder="e.g. 0 2px 4px rgba(0,0,0,0.1)"
          />
        </GmdPropField>
      </div>
    </GmdPropSection>

    <!-- TYPOGRAPHY SECTION -->
    <GmdPropSection label="Typography & Colors" :default-open="false">
      <GmdPropField label="Text Color">
        <GmdColorField 
          :modelValue="block.style?.color || ''" 
          @update:modelValue="($event: any) => updateStyle('color', $event)"
          allowClear
        />
      </GmdPropField>

      <GmdPropField label="Background Color">
        <GmdColorField 
          :modelValue="block.style?.backgroundColor || ''" 
          @update:modelValue="($event: any) => updateStyle('backgroundColor', $event)"
          allowClear
        />
      </GmdPropField>

      <div class="gmd-prop-grid-2 mt-2">
        <GmdPropField label="Font Size">
          <InputText 
            :modelValue="block.style?.fontSize || ''" 
            @update:modelValue="v => updateStyle('fontSize', v)"
            size="small"
            fluid
            placeholder="e.g. 1.25rem"
          />
        </GmdPropField>
        <GmdPropField label="Font Weight">
          <Select 
            :modelValue="block.style?.fontWeight || ''" 
            :options="fontWeightOptions"
            @update:modelValue="v => updateStyle('fontWeight', v)"
            size="small"
            class="w-full"
            placeholder="Inherit"
            showClear
          />
        </GmdPropField>
      </div>

      <GmdPropField label="Font Family">
        <InputText 
          :modelValue="block.style?.fontFamily || ''" 
          @update:modelValue="v => updateStyle('fontFamily', v)"
          size="small"
          fluid
          placeholder="Inherit"
        />
      </GmdPropField>

      <GmdPropField label="Line Height">
        <InputText fluid 
          :modelValue="block.style?.lineHeight" 
          @update:modelValue="v => updateStyle('lineHeight', v)" 
          placeholder="e.g. 1.5" 
          size="small" 
        />
      </GmdPropField>

      <GmdPropField label="Text Align">
        <Select 
          :modelValue="block.style?.textAlign || ''" 
          :options="textAlignOptions"
          @update:modelValue="v => updateStyle('textAlign', v)"
          size="small"
          class="w-full"
          placeholder="Inherit"
          showClear
        />
      </GmdPropField>

      <GmdPropField label="Font Style">
        <SelectButton 
          :modelValue="block.style?.fontStyle || 'normal'" 
          @update:modelValue="v => updateStyle('fontStyle', v)"
          :options="fontStyleOptions"
          optionLabel="label"
          optionValue="value"
          size="small"
          :pt="{ root: { class: 'flex-wrap gap-1 w-full' }, pcButton: { root: { class: 'flex-1 min-w-0' } } }"
        />
      </GmdPropField>

      <GmdPropField label="Text Decoration">
        <SelectButton 
          :modelValue="block.style?.textDecoration || 'none'" 
          @update:modelValue="v => updateStyle('textDecoration', v)"
          :options="textDecoOptions"
          optionLabel="label"
          optionValue="value"
          size="small"
          :pt="{ root: { class: 'flex-wrap gap-1 w-full' }, pcButton: { root: { class: 'flex-1 min-w-0' } } }"
        />
      </GmdPropField>

      <GmdPropField label="Text Transform">
        <SelectButton 
          :modelValue="block.style?.textTransform || 'none'" 
          @update:modelValue="v => updateStyle('textTransform', v)"
          :options="textTransformOptions"
          optionLabel="label"
          optionValue="value"
          size="small"
          :pt="{ root: { class: 'flex-wrap gap-1 w-full' }, pcButton: { root: { class: 'flex-1 min-w-0' } } }"
        />
      </GmdPropField>

      <div class="gmd-prop-grid-2 mt-2">
        <GmdPropField label="Border Radius">
          <InputText 
            :modelValue="block.style?.borderRadius || ''" 
            @update:modelValue="v => updateStyle('borderRadius', v)"
            size="small"
            fluid
            placeholder="e.g. 8px"
          />
        </GmdPropField>
        <GmdPropField label="Opacity">
          <InputText 
            :modelValue="block.style?.opacity || ''" 
            @update:modelValue="v => updateStyle('opacity', v)"
            size="small"
            fluid
            placeholder="0.0 to 1.0"
          />
        </GmdPropField>
      </div>

    </GmdPropSection>
  </div>
</template>
