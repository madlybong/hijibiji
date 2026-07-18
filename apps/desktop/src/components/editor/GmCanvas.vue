<script setup lang="ts">
import { ref } from 'vue';
import { useDocumentStore } from '../../store/useDocumentStore';
import { useAppStore } from '../../store/useAppStore';
import GmDocPage from '../../layouts/GmDocPage.vue';
import GmDocCover from '../../layouts/GmDocCover.vue';
import GmDocBackCover from '../../layouts/GmDocBackCover.vue';
import Button from 'primevue/button';
import { ZoomIn, ZoomOut, Maximize, Move, MousePointer2 } from 'lucide-vue-next';

const docStore = useDocumentStore();
const appStore = useAppStore();

const deselect = () => {
  docStore.selectBlock(null);
  docStore.selectPage(null);
};

const scale = ref(1);
const panX = ref(0);
const panY = ref(0);
const isPanning = ref(false);
const isPanMode = ref(false);
const viewportRef = ref<HTMLElement | null>(null);

const handleWheel = (e: WheelEvent) => {
  if (e.ctrlKey) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    scale.value = Math.max(0.2, Math.min(scale.value + delta, 3));
  }
};

const handlePanStart = (e: MouseEvent) => {
  if (isPanMode.value || e.button === 1) { // Middle click or pan mode
    e.preventDefault();
    isPanning.value = true;
  }
};

const handlePanMove = (e: MouseEvent) => {
  if (isPanning.value) {
    panX.value += e.movementX;
    panY.value += e.movementY;
  }
};

const handlePanEnd = () => {
  isPanning.value = false;
};

const fitToScreen = () => {
  scale.value = 0.6; // Adjust dynamically based on viewport if needed
  if (viewportRef.value) {
    viewportRef.value.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
};
</script>

<template>
  <div 
    class="relative w-full h-full overflow-hidden"
    @wheel="handleWheel"
  >
    <!-- Scrollable Viewport (now hidden) -->
    <div 
      ref="viewportRef"
      class="w-full h-full overflow-hidden gm-canvas-viewport relative"
      @mousedown="handlePanStart"
      @mousemove="handlePanMove"
      @mouseup="handlePanEnd"
      @mouseleave="handlePanEnd"
    >
      <!-- Canvas Transform Layer -->
      <div 
        class="absolute top-0 left-0 transition-transform duration-75 min-h-max min-w-max flex items-start justify-center w-full h-full"
        :style="{ transform: `translate(${panX}px, ${panY}px) scale(${scale})`, transformOrigin: 'top center' }"
        :class="{ 'cursor-grab': isPanMode && !isPanning, 'cursor-grabbing': isPanning }"
        @click.self="deselect"
      >
      <div 
        class="flex flex-col items-center py-16 gap-16 min-w-[210mm]" 
        :class="{ 'pointer-events-none': appStore.editorMode === 'preview' || isPanMode }"
        @click.self="deselect"
      >
        <template v-if="docStore.document">
          <div 
            v-for="page in docStore.document.pages" 
            :key="page.id" 
            class="relative group shadow-[0_8px_32px_rgba(0,0,0,0.6),0_2px_8px_rgba(0,0,0,0.4)] ring-2 transition-shadow"
            :class="{ 'ring-primary': docStore.selectedPageId === page.id, 'ring-transparent': docStore.selectedPageId !== page.id }"
            @click="docStore.selectPage(page.id)"
          >
            <GmDocCover v-if="page.type === 'cover'" :page="page" />
            <GmDocBackCover v-else-if="page.type === 'back-cover'" :page="page" />
            <GmDocPage v-else :page="page" />
          </div>
        </template>
      </div>
    </div>
  </div>

    <!-- Floating Toolbar -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center shadow-xl z-50 rounded-full border border-slate-600/60 bg-slate-800/95 backdrop-blur-sm p-1">
      <div class="flex items-center gap-1">
        <Button variant="text" severity="secondary" size="small" rounded @click="isPanMode = false" :class="{ 'bg-slate-700 text-yellow-400': !isPanMode }" v-tooltip.top="'Select Mode'" class="!w-8 !h-8 !p-0">
          <template #icon><MousePointer2 class="w-4 h-4" /></template>
        </Button>
        <Button variant="text" severity="secondary" size="small" rounded @click="isPanMode = true" :class="{ 'bg-slate-700 text-yellow-400': isPanMode }" v-tooltip.top="'Pan Mode'" class="!w-8 !h-8 !p-0">
          <template #icon><Move class="w-4 h-4" /></template>
        </Button>
        
        <div class="w-px h-4 bg-slate-600 mx-1"></div>
        
        <Button variant="text" severity="secondary" size="small" rounded @click="scale = Math.max(0.2, scale - 0.1)" v-tooltip.top="'Zoom Out'" class="!w-8 !h-8 !p-0">
          <template #icon><ZoomOut class="w-4 h-4" /></template>
        </Button>
        <div class="flex items-center justify-center w-12 text-xs font-mono text-slate-300 pointer-events-none">
          {{ Math.round(scale * 100) }}%
        </div>
        <Button variant="text" severity="secondary" size="small" rounded @click="scale = Math.min(3, scale + 0.1)" v-tooltip.top="'Zoom In'" class="!w-8 !h-8 !p-0">
          <template #icon><ZoomIn class="w-4 h-4" /></template>
        </Button>
        
        <div class="w-px h-4 bg-slate-600 mx-1"></div>
        
        <Button variant="text" severity="secondary" size="small" rounded @click="fitToScreen" v-tooltip.top="'Fit to Screen'" class="!w-8 !h-8 !p-0">
          <template #icon><Maximize class="w-4 h-4" /></template>
        </Button>

        <template v-if="totalPages > 1">
          <div class="w-px h-4 bg-slate-600 mx-2"></div>
          
          <Button variant="text" severity="secondary" size="small" rounded @click="goToPage(activePageIndex - 1)" :disabled="activePageIndex <= 0" class="!w-8 !h-8 !p-0 text-slate-300">
            <template #icon><ChevronLeft class="w-4 h-4" /></template>
          </Button>
          
          <div class="flex items-center gap-1.5 px-2">
            <button 
              v-for="(page, idx) in docStore.document?.pages" 
              :key="page.id"
              @click="goToPage(idx)"
              class="w-2 h-2 rounded-full transition-colors"
              :class="activePageIndex === idx ? 'bg-yellow-400' : 'bg-slate-500 hover:bg-slate-400'"
              :title="page.label || `Page ${idx + 1}`"
            ></button>
          </div>
          
          <Button variant="text" severity="secondary" size="small" rounded @click="goToPage(activePageIndex + 1)" :disabled="activePageIndex >= totalPages - 1" class="!w-8 !h-8 !p-0 text-slate-300">
            <template #icon><ChevronRight class="w-4 h-4" /></template>
          </Button>
        </template>
      </div>
    </div>
  </div>
</template>
