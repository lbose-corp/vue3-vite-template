<script setup lang="ts">
import { inject } from "vue";
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useCurrentUserStore } from "@/stores/user";
import router from "@/router/router";

const toast = inject('toast');
const userStore = useCurrentUserStore();

const { handleSubmit, errors, setErrors } = useForm({
  validationSchema: yup.object({
    email: yup.string().required('メールアドレスは必須項目です').email("メールアドレスの形式を入力してください"),
    password: yup.string().required('パスワードは必須項目です'),
  })
});

const { value: email } = useField<string>('email', {}, { validateOnValueUpdate: false })
const { value: password } = useField<string>('password', {}, { validateOnValueUpdate: false })


//　ログインを実行する
const executeLogin = handleSubmit(async() => {
  const res = await userStore.login(email.value, password.value)
  if (res.status == 200) {
    router.push("/")
  } else if (res.status = 422) {
    setErrors(res.errors)
  } else {
    toast.show(res.error, { type: "error" })
  }
})

</script>

<template>
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
              >ログイン</button>
          </div>

          <div class="text-grey-dark mt-6">
              <router-link class="no-underline border-b border-blue text-blue" to="/register">
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
