import { createRouter, createWebHistory } from "vue-router";
import { ROUTES_PATHS } from "../constants";

import Home from "../pages/Home.vue";
import Room from "../pages/Room.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES_PATHS.HOME,
      name: "home",
      component: Home,
    },
    {
      path: ROUTES_PATHS.ROOM,
      name: 'room',
      component: Room,
      props: true,
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});
export default router;
