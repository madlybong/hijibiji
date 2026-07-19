import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Tooltip from 'primevue/tooltip';
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()
import ConfirmationService from 'primevue/confirmationservice';
import { createTauriAdapter } from '@goldmine/data';
import { useDocumentStore } from './store/useDocumentStore';

app.use(pinia)

const docStore = useDocumentStore();
docStore.setAdapter(createTauriAdapter());
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.dark',
            cssLayer: {
                name: 'primevue',
                order: 'theme, base, primevue, components, utilities'
            }
        }
    }
});

app.directive('tooltip', Tooltip);
app.use(ConfirmationService);
app.mount('#app');
