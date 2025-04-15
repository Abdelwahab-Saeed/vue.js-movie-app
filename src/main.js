import './assets/main.css'
import {} from "bootstrap/dist/css/bootstrap.min.css";


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia)
app.use(router)

app.mount('#app')
import {} from "bootstrap/dist/js/bootstrap.min.js";