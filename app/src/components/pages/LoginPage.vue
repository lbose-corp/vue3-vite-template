<script setup lang="ts">
import { ref, inject } from "vue";
import useUsers from '../../composables/useUsers'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
const toast = inject('toast');

const { handleSubmit, errors, setErrors } = useForm({
  validationSchema: yup.object({
    email: yup.string().required('メールアドレスは必須項目です').email("メールアドレスの形式を入力してください"),
    password: yup.string().required('パスワードは必須項目です'),
  })
});

const { value: email } = useField<string>('email', {}, { validateOnValueUpdate: false })
const { value: password } = useField<string>('password', {}, { validateOnValueUpdate: false })


const { login } = useUsers()

//　ログインを実行する
const executeLogin = handleSubmit(() => {
  login(email.value, password.value).then(rs => {
    // トップページに移動する
  })
  .catch((error) => {
    // ステータスコードによってエラーメッセージを変更する
    if (error.response.status === 401) {
      toast.show(error.response.data.message, { type: "error" })
    } else if(error.response.status === 422) {
      setErrors(error.response.data.errors)
      // toast.show(error.response.data.message, { type: "error" }) // vee-validateを入れたら楽になる
    } else {
      toast.show("予期せぬエラーが発生しました", { type: "error" })
    }
  });
})

</script>

<template>
  <!-- <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col max-w-xl mx-auto mt-16">
    <div class="mb-4">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="email">
        メールアドレス
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" name="email" type="text" placeholder="**********@example.com" v-model="email">
      <span v-show="errors.email" class="error-message">{{ errors.email }}</span>
      </div>
      <div class="mb-6">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
          パスワード
        </label>
        <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker" id="password" name="password" type="password" placeholder="******************" v-model="password">
        <span  v-show="errors.password"  class="error-message">{{ errors.password }}</span>
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded" type="button" @click="executeLogin()">
          ログイン
        </button>
        <a class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#">
          パスワードを忘れた方はこちら
        </a>
      </div>
  </div> -->


  <div class="bg-grey-lighter min-h-screen flex flex-col">
      <div class="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 class="mb-8 text-3xl text-center">ログイン</h1>
              <div class="form-group mb-4">
                    <input
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded"
                        name="email"
                        placeholder="メールアドレス"
                        v-model="email" />
                    <span v-show="errors.email" class="error-message">{{ errors.email }}</span>
              </div>

              <div class="form-group mb-4">
                    <input
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded"
                        name="password"
                        placeholder="パスワード"
                        v-model="password" />
                    <span v-show="errors.password" class="error-message">{{ errors.password }}</span>
              </div>

              <button
                  type="submit"
                  class="w-full text-center py-3 rounded bg-blue-700 text-white hover:bg-blue-500 focus:outline-none my-1"
                  @click="executeLogin()"
              >登録</button>
          </div>

          <div class="text-grey-dark mt-6">
              <router-link class="no-underline border-b border-blue text-blue" to="register">
                  会員登録はこちらから
              </router-link>

          </div>
          <div class="text-grey-dark  mt-4">
            <router-link class="no-underline border-b border-blue text-blue" to="/password/forgot">
                パスワードを忘れた方はこちら
            </router-link>
          </div>


      </div>
  </div>
</template>



<style lang="sass" scoped>
#header-wrapper
  @apply w-full flex items-center justify-between h-14 px-6 bg-gray-200


.error-message
  @apply text-red-500 text-xs
</style>
