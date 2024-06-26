import { createApp } from 'vue'
import {router} from "@/router/index"
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
