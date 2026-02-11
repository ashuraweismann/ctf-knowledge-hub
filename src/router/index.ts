import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChallengesView from '../views/ChallengesView.vue'
import ResourcesView from '../views/ResourcesView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/challenges', component: ChallengesView },
    { path: '/resources', component: ResourcesView },
    { path: '/login', component: LoginView },
  ],
})

export default router
