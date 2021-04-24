import Vue from "vue";
import axios from "axios";
import firebase from "firebase";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import vuemq from "./plugins/vue-mq";
import VueLoading from "vue-loading-template";

Vue.config.productionTip = false;

axios.defaults.baseURL =
  "https://firestore.googleapis.com/v1/projects/portfolio-studyapp/databases/(default)/documents";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtv_FFSC12NebAxSCOD1pC4-F8iSr0Tqs",
  authDomain: "portfolio-studyapp.firebaseapp.com",
  projectId: "portfolio-studyapp",
  storageBucket: "portfolio-studyapp.appspot.com",
  messagingSenderId: "746150746041",
  appId: "1:746150746041:web:9ab441f32f5e7eef33c868",
  measurementId: "G-92V527KQFF"
};
// Initialize Firebase
// 初期化は一度だけ
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
firebase.analytics();

router.beforeEach((to, from, next) => {
  if (from.name == "home") {
    if (to.name == "input") {
      store.dispatch("loading/setLoading", true);
    }
  }
  next();
});

new Vue({
  render: h => h(App),
  store,
  router,
  vuetify,
  vuemq,
  VueLoading
}).$mount("#app");
