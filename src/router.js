// src/router.js or src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeApp from '@/HomeApp.vue'
import ArrivalCard from '@/views/ArrivalCardApp.vue'
import TripAccomadation from './views/TripAccomadationApp.vue'

const routes = [
  { path: '/', component: HomeApp },
  { path: '/arrival-card/personal-information', component: ArrivalCard },
  { path: '/arrival-card/trip-&-accomadation-information', component: TripAccomadation }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
