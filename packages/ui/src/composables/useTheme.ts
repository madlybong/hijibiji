import { ref, computed } from 'vue';

export type ThemeMode = 'dark' | 'light' | 'system';

export function useTheme() {
  const mode = ref<ThemeMode>('system');

  const resolvedMode = computed(() => {
    if (mode.value === 'system') {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return mode.value;
  });

  const applyTheme = (currentResolvedMode: 'dark' | 'light') => {
    if (currentResolvedMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const setMode = (newMode: ThemeMode) => {
    mode.value = newMode;
    localStorage.setItem('gm-theme', newMode);
    applyTheme(resolvedMode.value);
  };

  const initTheme = (initialMode?: ThemeMode) => {
    const saved = localStorage.getItem('gm-theme') as ThemeMode | null;
    if (saved) {
      mode.value = saved;
    } else if (initialMode) {
      mode.value = initialMode;
    }
    
    // Listen for system preference changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (mode.value === 'system') {
          applyTheme(resolvedMode.value);
        }
      });
    }

    applyTheme(resolvedMode.value);
  };

  return {
    mode,
    resolvedMode,
    setMode,
    initTheme
  };
}
