import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/router.js";
import Toaster from '@meforma/vue-toaster';
import './index.css'

const app = createApp(App);
app.use(router);
app.use(Toaster).provide('toast', app.config.globalProperties.$toast)
app.mount("#app");
