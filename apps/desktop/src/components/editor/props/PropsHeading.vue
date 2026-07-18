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
      <label class="text-[10px] font-bold text-gray-500 uppercase">Heading Text</label>
      <input 
        :value="data.text" 
        @input="e => updateField('text', (e.target as HTMLInputElement).value)"
        type="text" 
        class="bg-[#2A2A2A] border border-[#404040] rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-gm-gold" 
      />
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-[10px] font-bold text-gray-500 uppercase">Level (H1, H2, H3)</label>
      <select 
        :value="data.level"
        @change="e => updateField('level', parseInt((e.target as HTMLSelectElement).value))"
        class="bg-[#2A2A2A] border border-[#404040] rounded px-2 py-1.5 text-xs text-white focus:outline-none focus:border-gm-gold"
      >
        <option :value="1">Level 1 (Main Title)</option>
        <option :value="2">Level 2 (Section Title)</option>
        <option :value="3">Level 3 (Subsection)</option>
      </select>
    </div>
  </div>
</template>
