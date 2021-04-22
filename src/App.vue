<template>
  <div id="app">
    <div id="sub-app" :class="{ open: !menuOpen }">
      <Loading v-show="loading"></Loading>
      <div class="mobile-menu__cover" v-if="menuOpen"></div>
      <div class="container" v-show="!loading">
        <Header></Header>
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <MobileMenu v-if="!menuOpen"></MobileMenu>
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
  async created() {
    // ログインログアウトを検知
    this.setLoading(true);
    // 初期描画の時永遠にローディングが続いてしまうため
    setTimeout(() => {
      this.setLoading(false);
    }, 2200);

    await this.initFirebaseAuth();
  },
  methods: {
    ...mapActions("getpost", [
      "getStudyData",
      "setLoginUser",
      "deleteLoginUser"
    ]),
    ...mapActions("loading", ["setLoading"]),
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
  transition: transform 0.5s, box-shadow 0.5s;
}
.container {
  padding-top: 5px;
  min-height: 100%;
  & .content {
    max-width: $contentMaxWidth;
    margin: 0 auto;
  }
}
ul {
  list-style: none;
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
