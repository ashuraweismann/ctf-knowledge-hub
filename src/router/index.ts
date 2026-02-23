import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChallengesView from '../views/ChallengesView.vue'
import ResourcesView from '../views/ResourcesView.vue'
import LoginView from '../views/LoginView.vue'
import ChallengeDetailView from '../views/ChallengeDetailView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/challenges', component: ChallengesView },
    { path: '/resources', component: ResourcesView },
    { path: '/login', component: LoginView },
    {path: '/challenges/:id',component: () => import('../views/ChallengeDetailView.vue'),props: true},
    {path: "/challenges/:id",name: "challenge-detail",component: ChallengeDetailView},
    {path: "/posts/:id",name: "PostDetail",component: () => import("../views/PostDetailView.vue")},
  ],
})

export default router
