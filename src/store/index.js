import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login.js";
import loading from "./modules/loading.js";
import getpost from "./modules/getpost.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    loading,
    getpost
  }
});
