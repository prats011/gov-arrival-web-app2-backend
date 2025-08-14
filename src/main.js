import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'

import Dropdown from '@/components/DropdownApp.vue'
import Navbar from '@/components/NavbarApp.vue'

const globalCount = ref(0)
app.provide('globalCount', globalCount)
const app = createApp(App)

app.component('Dropdown', Dropdown)
app.component('Navbar', Navbar)

app.use(router)
app.mount('#app')
