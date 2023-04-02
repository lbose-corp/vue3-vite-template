<script setup lang="ts">

</script>

<template>

<div class="bg-grey-lighter min-h-screen flex flex-col">
    <div class="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 class="mb-8 text-3xl text-center">パスワード再設定が完了しました。</h1>
            <div class="text-grey-dark mt-6">
                <router-link class="no-underline border-b border-blue text-blue" to="/login">
                    ログイン
                </router-link>
                はこちらから
            </div>
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
