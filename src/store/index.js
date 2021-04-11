import Vue from "vue";
import Vuex from "vuex";
import loading from "./modules/loading.js";
import getpost from "./modules/getpost.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    loading,
    getpost
  }
});
