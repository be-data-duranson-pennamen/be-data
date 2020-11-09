import Vue from "vue";
import Router from "vue-router";
// import store from "./store";

import Home from "@/components/home";
import Flights from "@/components/flights";



Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/flights",
            name: "flights",
            component: Flights
        },
    ]
});
