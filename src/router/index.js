import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Main",
    component: Home
  },
  {
    path: "/vote",
    name: "Vote",
    component: () =>
        import(/* webpackChunkName: "vote" */ "../views/Vote.vue")
  },
  {
    path: "/tableWeek",
    name: "tableWeek",
    component: () =>
        import(/* webpackChunkName: "tableWeek" */ "../views/tableWeek.vue")
  },
  {
    path: "/tableYear",
    name: "tableYear",
    component: () =>
        import(/* webpackChunkName: "tableYear" */ "../views/tableYear.vue")
  },
  {
    path: "/bestGoalie",
    name: "BestGoalie",
    component: () =>
        import(/* webpackChunkName: "bestGoalie" */ "../views/BestGoalie.vue")
  },
  {
    path: "/rules",
    name: "Rules",
    component: () =>
        import(/* webpackChunkName: "vote" */ "../views/Vote.vue")
  },
  {
    path: '/:pathMatch(.*)*',
    name: "Error",
    component: () => import(/* webpackChunkName: "error" */ "../views/Error.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
