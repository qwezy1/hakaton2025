import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ModelPage from '../views/ModelPage.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/model', name: 'Model', component: ModelPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
