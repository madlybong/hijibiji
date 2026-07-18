import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';
import Tooltip from 'primevue/tooltip';
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

const GoldminePreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#facc15',
      500: '#D4AF37',
      600: '#B8972E',
      700: '#9C7E26',
      800: '#7a621e',
      900: '#614d17',
      950: '#3d3010'
    }
  }
});

app.use(pinia)
app.use(PrimeVue, {
    theme: {
        preset: GoldminePreset,
        options: {
            darkModeSelector: '.dark',
            cssLayer: {
                name: 'primevue',
                order: 'theme, base, primevue, components, utilities'
            }
        }
    }
});

// Force dark mode for PrimeVue
document.documentElement.classList.add('dark');

app.directive('tooltip', Tooltip);
app.mount('#app')
