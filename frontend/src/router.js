import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Home2 from './views/home2.vue'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import ThemeTest from './views/ThemeTest.vue'

const routes = [
  { path: '/', component: Home2 },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/theme-test', component: ThemeTest }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router