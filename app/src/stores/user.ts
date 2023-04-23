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
  actions: {
    async isLoggedIn() {
      const loginUser = await apiGet<User>("/api/me");
      if (!loginUser.error && !this.user) {
        this.user = loginUser.data;
      }

      return !loginUser.error;
    },
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
      return await apiPost('/api/password/request', params)
    },

    // パスワード再設定
    async resetPassword (userId: Number, token: string, password: string, password_confirmation: string) {
      const params = {
        id: userId,
        token: token,
        password: password,
        password_confirmation: password_confirmation
      }

      return await apiPost('/api/password/reset', params)
    },

    // ログアウト
    async logout () {
      const res = await apiPost('/api/logout')
      if(!res.error) {
        this.user = null
      }

      return res;
    },

    // メールアドレス認証
    async verifyEmail (userId: Number, hash: string) {
      return await apiGet(`/api/email/verify/${String(userId)}/${hash}`)
    }
  },
});
