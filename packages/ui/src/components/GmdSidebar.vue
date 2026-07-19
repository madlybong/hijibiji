<script setup lang="ts">
/**
 * @component GmdSidebar
 * @description A resizable, collapsible sidebar component used for the main application layout.
 * Supports left and right placements with drag-to-resize functionality.
 * 
 * @example
 * <GmdSidebar side="left" :collapsed="isCollapsed" @update:collapsed="isCollapsed = $event">
 *   <template #default>Content</template>
 * </GmdSidebar>
 */
import { ref, onMounted } from 'vue';
import Button from 'primevue/button';
import { ChevronLeft, ChevronRight, PanelLeftClose, PanelRightClose } from 'lucide-vue-next';

const props = withDefaults(defineProps<{
  /**
   * The placement side of the sidebar.
   */
  side: 'left' | 'right';
  /**
   * The initial width of the sidebar in pixels.
   * @default 280
   */
  defaultWidth?: number;
  /**
   * The minimum width the sidebar can be resized to.
   * @default 200
   */
  minWidth?: number;
  /**
   * The maximum width the sidebar can be resized to.
   * @default 480
   */
  maxWidth?: number;
  /**
   * Controls the collapsed state of the sidebar.
   * @default false
   */
  collapsed: boolean;
}>(), {
  defaultWidth: 280,
  minWidth: 200,
  maxWidth: 480,
  collapsed: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the sidebar is toggled open or closed.
   */
  (e: 'update:collapsed', value: boolean): void;
}>();

const width = ref(props.defaultWidth);
const isDragging = ref(false);

onMounted(() => {
  const savedWidth = localStorage.getItem(`gmd-sidebar-${props.side}-width`);
  if (savedWidth) {
    width.value = parseInt(savedWidth, 10);
  }
});

const toggleCollapse = () => {
  emit('update:collapsed', !props.collapsed);
};

const handleMousedown = (e: MouseEvent) => {
  if (props.collapsed) return;
  e.preventDefault();
  isDragging.value = true;
  document.body.style.cursor = 'col-resize';
  document.body.style.userSelect = 'none';
  
  const startX = e.clientX;
  const startWidth = width.value;

  const onMousemove = (moveEvent: MouseEvent) => {
    let newWidth = props.side === 'left' 
      ? startWidth + (moveEvent.clientX - startX)
      : startWidth - (moveEvent.clientX - startX);

    newWidth = Math.max(props.minWidth, Math.min(newWidth, props.maxWidth));
    width.value = newWidth;
  };

  const onMouseup = () => {
    isDragging.value = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    localStorage.setItem(`gmd-sidebar-${props.side}-width`, width.value.toString());
    window.removeEventListener('mousemove', onMousemove);
    window.removeEventListener('mouseup', onMouseup);
  };

  window.addEventListener('mousemove', onMousemove);
  window.addEventListener('mouseup', onMouseup);
};
</script>

<template>
  <div 
    class="gmd-sidebar relative"
    :class="side === 'left' ? 'gmd-sidebar-left' : 'gmd-sidebar-right'"
    :style="{ width: collapsed ? '0px' : `${width}px` }"
  >
    <!-- Content with hidden scrollbar -->
    <div class="gmd-sidebar-inner custom-scrollbar" :style="{ width: `${width}px`, [side]: 0 }">
      <slot />
    </div>

    <!-- Toggle Button -->
    <div 
      class="gmd-sidebar-toggle"
      :style="{ [side === 'left' ? 'right' : 'left']: collapsed ? '-32px' : '8px' }"
    >
      <Button 
        variant="text" 
        severity="secondary" 
        class="gmd-sidebar-toggle-btn"
        @click="toggleCollapse"
        :class="collapsed ? 'opacity-100' : 'opacity-0 hover:opacity-100'"
      >
        <component 
          :is="collapsed ? (side === 'left' ? ChevronRight : ChevronLeft) : (side === 'left' ? PanelLeftClose : PanelRightClose)" 
          class="w-3.5 h-3.5"
          style="color: var(--p-text-muted-color)" 
        />
      </Button>
    </div>

    <!-- Resize Handle -->
    <div 
      v-if="!collapsed"
      class="gmd-sidebar-resize-handle"
      :class="side === 'left' ? '-right-1' : '-left-1'"
      @mousedown="handleMousedown"
    ></div>
  </div>
</template>
