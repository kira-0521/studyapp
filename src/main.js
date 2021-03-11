import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import vuetify from "./plugins/vuetify";
import moment from "vue-moment";

axios.defaults.baseURL =
  "https://firestore.googleapis.com/v1/projects/studyapp-29cc7/databases/(default)/documents";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  vuetify,
  store,
  moment
}).$mount("#app");
