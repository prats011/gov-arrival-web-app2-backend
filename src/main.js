import { createApp, ref } from 'vue'
import App from '@/App.vue'
import router from '@/router'

import Dropdown from '@/components/DropdownApp.vue'
import Navbar from '@/components/NavbarApp.vue'

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import MultiSelect from 'primevue/multiselect';
import 'primeicons/primeicons.css';

const globalCount = ref(0);
const app = createApp(App);

app.provide('globalCount', globalCount);

app.component('Dropdown', Dropdown);
app.component('Navbar', Navbar);
app.component('MultiSelect', MultiSelect);

app.use(PrimeVue, { ripple: true });
app.use(Aura);

app.use(router);
app.mount('#app');
