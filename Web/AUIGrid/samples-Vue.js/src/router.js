import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue")
    },
    // 쇼케이스
    {
      path: "/Show01",
      name: "show01",
      component: () => import("./samples/Showcase01.vue")
    },
    {
      path: "/Show02",
      name: "show02",
      component: () => import("./samples/Showcase02.vue")
    },
    {
      path: "/Show03",
      name: "show03",
      component: () => import("./samples/Showcase03.vue")
    },
    {
      path: "/Show04",
      name: "show04",
      component: () => import("./samples/Showcase04.vue")
    },
    {
      path: "/Show05",
      name: "show05",
      component: () => import("./samples/Showcase05.vue")
    },
    {
      path: "/Show06",
      name: "show06",
      component: () => import("./samples/Showcase06.vue")
    },
    {
      path: "/Show07",
      name: "show07",
      component: () => import("./samples/Showcase07.vue")
    },
    {
      path: "/Show08",
      name: "show08",
      component: () => import("./samples/Showcase08.vue")
    },
    {
      path: "/Show09",
      name: "show09",
      component: () => import("./samples/Showcase09.vue")
    }
  ]
});
