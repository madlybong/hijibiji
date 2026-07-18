<script setup lang="ts">
const props = defineProps<{
  data: any;
}>();
const emit = defineEmits(['update']);

const updateField = (field: string, value: any) => {
  emit('update', { [field]: value });
};
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex flex-col gap-1">
      <label class="text-[10px] font-bold text-gray-500 uppercase">Label</label>
      <input 
        :value="data.label" 
        @input="e => updateField('label', (e.target as HTMLInputElement).value)"
        type="text" 
        class="bg-[#2A2A2A] border border-[#404040] rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-gm-gold" 
      />
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-[10px] font-bold text-gray-500 uppercase">Value (e.g., 22,331)</label>
      <input 
        :value="data.value" 
        @input="e => updateField('value', (e.target as HTMLInputElement).value)"
        type="text" 
        class="bg-[#2A2A2A] border border-[#404040] rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-gm-gold" 
      />
    </div>
    
    <div class="flex gap-2">
      <div class="flex flex-col gap-1 flex-1">
        <label class="text-[10px] font-bold text-gray-500 uppercase">Badge Value</label>
        <input 
          :value="data.badgeValue" 
          @input="e => updateField('badgeValue', (e.target as HTMLInputElement).value)"
          type="text" 
          class="bg-[#2A2A2A] border border-[#404040] rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-gm-gold" 
        />
      </div>
      <div class="flex flex-col gap-1 flex-1">
        <label class="text-[10px] font-bold text-gray-500 uppercase">Trend</label>
        <select 
          :value="data.trend || ''"
          @change="e => updateField('trend', (e.target as HTMLSelectElement).value)"
          class="bg-[#2A2A2A] border border-[#404040] rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-gm-gold"
        >
          <option value="">None</option>
          <option value="up">Up</option>
          <option value="down">Down</option>
        </select>
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-[10px] font-bold text-gray-500 uppercase">Description</label>
      <input 
        :value="data.description" 
        @input="e => updateField('description', (e.target as HTMLInputElement).value)"
        type="text" 
        class="bg-[#2A2A2A] border border-[#404040] rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-gm-gold" 
      />
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-[10px] font-bold text-gray-500 uppercase">Border Color</label>
      <select 
        :value="data.borderColor"
        @change="e => updateField('borderColor', (e.target as HTMLSelectElement).value)"
        class="bg-[#2A2A2A] border border-[#404040] rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-gm-gold"
      >
        <option value="none">None</option>
        <option value="green">Green (Bullish)</option>
        <option value="red">Red (Bearish)</option>
      </select>
    </div>
  </div>
</template>
