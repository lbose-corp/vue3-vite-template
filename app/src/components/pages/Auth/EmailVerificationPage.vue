<script setup lang="ts">
// クエリからidとtokenを取得
import { useRoute } from 'vue-router'
import { useCurrentUserStore } from "@/stores/user";
import { onMounted, ref } from 'vue';

const userStore = useCurrentUserStore();
const query = useRoute().query
const id = Number(query.id)
const hash = query.token as string

let isShow = ref(false)
let verifyEmailSuccess = ref(false)

const verifyEmail = async() => {
  const res = await userStore.verifyEmail(id, hash)
  if (res.status == 200) {
    isShow.value = true
    verifyEmailSuccess.value = true

  } else {
    isShow.value = true
    verifyEmailSuccess.value = false
  }
}

onMounted(() => {
  verifyEmail()
})

</script>

<template>
<div class="bg-grey-lighter min-h-screen flex flex-col">
      <div v-if="isShow && verifyEmailSuccess" class="container max-w-2xl mx-auto flex-1 flex flex-col items-center justify-start mt-20 px-2" style="width: 60%;">
          <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 class="mb-8 text-3xl text-center">ユーザー登録が完了しました</h1>
              <p class="mb-4 leading-7">
                ログイン画面よりログインを行い、サービスの利用を開始してください。
              </p>
              <div class="text-center">
                <router-link class="w-44 inline-block text-center py-3 rounded bg-blue-700 text-white hover:bg-blue-500 focus:outline-none my-1" to="/login">
                  ログイン画面へ
                </router-link>
              </div>

          </div>
      </div>
      <div v-else-if="isShow && !verifyEmailSuccess" class="container max-w-2xl mx-auto flex-1 flex flex-col items-center justify-start mt-20 px-2" style="width: 60%;">
          <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 class="mb-8 text-3xl text-center">メールアドレスの認証に失敗しました。</h1>
          </div>
      </div>

  </div>
</template>


<style lang="sass" scoped>
</style>
