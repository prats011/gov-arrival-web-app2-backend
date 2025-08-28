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
            50: '{blue.50}',
            100: '{blue.100}',
            200: '{blue.200}',
            300: '{blue.300}',
            400: '{blue.400}',
            500: '{blue.500}',
            600: '{blue.600}',
            700: '{blue.700}',
            800: '{blue.800}',
            900: '{blue.900}',
            950: '{blue.950}'
        }
    }
})

app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        options: {
            prefix: 'p',
            darkModeSelector: 'false',
            cssLayer: false
        }
    }
});

app.use(router)
app.mount('#app')
