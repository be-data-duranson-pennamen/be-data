import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import Flights from "@/components/flights";
import Statistics from "@/components/statistics";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "flights",
      component: Flights,
    },
    {
      path: "/statistics",
      name: "statistics",
      component: Statistics,
      beforeEnter: (to, from, next) => {
        if (store.state.admin) next();
        else next('/');
      },
    },
  ],
});
