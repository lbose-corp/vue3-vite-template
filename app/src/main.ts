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


const userStore = useCurrentUserStore();
router.beforeEach(async (to, from, next) => {
  // 認証が必要なページかどうかを確認する
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  // 認証が必要なページの場合
  if (requiresAuth) {
    // APIを呼び出して認証状態を確認する
    const isLoggedIn = await userStore.isLoggedIn()

    if (isLoggedIn) {
      // 認証が成功した場合、次のページに進む
      next()
    } else {
      // 認証が失敗した場合、ログインページにリダイレクトする
      next({ name: 'login' })
    }
  } else {
    // 認証が不要なページの場合、次のページに進む
    next()
  }
})
export default router
