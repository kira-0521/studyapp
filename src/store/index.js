import Vue from "vue";
import Vuex from "vuex";
import getpost from "./modules/getpost.js";
import login from "./modules/login.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    getpost,
    login
  }
});
