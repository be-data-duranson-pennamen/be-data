import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import Flights from "@/components/flights";
import Statistics from "@/components/statistics";
import Admin from "@/components/admin";
import FlightCreator from "@/components/flight-creator";
import Generate from "@/components/generate";

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
        else next("/");
      },
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      beforeEnter: (to, from, next) => {
        if (store.state.admin) next();
        else next("/");
      },
    },
    {
      path: "/flight-creator",
      name: "flight-creator",
      component: FlightCreator,
      beforeEnter: (to, from, next) => {
        if (store.state.admin) next();
        else next("/");
      },
    },
    {
      path: "/generate",
      name: "generate",
      component: Generate,
      beforeEnter: (to, from, next) => {
        if (store.state.admin) next();
        else next("/");
      },
    },
  ],
});
