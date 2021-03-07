import Vue from "vue";
import Vuex from "vuex";
import getpost from "./modules/getpost";
import areas from "./modules/areas";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    namespaced: true,
    getpost,
    areas
  }
});
