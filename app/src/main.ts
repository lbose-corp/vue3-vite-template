import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from "pinia";
import router from "./router/router";
import { useCurrentUserStore } from "./stores/user";
import Toaster from '@meforma/vue-toaster';
import './index.css'

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(Toaster).provide('toast', app.config.globalProperties.$toast)
app.mount("#app");


//認証不要ページ
const needless_auth_pages = [
    'login',
    'register',
    'forgetPassword',
    'resetPassword',
    'passwordForgot',
    'passwordReset',
  ]

  const userStore = useCurrentUserStore();
  router.beforeEach(async (to, from, next) => {
    const isNeedAuth =
      !to.name?.toString() || !needless_auth_pages.includes(to.name.toString());

    const isLoggedIn = await userStore.isLoggedIn()

    //ログインしていれば指定ページに遷移
    if(isNeedAuth && isLoggedIn) {
      next();
      return;
    }

    //ログインしていなければログインページに遷移
    if(isNeedAuth) {
       next({name: 'login'});
       return;
    }

    //権限不要ページ
    next();
  });
