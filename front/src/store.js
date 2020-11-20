import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    admin: false,
  },
  mutations: {
    login(state) {
      state.admin = true;
    },
    logout(state) {
      state.admin = false;
    },
  },
});
