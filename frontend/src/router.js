import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Home2 from './views/home2.vue'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/home', component: Home2 },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router