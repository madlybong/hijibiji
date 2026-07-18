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
      <label class="text-[10px] font-bold text-gray-500 uppercase">Stock Name</label>
      <input :value="data.stockName" @input="e => updateField('stockName', (e.target as HTMLInputElement).value)" type="text" class="bg-[#2A2A2A] border border-[#404040] rounded px-2 py-1.5 text-xs text-white" />
    </div>
    
    <div class="flex flex-col gap-1">
      <label class="text-[10px] font-bold text-gray-500 uppercase">Description</label>
      <textarea :value="data.stockDesc" @input="e => updateField('stockDesc', (e.target as HTMLTextAreaElement).value)" class="bg-[#2A2A2A] border border-[#404040] rounded px-2 py-1.5 text-xs text-white min-h-[60px]"></textarea>
    </div>

    <div class="grid grid-cols-2 gap-2">
      <div class="flex flex-col gap-1">
        <label class="text-[10px] font-bold text-gray-500 uppercase">CMP</label>
        <input :value="data.cmp" @input="e => updateField('cmp', (e.target as HTMLInputElement).value)" type="text" class="bg-[#2A2A2A] border border-[#404040] rounded px-2 py-1.5 text-xs text-white" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-[10px] font-bold text-gray-500 uppercase">Target</label>
        <input :value="data.target" @input="e => updateField('target', (e.target as HTMLInputElement).value)" type="text" class="bg-[#2A2A2A] border border-[#404040] rounded px-2 py-1.5 text-xs text-white" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-[10px] font-bold text-gray-500 uppercase">Add On Dip</label>
        <input :value="data.addOnDip" @input="e => updateField('addOnDip', (e.target as HTMLInputElement).value)" type="text" class="bg-[#2A2A2A] border border-[#404040] rounded px-2 py-1.5 text-xs text-white" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-[10px] font-bold text-gray-500 uppercase">Exit</label>
        <input :value="data.exit" @input="e => updateField('exit', (e.target as HTMLInputElement).value)" type="text" class="bg-[#2A2A2A] border border-[#404040] rounded px-2 py-1.5 text-xs text-white" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-[10px] font-bold text-gray-500 uppercase">Upside %</label>
        <input :value="data.upside" @input="e => updateField('upside', (e.target as HTMLInputElement).value)" type="text" class="bg-[#2A2A2A] border border-[#404040] rounded px-2 py-1.5 text-xs text-white" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-[10px] font-bold text-gray-500 uppercase">Upside Time</label>
        <input :value="data.upsideTime" @input="e => updateField('upsideTime', (e.target as HTMLInputElement).value)" type="text" class="bg-[#2A2A2A] border border-[#404040] rounded px-2 py-1.5 text-xs text-white" />
      </div>
    </div>
  </div>
</template>
