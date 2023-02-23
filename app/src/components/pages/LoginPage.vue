<script setup lang="ts">
import { ref, inject } from "vue";
import useUsers from '../../composables/useUsers'
const toast = inject('toast');

const email = ref("");
const password = ref("");

const { login } = useUsers()
const executeLogin = () => {
  login(email.value, password.value).then(rs => {
    // トップページに移動する

  })
  .catch((error) => {
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
  <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col max-w-xl mx-auto mt-16">
    <div class="mb-4">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="email">
        メールアドレス
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" type="text" placeholder="**********@example.com" v-model="email">
      </div>
      <div class="mb-6">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
          パスワード
        </label>
        <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************" v-model="password">
        <p class="text-red text-xs italic">Please choose a password.</p>
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded" type="button" @click="executeLogin()">
          Sign In
        </button>
        <a class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#">
          Forgot Password?
        </a>
      </div>
  </div>
</template>

<style lang="sass" scoped>
#header-wrapper
  @apply w-full flex items-center justify-between h-14 px-6 bg-gray-200
</style>
