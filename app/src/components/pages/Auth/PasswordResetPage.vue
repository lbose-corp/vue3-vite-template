<script setup lang="ts">
import { inject } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useRoute } from "vue-router";
import router from "@/router/router";
import { useCurrentUserStore } from "@/stores/user";

const userStore = useCurrentUserStore();
const route = useRoute();
let query = route.query;
let token = query.token as null | String;
let userId = query.id as Number | null;

const toast = inject("toast");

const { handleSubmit, errors, setErrors } = useForm({
  validationSchema: yup.object({
    password: yup
      .string()
      .required("パスワードは必須項目です")
      .min(8, "パスワードは8文字以上で入力してください"),
    password_confirmation: yup
      .string()
      .required("パスワード（確認用）は必須項目です")
      .oneOf([yup.ref("password")], "パスワードが一致しません"),
  }),
});

const { value: password } = useField<string>(
  "password",
  {},
  { validateOnValueUpdate: false }
);
const { value: password_confirmation } = useField<string>(
  "password_confirmation",
  {},
  { validateOnValueUpdate: false }
);

//パスワードをリセットする
const executeResetPassword = handleSubmit(async () => {
  const res = await userStore.resetPassword(
    Number(userId),
    String(token),
    password.value,
    password_confirmation.value
  );
  if (res.status == 200) {
    // トップページに移動する
  } else if ((res.status = 422)) {
    setErrors(res.errors);
  } else {
    toast.show(res.error, { type: "error" });
  }
});
</script>

<template>
  <div class="bg-grey-lighter min-h-screen flex flex-col">
    <div
      class="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2"
    >
      <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 class="mb-8 text-3xl text-center">パスワード再設定</h1>

        <div class="form-group mb-4">
          <input
            type="password"
            class="block border border-grey-light w-full p-3 rounded"
            name="password"
            placeholder="パスワード"
            v-model="password"
          />
          <span v-show="errors.password" class="error-message">{{
            errors.password
          }}</span>
        </div>

        <div class="form-group mb-4">
          <input
            type="password"
            class="block border border-grey-light w-full p-3 rounded"
            name="password_confirmation"
            placeholder="パスワード"
            v-model="password_confirmation"
          />
          <span v-show="errors.password_confirmation" class="error-message">{{
            errors.password_confirmation
          }}</span>
        </div>

        <button
          type="submit"
          class="w-full text-center py-3 rounded bg-blue-700 text-white hover:bg-blue-500 focus:outline-none my-1"
          @click="executeResetPassword()"
        >
          送信
        </button>
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
