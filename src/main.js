import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import axios from 'axios';
window.axios = axios;
import VueWriter from "vue-writer";

import "vue-select/dist/vue-select.css";
import vSelect from 'vue-select';
import moshaToast from "mosha-vue-toastify";


window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueWriter)
app.use(moshaToast);
app.component("v-select", vSelect);

app.mount('#app')
