import { defineStore } from "pinia";
import { apiGet, apiPost } from "@/utils/api";

export type User = {
  id: number;
  name: string;
  email: string;
};

export const useCurrentUserStore = defineStore("currentUser", {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
     //  ログインをする
    async login (email: string, password: string) {
      const params = { email: email, password: password }
      await apiGet('/sanctum/csrf-cookie')
      const res = await apiPost('/api/login', params)

      if(!res.error) {
        this.user = res.data
      }

      return res;
    },
    //  会員登録をする
    async register(name: string, email: string, password: string, password_confirmation: string) {
      const params = {
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }

      await apiGet('/sanctum/csrf-cookie')
      const res = await apiPost('/api/register', params)

      if(!res.error) {
        this.user = res.data
      }

      return res;
    },

    // パスワード再設定メール送信
    async sendPasswordResetLink (email: string)  {
      const params = { email: email }
      return apiPost('/api/password/request', params)
    },

    // パスワード再設定
    async resetPassword (userId: Number, token: string, password: string, password_confirmation: string) {
      const params = {
        id: userId,
        token: token,
        password: password,
        password_confirmation: password_confirmation
      }

      return apiPost('/api/password/reset', params)
    }
  },
});
