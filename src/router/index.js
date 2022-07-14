import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: () => import("@/views/Login"),
    name: "Login",
  },
  {
    path: "/demo",
    component: () => import("@/views/demo.vue"),
  },
  {
    path: "/",
    component: () => import("@/views/layout"),
    children: [
      {
        path: "home",
        component: () => import("@/views/home"),
      },
      {
        path: "qa",
        component: () => import("@/views/qa"),
      },
      {
        path: "video",
        component: () => import("@/views/video"),
      },
      {
        path: "my",
        component: () => import("@/views/my"),
      },
    ],
  },
  {
    path: "/search",
    component: () => import("@/views/Search"),
  },
  {
    path: "/art/:articleId",
    component: () => import("@/views/article"),
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
