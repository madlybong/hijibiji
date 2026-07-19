<script setup lang="ts">
/**
 * @component GmdCanvas
 * @description The primary editing area that renders document pages in an infinite canvas.
 * Manages panning, zooming, and deselecting blocks/pages when the background is clicked.
 * 
 * @example
 * <GmdCanvas />
 */
import { ref, computed, watch } from 'vue';
import { useDocumentStore } from '../../store/useDocumentStore';
import { useAppStore } from '../../store/useAppStore';
import GmdDocPage from '../../layouts/GmdDocPage.vue';
import GmdDocCover from '../../layouts/GmdDocCover.vue';
import GmdDocBackCover from '../../layouts/GmdDocBackCover.vue';
import { GmdFloatingToolbar } from '@goldmine/ui';

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
    class="gmd-canvas"
    @wheel="handleWheel"
  >
    <!-- Scrollable Viewport -->
    <div 
      ref="viewportRef"
      class="w-full h-full overflow-hidden gmd-canvas-bg relative"
      @mousedown="handlePanStart"
      @mousemove="handlePanMove"
      @mouseup="handlePanEnd"
      @mouseleave="handlePanEnd"
    >
      <!-- Canvas Transform Layer -->
      <div 
        class="gmd-canvas-transform"
        :style="{ transform: `translate(${panX}px, ${panY}px) scale(${scale})`, transformOrigin: 'top center' }"
        :class="{ 'cursor-grab': isPanMode && !isPanning, 'cursor-grabbing': isPanning }"
        @click.self="deselect"
      >
        <div 
          class="gmd-page-container" 
          :class="{ 'pointer-events-none': appStore.editorMode === 'preview' || isPanMode }"
          @click.self="deselect"
        >
          <template v-if="docStore.document">
            <div 
              v-for="page in docStore.document.pages" 
              :key="page.id" 
              class="gmd-doc-page-frame group"
              :style="{ '--gmd-ring-color': docStore.selectedPageId === page.id ? 'var(--p-primary-color)' : 'transparent' }"
              @click="docStore.selectPage(page.id)"
            >
              <GmdDocCover v-if="page.type === 'cover'" :page="page" />
              <GmdDocBackCover v-else-if="page.type === 'back-cover'" :page="page" />
              <GmdDocPage v-else :page="page" />
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Floating Toolbar -->
    <GmdFloatingToolbar
      :scale="scale"
      :isPanMode="isPanMode"
      :totalPages="totalPages"
      :activePageIndex="activePageIndex"
      :pages="docStore.document?.pages || []"
      @update:scale="scale = $event"
      @update:isPanMode="isPanMode = $event"
      @fitToScreen="fitToScreen"
      @goToPage="goToPage"
    />
  </div>
</template>
