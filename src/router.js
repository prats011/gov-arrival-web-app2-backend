import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import PersonalInformation from "@/views/PersonalInformationView.vue";
import TripAccomadation from "./views/TripAccomadationView.vue";
import HealthDeclaration from "./views/HealthDeclarationView.vue";
import SuccessApp from "./views/SuccessView.vue";
import CommingSoon from "./views/CommingSoonView.vue";

const routes = [
  { path: "/", component: Home },

  { path: "/new/personal-information", component: PersonalInformation },
  { path: "/new/trip-&-accomodation-information", component: TripAccomadation },
  { path: "/new/health-declaration", component: HealthDeclaration },
  { path: "/new/success", component: SuccessApp },

  { path: "/update/search", component: CommingSoon },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
