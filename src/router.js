import { createRouter, createWebHistory } from 'vue-router'
import HomeApp from './HomeApp.vue'
import ArrivalCard from './ArrivalCard.vue'

const routes = [
  { path: '/', component: HomeApp },
  { path: '/arrival-card', component: ArrivalCard }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
