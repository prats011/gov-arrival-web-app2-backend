import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'

import Dropdown from '@/components/DropdownApp.vue'
import Navbar from '@/components/NavbarApp.vue'

const app = createApp(App)

app.component('Dropdown', Dropdown)
app.component('Navbar', Navbar)

app.use(router)
app.mount('#app')
