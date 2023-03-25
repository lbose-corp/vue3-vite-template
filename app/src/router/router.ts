import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "Login",
    components: {
      default: () => import("@/components/pages/LoginPage.vue"),
      Header: () => import("@/components/layouts/HeaderLayout.vue"),
      // Footer: () => import("@/components/layouts/SidebarLayout.vue"),
    },
  },
  {
    path: "/register",
    name: "Register",
    components: {
      default: () => import("@/components/pages/RegisterPage.vue"),
      Header: () => import("@/components/layouts/HeaderLayout.vue"),
      // Footer: () => import("@/components/layouts/SidebarLayout.vue"),
    },
  },
  {
    path: "/password/forgot",
    name: "PasswordForgot",
    components: {
      default: () => import("@/components/pages/PasswordForgotPage.vue"),
      Header: () => import("@/components/layouts/HeaderLayout.vue"),
      // Footer: () => import("@/components/layouts/SidebarLayout.vue"),
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
