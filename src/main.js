import Vue from "vue";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueMq from "./plugins/vue-mq";
import VueLoading from "vue-loading-template";

Vue.config.productionTip = false;

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

new Vue({
  render: h => h(App),
  store,
  router,
  vuetify,
  VueLoading,
  VueMq
}).$mount("#app");
