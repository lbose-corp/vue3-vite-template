<script setup lang="ts">
import router from "@/router/router";
import { useCurrentUserStore } from "@/stores/user";

const userStore = useCurrentUserStore();
const user = userStore.user
const executeLogout = async() => {
  await userStore.logout()
  router.push("/login")
}
</script>

<template>
  <div>
    <h1>トップページ</h1>
    <div class="mt-8 mb-8">
      <div>名前： {{ user?.name }}</div>
      <div>メールアドレス： {{ user?.email }}</div>
    </div>
    <button type="button" @click="executeLogout()">ログアウト</button>
  </div>

</template>


<style lang="sass" scoped>

</style>
