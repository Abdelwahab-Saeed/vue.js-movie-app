import './assets/main.css'
import {} from "bootstrap/dist/css/bootstrap.min.css";


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
import {} from "bootstrap/dist/js/bootstrap.min.js";
app.mount('#app')
