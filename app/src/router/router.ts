import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    components: {
      default: () => import("@/components/pages/Auth/LoginPage.vue"),
      Header: () => import("@/components/layouts/HeaderLayout.vue"),
      // Footer: () => import("@/components/layouts/SidebarLayout.vue"),
    },
  },
  {
    path: "/register",
    name: "register",
    components: {
      default: () => import("@/components/pages/Auth/RegisterPage.vue"),
      Header: () => import("@/components/layouts/HeaderLayout.vue"),
      // Footer: () => import("@/components/layouts/SidebarLayout.vue"),
    },
  },
  {
    path: "/register/complete",
    name: "registerComplete",
    components: {
      default: () => import("@/components/pages/Auth/RegisterCompletePage.vue"),
      Header: () => import("@/components/layouts/HeaderLayout.vue"),
      // Footer: () => import("@/components/layouts/SidebarLayout.vue"),
    },
  },
  {
    path: "/email/verify",
    name: "emailVerify",
    components: {
      default: () =>
        import("@/components/pages/Auth/EmailVerificationPage.vue"),
      Header: () => import("@/components/layouts/HeaderLayout.vue"),
      // Footer: () => import("@/components/layouts/SidebarLayout.vue"),
    },
  },
  {
    path: "/password/forgot",
    name: "passwordForgot",
    components: {
      default: () => import("@/components/pages/Auth/PasswordForgotPage.vue"),
      Header: () => import("@/components/layouts/HeaderLayout.vue"),
      // Footer: () => import("@/components/layouts/SidebarLayout.vue"),
    },
  },
  {
    path: "/password/reset",
    name: "passwordReset",
    components: {
      default: () => import("@/components/pages/Auth/PasswordResetPage.vue"),
      Header: () => import("@/components/layouts/HeaderLayout.vue"),
      // Footer: () => import("@/components/layouts/SidebarLayout.vue"),
    },
  },
  {
    path: "/password/reset/complete",
    name: "passwordResetComplete",
    components: {
      default: () =>
        import("@/components/pages/Auth/PasswordResetCompletePage.vue"),
      Header: () => import("@/components/layouts/HeaderLayout.vue"),
      // Footer: () => import("@/components/layouts/SidebarLayout.vue"),
    },
  },
  {
    path: "/",
    name: "top",
    components: {
      default: () => import("@/components/pages/TopPage.vue"),
      Header: () => import("@/components/layouts/HeaderLayout.vue"),
      // Footer: () => import("@/components/layouts/FooterLayout.vue"),
    },
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
