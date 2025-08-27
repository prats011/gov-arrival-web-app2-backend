import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { ref } from 'vue'

import Dropdown from '@/components/DropdownApp.vue'
import Navbar from '@/components/NavbarApp.vue'

import PrimeVue from 'primevue/config';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

import MultiSelect from 'primevue/multiselect';
import Select from 'primevue/select'

const globalCount = ref(0)
const app = createApp(App)

app.provide('globalCount', globalCount)
app.component('Dropdown', Dropdown)
app.component('Navbar', Navbar)
app.component('MultiSelect', MultiSelect)
app.component('Select', Select)

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{indigo.50}',
            100: '{indigo.100}',
            200: '{indigo.200}',
            300: '{indigo.300}',
            400: '{indigo.400}',
            500: '{indigo.500}',
            600: '{indigo.600}',
            700: '{indigo.700}',
            800: '{indigo.800}',
            900: '{indigo.900}',
            950: '{indigo.950}'
        }
    }
})

app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        options: {
            prefix: 'p',
            darkModeSelector: 'light',
            cssLayer: false
        }
    }
});

app.use(router)
app.mount('#app')
