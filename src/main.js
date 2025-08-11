import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'

import Dropdown from '@/components/DropdownApp.vue'

const app = createApp(App)

app.component('Dropdown', Dropdown)

app.use(router)
app.mount('#app')
