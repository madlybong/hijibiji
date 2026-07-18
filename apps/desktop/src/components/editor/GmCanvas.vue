<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useDocumentStore } from '../../store/useDocumentStore';
import { useAppStore } from '../../store/useAppStore';
import GmDocPage from '../../layouts/GmDocPage.vue';
import GmDocCover from '../../layouts/GmDocCover.vue';
import GmDocBackCover from '../../layouts/GmDocBackCover.vue';
import Button from 'primevue/button';
import { ZoomIn, ZoomOut, Maximize, Move, MousePointer2, ChevronLeft, ChevronRight } from 'lucide-vue-next';

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

const getPageDimensions = (size: string) => {
  switch (size) {
    case 'Letter': return { widthMm: 215.9, heightMm: 279.4 };
    case 'A3': return { widthMm: 297, heightMm: 420 };
    case 'A5': return { widthMm: 148, heightMm: 210 };
    case 'A4':
    default:
      return { widthMm: 210, heightMm: 297 };
  }
};

const fitToScreen = () => {
  if (viewportRef.value) {
    const viewportWidth = viewportRef.value.clientWidth;
    const viewportHeight = viewportRef.value.clientHeight;
    const size = docStore.document?.pageSize ?? 'A4';
    const { widthMm, heightMm } = getPageDimensions(size);
    const pagePxW = widthMm * 3.7795275591;
    const pagePxH = heightMm * 3.7795275591;

    const padding = 128;
    const availableWidth = viewportWidth - padding;
    const availableHeight = viewportHeight - padding;
    
    const scaleForWidth = availableWidth / pagePxW;
    const scaleForHeight = availableHeight / pagePxH;
    const idealScale = Math.min(scaleForWidth, scaleForHeight);
    
    scale.value = Math.max(0.2, Math.min(idealScale, 3));
    
    panX.value = 0;
    const targetIdx = Math.max(0, activePageIndex.value);
    const pageCenterY = 64 + targetIdx * (pagePxH + 64) + (pagePxH / 2);
    panY.value = (viewportHeight / 2) - (pageCenterY * scale.value);
  }
};

// Page navigation logic
const totalPages = computed(() => docStore.document?.pages.length || 0);
const activePageIndex = computed(() => {
  if (!docStore.document || !docStore.selectedPageId) return -1;
  return docStore.document.pages.findIndex(p => p.id === docStore.selectedPageId);
});

const goToPage = (index: number) => {
  if (!docStore.document) return;
  if (index >= 0 && index < totalPages.value) {
    const page = docStore.document.pages[index];
    docStore.selectPage(page.id);
    
    // Pan to page
    if (viewportRef.value) {
      const viewportHeight = viewportRef.value.clientHeight;
      const size = docStore.document?.pageSize ?? 'A4';
      const { heightMm } = getPageDimensions(size);
      const pagePxH = heightMm * 3.7795275591;
      
      const pageCenterY = 64 + index * (pagePxH + 64) + (pagePxH / 2);
      panY.value = (viewportHeight / 2) - (pageCenterY * scale.value);
      panX.value = 0; // reset horizontal pan
    }
  }
};

watch(() => docStore.selectedPageId, (newId) => {
  if (newId && viewportRef.value) {
    const idx = docStore.document?.pages.findIndex(p => p.id === newId) ?? -1;
    if (idx !== -1 && idx !== activePageIndex.value) {
      goToPage(idx);
    }
  }
});

</script>

<template>
  <div 
    class="relative w-full h-full overflow-hidden bg-surface-950"
    @wheel="handleWheel"
  >
    <!-- Scrollable Viewport -->
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
    <div class="absolute bottom-6 right-6 flex items-center bg-surface-800/90 backdrop-blur-md border border-surface-700 rounded-full shadow-xl p-1 gap-1 z-50">
      <Button variant="text" severity="secondary" size="small" rounded @click="isPanMode = false" :class="{ 'bg-slate-700 text-primary': !isPanMode }" v-tooltip.top="'Select Mode'" class="!w-8 !h-8 !p-0">
        <template #icon><MousePointer2 class="w-4 h-4" /></template>
      </Button>
      <Button variant="text" severity="secondary" size="small" rounded @click="isPanMode = true" :class="{ 'bg-slate-700 text-primary': isPanMode }" v-tooltip.top="'Pan Mode'" class="!w-8 !h-8 !p-0">
        <template #icon><Move class="w-4 h-4" /></template>
      </Button>
      
      <div class="w-px h-4 bg-surface-700 mx-1"></div>
      
      <Button variant="text" severity="secondary" size="small" rounded @click="scale = Math.max(0.2, scale - 0.1)" v-tooltip.top="'Zoom Out'" class="!w-8 !h-8 !p-0">
        <template #icon><ZoomOut class="w-4 h-4" /></template>
      </Button>
      <div class="flex items-center justify-center w-12 text-xs font-mono text-slate-300 pointer-events-none">
        {{ Math.round(scale * 100) }}%
      </div>
      <Button variant="text" severity="secondary" size="small" rounded @click="scale = Math.min(3, scale + 0.1)" v-tooltip.top="'Zoom In'" class="!w-8 !h-8 !p-0">
        <template #icon><ZoomIn class="w-4 h-4" /></template>
      </Button>
      
      <div class="w-px h-4 bg-surface-700 mx-1"></div>
      
      <Button variant="text" severity="secondary" size="small" rounded @click="fitToScreen" v-tooltip.top="'Fit to Screen'" class="!w-8 !h-8 !p-0">
        <template #icon><Maximize class="w-4 h-4" /></template>
      </Button>

      <template v-if="totalPages > 1">
        <div class="w-px h-4 bg-surface-700 mx-2"></div>
        
        <Button variant="text" severity="secondary" size="small" rounded @click="goToPage(activePageIndex - 1)" :disabled="activePageIndex <= 0" class="!w-8 !h-8 !p-0 text-slate-300">
          <template #icon><ChevronLeft class="w-4 h-4" /></template>
        </Button>
        
        <div class="flex items-center gap-1.5 px-2">
          <button 
            v-for="(page, idx) in docStore.document?.pages" 
            :key="page.id"
            @click="goToPage(idx)"
            class="w-2 h-2 rounded-full transition-colors"
            :class="activePageIndex === idx ? 'bg-primary' : 'bg-surface-500 hover:bg-surface-400'"
            :title="page.label || `Page ${idx + 1}`"
          ></button>
        </div>
        
        <Button variant="text" severity="secondary" size="small" rounded @click="goToPage(activePageIndex + 1)" :disabled="activePageIndex >= totalPages - 1" class="!w-8 !h-8 !p-0 text-slate-300">
          <template #icon><ChevronRight class="w-4 h-4" /></template>
        </Button>
      </template>
    </div>
  </div>
</template>
