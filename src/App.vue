<template>
  <div id="app" :class="{ open: menuOpen }">
    <div id="sub-app">
      <Loading v-show="loading"></Loading>
      <div class="mobile-menu__cover" @click="changeMenuOpen"></div>
      <div class="container" v-show="!loading">
        <Header @button-click="changeMenuOpen" :menuOpen="menuOpen"></Header>
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <MobileMenu></MobileMenu>
  </div>
</template>

<script>
import firebase from "firebase";
import Header from "./views/Header";
import Loading from "./components/Loading";
import MobileMenu from "./components/MobileMenu";
import { mapState, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Header,
    Loading,
    MobileMenu
  },
  data() {
    return {
      menuOpen: false
    };
  },
  computed: {
    ...mapState("getpost", ["login_user"]),
    ...mapState("loading", ["loading"])
  },
  created() {
    // ログインログアウトを検知
    this.setLoading(true);
    // 初期描画の時永遠にローディングが続いてしまうため
    setTimeout(() => {
      this.setLoading(false);
    }, 2200);

    this.initFirebaseAuth();
    // ページを消した時にログアウト処理
    window.addEventListener("beforeunload", this.logout);
  },
  methods: {
    ...mapActions("getpost", [
      "getStudyData",
      "logout",
      "setLoginUser",
      "deleteLoginUser"
    ]),
    ...mapActions("loading", ["setLoading"]),
    changeMenuOpen() {
      this.menuOpen = !this.menuOpen;
    },
    // ログイン時とログアウト時にユーザーオブジェクトが入る
    // 処理を順番に行いたいためこのようの処理
    async initFirebaseAuth() {
      return new Promise(resolve => {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            resolve(user);
          } else {
            // ユーザーが入らなければlogin_userを消す
            this.deleteLoginUser();
            // console.log("user: delete");
          }
        });
      })
        .then(user => {
          if (user) {
            this.setLoginUser(user);
            // console.log("setLoginuser");
            // ログインしたタイミングでhomeコンポーネントにいればinputに移る
            if (this.$router.currentRoute.name === "home") {
              this.$router.push({ name: "input" });
            }
            // １時間たったらlogin_userをリセット
            setTimeout(() => {
              this.login_user = null;
            }, 3.6e6);
          }
          return new Promise(resolve => {
            resolve(user);
          });
        })
        .then(() => {
          this.getStudyData();
          // console.log("getStudyData");
        });
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
@import "./assets/styles/modules/_variables.scss";
@import "./assets/styles/modules/_mobile-menu.scss";
@import "./assets/styles/breakpoints/_base.scss";
</style>
