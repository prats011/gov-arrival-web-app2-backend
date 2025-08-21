// src/router.js or src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeApp from '@/HomeApp.vue'
import ArrivalCard from '@/views/ArrivalCardApp.vue'
import TripAccomadation from './views/TripAccomadationApp.vue'
import HealthDeclaration from './views/HealthDeclarationApp.vue'

const routes = [
  { path: '/', component: HomeApp },
  { path: '/arrival-card/personal-information', component: ArrivalCard },
  { path: '/arrival-card/trip-&-accomodation-information', component: TripAccomadation },
  { path: '/arrival-card/health-declaration', component: HealthDeclaration }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
