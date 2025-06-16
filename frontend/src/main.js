import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { MotionPlugin } from '@vueuse/motion'

// Import Font Awesome
import '@fortawesome/fontawesome-free/css/all.css'

createApp(App).use(router).use(MotionPlugin).mount('#app')
