<script setup lang="ts">

</script>

<template>
<div class="bg-grey-lighter min-h-screen flex flex-col">
      <div class="container max-w-2xl mx-auto flex-1 flex flex-col items-center justify-start mt-20 px-2" style="width: 60%;">
          <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 class="mb-8 text-3xl text-center">ユーザー登録が完了しました</h1>
              <p class="mb-4 leading-7">
                下記のフォームにメールアドレスと確認コードを入力してください。<br>
                登録時に入力いただいたメールアドレスに、認証用のリンクを送信しましたので、<br>
                メールに記載されているリンクをクリックして、認証を完了してください。
              </p>
              <p class="mb-4 leading-7">
                もし認証用のメールが届かない場合は、迷惑メールフォルダに振り分けられている可能性があるので、一度ご確認ください。<br>
                何かご不明な点があれば、お気軽にお問い合わせください。
              </p>
          </div>

          <div class="text-grey-dark mt-6">
              <router-link class="no-underline border-b border-blue text-blue" to="/login">
                  ログイン
              </router-link>
              に戻る
          </div>
      </div>
  </div>
</template>


<style lang="sass" scoped>
</style>
