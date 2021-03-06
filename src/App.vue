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
import firebase from "firebase/app";
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
  async created() {
    await this.initFirebaseAuth();
    if (this.login_user) {
      this.getStudyData();
    }
    // リロード時を検出してローディングをストップ
    if (window.performance) {
      if (performance.navigation.type === 1) {
        this.setLoading(false);
      }
    }
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
    async initFirebaseAuth() {
      await this.setLoading(true);
      return new Promise(resolve => {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            this.setLoginUser(user);
            if (this.$router.currentRoute.name === "home") {
              this.$router.push({ name: "input" });
            } else {
              this.setLoading(false);
            }
            resolve();
          } else {
            this.deleteLoginUser();
            this.setLoading(false);
          }
        });
      });
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");
@import "./assets/styles/modules/_variables.scss";
@import "./assets/styles/modules/_mobile-menu.scss";
html,
body,
#sub-app,
.container {
  height: 100%;
  background-color: $cBg;
}
#sub-app {
  font-family: "Roboto", sans-serif;
  min-height: 100%;
  position: relative;
  z-index: 10;
  transition: transform 0.5s, box-shadow 0.5s;
}
.container {
  padding-top: 5px;
  min-height: 100%;
}
.content {
  max-width: $contentMaxWidth;
  margin: 0 auto;
}
ul {
  list-style: none;
  padding-left: 0;
}
input,
button,
textarea,
select {
  appearance: none;
}
a {
  cursor: pointer;
  text-decoration: none;
}
</style>
