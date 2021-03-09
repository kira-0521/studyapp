import Vue from "vue";
import Vuex from "vuex";
import getpost from "./modules/getpost.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    getpost
  }
});
