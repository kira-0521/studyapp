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
    <MobileMenu @click="changeMenuOpen"></MobileMenu>
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
    this.setLoading(true);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setLoginUser(user);
        if (this.$router.currentRoute.name === "home") {
          this.$router.push({ name: "input" });
        }
      } else {
        this.setLoading(false);
        this.deleteLoginUser();
      }
      if (this.login_user) {
        this.getStudyData();
      }
      // リロード時を検出してローディングをストップ
      if (window.performance) {
        if (performance.navigation.type === 1) {
          this.setLoading(false);
        }
      }
      setTimeout(() => {
        this.logout();
      }, 3.6e6);
    });
    // ページを消した時にログアウト処理
    // window.addEventListener("beforeunload", this.logout);
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
