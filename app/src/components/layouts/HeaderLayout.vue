<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

</script>
<template>
  <div class="header-layout">
    <div class="header-layout__logo">
      <img src="@/assets/logo.png" alt="logo" />
    </div>
    <div class="header-layout__menu">
      <div class="header-layout__menu-item" @click="router.push('/')">
        Home
      </div>
      <div class="header-layout__menu-item" @click="router.push('/about')">
        About
      </div>
      <div class="header-layout__menu-item" @click="router.push('/contact')">
        Contact
      </div>
    </div>
  </div>
</template>
