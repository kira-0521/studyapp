import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";

axios.defaults.baseURL =
  "https://firestore.googleapis.com/v1/projects/studyapp-29cc7/databases/(default)/documents";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  vuetify,
  store
}).$mount("#app");
