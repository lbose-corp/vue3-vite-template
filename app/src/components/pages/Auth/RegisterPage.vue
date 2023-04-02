<script setup lang="ts">
import { ref, inject } from "vue";
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useCurrentUserStore } from "@/stores/user";

const toast = inject('toast');
const userStore = useCurrentUserStore();

const { handleSubmit, errors, setErrors } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('名前は必須項目です'),
    email: yup.string().required('メールアドレスは必須項目です').email("メールアドレスの形式を入力してください"),
    password: yup.string().required('パスワードは必須項目です').min(8, "パスワードは8文字以上で入力してください"),
    password_confirmation: yup.string().required('パスワード（確認用）は必須項目です').oneOf([yup.ref('password')], 'パスワードが一致しません'),
  })
});

const { value: name } = useField<string>('name', {}, { validateOnValueUpdate: false })
const { value: email } = useField<string>('email', {}, { validateOnValueUpdate: false })
const { value: password } = useField<string>('password', {}, { validateOnValueUpdate: false })
const { value: password_confirmation } = useField<string>('password_confirmation', {}, { validateOnValueUpdate: false })


const executeRegister = handleSubmit(async () => {
    const res = await userStore.register(name.value, email.value, password.value, password_confirmation.value)
    if (res.status == 200) {
        // トップページに移動する
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
              <h1 class="mb-8 text-3xl text-center">会員登録</h1>
              <div class="form-group mb-4">
                    <input
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded"
                        name="name"
                        placeholder="氏名"
                        v-model="name" />
                    <span v-show="errors.name" class="error-message">{{ errors.name }}</span>
              </div>
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

              <div class="form-group mb-4">
                    <input
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded"
                        name="password_confirmation"
                        placeholder="パスワード（確認用）"
                        v-model="password_confirmation" />
                    <span v-show="errors.password_confirmation" class="error-message">{{ errors.password_confirmation }}</span>
              </div>



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


<style lang="sass" scoped>
.error-message
  @apply text-red-500 text-xs
</style>
