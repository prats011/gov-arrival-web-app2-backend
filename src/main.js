import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { ref } from 'vue';

import Dropdown from '@/components/DropdownApp.vue'
import Navbar from '@/components/NavbarApp.vue'

const globalCount = ref(0)
const app = createApp(App)


app.provide('globalCount', globalCount)
app.component('Dropdown', Dropdown)
app.component('Navbar', Navbar)

app.use(router)
app.mount('#app')
