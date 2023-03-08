<script setup lang="ts">
import { ref, inject } from "vue";
import useUsers from '../../composables/useUsers'
const toast = inject('toast');

const { register } = useUsers()

const name = ref('');
const email = ref('');
const password = ref('');
const password_confirmation = ref('');

const executeRegister = () => {
    register(name.value, email.value, password.value, password_confirmation.value).then(rs => {
        // トップページに移動する
    }).catch((error) => {
        // ステータスコードによってエラーメッセージを変更する
        if (error.response.status === 401) {
            toast.show(error.response.data.message, { type: "error" })
        } else if(error.response.status === 422) {
            // toast.show(error.response.data.message, { type: "error" }) // vee-validateを入れたら楽になる
        } else {
            toast.show("予期せぬエラーが発生しました", { type: "error" })
        }
    });
}
</script>

<template>
  <div class="bg-grey-lighter min-h-screen flex flex-col">
      <div class="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 class="mb-8 text-3xl text-center">会員登録</h1>
              <input
                  type="text"
                  class="block border border-grey-light w-full p-3 rounded mb-4"
                  name="fullname"
                  placeholder="氏名"
                  v-model="name" />

              <input
                  type="text"
                  class="block border border-grey-light w-full p-3 rounded mb-4"
                  name="email"
                  placeholder="メールアドレス"
                  v-model="email" />

              <input
                  type="password"
                  class="block border border-grey-light w-full p-3 rounded mb-4"
                  name="password"
                  placeholder="パスワード"
                  v-model="password" />
              <input
                  type="password"
                  class="block border border-grey-light w-full p-3 rounded mb-4"
                  name="confirm_password"
                  placeholder="パスワード（確認用）"
                  v-model="password_confirmation" />

              <button
                  type="submit"
                  class="w-full text-center py-3 rounded bg-blue-700 text-white hover:bg-blue-500 focus:outline-none my-1"
                  @click="executeRegister()"
              >登録</button>
          </div>

          <div class="text-grey-dark mt-6">
              <router-link class="no-underline border-b border-blue text-blue" to="login">
                  ログイン
              </router-link>
              はこちらから
          </div>
      </div>
  </div>
</template>
