<script setup lang="ts">
import ColorPicker from 'primevue/colorpicker';
import InputText from 'primevue/inputtext';

const props = defineProps<{
  modelValue: string;
  allowClear?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | undefined): void;
}>();

const handleColorChange = (e: any) => {
  if (e.value) {
    emit('update:modelValue', '#' + e.value.replace('#', ''));
  } else {
    emit('update:modelValue', undefined);
  }
};
</script>

<template>
  <div class="flex items-center gap-3">
    <button 
      v-if="allowClear && !modelValue" 
      @click="emit('update:modelValue', '#ffffff')" 
      class="w-6 h-6 rounded border border-dashed border-surface-500 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjY2NjIiAvPgo8cmVjdCB4PSI0IiB5PSI0IiB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjY2NjIiAvPgo8L3N2Zz4=')] shrink-0 hover:border-surface-400 transition-colors"
      title="Pick Color"
    ></button>
    <div v-else class="flex items-center gap-1">
      <ColorPicker 
        :modelValue="modelValue?.replace('#', '') || 'ffffff'" 
        @change="handleColorChange" 
      />
      <button v-if="allowClear" @click="emit('update:modelValue', undefined)" class="text-surface-500 hover:text-red-400 w-5 h-5 flex items-center justify-center transition-colors">
        <i class="pi pi-times text-[10px]" />
      </button>
    </div>
    <InputText 
      :modelValue="modelValue || ''" 
      @update:modelValue="v => emit('update:modelValue', v)"
      size="small" 
      class="flex-1 font-mono text-xs"
      :placeholder="allowClear ? 'Inherit' : '#FFFFFF'"
    />
  </div>
</template>
