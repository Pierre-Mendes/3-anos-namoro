import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ChallengeView from '../views/ChallengeView.vue';
import FinalView from '../views/FinalView.vue';
import ContratoView from "../views/ContratoView.vue";
import CertificadoView from "../views/CertificadoView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/desafio",
    name: "challenge",
    component: ChallengeView,
  },
  {
    path: "/final",
    name: "final",
    component: FinalView,
  },
  {
    path: "/contrato",
    name: "contrato",
    component: ContratoView,
  },
  {
    path: "/certificado",
    name: "certificado",
    component: CertificadoView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

