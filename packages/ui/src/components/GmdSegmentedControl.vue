<script setup lang="ts">
/**
 * @component GmdSegmentedControl
 * @description A stylized segmented control wrapper over PrimeVue's SelectButton.
 * Used for toggling between distinct modes or tabs (e.g., Properties vs Layers).
 * 
 * @example
 * <GmdSegmentedControl v-model="activeTab" :options="[{label: 'A', value: 'a'}]" />
 */
import SelectButton from 'primevue/selectbutton';
import { type Component } from 'vue';

const props = defineProps<{
  /**
   * The currently selected value.
   */
  modelValue: string;
  /**
   * The list of options to display in the control.
   */
  options: { value: string; label: string; icon?: Component }[];
}>();

const emit = defineEmits<{
  /**
   * Emitted when the selected option changes.
   * @param e - Event name
   * @param value - The newly selected value
   */
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <div class="px-4 py-3 border-b" style="border-color: var(--p-surface-border);">
    <div class="flex rounded-full p-1" style="background: var(--p-surface-hover);">
      <SelectButton 
        :modelValue="modelValue" 
        @update:modelValue="v => { if (v !== null) emit('update:modelValue', v) }"
        :options="options"
        optionLabel="label"
        optionValue="value"
        dataKey="value"
        :allowEmpty="false"
        class="w-full"
      >
        <template #option="{ option }">
          <div class="flex justify-center items-center gap-2 text-[10px] font-bold uppercase tracking-widest w-full">
            <component v-if="option.icon" :is="option.icon" class="w-3.5 h-3.5" />
            {{ option.label }}
          </div>
        </template>
      </SelectButton>
    </div>
  </div>
</template>
